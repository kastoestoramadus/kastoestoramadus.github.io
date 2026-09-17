---
layout: post
section-type: post
title: HOCON - the config format YAML should have been
category: dev
tags: [ 'scala', 'hocon', 'config' ]
---

Every project I've worked on in banking and big data ends up with a config zoo: JSON for APIs, YAML for Kubernetes, properties for Spark, TOML for some Python tool. For application configuration there is one format I always come back to: HOCON (Human-Optimized Config Object Notation). Akka, Pekko, Play and scalafmt use it, and after years with it I think it simply beats the competition. Instead of listing features, let me show them.

## One service, one config, most of the spec
HOCON is a superset of JSON, so any JSON file is already valid HOCON. Here is what it adds on top - the config of a made-up payments service, where the comments point at the features:

```hocon
# application.conf - no root braces, no commas, comments welcome
include required("kafka.conf")   # fails when missing
include "local.conf"             # silently skipped when missing

defaults {
  db {
    driver = org.postgresql.Driver   // quotes are optional
    pool-size = 10
    connection-timeout = 5 seconds
  }
  topics = [ payments, refunds ]
}

app {
  env = dev
  env = ${?APP_ENV}                  # environment variable wins when set
  name = ledger-${app.env}           # string concatenation

  http.port = 8080                   # path key: http { port = 8080 }
  http {                             # same object again: merged, not replaced
    host = "0.0.0.0"
    port = ${?HTTP_PORT}
    request-timeout = 30s
  }

  db = ${defaults.db} {              # inherit a block and extend it
    url = "jdbc:postgresql://localhost/"${app.name}
    pool-size = 20
  }
  db.password = ${?DB_PASSWORD}      # no variable, no key

  topics = ${defaults.topics} [ chargebacks ]   # array concatenation
  topics += audit                               # append

  statement-retention = 2 weeks      # durations, periods
  cache-size = 512MiB                # and sizes are understood

  daily-report = """
    SELECT account_id, sum(amount)
    FROM transactions
    GROUP BY account_id
  """                                # multi-line string, no escaping
}
```

And the included file. Besides a plain name, `include` takes `file()`, `classpath()` and `url()`:

```hocon
# kafka.conf
kafka {
  client-id = ${app.name}            # substitutions see the whole config
  properties {
    "bootstrap.servers" = "localhost:9092"   # quoted key, the dots stay
    "bootstrap.servers" = ${?KAFKA_BROKERS}
    "enable.auto.commit" = false
  }
}
```

`kafka.conf` uses `app.name` before `application.conf` even defines it. Substitutions are resolved once everything is loaded and merged, so the order of files doesn't matter.

