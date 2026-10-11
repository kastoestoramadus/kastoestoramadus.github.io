---
layout: post
section-type: post
title: Who subsidises my AI? 5.73 billion tokens later
category: dev
tags: [ 'ai', 'productivity' ]
---

**TLDR:** My local logs recorded **5.73 billion tokens** from **5 September to 11 October 2026**, mostly cached context. Subscriptions cost me far less than the API list-price equivalent, while cheap Chinese APIs lower what I am willing to pay for delegated work. Claude earned my trust as the orchestrator; the figures do not tell me who, if anyone, loses money serving that work.

I extracted the usage with:

```bash
npx ccusage -s 2026-09-05
```

For aggregation by model:

```bash
npx ccusage -s 2026-09-05 --json --breakdown
```

The analysis environment lacked `npx`, so we ran the npm package's binary directly with these arguments. The snapshot combines detected local Claude, Codex, OpenCode, Antigravity and Zcode logs: **37 calendar days, 35 with usage**, with 11 October partial. I have had Claude almost two weeks longer than the others, so the totals cover different periods and workloads.

## How the mix changed

![Weekly shares of output tokens for the main models and all other models combined, with total output shown for each week.](/img/ai-usage-2026/weekly-output.svg)

In **21–27 September**, Opus 5.5 generated **75.3% of recorded output**. By **5–11 October**, its share was **6.9%**, while **DeepSeek Flash and GLM-5.3 Flash together generated 81.5%**. These are output volumes, not quality scores; the logs do not label orchestration or delegated execution.

![Weekly shares of API costs priced by ccusage. DeepSeek and Gemma are excluded because ccusage has no prices for them.](/img/ai-usage-2026/weekly-value.svg)

Weeks run Monday–Sunday; the first covers only **5–6 September**. The output chart includes every model. The value chart uses the report’s original API estimates and **excludes unpriced DeepSeek and Gemma**. DeepSeek’s balance gives total spend, not daily charges. Exact shares are in the [weekly CSV](/data/ai-usage-weekly-2026.csv).

The report contains **22 models**, after combining GLM names differing only in case. The nine entries below cover roughly 40% of them, selected by report valuation plus actual DeepSeek spend.

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

The scenario uses prices checked on **11 October 2026**: Claude's five-minute cache writes, OpenAI Standard/short-context rates, GLM's published API rates, and DeepSeek's off-peak/peak bounds. It is a revaluation, not a reconstruction of historical billing, context lengths or speed modes. Sources: [Claude](https://claude.com/pricing), [OpenAI](https://developers.openai.com/api/docs/pricing), [GLM](https://docs.z.ai/guides/overview/pricing), [DeepSeek](https://api-docs.deepseek.com/quick_start/pricing).

![Cache reads make up 97.25% of the four-category token subtotal; input, cache creation and output together make up 2.75%.](/img/ai-usage-2026/token-mix.svg)

**The complete totals include all models:**

<div class="table-responsive" markdown="1">

| Category | Total |
|---|---:|
| Uncached input tokens | 69,739,178 |
| Output tokens | 35,054,182 |
| Cache creation tokens | 52,786,474 |
| Cache read tokens | 5,568,385,447 |
| Sum of the four token categories | 5,725,965,281 |
| Difference in ccusage’s total counter | 40,074 |
| **Reported total tokens** | **5,726,005,355** |
| Costs priced by ccusage | $1,344.886242677 |
| DeepSeek actual spend | $17.38 |
| **Report valuation plus DeepSeek spend** | **$1,362.266242677 ≈ $1,362.27** |
{: .table}

</div>

The dollar total mixes estimated API value and actual DeepSeek spend; it is not my bill or a complete current-price recalculation. Gemma's **978,819 tokens** are included with unknown cost. The **40,074-token discrepancy** remains unresolved; the model CSV sums to the four-category subtotal. [Download the full model breakdown](/data/ai-usage-2026-09-05-to-2026-10-11.csv).

## What I actually pay

