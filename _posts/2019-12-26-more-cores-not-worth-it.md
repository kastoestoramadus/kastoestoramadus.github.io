---
layout: post
section-type: post
title: Small gains from more cores in laptops
category: hardware
permalink: /os/2019/12/26/more-cores-not-worth-it.html
tags: [ 'hardware', 'intel', 'cpu' ]
---
I'll share my thoughts about more cores in a CPU after my recent search for a photo-editing laptop for my sister.

## The limit of maximum frequency
Progress in maximum CPU frequency has slowed down severely due to known physical limitations. That's the main reason why performance improvements are made by adding more cores. Quite easy when power consumption is not an issue.

On laptops, power efficiency is crucial. To keep the same TDP (an indicator of CPU power consumption, in watts), manufacturers needed to find some power savings.

## The cost of higher performance
![Chart: i7-2600K power consumption rising steeply with clock speed](/img/powerConsumptionPerFreq.png)

Power ~ Frequency × Voltage²

But a higher frequency requires a higher voltage. Look at the chart to see how much higher the voltages used on desktops are.
**On mobile platforms, the more linear part of the curve is used.** The consequence is a lower maximum frequency (limited even more when more cores are loaded), which gives the savings.

Let's compare processing an easily parallelizable task on one core at 4 GHz and on 4 cores at 1 GHz. In both scenarios we have an effective 4 GHz.
In both cases the processing finishes at the same time, but with different efficiency. The 4 cores run at a much lower voltage, so you save power.

Unfortunately, many tasks don't scale well enough to use multiple cores efficiently. That's why single-core performance matters most when scoring the "productivity" capabilities of a CPU.

## Where are the gains?
Let's compare a 9th-gen 4-core CPU with a 6-core one. Both have a TDP limit of 45 W.

![Intel Core i5-9300H vs i7-9750H: 4 vs 6 cores, both 45 W](/img/9300Hand9750H.png)

![UserBenchmark: i7-9750H is 6-23% faster than i5-9300H](/img/9300Hvs9750H.png)

- Single-thread performance is higher due to slightly higher clock speeds.
- Without power limits, 50% more cores would give 50% gains in an 8-thread test.
- Performance per watt is almost identical for both CPUs.

## Conclusions
- The higher the TDP (the looser the power limits), the bigger the gains from more cores.
- The gains for U-series CPUs (15 W TDP) are the lowest.
- For productivity, the gains are marginal. Think twice before paying more for more cores. As of today, 4 cores are optimal in a U-series CPU. In the H series, more than 4 cores are beneficial for some professions.
- ULV CPUs will cheat on TDP even more when connected to AC, to take advantage of their much higher performance potential. With Turbo Boost, Intel already cheats on TDP declarations.

10th-gen 4-core i5-10210U vs 6-core i7-10710U:

![UserBenchmark: i7-10710U is 2-10% faster than i5-10210U](/img/10210Uvs10710U.png)

## Exceptions
There are two additional reasons why more expensive CPUs reach higher clock speeds:
1. Better wafer area. A wafer is the base material a CPU is built from. Wafers are produced in a circular form, and statistically the closer to the centre, the better the material. Better material means slightly better efficiency and higher maximum clock speeds.
2. Marketing. The difference in material quality is far too small to make consumers buy more expensive CPUs. Showing the same TDP with higher clock speeds suggests that you pay more for something better.
   - You can try to overcome the marketing part of the limits by [undervolting](https://www.ultrabookreview.com/31385-the-throttlestop-guide/).
   - Performance and efficiency improvements between generations are small, so don't be afraid to buy a used machine.

Finally, compare [an extremely expensive top 9th-gen mobile CPU (8 cores) with a regular high-end 8th-gen desktop CPU (6 cores)](https://cpu.userbenchmark.com/Compare/Intel-Core-i7-8700K-vs-Intel-Core-i9-9980HK/3937vsm797907).

PS: Asus lists the colour gamut of each display option in the specs, which is crucial for photography.

PS2: For higher-quality gaming, I suggest considering SFF desktop cases. For casual gaming, an eGPU will keep your laptop mobile.
