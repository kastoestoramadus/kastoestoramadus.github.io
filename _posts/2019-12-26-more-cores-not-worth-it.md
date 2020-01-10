---
layout: post
section-type: post
title: Small gains of having more cores on mobile laptops
category: os
tags: [ 'hardware', 'intel', 'cpu' ]
---

I'll share my thoughts about more cores in a CPU after my recent searching for a photographer's laptop for my sister.

# Limit of maximum frequency
Advancement of maximum CPU frequency has slowed down severely due to known physics limitations. It's the main reason why performance improvements are made by adding more cores to CPUs. Quite easily done when power consumption is not an issue.

On laptops the performance efficiency is crucial. To keep the same TDP (an indicator for a CPU power consumption [W]) producers needed to find some power savings.

# Cost of higher performance
<img src="/img/powerConsumptionPerFreq.png">
Power = ~ Frequency * Voltage^2

but higher frequency requires higher voltages. Look at the chart how much higher voltages are used on desktops.
**On mobile platforms, the more linear part of the curve is used.** The consequence is lower max. frequency (even more limited when more cores are on load) which gives the savings.

Let's compare the processing of an easily parallelizable task between one core at 4Ghz and 4 cores at 1Ghz. In both scenarios, we have effective 4Ghz.
In both cases, processing will be finished at the same time but with different efficiency. 4 cores are set to a much lower voltage so you have power savings.

Unfortunately, many tasks aren't well scalable to be used on multi-cores efficiently. That's why single-core performance is most important for scoring "productivity" capabilities of a CPU.

# Where are the gains?
Lets compare 9gen 4-core cpu vs. a 6-core one. Both has TDP limit of 45W.
<img src="/img/9300Hand9750H.png">

<img src="/img/9300Hvs9750H.png">

- single-thread performance is higher due to a bit higher clocks
- without power limits 50% more cores would give 50% gains on 8-thread test
- efficiency per wat is almost identical in both CPUs.

# Conclusions+
- the higher TDP (lower power limits) the more gains from more cores,
- gains of CPUs from U series (15W TDP) are the lowest,
- For productivity, gains are marginal. Think twice before you'll pay more for more cores in a CPU. 4 cores in a U series CPU is optimal as for today. In H series more than 4 cores are beneficial for some kind of professions.
- ULV CPUs will be cheating TDP more while connected to AC to be able to take the adavantage of much higher performance potential. Now with TurboBoost Intel already cheats the TDP declarations.

10gen 4-core 10210U vs 6-core 10710U :
<img src="/img/10210Uvs10710U.png">

# Exceptions
There are two additional effects to achieve higher clocks for more expensive CPUs:
1. Better wafer area. A wafer is the source of the base material for building a CPU. Wafers are produced in a circular form. The closer to the centre the better statistically the material is. Better material means a bit better efficiency and higher maximal clocks.
2. Marketing. The material quality difference is far too little to make consumers buying more expensive CPUs. Showing same TDP and higher clocks suggestions that you pay more for something better. 
  - the marketing part of the limits you may try to overcome by [undervolting](https://www.ultrabookreview.com/31385-the-throttlestop-guide/).
  - performance and efficiency improvements are small from generation to generation so don't be afraid to buy a used machine.

On the end compare [extremely expensive best 9gen. mobile CPU (8 cores) with a regular high-grade 8gen. desktop CPU (6 cores)](https://cpu.userbenchmark.com/Compare/Intel-Core-i7-8700K-vs-Intel-Core-i9-9980HK/3937vsm797907).

PS: Asus reveals in specs the colour gamut of each display option which is crucial for photography.
PS2: For higher quality gaming I suggest to consider SFF Desktop cases. For casual gaming eGPU will keep your laptop mobile.
