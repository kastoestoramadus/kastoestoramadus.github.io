---
layout: post
section-type: post
title: No DualOS with Intel Optane
category: os
tags: [ 'hardware', 'linux', 'intel' ]
---

Intel Optane is a great caching solution for HDDs. It lets you have a fast (almost like SATA SSD) and huge disk space with much longer lifespan than SSDs have. In some stores, it is sold in a cheap package with CPU or/and motherboard.

# BUT! it works only on Windows
No Dual-OS booting! It's just not supported. Not even on completely separate drives!

# Walkaround 
For a long time, I've used Optane with two drives and two OSs. To change the OS I always needed to change an additional setting in the BIOS and reboot to be able to choose the second drive. Probably the alternative bootloader won't work on one drive for very long.

You were warned.

Still, for a heavy-duty server, Optane might be still a good solution since the Optane won't wear off. HyperV comes already with Win 10 Pro license.

PS: AMD has its caching system working with Linux since the Ryzen 2 release.

![Optane explanation by an image](https://techreport.com/r.x/2017_03_27_Intel_Optane_Memory_promises_the_best_of_hard_drives_and_SSDs/FAQ.png)