[ChatGPT Plus including Codex](https://learn.chatgpt.com/docs/pricing) and [Claude Pro](https://claude.com/pricing) each list **$20/month** with monthly billing. [GLM Lite](https://zcode.z.ai/en) shows **$18**, alongside a $12.60/month offer.

My receipts show **€18/month for Claude**, **80.49 PLN for ChatGPT Plus**, and **$18 plus a separate $3 payment to Z.ai**. The latter totals $21 paid, not necessarily a recurring $21 subscription. This 37-day snapshot also spans billing cycles.

For DeepSeek I topped up **$20**, with **$2.62 remaining: $17.38 spent**. It generated **12,268,738 output tokens**, about 35% of all output in the snapshot.

Cache reads account for **97.25% of the four-category subtotal** and **98.52% of DeepSeek's total**. Most of those billions are reused context.

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

These are the official [Claude](https://claude.com/pricing), [OpenAI](https://developers.openai.com/api/docs/pricing), [GLM](https://docs.z.ai/guides/overview/pricing) and [DeepSeek](https://api-docs.deepseek.com/quick_start/pricing) rates; separately charged cache writes are omitted from this price table. DeepSeek's off-peak cache reads are about **67 times cheaper than Opus 5.5's**. That compares a price component, not equivalent task results.

## Opus versus Sonnet, Astra versus Sol

![Opus 5.5 costs twice Sonnet 5.5’s API rates. Astra costs five times Sol 6.1 for most token categories and ten times for cache reads.](/img/ai-usage-2026/model-premiums.svg)

At [current API prices](https://claude.com/pricing), **Opus 5.5 costs exactly twice Sonnet 5.5** for input, output, cache reads and five-minute cache writes. [Astra costs five times Sol 6.1](https://developers.openai.com/api/docs/pricing) for input, output and cache writes, and **ten times for cache reads**, using Standard/short-context pricing. That is a larger premium for the cache-heavy work in my logs.

These price ratios do not establish which subscription gives me better value: ccusage does not show how each model consumes the shared allowance. A higher API price does not guarantee more usable work.

![Daily recorded output for Opus 5.5 versus Sonnet 5.5 in 29 September–9 October, and Astra versus Sol 6.1 in 4–11 October. Each pair has its own scale.](/img/ai-usage-2026/daily-pairs.svg)

During **29 September–9 October**, Opus 5.5 averaged **199,191 output tokens and $15.60 in current-rate value per active day** across nine active days. Sonnet 5.5 averaged **201,633 tokens and $6.53** across ten. Similar output volume at roughly 2.4 times the daily valuation does not establish equal task difficulty or quality.

During **4–11 October**, Astra averaged **25,349 output tokens and $7.21 per active day** across four days; Sol 6.1 averaged **84,947 tokens and $6.14** across six. An active day has a model entry in the logs. These averages measure neither speed, quota consumption nor productivity. [Download the paired-window calculations](/data/ai-usage-paired-windows-2026.csv).

## Trust still has a price

I trust Claude the most. Codex made risky decisions without asking me. That is my experience with these tools, not a controlled safety benchmark.

I initially kept **Opus 5.5 as orchestrator for a long time** while learning to organise the work, running `compact` roughly eight times. **Sonnet 5.5 is now my main orchestrator**, sometimes replaced by Opus 5.5. I entrust the main project tasks to these more expensive models; they delegate to subagents and collect the results.

Most of this project work was around HOCON: [lightbend/config](https://github.com/lightbend/config), [ekrich/sconfig](https://github.com/ekrich/sconfig) and my formatter, [hocon-fmt](https://github.com/kastoestoramadus/hocon-fmt). I mainly worked with the Claude orchestrator, and eventually developed a **skill for choosing models and reasoning effort**.

Accepted fixes, regressions and time spent correcting agents would tell me more about value than token counts. I have not measured those here. Claude's trust advantage is worth a premium to me: cheap tokens save less if I must constantly supervise decisions.

I also have Google AI Plus, but see no larger allowance than free accounts in Antigravity. Its [documentation](https://antigravity.google/docs/plans) distinguishes Pro/Ultra from other users with weekly refreshes, without publishing exact Plus-versus-Free token counts there.

## China does not need to win every task

The two Opus models alone revalue to **$870.03** at current standard API rates, far above my Claude subscription payments. That gap explains the title's question, but cannot answer it: list price is not serving cost. These logs establish neither a subsidy nor a provider loss.

Chinese providers do not need to win every task to put pressure on prices. In my workflow, handling delegated work cheaply is enough to reduce what I will pay for it. That is a competitive effect, not evidence of a Chinese state strategy or DeepSeek's profitability.

Providers charging a premium have to justify it through results, reliability or allowances. Meanwhile, [Anthropic is committing to gigawatts of infrastructure](https://www.anthropic.com/news/google-broadcom-partnership-compute), alongside growing revenue. Useful AI could still disappoint investors if customers' willingness to pay falls faster than costs. For me, Claude's reliability remains worth paying for; delegated work faces much stronger price competition.
