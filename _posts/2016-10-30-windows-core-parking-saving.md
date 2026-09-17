---
layout: post
section-type: post
title: Saving laptop battery on multi-core CPUs
category: os
tags: [ 'windows', 'core-parking' ]
---

## Who can benefit from this article
You have a multi-core x86 CPU (most Intel and AMD CPUs), Windows 7 or newer, and you are not happy with your battery life.

With the settings below I got 60% battery savings without losing any responsiveness. The article is written for power users.

## Why the battery drains so fast
What you need to know:
* x86 CPUs spread work evenly across cores, and all cores run at the same frequency.
* Responsiveness means having a core ready to work at the highest frequency. Even when the workload is light, the CPU keeps a lot of spare power in case a short, intensive task comes. That's what makes the machine feel fast.
* By default, all cores are active all the time.

As a result, battery power is wasted. There are three mechanisms against it:
1. Core parking - switch cores off when CPU usage is low and back on when the load stays high.
2. Frequency scaling policies - keep the frequency as low as possible without losing responsiveness. There is no universal optimum: some policies give you more "instant power", others save more battery.
3. Switching cores or CPUs off permanently - in the BIOS or in the OS.

**Switching cores off** didn't work for me at all, I think it's a bug (ThinkPad W540, Windows 10).

**Frequency scaling** gives you a lot to tune, but it doesn't switch unused cores off. During a big single-threaded task all cores but one do nothing and still consume a lot of power.

**Core parking** is, in theory, the best solution. It got a bad reputation after the premiere of Windows 7: it was too aggressive and people reported slowdowns at the worst moments. That's why it is disabled by default. Below I show how to set it up for everyday use. If you have an Intel Skylake (or newer) CPU, skip my solution - there is a better one for you.

## Core parking settings
Each Windows power plan gets different settings:
1. Power saver - big savings, big sacrifices
2. Balanced - the default and recommended plan
3. High performance - no sacrifices, no savings

Core parking has many parameters, but two are enough:
* *Processor performance core parking min cores* - how many cores are never parked,
* *Processor performance core parking max cores* - how many cores can be active at most. It works well as a replacement for switching cores off.

All core parking parameters with their GUIDs:
```plaintext
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
Both are hidden. To show them in the advanced power plan settings, run:
```plaintext
powercfg -attributes SUB_PROCESSOR 0cc5b647-c1df-4637-891a-dec35c318583 -ATTRIB_HIDE
powercfg -attributes SUB_PROCESSOR ea062031-0e34-4ff1-9b6d-eb1059334028 -ATTRIB_HIDE
```
Then set them for battery mode in each plan (in percent; on my 4-core CPU one physical core is 25%):
* Power saver - min cores: 25%, max cores: 25%. For the biggest battery savings.
* Balanced - min cores: 25%, max cores: 50%. This should be your default plan.
* High performance - min cores: 100%, max cores: 0%. A quick way to bypass core parking.

![Windows Power Options dialog with the core parking min cores setting](https://bitsum.com/images/parking_in_power_profile_settings.png){:class="img-responsive"}

There are more flexible core parking settings I haven't had time to explore. It should be possible to keep all cores at hand: wake them up under a heavy workload and park them the rest of the time. That would be the best solution.

## FYI
In the power saver plan I also changed the scaling policy from rocket to ideal. It raises the frequency much faster, which is a good idea when only one core is active (the default is very conservative). You get responsiveness at low workloads - that is most of the time, apart from gaming and some development tasks - for a minimal price.

To unhide the scaling policy settings (play with caution):
```plaintext
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

Smartphones with ARM big.LITTLE CPUs don't have this problem: they can spread tasks unevenly between big and small cores.
