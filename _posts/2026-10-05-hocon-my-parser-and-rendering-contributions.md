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
My feature PR ([#815](https://github.com/lightbend/config/pull/815), formatting) was closed unmerged, while three bugfixes were merged within days: [#867](https://github.com/lightbend/config/pull/867) (in 46 minutes), [#871](https://github.com/lightbend/config/pull/871) and [#866](https://github.com/lightbend/config/pull/866).

What the reviews asked for:
- Change behaviour, add no API,
- Tests next to the existing ones, the project's naming,
- The full `sbt test doc` and `javac --release 8`,
- The behaviour change in the first line of the description.

## Next
How the AI agents were kept honest (probes, red tests, a second pair of eyes that is not another model) deserves a post of its own.

The formatter that started all this is coming along in [hocon-fmt](https://github.com/kastoestoramadus/hocon-fmt) ;)
