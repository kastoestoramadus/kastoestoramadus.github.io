---
layout: post
section-type: post
title: HOCON - a two-way street between sconfig and lightbend/config
category: dev
tags: [ 'scala', 'hocon', 'config', 'opensource' ]
---

In January I wrote [HOCON - the config format YAML should have been]({% post_url 2026-01-16-hocon-beats-the-competition %}) and ended it with a promise: I've spent the last months [fixing the renderer in sconfig](https://github.com/ekrich/sconfig/pulls?q=is%3Apr+author%3Akastoestoramadus). The renderer work grew into a loop between the two HOCON implementations - the Java original [lightbend/config](https://github.com/lightbend/config) and its Scala port [sconfig](https://github.com/ekrich/sconfig) - with fixes travelling both ways. The scoreboard: 38 PRs into sconfig (18 merged), 12 into lightbend/config (3 merged), and six twin PR pairs open in both repos at once. AI agents did a lot of the typing. This post is about what they were allowed to claim.

## One bug, two libraries

sconfig exists because Scala.js and Scala Native have no JVM, so they cannot run the Java library. On Scala Native it is not an alternative - it is the only HOCON library there is.

Both projects implement the same algorithms, line for line, in Java and Scala. Porting is mechanical, and every bug is, with high probability, in both. Keep that in mind: it is the engine of everything below.

