---
layout: post
section-type: post
title: Strict restrictions in big banks don't serve their purpose
category: dev
tags: [ 'security', 'qrcode' ]
---
This whole post is a complaint about the useless security practices of a bank I've worked for. I believe most of them apply to other banks as well.

## Only certified versions of updates, drivers, firmware, apps and libraries are allowed
Certifying every version of everything that can be upgraded is very expensive, so only a few versions get checked. Everything else is banned by default.
- Certification is so costly that the bank prefers to replace less popular laptop models more often. But replacing laptops is a project cost... so it ends with replacing one-year-old workstation-class laptops and reinstalling everything...
- A procedure for moving drives to SSDs was rejected for security reasons. The result? Almost no SSD upgrades, as they require reinstalling everything. Otherwise good i3/i5/i7 laptops and 4-core PCs waste users' time, while an SSD costs almost nothing compared to the lost productivity.
- Getting a new OSS tool or library approved takes a long time, even if it could do a lot of processing for free. Sometimes you can't even test it from sources, because its dependencies aren't in the internal Artifactory.
- The alternative - writing your own tool - is a security challenge of its own. A free tool in wide use has already been evaluated from that perspective. Which one would you call more secure?
- Old versions have known vulnerabilities. When certification doesn't keep up with new versions, it defeats its own security purpose. That's what happened in my case.

## How would you get a data-leaking tool inside?
The standard is to block every connection to the internet that isn't known to be safe.
Still, downloading zips from allowed websites works, and developers have access to open source code, e.g. on GitHub. In a moment I'll describe a tool that transfers out whatever is on a local screen. For now, assume it's ready - you just need to get it onto an internal machine you have access to.
- As a zip, it's quite an effort: you need to find an allowed website where you can upload it.
- As a developer with access to most OSS, it's no effort at all. Push it to a public Git repository and pull it inside.

## How could such a tool work?
QR codes. You can record a screen, right?
- Any binary can be encoded as QR codes.
- A single code holds quite a lot (the standard allows almost 24 kbit per image).
- Bigger files need multiple codes, so the tool splits them into chunks.
- The codes can be switched at a high frequency (depending on the screen and the camera).
- On the other side, the recorded chunks are joined back together.
- It doesn't have to be a QR code. A custom format could compress more. You could even record a 4K/60Hz stream straight from a video cable!

![Example QR code](/img/breath.png)

## Sanity test
Now I wonder what a corporate security guy would recommend: even more restrictions, or admitting that they can't afford to rely on their great procedures?
