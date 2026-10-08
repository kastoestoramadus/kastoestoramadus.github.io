---
layout: post
section-type: post
title: HOCON - a two-way street between sconfig and lightbend/config
category: dev
tags: [ 'scala', 'hocon', 'config', 'opensource' ]
---

In January I wrote [HOCON - the config format YAML should have been]({% post_url 2026-01-16-hocon-beats-the-competition %}) and ended it with a promise: I've spent the last months [fixing the renderer in sconfig](https://github.com/ekrich/sconfig/pulls?q=is%3Apr+author%3Akastoestoramadus). The work grew into a loop between the two HOCON implementations - the Java original [lightbend/config](https://github.com/lightbend/config) and its Scala port [sconfig](https://github.com/ekrich/sconfig) - with fixes travelling both ways. The scoreboard: 38 PRs into sconfig (18 merged), 12 into lightbend/config (3 merged), six twin pairs open in both repos at once. AI agents did a lot of the typing. This post is about what they were allowed to claim.

## One bug, two libraries

sconfig exists because Scala.js and Scala Native have no JVM, so they cannot run the Java library. Both projects implement the same algorithms, line for line, so porting is mechanical and every bug is, with high probability, in both. That is the engine of everything below.

lightbend/config is in maintenance mode: "feature complete", they "will rarely make any other changes". My feature PR there ([#815](https://github.com/lightbend/config/pull/815), formatting) never got through; three bugfixes were merged within days:

- [#867](https://github.com/lightbend/config/pull/867) - list comments stayed stable across render round trips. Open to merged in 46 minutes.
- [#871](https://github.com/lightbend/config/pull/871) - a comment above a `+=` field was rendered twice. The parser copied the comment onto the synthetic list element; the fix clears it there, one line of real change.
- [#866](https://github.com/lightbend/config/pull/866) - `parseDuration`/`parseBytes` compiled their regexes on every read; now once. `getDuration` went from 1520 to 387 bytes allocated per read.

Bugfixes fit through that door, features don't. What the maintainer's reviews asked for: fix behaviour without adding API, put tests next to the existing ones and follow the naming, prove it with the full `sbt test doc` and `javac --release 8`, and say in the first line of the description what behaviour changes. 46 minutes is what a small, well-evidenced diff looks like to a maintainer with ten minutes.

## The loop

Java to Scala: when a fix lands upstream, the port inherits the bug until someone ports it - 16 of my sconfig PRs are such ports. Scala to Java: probing the port kept surfacing bugs that live in the Java original too. Each became a probe - same config, same render options, run against both libraries. Identical misbehaviour means the bug is upstream, and I open twin PRs.

The loop closed itself once: I reported a rendering bug upstream in December ([#829](https://github.com/lightbend/config/issues/829)), the maintainer fixed it in April ([#841](https://github.com/lightbend/config/pull/841)), I ported the fix back into sconfig ([#590](https://github.com/ekrich/sconfig/pull/590)).

The six twin pairs open right now:

<div class="table-responsive" markdown="1">

| sconfig | lightbend/config | The bug, in one line |
|---|---|---|
| [#599](https://github.com/ekrich/sconfig/pull/599) | [#869](https://github.com/lightbend/config/pull/869) | partially resolved merges render as text that cannot be re-parsed |
| [#600](https://github.com/ekrich/sconfig/pull/600) | [#870](https://github.com/lightbend/config/pull/870) | merge entries ignore render options (`"a" : 1` next to `sib=0`) |
| [#601](https://github.com/ekrich/sconfig/pull/601) | [#871](https://github.com/lightbend/config/pull/871) merged | a comment above `+=` is rendered twice |
| [#634](https://github.com/ekrich/sconfig/pull/634) | [#872](https://github.com/lightbend/config/pull/872) | bare `Infinity`/`NaN` make the JSON output invalid |
| [#635](https://github.com/ekrich/sconfig/pull/635) | [#873](https://github.com/lightbend/config/pull/873) | `getLong` silently clamps out-of-range values |
| [#636](https://github.com/ekrich/sconfig/pull/636) | [#874](https://github.com/lightbend/config/pull/874) | deep nesting ends in `StackOverflowError` |
{: .table}

</div>

## Two bugs up close

Both "before" outputs are verbatim from com.typesafe:config **1.4.9**, the current release.

`ConfigRenderOptions.concise` is documented to give valid JSON, but a double that overflows renders as a bare token no JSON parser accepts:

```plaintext
ConfigFactory.parseString("a = 1e999").root().render(ConfigRenderOptions.concise())

{"a":Infinity}          // before
{"a":"Infinity"}        // after sconfig#634 / lightbend#872
```

The fix quotes the value; `getDouble` still returns `Infinity`, and the behaviour change is stated in the PR's first line.

The second one fails quietly:

```plaintext
cache { max-bytes = 9223372036854775808 }    // 2^63, one past Long.MaxValue

getValue("cache.max-bytes").valueType   // STRING - JSON has no such literal
getLong("cache.max-bytes")              // 9223372036854775807 - no error
getInt("cache.max-bytes")               // WrongType
```

A literal beyond the long range is not a number at all, so it sits there as a STRING. `getLong` converts it through a double and silently hands back `Long.MaxValue`: your 9-exabyte limit just became 8, while `getInt` on the same value throws. The twin PRs ([sconfig#635](https://github.com/ekrich/sconfig/pull/635) / [#873](https://github.com/lightbend/config/pull/873)) make `getLong` throw `WrongType`.

## The workflow

- **Probes before claims.** Every claim in a PR description was executed against the unfixed library first.
- **Tests in a separate commit, red first.** The descriptions state the count: "6 of 8 fail without the fix". If you cannot say how many tests fail red, you have a demo, not a regression test.
- **One PR, one fix.** A port that also carried renderer fixes got `CHANGES_REQUESTED`: "simpler is better". One PR per upstream fix also keeps the twin pairing auditable.
- **Two AIs agreeing is not validation.** The second model shares training data, taste and blind spots with the first. What counted: a red test before the fix, the fixed-point property (render ∘ parse is the identity - a property of the spec, not of anyone's opinion), the other library as a reference implementation, and a human maintainer reading the diff. The agents draft; the pipeline and the maintainers decide.

## Summary

A "will rarely make any other changes" README is not a wall, it is a budget: a one-file behaviour fix with a red test and a reproducible probe fits it. Running the port and the original as a pair is a bug net - a probe against both is the cheapest lie detector I own. The formatter that started all of this is coming along in [hocon-formatter](https://github.com/kastoestoramadus/hocon-formatter), now that rendering round-trips reliably. More on that when it earns its own post ;)
