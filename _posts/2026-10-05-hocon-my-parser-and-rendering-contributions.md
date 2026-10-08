---
layout: post
section-type: post
title: HOCON - my parser and rendering contributions
category: dev
tags: [ 'scala', 'hocon', 'config', 'opensource' ]
---
**TLDR:** As of 8 October 2026 I have fixed the renderer in [sconfig](https://github.com/ekrich/sconfig) (Scala port of HOCON): 43 PRs, 23 merged. The port and the Java original [lightbend/config](https://github.com/lightbend/config) share their bugs, so I probe both and send the fix to both: 17 PRs upstream, 3 merged. Bugfixes get merged there, features don't. AI agents did much of the typing; every claim was checked by running code.

{% include contribution-banner.html author="kastoestoramadus" %}

This follows [HOCON - the config format YAML should have been]({% post_url 2026-01-16-hocon-beats-the-competition %}).

## Same bug in both
The Scala port sconfig exists because Scala.js and Scala Native have no JVM and cannot run the Java library, and because Lightbend keeps lightbend/config in maintenance only: its README calls the library "feature complete", promises to keep it running on new JVM versions and to "rarely make any other changes". The Scala code is a line-by-line port, so a bug found in one is almost always in the other.

My process: write a probe (same config, same render options), run it against both. Identical misbehaviour means the bug is upstream, and I open twin PRs. In the other direction, a fix merged upstream has to be ported back (about 16 of my sconfig PRs, 10 of them literally titled "Port ..."). Once the loop closed fully: I reported [#829](https://github.com/lightbend/config/issues/829), the maintainer fixed it in [#841](https://github.com/lightbend/config/pull/841), and I ported it as [sconfig#590](https://github.com/ekrich/sconfig/pull/590).

Twin pairs open now:

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

## Bug example
`ConfigRenderOptions.concise` is documented to give valid JSON, but an overflowing double renders as a token no JSON parser accepts (com.typesafe:config 1.4.9):

```plaintext
ConfigFactory.parseString("a = 1e999").root().render(ConfigRenderOptions.concise())

{"a":Infinity}          // before
{"a":"Infinity"}        // after sconfig#634 / lightbend#872
```

## What gets merged upstream
Three of my PRs were merged into lightbend/config, all of them ports of sconfig fixes, all bugfixes, each with the full `sbt test doc` run in the description (593 to 603 tests). #867 and #871 add a test that fails without the fix; #866 only reduces allocations, so the existing tests cover it:

<div class="table-responsive" markdown="1">

| lightbend/config | Fix | Size | Open to merged | Ported from |
|---|---|---|---|---|
| [#867](https://github.com/lightbend/config/pull/867) | list comments get an extra space on every render round trip | 2 files | 46 minutes | [sconfig#472](https://github.com/ekrich/sconfig/pull/472) |
| [#871](https://github.com/lightbend/config/pull/871) | a comment above `a += 2` is rendered twice | 4 files | 3 days | [sconfig#601](https://github.com/ekrich/sconfig/pull/601) |
| [#866](https://github.com/lightbend/config/pull/866) | `getDuration` and `getMemorySize` compile a regex on every read | 1 file | 3 days | [sconfig#473](https://github.com/ekrich/sconfig/pull/473) |
{: .table}

</div>

My feature PR [#815](https://github.com/lightbend/config/pull/815) (formatting) took five months to get a reply, which called it less intrusive than expected and asked whether I would take it to a full implementation. Three months later: "we at Akka do not have capacity to take this forward". I closed it myself on 6 October, once [#841](https://github.com/lightbend/config/pull/841) had fixed the problem it worked around.

## What the reviews asked for
From the two reviews that asked for changes ([#871](https://github.com/lightbend/config/pull/871), [#866](https://github.com/lightbend/config/pull/866)):
- Put the tests into the existing test classes (`ConcatenationTest`, `ConfParserTest`, `ConfigTest`), not into a new single-purpose one.
- Cover the edge cases the tests missed: a trailing same-line comment (`a += 2 # c`) and a dotted path (`x.a += 2`).
- Follow the code's conventions: `UPPER_SNAKE_CASE` for static constants, the helpers the neighbouring tests use.
- Trim the PR description to the problem and the fix.

## Next
The rules the agents follow live in the repository: [sconfig#609](https://github.com/ekrich/sconfig/pull/609) adds `AGENTS.md`, a porting guide and a porting skill. It is still under review, the Scala-feature changes were split out into [#613](https://github.com/ekrich/sconfig/pull/613) on the maintainer's request. How they work, and what they changed in practice, deserves a post of its own.

The formatter that started all this is coming along in [hocon-fmt](https://github.com/kastoestoramadus/hocon-fmt) ;)
