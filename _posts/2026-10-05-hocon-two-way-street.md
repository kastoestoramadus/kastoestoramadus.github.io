---
layout: post
section-type: post
title: HOCON - a two-way street between sconfig and lightbend/config
category: dev
tags: [ 'scala', 'hocon', 'config', 'opensource' ]
---

In January I wrote [HOCON - the config format YAML should have been]({% post_url 2026-01-16-hocon-beats-the-competition %}), and one bullet under "Where HOCON hurts" was tooling: rendering a loaded config back to text used to lose comments and mangle layout. I ended that post with a promise - "I've spent the last months [fixing the renderer in sconfig](https://github.com/ekrich/sconfig/pulls?q=is%3Apr+author%3Akastoestoramadus)". This is the follow-up, because the renderer work turned into something bigger: a loop between the two HOCON implementations - the Java original [lightbend/config](https://github.com/lightbend/config) and its Scala port [sconfig](https://github.com/ekrich/sconfig) - with fixes travelling in both directions.

The scoreboard at the time of writing: 38 pull requests into sconfig (18 merged), 12 into lightbend/config (3 merged), one bug report there fixed by the maintainer and ported back by me, and six pairs of twin PRs - one per repo, same probe configs, same expected output - open in both repos at once. AI agents did a lot of the typing. This post is about what they were and were not allowed to claim.

## Why the Scala port matters

lightbend/config is Java, and it only runs on a JVM. Scala.js compiles Scala to JavaScript and Scala Native to a native binary - neither has a JVM, so neither can load `com.typesafe:config`. sconfig is a port of the same implementation to Scala, cross-published for JVM, Scala.js and Scala Native. On Scala Native it is not an alternative, it is the only HOCON library there is.

Both codebases implement the same algorithms, line for line, in Java and Scala. That makes porting mechanical - and it means every bug is, with high probability, in both. Keep that in mind, it is the engine of everything below.

My way in (April 2025) was a feature: lightbend/config [#815](https://github.com/lightbend/config/pull/815), "Make formatting possible", the first step towards a HOCON formatter. The first maintainer response came after five months: quite useful, less intrusive than expected - was I willing to take it to a full implementation? I had already implemented it in sconfig by then. The thread still sits there; the last maintainer message says, kindly, that the change "requires full attention to the details" and "we at Akka do not have capacity to take this forward".

Meanwhile, this October, the same repository merged three of my bugfixes within days. Lesson one, and it is written in their README: lightbend/config is in maintenance mode. The "Maintained by" section says the library is "feature complete" and they "will rarely make any other changes". Bugfixes fit through that door. Features don't.

## What a maintenance-mode maintainer accepts

The three merged PRs, smallest story first:

- [#867](https://github.com/lightbend/config/pull/867) - list comment rendering stayed stable across round trips. Port of my [sconfig#472](https://github.com/ekrich/sconfig/pull/472). Open to merged in 46 minutes.
- [#871](https://github.com/lightbend/config/pull/871) - a comment above a `+=` field was rendered twice (three times after an earlier definition of the key). Port of my [sconfig#601](https://github.com/ekrich/sconfig/pull/601).
- [#866](https://github.com/lightbend/config/pull/866) - `parseDuration` and `parseBytes` compiled their regexes on every single read; the patterns are now compiled once. Port of [ekrich's sconfig fix](https://github.com/ekrich/sconfig/pull/473). My allocation probe (ThreadMXBean, 200 000 measured reads): `getDuration("123456789 ns")` dropped from 1520 to 387 bytes per read.

So what makes a PR acceptable to a maintainer who wants as few changes as possible? johanandren's reviews on those three PRs are a free masterclass:

1. **Fix behaviour, don't add API.** Each PR touches one to four files. No new options, no configuration, no "while I'm here".
2. **Melt into the codebase.** On #871: "Please move the tests into the existing test classes instead of a new single-purpose `PlusEqualsCommentTest`" - `+=` cases belong next to the existing `numberPlusEquals` in `ConcatenationTest`. On #866, a nit: static constants here are `UPPER_SNAKE_CASE` (`MAX_INCLUDE_DEPTH`, `ENV_VAR_OVERRIDE_PREFIX`), so name the new patterns that way too.
3. **Prove it on their terms.** Full `sbt test doc` (594-603 tests, Temurin 17) - and, because the library still targets Java 8, `javac --release 8` over all production sources.
4. **Say what changes.** Where behaviour changes, say it in the first line of the description. #872, for example: after the fix, reparsing rendered output turns an `Infinity` into a STRING. In a "rarely any changes" repo, a silent behaviour change is how you lose trust; an explicit one is just information.

#867 merging in 46 minutes is not a sign of a review factory. It is what a small, well-evidenced diff looks like to a maintainer with ten minutes.

## How the codebases feed each other

The traffic runs in both directions:

- **Java to Scala.** When a fix lands upstream, the port inherits the same bug until someone ports it. 16 of my sconfig PRs are such ports (6 merged so far); the bigger ones I documented in a [porting guide](https://github.com/ekrich/sconfig/pull/609) so an agent can do the mechanical part.
- **Scala to Java.** Probing the port kept surfacing bugs that turned out to live in the Java original too. Each one became a probe - the same config, the same render options, run against both libraries. If the Java original misbehaves identically, the bug is upstream, and I open twin PRs.

The loop even closed itself once: I reported a rendering bug upstream in December ([#829](https://github.com/lightbend/config/issues/829), array concatenation rendered as text that cannot be parsed back). The maintainer fixed it in April ([#841](https://github.com/lightbend/config/pull/841)). I then ported that fix back into sconfig ([#590](https://github.com/ekrich/sconfig/pull/590)). Report upstream, get fixed upstream, port it home.

The six twin pairs currently open:

<div class="table-responsive" markdown="1">

| sconfig | lightbend/config | The bug, in one line |
|---|---|---|
| [#599](https://github.com/ekrich/sconfig/pull/599) | [#869](https://github.com/lightbend/config/pull/869) | partially resolved merges render as text that cannot be re-parsed |
| [#600](https://github.com/ekrich/sconfig/pull/600) | [#870](https://github.com/lightbend/config/pull/870) | unresolved merge entries ignore the render options (`"a" : 1` next to `sib=0`) |
| [#601](https://github.com/ekrich/sconfig/pull/601) | [#871](https://github.com/lightbend/config/pull/871) merged | a comment above `+=` is rendered twice |
| [#634](https://github.com/ekrich/sconfig/pull/634) | [#872](https://github.com/lightbend/config/pull/872) | bare `Infinity`/`NaN` make the JSON output invalid |
| [#635](https://github.com/ekrich/sconfig/pull/635) | [#873](https://github.com/lightbend/config/pull/873) | `getLong` silently clamps out-of-range values |
| [#636](https://github.com/ekrich/sconfig/pull/636) | [#874](https://github.com/lightbend/config/pull/874) | deep nesting and long `+=` chains end in `StackOverflowError` |
{: .table}

</div>

Same probe configs, same expected output, tests ported one to one. Not every candidate survives the pairing: for #873 the Java side already had a partial fix ([#860](https://github.com/lightbend/config/pull/860)), so the port had to be re-scoped around it rather than duplicated. A twin PR that ignores what upstream already did is not a twin, it's noise.

## Three bugs up close

All "before" outputs below are verbatim from com.typesafe:config **1.4.9**, the current release. You can run them yourself with scala-cli.

### Infinity is not JSON

```scala
//> using dep com.typesafe:config:1.4.9
import com.typesafe.config.*

@main def nonfinite() =
  val c = ConfigFactory.parseString("a = 1e999")   // 1e999 overflows to Double.PositiveInfinity
  println(c.root().render(ConfigRenderOptions.concise()))
```

```plaintext
{"a":Infinity}
```

`ConfigRenderOptions.concise` is documented to produce valid JSON for a resolved config. `Infinity` is not valid JSON - no JSON parser accepts it, and the library itself reads its own output back as a string, not a number. Worse, the round trip is not a fixed point: render, re-parse, render again, and the output has changed. The twin PRs ([sconfig#634](https://github.com/ekrich/sconfig/pull/634) / [#872](https://github.com/lightbend/config/pull/872)) quote these values:

```plaintext
{"a":"Infinity"}
```

`getDouble` still returns `Infinity` after the re-parse. The description spells out the behaviour change: the value's type becomes STRING once rendered and re-parsed. Finite numbers render exactly as before.

### getLong clamps instead of throwing

```scala
//> using dep com.typesafe:config:1.4.9
import com.typesafe.config.*

@main def longrange() =
  val c = ConfigFactory.parseString("cache { max-bytes = 9223372036854775808 }")   // 2^63, one past Long.MaxValue
  println(c.getValue("cache.max-bytes").valueType())
  println(c.getLong("cache.max-bytes"))
```

```plaintext
STRING
9223372036854775807
```

Look at that pair of lines. A decimal literal beyond the long range is not a number at all (the number format follows JSON, and JSON has no such literal) - so the value sits there as a STRING. Then `getLong` converts it through a double and silently hands back `Long.MaxValue`. No error. Your 9-exabyte `max-bytes` setting just became 8 exabytes, and `getBytes` clamps the same way. Meanwhile `getInt` on the very same value throws `WrongType`. The twin PRs ([sconfig#635](https://github.com/ekrich/sconfig/pull/635) / [#873](https://github.com/lightbend/config/pull/873)) make `getLong` throw `WrongType` for out-of-range values, NaN and infinities, while keeping exact boundaries and in-range fractions readable.

### The comment that refuses to stay once

`a += 2` is sugar for appending to a list, and the parser wrapped the value in a synthetic list element. The comment above the field was attached to the field *and* to that element:

```scala
//> using dep com.typesafe:config:1.4.9
import com.typesafe.config.*

@main def plusequals() =
  val c = ConfigFactory.parseString("# two\na += 2\n")
  val opts = ConfigRenderOptions.defaults().setOriginComments(false).setJson(false)
  println(c.root().render(opts))
```

```plaintext
# two
a=${?a}[
    #  two
    2
]
```

`# two` was a source comment about the field. The renderer prints it above the field, and again above the element. After an earlier definition of `a`, it comes out three times. The fix (port of [sconfig#601](https://github.com/ekrich/sconfig/pull/601)) clears the comment only on the synthetic element; the field keeps it, and it survives resolution. This is the one johanandren merged - "Fix looks correct and minimal to me" - after asking me to move the tests into the existing suites, which took one commit.

## The workflow, honestly

- **Probes before claims.** Every claim in a PR description was executed: the probe config against the unfixed library, producing the broken output, then against the fix. For the ports I ran the probe on the Java code *before* porting - six of the eight October ports had a locally reproduced probe first; the other two were judged from code reading and labelled as such in the tracking notes.
- **Tests in a separate commit, red first.** First commit: regression tests only, failing. Second: the fix. The PR descriptions state the count: "6 of 8 fail without the fix", "5 of 6", "8 of 11". If you cannot say how many tests fail red, you don't have a regression test, you have a demo.
- **Why two AIs agreeing is not validation.** My lightbend PR footers read "Generated with one model through Codex, reviewed by another". That second model catches verbosity and logic slips, but it shares training data, taste and blind spots with the first, and models are agreeable by nature. Two AIs liking a diff is zero independent evidence that the behaviour is right. The oracles that actually counted, in order: a red test before the fix; the fixed-point property itself (render ∘ parse must be the identity, which is a property of the *specification*, not of anyone's opinion); the other library as reference implementation - sconfig is a port, so the two agree *by design*, and any disagreement points at a real divergence worth a probe; full uncached suites on Scala 2.12/2.13/3 plus Scala.js and Scala Native for sconfig changes (593 tests each on the JVM, 405/413 on JS/Native); `javac --release 8` and `sbt test doc` for the Java repo; and last, a human maintainer who reads the diff. The agents draft. The pipeline and the maintainers decide.
- **One repo per task.** The eight October ports each ran in their own working copy, one agent at a time on a fixed queue, with a human (me) reviewing diffs and red/green logs before anything was committed or pushed. All ten lightbend port PRs open at the time - the eight new drafts plus #866 and #868 - stacked on one integration tree, pass 654/654 tests.

The hard numbers, one more time: sconfig - 38 PRs (18 merged, median time to merge 4.9 days, 5 of them within 24 hours), 19 issues filed (6 closed). lightbend/config - 12 PRs (3 merged), one issue closed by the maintainer's fix.

## What did not work

- **Feature PRs to the Java original.** #815 has been open since April 2025 for the reason ennru gave: capacity and caution. I do not hold it against them - but I stopped proposing features there and fixed behaviour instead. That is where the merges came from.
- **Stacked PRs across forks.** Dependent sconfig PRs should show only their own diff. I can't push branches to ekrich/sconfig, so a dependent branch carries the earlier PRs' commits and the description says "review only the last commit". ekrich helpfully linked a series on stacked PRs; the blocker is fork permissions, not git.
- **One PR, several concerns.** A port that also carried renderer fixes got `CHANGES_REQUESTED`: "it will make it extremely hard to audit. We should try and either match PRs or group only multiple related issues... simpler is better." I split the follow-ups into one PR per upstream fix. Matching the upstream PR one to one also makes the twin pairing auditable.
- **Verbosity.** ekrich, again: "LLM tend to be super verbose. If this depends on the previous PR then why do all the tests pass?" - and on another PR, "can you just remove the comments that were added and just keep the changes." The agents draft; the human still has to cut. Every line of a PR description is a line a maintainer has to read.
- **First attempts get closed.** My first rendering PR ([#438](https://github.com/ekrich/sconfig/pull/438)) was closed in favour of the maintainer's own formatting implementation, and my CI proposal for binary-compatibility checks ([#617](https://github.com/ekrich/sconfig/pull/617)) was superseded by his. Both fine. The code landed; the name on it is not mine.

## Summary

A "feature complete, will rarely make any other changes" README is not a wall. It is a budget: a one-file behaviour fix with a red test and a reproducible probe fits the budget and merges in days; a feature waits for a capacity that never arrives. Running the port and the original as a pair is a bug net - the port catches regressions early, the original anchors the spec, and a probe against both is the cheapest lie detector I own. The formatter that started all of this is coming along in [hocon-formatter](https://github.com/kastoestoramadus/hocon-formatter), now that rendering round-trips reliably. More on that when it earns its own post ;)