My way in (April 2025) was a feature: lightbend/config [#815](https://github.com/lightbend/config/pull/815), "Make formatting possible". The first maintainer reply came after five months: nice, less intrusive than expected - would I take it to a full implementation? I had already built it into sconfig by then. The thread still sits there; the last message says the change "requires full attention to the details" and "we at Akka do not have capacity to take this forward".

This October, the same repository merged three of my bugfixes within days. The difference is written in their README: lightbend/config is in maintenance mode, "feature complete", they "will rarely make any other changes". Bugfixes fit through that door. Features don't.

## What a maintenance-mode maintainer accepts

The three merged PRs:

- [#867](https://github.com/lightbend/config/pull/867) - list comments stayed stable across render round trips. Open to merged in 46 minutes.
- [#871](https://github.com/lightbend/config/pull/871) - a comment above a `+=` field was rendered twice (three times after an earlier definition).
- [#866](https://github.com/lightbend/config/pull/866) - `parseDuration`/`parseBytes` compiled their regexes on every read; now compiled once. `getDuration` went from 1520 to 387 bytes allocated per read.

johanandren's reviews of those three are a free masterclass in what a cautious maintainer wants:

1. **Fix behaviour, don't add API.** Each PR touches one to four files. No new options, no "while I'm here".
2. **Melt into the codebase.** On #871: move the tests out of the new single-purpose class - `+=` cases belong next to the existing `numberPlusEquals` in `ConcatenationTest`. On #866, a nit: constants here are `UPPER_SNAKE_CASE`, name the new ones that way too.
3. **Prove it on their terms.** Full `sbt test doc` (about 600 tests, Temurin 17) and, because the library still targets Java 8, `javac --release 8` over all production sources.
4. **Say what changes.** Where behaviour changes, it goes in the first line of the description. In a "rarely any changes" repo, a silent behaviour change loses trust; an explicit one is just information.

46 minutes is not a review factory. It is what a small, well-evidenced diff looks like to a maintainer with ten minutes.

## The loop

Traffic runs both ways. Java to Scala: when a fix lands upstream, the port inherits the bug until someone ports it - 16 of my sconfig PRs are such ports. Scala to Java: probing the port kept surfacing bugs that turned out to live in the Java original too. Each became a probe - same config, same render options, run against both libraries. Identical misbehaviour means the bug is upstream, and I open twin PRs.

The loop closed itself once: I reported a rendering bug upstream in December ([#829](https://github.com/lightbend/config/issues/829)), the maintainer fixed it in April ([#841](https://github.com/lightbend/config/pull/841)), I ported that fix back into sconfig ([#590](https://github.com/ekrich/sconfig/pull/590)). Report it, get it fixed, bring it home.

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

Not every candidate survives the pairing: #873 had to be re-scoped because the Java side already carried a partial fix ([#860](https://github.com/lightbend/config/pull/860)). A twin PR that ignores what upstream already did is not a twin, it's noise.

## Two bugs up close

Both "before" outputs are verbatim from com.typesafe:config **1.4.9**, the current release.

`ConfigRenderOptions.concise` is documented to give valid JSON, but a double that overflows renders as a bare token no JSON parser accepts:

```plaintext
ConfigFactory.parseString("a = 1e999").root().render(ConfigRenderOptions.concise())

{"a":Infinity}          // before
{"a":"Infinity"}        // after sconfig#634 / lightbend#872
```

The library even reads its own output back as a string, not a number. The fix quotes the value; `getDouble` still returns `Infinity`, and the behaviour change is stated in the PR's first line.

The second one is my favourite, because it fails so quietly:

```plaintext
cache { max-bytes = 9223372036854775808 }    // 2^63, one past Long.MaxValue

getValue("cache.max-bytes").valueType   // STRING - JSON has no such literal
getLong("cache.max-bytes")              // 9223372036854775807 - no error
getInt("cache.max-bytes")               // WrongType
```

A literal beyond the long range is not a number at all, so it sits there as a STRING. `getLong` converts it through a double and silently hands back `Long.MaxValue`. Your 9-exabyte limit just became 8 exabytes, while `getInt` on the same value throws. The twin PRs ([sconfig#635](https://github.com/ekrich/sconfig/pull/635) / [#873](https://github.com/lightbend/config/pull/873)) make `getLong` throw `WrongType` for out-of-range values, NaN and infinities.

And the quietest fix of the three, #871: `a += 2` wraps its value in a synthetic list element, and the comment above the field was copied onto it. The parser now clears the comment on that element only. That is the whole diff - "Fix looks correct and minimal to me", merged in under three days.

## The workflow, honestly

- **Probes before claims.** Every claim in a PR description was executed against the unfixed library first. Six of the eight October ports had a locally reproduced probe on the Java code before porting; the other two were judged from reading the code and labelled as such.
- **Tests in a separate commit, red first.** The descriptions state the count: "6 of 8 fail without the fix", "5 of 6", "8 of 11". If you cannot say how many tests fail red, you have a demo, not a regression test.
- **Two AIs agreeing is not validation.** My lightbend PR footers read "Generated with one model, reviewed by another". The second model shares training data, taste and blind spots with the first, and models are agreeable by nature. What actually counted: a red test before the fix, the fixed-point property (render ∘ parse must be the identity - a property of the spec, not of anyone's opinion), the other library as a reference implementation, and finally a human maintainer reading the diff. The agents draft; the pipeline and the maintainers decide.
- **One repo per task.** Each October port ran in its own working copy, one agent at a time, with me reviewing diffs and red/green logs before anything was pushed. All ten port PRs open at the time, stacked on one integration tree: 654/654 tests.

Tally: sconfig - 38 PRs (18 merged, median time to merge 4.9 days), 19 issues filed. lightbend/config - 12 PRs (3 merged), one issue fixed by the maintainer.

## What did not work

- **Feature PRs to the Java original.** #815 waits for a capacity that never arrives. I stopped proposing features there and fixed behaviour instead - that is where the merges came from.
- **Stacked PRs across forks.** I cannot push branches to ekrich/sconfig, so dependent PRs carry the earlier commits and say "review only the last one". The blocker is fork permissions, not git.
- **One PR, several concerns.** A port that also carried renderer fixes got `CHANGES_REQUESTED`: "simpler is better". I split it into one PR per upstream fix - which also makes the twin pairing auditable.
- **Verbosity.** ekrich: "LLM tend to be super verbose." The agents draft; the human still has to cut.

## Summary

A "feature complete, will rarely make any other changes" README is not a wall. It is a budget: a one-file behaviour fix with a red test and a reproducible probe fits the budget; a feature waits for a capacity that never comes. Running the port and the original as a pair is a bug net - a probe against both is the cheapest lie detector I own. The formatter that started all of this is coming along in [hocon-formatter](https://github.com/kastoestoramadus/hocon-formatter), now that rendering round-trips reliably. More on that when it earns its own post ;)
