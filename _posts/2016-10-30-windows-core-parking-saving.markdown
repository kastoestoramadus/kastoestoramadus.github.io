---
layout: post
title:  "Saving laptop battery on 4-core cpus."
date:   2016-10-30 17:00:0 1700
categories: windows
---
# Who could benefit from this article
If you have 4 core x86 CPU and windows 7+ operating system and you are not happy with your "work on battery time" then this may interest you.

On described solution I got 60% battery savings without loosing any responsiveness. Article is written for power users.

# Low time on battery -  problem description
Needed knowledge: 
* x86 cpus serve work equally to each core. Each core have same frequency.
* Being responsive mean to have prepared core for work on highest frequency. Even if you don't have constantly full workload, your cpu would have a lot of spare workpower. This is just in case of single, short but intensive demand for cpu power. That gives you the speedy feeling.
* By default all cores are active all the time.

Implication of those is loosing battery power. To avoid that, few mechanisms was introduced:
1. core parking. Turn off cores on low cpu usage. Turn them on when gets more "constant work".
2. frequency scaling policies. Keep frequency as low as possible. Try to keep it low and leave the responsive feel. There is no ultimate optimum. Some policies gives you more "instant power" other saves more battery.
3. permanent cores/cpu switch off. Realized on bios or OS level.

ad. 3) it didn't work for me at all. I think it's a bug. Context: Thinkpad W540, windows 10

ad. 2) gives nice area to tune your cpu. cons: does not trun off unused core. Still you can have big one thread demand on which, apart of one core, all cores will do nothing and consume a lot of power. 

ad. 1) In theory the best solution for described problem. It gots very bad fame from premiere of Windows 7. It was too agressive and people reported lower performance in unwanted moments. That is the reason it is disabled by default. I'll give a way to use it for everyday use cases. If you have intel cpu with Skylake (or newer) architecture then you should not use my solution (because there is better for you).

Different setting will be attached to three different windows power plans:
1. power saver - big savings, big sacrifices
2. balanced - default and recommended plan
3. high performance - no sacrifices, no savings

We will unhide advanced settings and click through right values on gui of power plan settings.

For core parking we need mainly two parameters:
* how many cores won't be parked - Windows name: Processor performance core parking min cores
* how many cores will be parked at minimum - Windos name: Processor performance core parking max cores . This setting simulates well core disabling feature.

Core parking parameters, list of all with registry keys:
```
0cc5b647-c1df-4637-891a-dec35c318583	Processor performance core parking min cores
1299023c-bc28-4f0a-81ec-d3295a8d815d	Processor performance core parking over utilization history decrease factor
2ddd5a84-5a71-437e-912a-db0b8c788732	Processor performance core parking increase time
447235c7-6a8d-4cc0-8e24-9eaf70b96e2b	Processor performance core parking parked performance state
5b33697b-e89d-4d38-aa46-9e7dfb7cd2f9	Processor performance core parking affinity history threshold
68dd2f27-a4ce-4e11-8487-3794e4135dfa	Processor performance core parking decrease threshold
71021b41-c749-4d21-be74-a00f335d582b	Processor performance core parking decrease policy
8809c2d8-b155-42d4-bcda-0d345651b1db	Processor performance core parking over utilization weighting
8f7b45e3-c393-480a-878c-f67ac3d07082	Processor performance core parking affinity history decrease factor
943c8cb6-6f93-4227-ad87-e9a3feec08d1	Processor performance core parking over utilization threshold
9ac18e92-aa3c-4e27-b307-01ae37307129	Processor performance core parking over utilization history threshold
a55612aa-f624-42c6-a443-7397d064c04f	Processor performance core parking core override
c7be0679-2817-4d69-9d02-519a537ed0c6	Processor performance core parking increase policy
df142941-20f3-4edf-9a4a-9c83d3d717d1	Processor performance core parking increase threshold
dfd10d17-d5eb-45dd-877a-9a34ddd15c82	Processor performance core parking decrease time
e70867f1-fa2f-4f4e-aea1-4d8a0ba23b20	Processor performance core parking affinity weighting
ea062031-0e34-4ff1-9b6d-eb1059334028	Processor performance core parking max cores
```
To unhide our parameters we execute those commands:
```
powercfg -attributes SUB_PROCESSOR 0cc5b647-c1df-4637-891a-dec35c318583 -ATTRIB_HIDE
powercfg -attributes SUB_PROCESSOR ea062031-0e34-4ff1-9b6d-eb1059334028 -ATTRIB_HIDE
```

By windows names, settings per power plans, for work on battery (in percent, for my 4 core cpu, 1 phisical core - 25%):
* power saver - min cores: 25%, max cores: 25%, use when you need biggest battery savings
* balanced - min cores: 25%, max cores: 50%, this should be your default power plan
* high performance - min cores: 100%, max cores: 0%, use to quickly overload core parking savings

![photo where in settings you have to get](https://bitsum.com/images/parking_in_power_profile_settings.png){:class="img-responsive"}

Be aware that there are more elastic settings for core parking but I didn't have time to get them. It should be possible to have all cores at hand, enable them on heavy workload and disable them for most other time. It would be the best solution.

# FYI

For power saver powerplan I also changed scaling policy from rocket to ideal. It changes frequency much faster. In our case when we have only one core this is a good idea (Default is very conservative). You get responsiveness on low workload (which is at most case aprat from gaming and some development tasks) for minimum price.

Our main problem is not valid for smarphones with ARM/Big-Little architecture since it allows to not even tasks distribution.

To unhide scaling policy settings (play with causion):
```
powercfg -attributes SUB_PROCESSOR 06cadf0e-64ed-448a-8927-ce7bf90eb35d -ATTRIB_HIDE
powercfg -attributes SUB_PROCESSOR 12a0ab44-fe28-4fa9-b3bd-4b64f44960a6 -ATTRIB_HIDE
powercfg -attributes SUB_PROCESSOR 40fbefc7-2e9d-4d25-a185-0cfd8574bac6 -ATTRIB_HIDE
powercfg -attributes SUB_PROCESSOR 4b92d758-5a24-4851-a470-815d78aee119 -ATTRIB_HIDE
powercfg -attributes SUB_PROCESSOR 7b224883-b3cc-4d79-819f-8374152cbe7c -ATTRIB_HIDE
powercfg -attributes SUB_PROCESSOR 943c8cb6-6f93-4227-ad87-e9a3feec08d1 -ATTRIB_HIDE
powercfg -attributes SUB_PROCESSOR be337238-0d82-4146-a960-4f3749d470c7 -ATTRIB_HIDE
powercfg -attributes SUB_PROCESSOR 5d76a2ca-e8c0-402f-a133-2158492d58ad -ATTRIB_HIDE
powercfg -attributes SUB_PROCESSOR 465e1f50-b610-473a-ab58-00d1077dc418 -ATTRIB_HIDE
powercfg -attributes SUB_PROCESSOR 3b04d4fd-1cc7-4f23-ab1c-d1337819c4bb -ATTRIB_HIDE
powercfg -attributes SUB_PROCESSOR bc5038f7-23e0-4960-96da-33abaf5935ec -ATTRIB_HIDE
powercfg -attributes SUB_PROCESSOR 893dee8e-2bef-41e0-89c6-b55d0929964c -ATTRIB_HIDE
```
