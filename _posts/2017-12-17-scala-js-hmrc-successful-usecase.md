---
layout: post
section-type: post
title: Successful Scala.js use case at HMRC
category: dev
tags: [ 'scala', 'js' ]
---
During my contract with HMRC (the UK tax authority) I saw a nice example of code sharing: one tax calculation engine, written in Scala, used by three mobile apps through Scala.js and by the website on the JVM.

The engine was written by another team for mobile platforms. Compiled to JavaScript, it ran on the JS engines of Windows, Android and iOS. Three apps, written in three different languages with three different UIs, shared the same calculation code. Testing and maintaining one engine was much easier than keeping three separate implementations in sync.

Before that, I thought only Xamarin and RoboVM could share code like this. Scala.js is more flexible: each platform keeps its usual language and tools.

Later the engine was reused once again for the web version of the [tax calculator][1]. This time without JavaScript: Scala was compiled to JVM bytecode and ran on the server side.

There are plans for a web service that would serve the engine in JS form on demand. Third parties could then build their own UIs on top of an already verified tax engine.

## AWS Lambda
I've also seen people use Scala.js on AWS Lambda. The JS version starts new Lambda instances fast, with no JVM start-up. Quite useful for very irregular traffic or rarely used Lambdas.

[1]: https://www.tax.service.gov.uk/estimate-paye-take-home-pay/your-pay
