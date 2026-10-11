---
layout: post
section-type: post
title: Who subsidises my AI? 5.73 billion tokens later
category: dev
tags: [ 'ai', 'productivity' ]
---

**TLDR:** From **5 September to 11 October 2026**, I logged **5.73 billion tokens**, mostly cached context; 11 October is partial. Subscriptions give me a huge discount against API prices; cheap Chinese models lower what I will pay for delegated work. Claude remains worth a premium as my trusted orchestrator.

I extracted the usage with:

```bash
npx ccusage -s 2026-09-05
```

## All models: 5.73 billion tokens

<div class="table-responsive" markdown="1">

| Category | Total |
|---|---:|
| **Reported total tokens** | **5,726,005,355** |
| Costs priced by ccusage | $1,344.89 |
| DeepSeek actual spend | $17.38 |
| **Report valuation plus DeepSeek spend** | **$1,362.27** |
| Output tokens | 35,054,182 |
| Uncached input tokens | 69,739,178 |
| Cache creation tokens | 52,786,474 |
| Cache read tokens | 5,568,385,447 |
| Sum of the four token categories | 5,725,965,281 |
| Difference in ccusage’s total counter | 40,074 |
{: .table}

</div>

This mixes API estimates with DeepSeek spend, not my bill. Gemma’s **978,819 tokens** remain unpriced. The **40,074-token discrepancy** is unresolved; the [full model CSV](/data/ai-usage-2026-09-05-to-2026-10-11.csv) sums to the category subtotal.

## What I actually pay

