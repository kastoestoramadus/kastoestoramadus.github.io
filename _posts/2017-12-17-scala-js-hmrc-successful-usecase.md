---
layout: post
section-type: post
title: Successful Scala.js use case at HMRC
category: dev
tags: [ 'scala', 'js' ]
---
During my contract with HMRC (the UK tax authority), a tax calculator engine written in Scala.js was used in the web tax calculator.

The engine was written by another team for mobile platforms. Translated to JS, it ran on the JS engines of three mobile platforms: Windows, Android and iOS. Three different languages and three different UI implementations were able to share the same calculator code. That way it was easier to test and maintain one implementation of the engine instead of three separate ones.

Before that, I thought only Xamarin and RoboVM could be used in that fashion. Scala.js gave more flexibility here, since each platform keeps the language and tools that are common for it.

Later the engine was reused once again for the web version of the [tax calculator][1]. This time there was no transpilation: Scala was compiled to JVM bytecode and used on the server side.

In the future, a web service is planned that would serve the engine on demand in JS form. Third parties could then build custom UIs on top of the already verified tax engine.

## AWS Lambda
I also found people using Scala.js with AWS Lambda. The JS form gives them fast initialization of new Lambda instances. Quite useful for very irregular traffic or rarely used Lambdas.

[1]: https://www.tax.service.gov.uk/estimate-paye-take-home-pay/your-pay
