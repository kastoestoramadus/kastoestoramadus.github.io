---
layout: post
section-type: post
title: HOCON - the config format YAML should have been
category: dev
tags: [ 'scala', 'hocon', 'config' ]
---

Every project I've worked on in banking and big data ends up with a config zoo: JSON for APIs, YAML for Kubernetes, properties for Spark, TOML for some Python tool. For application configuration there is one format I always come back to: HOCON (Human-Optimized Config Object Notation). Akka, Pekko, Play and scalafmt use it, and after years with it I think it simply beats the competition.

## JSON without the pain
HOCON is a superset of JSON, so any JSON file is already valid HOCON. On top of that you get what JSON is missing:
- comments (`#` and `//`),
- no mandatory quotes and commas,
- path keys: `kafka.consumer.group-id = ledger` instead of three nested objects,
- `=` or `:`, whatever you like.

```hocon
# application.conf
app {
  http {
    host = "0.0.0.0"
    port = 8080
    port = ${?HTTP_PORT}     // environment variable wins when set
  }
  db = ${defaults.db} { url = "jdbc:postgresql://localhost/ledger" }
  db.url = ${?DB_URL}
  request-timeout = 30 seconds
  cache.max-size = 512M
  topics = [ payments, refunds ]
}

defaults.db {
  pool-size = 10
  connection-timeout = 5 seconds
}
```

## Features you usually hack around
- **Substitutions** - `${defaults.db}` reuses a block instead of copy-paste, `${?DB_URL}` is an optional override from the environment. No templating engine needed.
- **Merging** - objects defined twice are merged deeply, for other values the last one wins. `app.db` above is `defaults.db` extended with its own `url`.
- **Layers** - libraries ship their defaults in `reference.conf`, the application overrides only what it needs in `application.conf`, and `include "kafka.conf"` splits big files. One `ConfigFactory.load()` merges it all.
- **Units** - `30 seconds` and `512M` are understood by `getDuration` and `getBytes`. No more guessing if it was `timeoutMs` or `timeoutSeconds`.

## And the competition?
- **JSON** - great for machines, painful for humans: no comments, no reuse.
- **YAML** - significant whitespace, several spec versions and surprises. YAML 1.1 (still what SnakeYAML and PyYAML implement) reads `countries: [GB, NO]` as `["GB", false]` - the famous Norway problem. And `version: 3.10` is the float `3.1` in any YAML.
- **TOML** - nice for flat files, but deep nesting turns into `[a.b.c]` headers and `[[arrays.of.tables]]`, and there are no substitutions.
- **properties** - flat strings only, everything else is your problem.
- **Dhall, CUE, Pkl, Jsonnet** - powerful and typed, but they are programming languages. I want a config file, not one more language for the team to learn. In Scala the types come from case classes anyway (PureConfig, zio-config).

## Where HOCON hurts
- It's JVM-centric. The reference implementation is Java ([lightbend/config](https://github.com/lightbend/config)), [sconfig](https://github.com/ekrich/sconfig) brings it to Scala.js and Scala Native. Ports for Python, Go or .NET exist, with varying completeness.
- The resolver has sharp edges. Put the optional override inside the merged block, `db = ${defaults.db} { url = "x", url = ${?DB_URL} }`, and resolving throws `BugOrBroken` - an [open issue since 2021](https://github.com/lightbend/config/issues/725). A separate `db.url = ${?DB_URL}` line, like above, works fine.
- Tooling. Rendering a loaded config back to text used to lose comments and mangle the layout, and there is still no widely used formatter. That's why I've spent the last months [fixing the renderer in sconfig](https://github.com/ekrich/sconfig/pulls?q=is%3Apr+author%3Akastoestoramadus) - lossless round-tripping is the first step towards a formatter.
- No schema out of the box. You validate by decoding into types, which in Scala you do anyway.

## Summary
For application config on the JVM, HOCON is my default: JSON-compatible, readable, composable and environment-friendly. YAML stays where the ecosystem forces it - Kubernetes manifests ;).
