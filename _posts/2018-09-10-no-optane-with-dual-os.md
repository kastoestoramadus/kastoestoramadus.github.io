---
layout: post
section-type: post
title: No dual boot with Intel Optane
category: hardware
permalink: /os/2018/09/10/no-optane-with-dual-os.html
tags: [ 'hardware', 'linux', 'intel' ]
---
Intel Optane is a great caching solution for HDDs. It gives you fast (almost like a SATA SSD) and huge disk space, with a much longer lifespan than SSDs have. In some stores it's sold in a cheap bundle with a CPU and/or a motherboard.

## But it works only on Windows
No dual-OS booting! It's just not supported, not even with completely separate drives!

## Workaround
For a long time I used Optane with two drives and two OSes. To switch the OS, I always had to change an additional BIOS setting and reboot to be able to choose the second drive. An alternative bootloader on one drive probably won't work for very long.

You have been warned.

Still, for a heavy-duty server Optane might be a good solution, since it doesn't wear out.

PS: AMD has had its caching system working with Linux since the Ryzen 2 release.