[ChatGPT Plus/Codex](https://learn.chatgpt.com/docs/pricing) and [Claude Pro](https://claude.com/pricing) list **$20/month**; [GLM Lite](https://zcode.z.ai/en) lists **$18**, with a $12.60 offer. My receipts show **€18/month for Claude**, **80.49 PLN for ChatGPT**, and **$18 plus a separate $3 Z.ai payment**. This 37-day snapshot spans billing cycles.

DeepSeek consumed **$17.38 of a $20 top-up**, leaving **$2.62**.

I also have Google AI Plus, but see no larger Antigravity allowance than free accounts. Its [documentation](https://antigravity.google/docs/plans) distinguishes Pro/Ultra without giving exact Plus-versus-Free token counts.

## China does not need to win every task

Western subscriptions look subsidised against retail API value; list prices reveal neither serving costs nor provider losses. DeepSeek’s off-peak cache reads cost about **1/67 of Opus 5.5’s**.

Cheap delegated work already lowers what I will pay. If Chinese providers aim to deflate AI's price premium, it is working in my workflow; their intentions and profitability remain unknown.

[Anthropic is committing to gigawatts of infrastructure](https://www.anthropic.com/news/google-broadcom-partnership-compute). Useful AI could still disappoint investors if willingness to pay falls faster than costs. For me, reliability justifies Claude’s premium; delegated work faces much stronger price competition.

## Trust still has a price

I trust Claude the most. Codex made risky decisions without asking me. Cheap tokens save less when I must supervise every decision.

I kept **Opus 5.5 orchestrating for a long time** while learning, running `compact` roughly eight times. **Sonnet 5.5 now leads**, sometimes Opus; these expensive models delegate to subagents and collect results.

Most work concerned HOCON: [lightbend/config](https://github.com/lightbend/config), [ekrich/sconfig](https://github.com/ekrich/sconfig) and my [hocon-fmt](https://github.com/kastoestoramadus/hocon-fmt). Working mainly through Claude, I developed a **skill for choosing models and reasoning effort**.

## Detailed usage analysis

For aggregation by model:

```bash
npx ccusage -s 2026-09-05 --json --breakdown
```

We ran the binary directly because `npx` was unavailable. These local Claude, Codex, OpenCode, Antigravity and Zcode logs cover unequal workloads: I have had Claude almost two weeks longer.

### Cached context

DeepSeek generated roughly **35% of recorded output**. Cache reads represent **97.25%** of the category subtotal and **98.52%** of DeepSeek’s tokens: those billions mostly mean reused context.

![Cache reads make up 97.25% of the four-category token subtotal; input, cache creation and output together make up 2.75%.](/img/ai-usage-2026/token-mix.svg)

### How the mix changed

![Weekly shares of output tokens for the main models and all other models combined, with total output shown for each week.](/img/ai-usage-2026/weekly-output.svg)

Opus 5.5 dominated output in **21–27 September**; DeepSeek Flash and GLM-5.3 Flash dominated **5–11 October**. This measures volume, not quality; logs do not label orchestration or delegated execution.

![Weekly shares of API costs priced by ccusage. DeepSeek and Gemma are excluded because ccusage has no prices for them.](/img/ai-usage-2026/weekly-value.svg)

Weeks run Monday–Sunday, starting with **5–6 September**. API valuation excludes unpriced DeepSeek and Gemma; DeepSeek’s balance gives no daily breakdown. [Full weekly CSV](/data/ai-usage-weekly-2026.csv).

### Model totals and API prices

Below are nine of **22 models** (roughly 40%), ranked by report valuation plus DeepSeek spend; GLM names differing only in case are combined.

<details markdown="1">
<summary>Exact figures, dates and current-price revaluation</summary>

Dates are first and last recorded use within the snapshot, not subscription dates.

<div class="table-responsive" markdown="1">

| Model | Recorded use, 2026 | Total tokens | Report USD | Current-rate scenario USD |
|---|---|---:|---:|---:|
| Claude Opus 5.5 | 23 Sep–9 Oct | 1,271,310,516 | 544.30 | 487.51 |
| Claude Opus 5 | 5–28 Sep | 439,662,303 | 442.29 | 382.52 |
| Claude Sonnet 5.5 | 29 Sep–11 Oct | 396,364,402 | 94.90 | 83.97 |
| GPT-6.1 Sol | 1–11 Oct | 489,608,939 | 92.17 | 92.17 |
| Claude Sonnet 5 | 6–28 Sep | 217,862,861 | 82.98 | 75.05 |
| GLM-5.3 Flash | 29 Sep–9 Oct | 828,119,338 | 30.79 | 30.79 |
| GPT-6 Astra | 4–11 Oct | 16,777,705 | 28.83 | 28.83 |
| GLM-5.3 | 29 Sep–9 Oct | 60,664,035 | 21.08 | 21.08 |
| DeepSeek Flash | 6–11 Oct | 1,929,552,714 | 17.38 actual spend | 15.52–31.04 |
{: .table}

</div>

</details>

Prices checked **11 October 2026**: [Claude](https://claude.com/pricing) five-minute cache writes, [OpenAI](https://developers.openai.com/api/docs/pricing) Standard/short-context rates, [GLM](https://docs.z.ai/guides/overview/pricing) API rates and [DeepSeek](https://api-docs.deepseek.com/quick_start/pricing) off-peak/peak bounds. The two Opus models revalue to **$870.03**; these are not historical bills.

<details markdown="1">
<summary>Exact API prices per million tokens</summary>

<div class="table-responsive" markdown="1">

| Model / tier | Uncached input | Cache read | Output |
|---|---:|---:|---:|
| Opus 5.5 | $4 | $0.20 | $20 |
| GPT-6.1 Sol, Standard / short context | $2 | $0.10 | $10 |
| GLM-5.3 Flash | $0.15 | $0.03 | $0.50 |
| DeepSeek Flash, off-peak | $0.15 | $0.003 | $0.60 |
| DeepSeek Flash, peak | $0.30 | $0.006 | $1.20 |
{: .table}

</div>

</details>

The table omits separately charged cache writes.

### Opus versus Sonnet, Astra versus Sol

![Opus 5.5 costs twice Sonnet 5.5’s API rates. Astra costs five times Sol 6.1 for most token categories and ten times for cache reads.](/img/ai-usage-2026/model-premiums.svg)

**Opus costs twice Sonnet; Astra costs five times Sol, or ten times for cache reads**, at the rates above. Astra’s premium is particularly steep for cached context. These logs do not measure subscription quota consumption.

![Daily recorded output for Opus 5.5 versus Sonnet 5.5 in 29 September–9 October, and Astra versus Sol 6.1 in 4–11 October. Each pair has its own scale.](/img/ai-usage-2026/daily-pairs.svg)

During **29 September–9 October**, Opus and Sonnet had similar output per active day, but Opus’s API valuation was roughly **2.4 times higher**. Their averages use nine and ten active days respectively; **4–11 October** uses four for Astra and six for Sol. Astra’s valuation per active day was slightly higher than Sol’s, despite about a third of the output. An active day has a logged entry, regardless of workload. [Exact paired-window calculations](/data/ai-usage-paired-windows-2026.csv).
