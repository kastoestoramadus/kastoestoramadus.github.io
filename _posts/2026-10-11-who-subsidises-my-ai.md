---
layout: post
section-type: post
title: Who subsidises my AI? 5.73 billion tokens later
category: dev
tags: [ 'ai', 'productivity' ]
---

**TLDR:** My local logs recorded **5.73 billion tokens** from **5 September to 11 October 2026**. Western subscriptions give me access far below the API list-price equivalent, while cheap Chinese API access puts further pressure on what I am willing to pay. Claude earned the most trust: Sonnet 5.5 eventually became my main orchestrator, with Opus 5.5 sometimes taking that role and the other models working for them under Claude.

I extracted the usage with:

```bash
npx ccusage -s 2026-09-05
```

For aggregation by model:

```bash
npx ccusage -s 2026-09-05 --json --breakdown
```

The analysis environment lacked `npx`, so we ran the npm package's binary directly with these arguments. The snapshot covers 37 calendar days, 35 with recorded usage; 11 October is partial. It combines detected local Claude, Codex, OpenCode, Antigravity and Zcode logs.

I have had Claude almost two weeks longer than the others. Totals therefore compare different periods and roles, not equal workloads.

**The nine largest amounts below represent roughly 40% of the 22 models**, after combining GLM names differing only in case. Dates are first and last recorded use within the snapshot, not subscription dates.

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

The scenario uses prices checked on 11 October: Claude's five-minute cache writes, OpenAI Standard/short-context rates, GLM's published API rates, and DeepSeek's off-peak/peak bounds. It is a revaluation, not a reconstruction of historical billing, context lengths or speed modes. Sources: [Claude](https://claude.com/pricing), [OpenAI](https://developers.openai.com/api/docs/pricing), [GLM](https://docs.z.ai/guides/overview/pricing), [DeepSeek](https://api-docs.deepseek.com/quick_start/pricing).

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

That dollar total mixes estimated API value and actual DeepSeek spend; it is neither my bill nor a complete current-price recalculation. Gemma's 978,819 tokens are included but its cost is unknown. The report’s total exceeds its category sum by 40,074 tokens; the model CSV sums to the category subtotal. [Download the full model breakdown](/data/ai-usage-2026-09-05-to-2026-10-11.csv).

## What I actually pay

[ChatGPT Plus including Codex](https://learn.chatgpt.com/docs/pricing) and [Claude Pro](https://claude.com/pricing) each list **$20/month** with monthly billing. [GLM Lite](https://zcode.z.ai/en) shows **$18**, alongside a $12.60/month offer.

My receipts show **€18/month for Claude**, **80.49 PLN for ChatGPT Plus**, and **$18 plus a separate $3 payment to Z.ai**. The latter totals $21 paid, not necessarily a recurring $21 subscription. This 37-day snapshot also spans billing cycles.

For DeepSeek I topped up **$20**, with **$2.62 remaining: $17.38 spent**. It generated **12,268,738 output tokens**, about 35% of all output in the snapshot.

Cache reads account for **97.25% of all tokens** and **98.52% of DeepSeek's total**. Agents repeatedly reuse context; billions of tokens do not mean billions of newly generated tokens.

Exact API prices per million tokens:

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

These are the official [Claude](https://claude.com/pricing), [OpenAI](https://developers.openai.com/api/docs/pricing), [GLM](https://docs.z.ai/guides/overview/pricing) and [DeepSeek](https://api-docs.deepseek.com/quick_start/pricing) rates; separately charged cache writes are omitted from this price table. DeepSeek's off-peak cache reads are about **67 times cheaper than Opus 5.5's**. That compares a price component, not equivalent task results.

## Trust still has a price

Claude proved the most trustworthy. Codex made risky decisions without asking me. These are my experiences, not a controlled safety benchmark.

Opus orchestrated for a long time — too long, in hindsight. I ran `compact` roughly eight times. Eventually Sonnet 5.5 became the main orchestrator, sometimes Opus 5.5; the others executed delegated work under Claude. The usage report does not identify every historical call's role.

Cheap tokens matter less if I must constantly supervise decisions. Claude's trust advantage can justify a premium, while cheaper workers take delegated work.

I also have Google AI Plus, but see no larger allowance than free accounts in Antigravity. Its [documentation](https://antigravity.google/docs/plans) distinguishes Pro/Ultra from other users with weekly refreshes, without publishing exact Plus-versus-Free token counts there.

## China does not need to win every task

Western subscriptions look **subsidised relative to API list prices**: the two Opus models alone revalue to **$870.03** at current standard rates. That does not establish a provider loss; list price is not serving cost, and lighter users, business customers or investors may finance the difference.

If Chinese providers want to puncture the AI bubble, price pressure is a useful way to do it. They need to handle enough delegated work cheaply, even while Claude remains my trusted orchestrator. I cannot infer a Chinese state strategy or DeepSeek's profitability from my bill.

Western providers must defend their premium, improve efficiency, lower prices or offer more usage. If efficiency gains lag price cuts, they accept thinner margins or keep funding the gap. Meanwhile, [Anthropic is committing to gigawatts of infrastructure](https://www.anthropic.com/news/google-broadcom-partnership-compute), alongside growing revenue.

Useful AI can still undermine inflated valuations if customers' willingness to pay falls faster than costs. My trusted orchestrator is western. The cheap workers make its price harder to defend.
