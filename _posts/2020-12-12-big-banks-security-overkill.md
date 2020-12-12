---
layout: post
section-type: post
title: Strong restrictions in big banks are not filling their purpose
category: dev
tags: [ 'security', 'qrcode' ]
---

The whole post is a kind of complaints and pointing our useless security practices of a bank I've worked for. I believe the Vast majority of them affects other banks as well.

# Only certified versions of updates, drivers, firmware, apps and libs can be used.
Verifying each version of upgradables is very expensive, so only a few versions are getting checked. By default, everything is banned.
- Costs^ are so high, the bank decided to replace less popular laptops more frequently. Unfortunately replacing laptops is the cost of a project... plus replacing a one-year laptop of workstation-class and reinstalling everything ...
- Procedure of drive migration to SSD was rejected due to security. Result? Almost upgrades to SSD as it requires to reinstall everything. Great i3/i5/i7 laptops and 4cores PCs burn time of users while an upgrade to SSD has almost zero cost when compared to lost productivity.
- Applying for each new OSS tool/lib that could do for free a lot of processing takes a lot of time to make it available for project usage. Sometimes with sources only it's impossible to test it as requires dependencies that are not in the internal Artifactory.
- Writing a new tool is a security challenge. A free tool that is already in wide use was already evaluated from that perspective.
- Old versions got known vulnerabilities. Not keeping up to date with the certification process ruins the security purpose. Which happened in my case.

Cutting out all not known as safe connections to outer internet is a standard.
# How to download a tool to transfer out any data?
Downloading zips are allowed and devs got access to opensource code like in GitHub. I'll present in a moment an idea for a tool to transfer whatever we have on a local screen. For now, assume you got it ready. Just need to download it to the internal machine you have access to.
- for Zip, it would be quite an effort as you need to find and accepted website where you can add your tool in a zip.
- for Devs with access to most OSS it's no effort. Just push it to git and you have it.

# How such tool may work?
QR codes. You got the screen you may record, right?
- any binary can be mapped into a QR codes,
- such image can be really big (standard gives almost 24 kb/image),
<img src="/img/breath.png">
- such images can be replaced with high frequency (varies with the screen and camera used),
- it doesn't need to be QrCode. It can be a custom standard with more compression. You may even record a stream from video cable in 4K/60Hz!

# Sanity test
Now I wonder. What a corporate security guy would recommend. More restrictions or to admit that they can't afford to believe in their great procedures?
