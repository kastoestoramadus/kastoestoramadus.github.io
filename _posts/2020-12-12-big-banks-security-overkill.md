---
layout: post
section-type: post
title: Strict restrictions in big banks don't serve their purpose
category: dev
tags: [ 'security', 'qrcode' ]
---
This whole post is a complaint about the useless security practices of a bank I've worked for. I believe the vast majority of them affect other banks as well.

## Only certified versions of updates, drivers, firmware, apps and libraries can be used
Verifying each version of everything that can be upgraded is very expensive, so only a few versions get checked. By default, everything is banned.
- The costs are so high that the bank decided to replace less popular laptops more often. Unfortunately, replacing laptops is a project cost... which results in replacing a one-year-old workstation-class laptop and reinstalling everything...
- A procedure for migrating drives to SSDs was rejected due to security issues. The result? Almost no SSD upgrades, as they require reinstalling everything. Great i3/i5/i7 laptops and 4-core PCs waste users' time, while an SSD upgrade costs almost nothing compared to the lost productivity.
- Getting approval for every new OSS tool or library that could do a lot of processing for free takes a long time. Sometimes, with sources only, it's impossible even to test it, as the required dependencies are not in the internal Artifactory.
- Writing a new tool is a security challenge. A free tool already in wide use has already been evaluated from that perspective. Which one would you claim is more secure?
- Old versions have known vulnerabilities. Not keeping the certification process up to date ruins its security purpose. That's what happened in my case.

## How to download a tool to transfer out any data?
Cutting off all connections to the outside internet that aren't known to be safe is a standard.
Downloading zips is allowed and developers have access to open source code, e.g. on GitHub. In a moment I'll present an idea for a tool that transfers whatever is on a local screen. For now, assume you have it ready. You just need to download it to an internal machine you have access to.
- For a zip, it would be quite an effort, as you need to find an accepted website where you can upload your tool as a zip.
- For developers with access to most OSS, it's no effort. Just push it to Git and you have it.

## How could such a tool work?
QR codes. You have a screen you can record, right?
- Any binary can be mapped into QR codes.
- A single code can hold quite a lot (the standard gives almost 24 kbit per image).
- Bigger files need multiple codes, plus a splitting mechanism.
- Such images can be switched at a high frequency (depending on the screen and camera used).
- After the data is transferred in chunks, a joining mechanism puts it back together.
- It doesn't have to be a QR code. It can be a custom standard with more compression. You could even record a 4K/60Hz stream from a video cable!

![Example QR code](/img/breath.png)

## Sanity test
Now I wonder what a corporate security guy would recommend: more restrictions, or admitting that they can't afford to believe in their great procedures?
