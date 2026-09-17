---
layout: post
section-type: post
title: No dual boot with Intel Optane
category: hardware
permalink: /os/2018/09/10/no-optane-with-dual-os.html
tags: [ 'hardware', 'linux', 'intel' ]
---
Intel Optane is a great caching solution for HDDs. It gives you huge disk space that is almost as fast as a SATA SSD, with a much longer lifespan than SSDs have. Some stores sell it in a cheap bundle with a CPU and/or a motherboard.

## But it works only on Windows
No dual boot! It's simply not supported, not even with completely separate drives!

## Workaround
For a long time I used Optane with two drives and two OSes. To switch the OS, every time I had to change a BIOS setting and reboot before I could choose the other drive. A single bootloader for both OSes probably won't work for long either.

You have been warned.

Still, Optane might be a good choice for a heavy-duty server, since it wears out so slowly.

PS: AMD's caching solution has worked with Linux since the Ryzen 2 release.
