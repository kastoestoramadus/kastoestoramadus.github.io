---
layout: post
section-type: post
title: Successful Scala.js usage in HMRC
category: dev 
tags: [ 'scala', 'js' ]
---
During my contract with HMRC (UK tax institution) in web tax calculator was used ScalaJS tax calculator engine.

The engine was written by another team for mobile platforms. Translated engine to JS run on JS engines on three mobile platforms: Windows, Android and iOS. Three different languages and three different implementations of UI were able to share same calculator code. That way it was easier to test and maintain one implementation of the engine instead of three separate.

Before that engine, I thought only Xamarin and RoboVM may be used in that fashion. Scala.js gave here more flexibility than them since you can use language and tools that are common for a particular platform.

Later the engine was once again reused for the web version of [tax calculator][1]. This time there was no traspilation. Scala was compiled to JVM byte code and used on the server side.

In future is planned a web service that would serve engine on demand in JS form. 3rd parties may create custom UI and use the already verified tax engine.

# AWS Lambda
I found also people use Scala.js with AWS lambda. JS form gives them fast initialization of new instances of a Lambdas. Quite useful for very unregular service usage or for rarely used lambdas.

[1]:https://www.tax.service.gov.uk/estimate-paye-take-home-pay/your-pay