## From file to case classes
In Scala I never read keys one by one. [PureConfig](https://github.com/pureconfig/pureconfig) derives a reader for a case class and maps `kebab-case` keys to `camelCase` fields. Put this file next to the two above and [scala-cli](https://scala-cli.virtuslab.org) turns them into a runnable demo:

```scala
//> using scala 3
//> using dep com.github.pureconfig::pureconfig-core:0.17.9
//> using dep com.lihaoyi::pprint:0.9.6
//> using resourceDir .
import pureconfig.*
import scala.concurrent.duration.FiniteDuration
import java.time.Period
import com.typesafe.config.ConfigMemorySize

case class Http(host: String, port: Int, requestTimeout: FiniteDuration) derives ConfigReader
case class Db(url: String, driver: String, poolSize: Int, connectionTimeout: FiniteDuration,
              password: Option[String]) derives ConfigReader
case class App(name: String, http: Http, db: Db, topics: List[String],
               statementRetention: Period, cacheSize: ConfigMemorySize, dailyReport: String) derives ConfigReader
case class Kafka(clientId: String, properties: Map[String, String]) derives ConfigReader

@main def show() =
  pprint.pprintln(ConfigSource.default.at("app").loadOrThrow[App])
  pprint.pprintln(ConfigSource.default.at("kafka").loadOrThrow[Kafka])
```

Now run it the way production would, with a few environment variables and one system property:

```bash
APP_ENV=prod HTTP_PORT=9090 DB_PASSWORD=s3cret KAFKA_BROKERS=kafka-1:9092,kafka-2:9092 \
  scala-cli run . -Dapp.db.pool-size=50
```

```plaintext
App(
  name = "ledger-prod",
  http = Http(host = "0.0.0.0", port = 9090, requestTimeout = 30 seconds),
  db = Db(
    url = "jdbc:postgresql://localhost/ledger-prod",
    driver = "org.postgresql.Driver",
    poolSize = 50,
    connectionTimeout = 5 seconds,
    password = Some("s3cret")
  ),
  topics = List("payments", "refunds", "chargebacks", "audit"),
  statementRetention = P14D,
  cacheSize = ConfigMemorySize(536870912),
  dailyReport = """
    SELECT account_id, sum(amount)
    FROM transactions
    GROUP BY account_id
  """
)
Kafka(
  clientId = "ledger-prod",
  properties = Map(
    "enable.auto.commit" -> "false",
    "bootstrap.servers" -> "kafka-1:9092,kafka-2:9092"
  )
)
```

Look at what happened:
- **Late binding** - a single `APP_ENV=prod` changed `name`, `db.url` and `kafka.clientId`. Derived values follow the override, no templating engine involved.
- **Layers** - `-Dapp.db.pool-size=50` won without any placeholder in the file. `ConfigSource.default`, which is `ConfigFactory.load()` underneath, stacks system properties over `application.conf` over the `reference.conf` of every jar on the classpath: libraries ship their defaults, you override only what you need. Add `-Dconfig.override_with_env_vars=true` and plain environment variables work the same way: `CONFIG_FORCE_app_db_pool__size=50`.
- **Inheritance** - `db` took `driver` and `connectionTimeout` from `defaults.db` and overrode `poolSize`. `topics` extended the default list twice.
- **Units** - `30s`, `2 weeks` and `512MiB` arrived as a `FiniteDuration`, a `Period` and bytes. No more guessing if it was `timeoutMs` or `timeoutSeconds`.
- **Optional values** - without `DB_PASSWORD` the key doesn't exist at all and `password` is `None`.
- **Quoted keys** - `"bootstrap.servers"` stays a single key, so `properties` can go straight to the Kafka client.
- **Fail fast** - make a typo, `request-timeout = 30 sekunds`, and the application won't start. Every broken key is reported at once, with file, line and a hint: `(application.conf @ file:.../application.conf: 23) Cannot convert '30 sekunds' to Duration: format error 30 sekunds. (try a number followed by any of ns, us, ms, s, m, h, d)`.

## And the competition?

<div class="table-responsive" markdown="1">

| | HOCON | JSON | YAML | TOML | properties |
|---|:-:|:-:|:-:|:-:|:-:|
| Comments | ✓ | ✗ | ✓ | ✓ | ✓ |
| Reuse a block | ✓ | ✗ | anchors, one file | ✗ | ✗ |
| Deep merge | ✓ | ✗ | shallow `<<` | ✗ | ✗ |
| Environment variables | ✓ | ✗ | ✗ | ✗ | ✗ |
| Includes | ✓ | ✗ | ✗ | ✗ | ✗ |
| Durations and sizes | ✓ | ✗ | ✗ | ✗ | ✗ |
| Multi-line strings | ✓ | ✗ | ✓ | ✓ | ✗ |
| Reads JSON as is | ✓ | ✓ | ✓ (1.2) | ✗ | ✗ |
{: .table .table-winner}

</div>

Tools bolt some of it on - Spring and Docker Compose interpolate `${VAR}` in YAML, Helm renders it with Go templates - but each one differently, and the file alone doesn't tell you what the application gets.

- **JSON** - great for machines, painful for humans: no comments, no reuse.
- **YAML** - significant whitespace, several spec versions and surprises. YAML 1.1 (still what SnakeYAML and PyYAML implement) reads `countries: [GB, NO]` as `["GB", false]` - the famous Norway problem. And `version: 3.10` is the float `3.1` in any YAML.
- **TOML** - nice for flat files, but deep nesting turns into `[a.b.c]` headers and `[[arrays.of.tables]]`.
- **properties** - flat strings only, everything else is your problem.
- **Dhall, CUE, Pkl, Jsonnet** - powerful and typed, but they are programming languages. I want a config file, not one more language for the team to learn. The types come from case classes anyway, as you saw above.

## Where HOCON hurts
- It's JVM-centric. The reference implementation is Java ([lightbend/config](https://github.com/lightbend/config)), [sconfig](https://github.com/ekrich/sconfig) brings it to Scala.js and Scala Native. Ports for Python, Go or .NET exist, with varying completeness.
- The resolver has sharp edges. Override a key twice inside the merged block, `db = ${defaults.db} { pool-size = 20, pool-size = ${?DB_POOL_SIZE} }`, and resolving throws `BugOrBroken` - an [open issue since 2021](https://github.com/lightbend/config/issues/725). A separate `db.pool-size = ${?DB_POOL_SIZE}` line, like `db.password` above, works fine.
- Tooling. Rendering a loaded config back to text used to lose comments and mangle the layout, and there is still no widely used formatter. That's why I've spent the last months [fixing the renderer in sconfig](https://github.com/ekrich/sconfig/pulls?q=is%3Apr+author%3Akastoestoramadus) - lossless round-tripping is the first step towards a formatter.
- No schema out of the box. You validate by decoding into types - which, as the typo above shows, catches mistakes before the first request.

## Summary
For application config on the JVM, HOCON is my default: JSON-compatible, readable, composable and environment-friendly. YAML stays where the ecosystem forces it - Kubernetes manifests ;).
