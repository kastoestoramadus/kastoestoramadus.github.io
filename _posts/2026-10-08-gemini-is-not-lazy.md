---
layout: post
section-type: post
title: Getting useful work out of Gemini Flash
category: dev
tags: [ 'ai', 'gemini', 'prompt-engineering' ]
bilingual: true
title-pl: Jak skłonić Gemini Flash do konkretnej pracy
---
<div id="english" class="post-language" lang="en" markdown="1">

**TLDR:** My `/xh` meta skill turns a one-line request into a prompt with sources, working links and batches. I refined my first version and re-ran both original examples, cat toys and "What is God?": the refined skill gives the same batches of three that stop at `NEXT`, and the sources for God all open. It still does not give direct links to shop offers, only to shop home pages. Below it, the competing ready-made skills and prompts: what works without paying Google and what needs a paid plan.

**Updated 12 October 2026:** the post was rewritten around existing work; the copyable definition and trials replace the earlier version.

## My meta skill: /xh

A meta skill that turns a short request into a full prompt with sources, verification rules and batches. Create a skill named `xh` using [Google's guide](https://support.google.com/gemini/answer/17094296?hl=en-GB), select `/xh` from the dropdown and type only the task. Run the generated prompt in a normal turn by typing `run`, without selecting the skill again. Lists longer than three items continue with `NEXT` or `n`.

**Remember to set the model's effort level: Medium or High.** Check the picker in every new chat; I do not use Low. Avoid the Pro model for routine work: Google says higher models and thinking levels [consume more usage](https://support.google.com/gemini/answer/16275805). I have not measured a Pro/Flash multiplier. The skill cannot set effort.

## Latest trials: check the output, not just the prompt

I kept the original two `/xh` requests. On the left is the plain request from the earlier trial (baseline, unchanged); on the right the latest `/xh` run, an excerpt of the answer after `run`. These are individual trials on Gemini 3.6 Flash in the Gemini app, not a controlled benchmark. I did not record the effort of the older runs or of the latest cat-toys run. A working product link and evidence of availability are separate checks. I opened the God links myself; I did not verify that the cat-toy products exist.

<div class="session-comparison" markdown="1">
<section class="session-panel" aria-labelledby="session-plain-en" markdown="1">

### Plain request - cat toys
{: #session-plain-en}

**Input:** `Review recommended cat toys. I want to buy some.`

**Answer excerpt — wands:**

> **Recommended models:** *Purr Propulsion* / *GoCat Da Bird* wands (with feathers that spin in the air, making a sound resembling a bird in flight), or wands with a long, flexible wire and a bunch of feathers/leather strips at the end.

> **What to look for:** Avoid rigid sticks with a short cord; a long, flexible wand lets you imitate prey precisely (hiding behind furniture, moving away from the cat, rather than waving it in front of its nose).

</section>
<section class="session-panel" aria-labelledby="session-skill-en" markdown="1">

### After `/xh` - cat toys
{: #session-skill-en}

**Input:** `/xh Review recommended cat toys. I want to buy some.` (the original Polish wording is in the Polish version), then `run` without invoking the skill again.

**Answer excerpt - the first of three items (translated):**

> **Toy and brand:** Purrs Catch The Fly wand (Purrs Cat Toys)
>
> **Type and category:** interactive wand with interchangeable lures
>
> **Behavioural need:** the full hunting cycle (stalking, chasing, grabbing, killing)
>
> **Price range & availability:** about 45–65 PLN; widely available in specialist pet shops
>
> **Advantages and safety:** made of natural materials (feathers, fur) on a flexible string, it imitates the erratic movement of an insect or a small bird. WARNING: ONLY FOR PLAY TOGETHER WITH THE OWNER. DO NOT LEAVE UNATTENDED BECAUSE OF THE RISK OF SWALLOWING THE STRING OR FEATHERS.
>
> **Where to buy (link):** [Kocimiętka](https://kocimietka.pl/) / [Zooplus](https://www.zooplus.pl/)

After three items (the wand, a KONG Kickeroo, a Nina Ottosson puzzle) it stopped:

```plaintext
Type NEXT or n to see the next 3 suggestions.
```

**Assessment:** the format, the batch of three and the stop work. The links do not: they lead to shop home pages (Kocimiętka, Zooplus, Allegro, Ceneo), not to the offers, so the direct-link check failed. I did not verify that the three products exist. It is the same limitation as in my first version.

</section>
</div>

<div class="session-comparison" markdown="1">
<section class="session-panel" aria-labelledby="session-god-plain-en" markdown="1">

### Plain request - what is God
{: #session-god-plain-en}

**Input:** `what is God?`

**Answer excerpt - the opening (translated):**

> The question of what God is touches the very fabric of human reflection - and depending on the perspective from which we look at it, the answer takes a completely different shape. There is no single coherent definition, because the history of humanity has produced several fundamentally different approaches.

**Answer excerpt - the first perspective (translated):**

> **1. Theistic view (monotheistic religions)** In Christianity, Judaism and Islam God is understood as a personal, transcendent being - the Creator of the universe, who exists beyond time and space, but at the same time enters history and enters into a relationship with people. He is characterised by absolute perfection, omnipotence, omniscience and complete goodness.

**Answer excerpt - the closing lines (translated):**

> What God is, then, depends on whether we are looking for a Person, a personal Meaning, a Law of Nature, an ultimate Cause or a Structure of our own psyche. Which of these perspectives is closest to you, or from what angle would you like to explore this concept further?

</section>
<section class="session-panel" aria-labelledby="session-god-skill-en" markdown="1">

### After `/xh` - what is God
{: #session-god-skill-en}

**Input:** `/xh what is God` (the original Polish wording is in the Polish version), then `run` without invoking the skill again. Gemini 3.6 Flash, Medium.

**Answer excerpt - the first of three approaches in batch one (translated):**

> **1. Classical theism (Aristotelian-Thomist school)**
>
> **Definition of the Deity / Absolute:** God as *Actus Purus* (pure act) and *Ipsum Esse Subsistens* (subsistent being itself). God is not one of many beings in the universe (even the highest), but the pure act of existence itself, the ultimate efficient and final cause of all created being.
>
> **Key distinctions and nuances:** complete transcendence combined with absolute divine simplicity. In God there is no division into essence and existence, matter and form, or potentiality and act. This sets it apart from modern "personalist theism" (where God is sometimes conceived as a powerful subject within temporal and spatial relations) and from pantheism.
>
> **Main representatives and writings:** Aristotle (*Metaphysics*, the Prime Mover), St Thomas Aquinas (*Summa Theologiae*, *Summa contra Gentiles*), Pseudo-Dionysius the Areopagite.
>
> **Academic sources:** [Stanford Encyclopedia of Philosophy: Divine Simplicity](https://plato.stanford.edu/entries/divine-simplicity/), [Stanford Encyclopedia of Philosophy: Saint Thomas Aquinas](https://plato.stanford.edu/entries/aquinas/)

Batch one holds three approaches (classical theism, Spinoza's pantheism, Advaita Vedanta) and stops with a note to type `NEXT` or `n` for the next three.

**Assessment:** it delivers the specified structure for each approach, with named works and sources. All six source links in the batch open (HTTP 200: five from the Stanford Encyclopedia and one from the Internet Encyclopedia of Philosophy). The only point where it hands a decision back to the user is the closing offer to pick a school to go deeper.

</section>
</div>

## Copy the current meta skill
{: #copy-skill-en}

Create a Gemini skill named `xh` with the description and instructions below. It is my first version refined in three ways (described under the block); do not combine it with earlier definitions.

<details markdown="1">
<summary style="cursor: pointer; font-weight: bold; padding: 8px 12px; border: 1px solid #999; border-radius: 4px;">&#9654; Click to expand: the full xh instructions to copy</summary>

```plaintext
Skill name: xh

Description field:
Turns short user intentions into complete session prompts: precise structure, fact verification in a search engine, explicit reporting of missing data and work in batches.

Instructions:
## Structure of the generated prompt

When the user asks for a prompt for a new session, generate a ready block of text containing:

1. **Role and verification rigour:** impose the role of an expert-analyst. No generalisations, no invention, no guessing. Every item must be verified before it is written down. Names and assumptions supplied by the user (including working or hypothetical ones) are accepted as the convention of the task: keep them separate from facts and do not report an error because an official source has no entry for them.
2. **Search and fact-check protocol:** call Google Search for every item to check current dates, times, ticket availability and official sources. Direct, working links in Markdown format `[Name](URL)` are mandatory.
3. **Batches of 3 and a stop clause:**
   - The model produces **exactly 3 items** per post and stops immediately, waiting for the word `NEXT` or `n`.
   - **No fabricated items:** when confirmed data runs out, the model does not pad the batch with invented entries. It lists only as many items as it actually found (for example 2, or 0), prints:
     `[NO FURTHER CONFIRMED ITEMS - VERIFIED SOURCES EXHAUSTED]`
     and ends the loop.
4. **A rigid data matrix:** a template of fields that forces full detail (date, time, location/getting there, tickets, direct link).
5. **Autonomy and user action:** full independence in searching, without asking for permission. CAPITALS reserved exclusively for critical human action (for example, buying the last tickets immediately).
```

</details>

## What I changed in the first version
{: #changes-en}

I kept the first definition as the base and made three changes, following a Gemini self-review of that prompt:

- **User hypotheses.** Names and assumptions the user supplies, even working or hypothetical ones, are treated as the convention of the task and kept apart from facts, instead of causing an error because an official source has no entry.
- **Plain wording.** The description and the stop clause lost the emotional phrasing ("uncompromising", "ABSOLUTE BAN", "zero hallucinations", "100% confirmed"); the instructions say what to do and what to report.
- **Not adopted: one search round per batch.** The review also suggested searching once per batch instead of once per item. I left it out: a variant that combined all three changes had two God links returning 404 (2 of 6) and was refused in other runs, but I did not isolate this change, so I cannot say it was the cause.

The refined version matches the first one on both examples (same batches of three, same stop, working God sources, shop home pages only), so I describe it as at least as good, not better. Runs in desktop Chrome earlier the same day were refused with every definition, the original included, so I discarded them; the results above come from the Gemini app.

## Competing options
{: #repos-en}

The free plan has "standard" limits and a 32k-token context; paid plans [multiply the limit and the context](https://support.google.com/gemini/answer/16275805). I read the files below and ran none of them in Gemini, so "free" means the content needs only a chat. Gems are not available on a free account, and Google says they [go away on personal accounts in November 2026 and transition to skills](https://support.google.com/gemini/answer/15146780).

<div class="table-responsive" markdown="1">

| Repository | Free plan | Paid / needs more |
|---|---|---|
| [AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs/blob/773a52944ba4747a18bd4ae9ade53fff041adcbc/README.md) | Three single-file text skills: [brainstorming-research-ideas](https://github.com/Orchestra-Research/AI-Research-SKILLs/blob/773a52944ba4747a18bd4ae9ade53fff041adcbc/21-research-ideation/brainstorming-research-ideas/SKILL.md), [creative-thinking-for-research](https://github.com/Orchestra-Research/AI-Research-SKILLs/blob/773a52944ba4747a18bd4ae9ade53fff041adcbc/21-research-ideation/creative-thinking-for-research/SKILL.md), [presenting-conference-talks](https://github.com/Orchestra-Research/AI-Research-SKILLs/blob/773a52944ba4747a18bd4ae9ade53fff041adcbc/20-ml-paper-writing/presenting-conference-talks/SKILL.md). The first two are 19-22 KB, a large share of 32k. | Most of the 98 skills: GPU training, MLOps, agents. `ml-paper-writing` has 51 files. |
| [gemini-agent-skills](https://github.com/saeed-vayghan/gemini-agent-skills/tree/34ca3ca1db04b092c5f86eba155c23e105fc933b) | Five roles adaptable to chat (below). | Packages target Gemini CLI; its converter uses an API key, not the chat allowance. |
| [awesome-gemini-visual-gems](https://github.com/AIwork4me/awesome-gemini-visual-gems/tree/dde992eea191863233210b55b345295db9bd9752/prompts) | None: these are Gem instructions. | **Paid (Gems).** 20 instructions (1-3 KB each) that turn text into infographics, using image generation. `17_Paper_Diagrams` lists temperature and IMAGE-modality settings that I did not check in the Gem editor. |
{: .table}

</div>

I wrote `/xh` before checking what already exists. I should have looked first; it is one option among the competing ones here.

## Chat-ready roles from gemini-agent-skills

I like [saeed-vayghan's](https://github.com/saeed-vayghan/gemini-agent-skills) approach: pick a few relevant roles instead of installing everything. These five are adaptation candidates, not packages proved to work unchanged in Gemini Apps. Replace context-manager and cross-agent calls with supplied input, and drop example statistics instead of reporting them as measured. I left out terminal deployment, infrastructure and multi-agent orchestration.

<div class="table-responsive" markdown="1">

| Skill | Chat scope | Adaptation requirement |
|---|---|---|
| [prompt-engineer](https://github.com/saeed-vayghan/gemini-agent-skills/blob/34ca3ca1db04b092c5f86eba155c23e105fc933b/.gemini/skills/prompt-engineer/SKILL.md) | Improve a supplied prompt; design evaluation cases. | Report accuracy, latency and savings only when measured. |
| [technical-writer](https://github.com/saeed-vayghan/gemini-agent-skills/blob/34ca3ca1db04b092c5f86eba155c23e105fc933b/.gemini/skills/technical-writer/SKILL.md) | Turn supplied code and notes into documentation. | Mark code examples as untested unless actually run. |
| [business-analyst](https://github.com/saeed-vayghan/gemini-agent-skills/blob/34ca3ca1db04b092c5f86eba155c23e105fc933b/.gemini/skills/business-analyst/SKILL.md) | Extract requirements and acceptance criteria from a brief. | Do not invent stakeholder approval or ROI data. |
| [code-reviewer](https://github.com/saeed-vayghan/gemini-agent-skills/blob/34ca3ca1db04b092c5f86eba155c23e105fc933b/.gemini/skills/code-reviewer/SKILL.md) | Review pasted code and explain potential defects. | No claims of test coverage, scans or runtime performance without tools. |
| [research-analyst](https://github.com/saeed-vayghan/gemini-agent-skills/blob/34ca3ca1db04b092c5f86eba155c23e105fc933b/.gemini/skills/research-analyst/SKILL.md) | Compare supplied sources; web research needs working search. | Link evidence; distinguish findings from hypotheses. |
{: .table}

</div>

## Other prompt optimisers

- [Sentry's prompt-optimizer](https://github.com/getsentry/skills/blob/main/skills/prompt-optimizer/SKILL.md): success criteria and comparisons of prompt variants.
- [GitHub Awesome Copilot's prompt-optimizer](https://github.com/github/awesome-copilot/blob/main/skills/prompt-optimizer/SKILL.md): self-contained prompts intended for chat.
- [JoelLewis's prompt-optimizer](https://github.com/JoelLewis/skill-library/blob/main/plugins/meta/skills/prompt-optimizer/SKILL.md): a structured intent-to-prompt workflow. I would not copy every mandatory technique.

</div>

<div id="polski" class="post-language" lang="pl" markdown="1">

**TLDR:** Mój meta skill `/xh` zamienia jednozdaniowe polecenie w prompt ze źródłami, działającymi linkami i partiami. Poprawiłem pierwszą wersję i powtórzyłem oba pierwotne przykłady, zabawki dla kota i „Czym jest bóg?”: poprawiona wersja daje te same partie po trzy, które kończą się na `NEXT`, a źródła do Boga wszystkie się otwierają. Nadal nie daje bezpośrednich linków do ofert w sklepach, tylko do stron głównych sklepów. Niżej konkurencyjne gotowe skille i prompty: co działa bez płacenia Google, a co wymaga płatnego planu.

**Aktualizacja 12 października 2026:** wpis przepisałem wokół istniejących rozwiązań; definicja do skopiowania i próby zastępują poprzednią wersję.

## Mój meta skill: /xh

Meta skill zamieniający krótkie polecenie w pełny prompt ze źródłami, regułami weryfikacji i partiami. Utwórz skill `xh` według [instrukcji Google](https://support.google.com/gemini/answer/17094296?hl=pl), wybierz `/xh` z listy i wpisz samo zadanie. Wygenerowany prompt wykonaj w zwykłej turze, wpisując `uruchom`, bez ponownego wybierania skilla. Listy dłuższe niż trzy pozycje idą dalej po `NEXT` lub `n`.

**Pamiętaj ustawić poziom wysiłku modelu! Średni lub wysoki.** Sprawdzaj wybór przy każdym nowym czacie; nie używam Low. Unikaj modelu Pro w rutynowych zadaniach: Google podaje, że wyższe modele i poziomy myślenia [zużywają więcej limitu](https://support.google.com/gemini/answer/16275805). Mnożnika Pro/Flash nie zmierzyłem. Skill nie ustawia effort.

## Najnowsze próby: sprawdzaj wynik, nie tylko prompt

Zachowałem dwa pierwotne wejścia do `/xh`. Po lewej zwykła prośba z wcześniejszej próby (punkt odniesienia, bez zmian), po prawej najnowszy przebieg `/xh`, czyli fragment odpowiedzi po `uruchom`. To pojedyncze próby na Gemini 3.6 Flash w aplikacji Gemini, nie kontrolowany benchmark. Poziomu wysiłku wcześniejszych przebiegów ani najnowszego przebiegu z kotami nie zapisałem. Działający link produktu i potwierdzenie dostępności to osobne kontrole. Linki do Boga otworzyłem sam; nie sprawdzałem, czy produkty dla kotów istnieją.

<div class="session-comparison" markdown="1">
<section class="session-panel" aria-labelledby="session-plain-pl" markdown="1">

### Zwykła prośba — zakupy dla kota
{: #session-plain-pl}

**Polecenie:** `Przejrzyj co się poleca kotom do zabawy. chcę kupić`

**Fragment odpowiedzi — wędki:**

> **Polecane modele:** Wędki typu *Purr Propulsion* / *GoCat Da Bird* (z piórami, które kręcą się w powietrzu, wydając dźwięk przypominający lot ptaka) lub wędki z długim, elastycznym drutem i pękiem piór/skórzanych rzemieni na końcu.

> **Na co zwrócić uwagę:** Unikaj sztywnych patyków na krótkiej sznurówce; długa, giętka wędka pozwala na precyzyjne imitowanie ruchu ofiary (krycie się za meblami, odjeżdżanie od kota, a nie machanie mu przed nosem).

</section>
<section class="session-panel" aria-labelledby="session-skill-pl" markdown="1">

### Po `/xh` — zakupy dla kota
{: #session-skill-pl}

**Polecenie:** `/xh Przejrzyj co się poleca kotom do zabawy. chcę kupić`, potem `uruchom` bez ponownego wywoływania skilla.

**Fragment odpowiedzi — pierwsza z trzech pozycji:**

> **Nazwa zabawki i marka:** Wędka Purrs Catch The Fly (Purrs Cat Toys)
>
> **Typ i kategoria:** Wędka interaktywna z wymiennymi przynętami
>
> **Potrzeba behawioralna:** Realizacja pełnego cyklu łowieckiego (namierzanie, pościg, chwytanie, patroszenie)
>
> **Przedział cenowy & Dostępność:** ok. 45–65 PLN; szeroka dostępność w specjalistycznych sklepach zoologicznych
>
> **Zalety i Bezpieczeństwo:** Wykonana z naturalnych materiałów (pióra, sierść) na elastycznym sznurku, imituje nieregularny ruch owada lub małego ptaka. OSTRZEŻENIE: PRZEZNACZONA WYŁĄCZNIE DO WSPÓLNEJ ZABAWY Z OPIEKUNEM. NIE ZOSTAWIAĆ BEZ NADZORU ZE WZGLĘDU NA RYZYKO POŁKNIĘCIA SZNURKA LUB PIÓR.
>
> **Gdzie kupić (Link):** [Kocimiętka](https://kocimietka.pl/) / [Zooplus](https://www.zooplus.pl/)

Po trzech pozycjach (wędka, KONG Kickeroo, łamigłówka Nina Ottosson) odpowiedź się zatrzymała:

```plaintext
Wpisz `NEXT` lub `n`, aby wyświetlić kolejne 3 propozycje.
```

**Ocena:** format, partia po trzy i zatrzymanie działają. Linki nie: prowadzą na strony główne sklepów (Kocimiętka, Zooplus, Allegro, Ceneo), nie do ofert, więc kontrola bezpośredniego linku znów się nie powiodła. Nie sprawdzałem, czy te trzy produkty istnieją. To to samo ograniczenie co w mojej pierwszej wersji.

</section>
</div>

<div class="session-comparison" markdown="1">
<section class="session-panel" aria-labelledby="session-god-plain-pl" markdown="1">

### Zwykła prośba — czym jest bóg
{: #session-god-plain-pl}

**Polecenie:** `czym jest bóg?`

**Fragment odpowiedzi — otwarcie:**

> Pytanie o to, czym jest Bóg, dotyka samego zrębu ludzkiej refleksji — i w zależności od perspektywy, z której na nie spojrzymy, odpowiedź przyjmuje zupełnie inny kształt. Nie ma jednej spójnej definicji, ponieważ historia ludzkości wypracowała kilka zasadniczo odmiennych ujęć.

**Fragment odpowiedzi — pierwsze ujęcie:**

> **1. Ujęcie teistyczne (religie monoteistyczne)** — w chrześcijaństwie, judaizmie i islamie Bóg jest rozumiany jako osobowy, transcendentny byt — Stwórca wszechświata, który istnieje poza czasem i przestrzenią, ale jednocześnie wkracza w historię i wchodzi w relację z ludźmi. Cechują go absolutna doskonałość, omnipotencja (wszechmoc), omniscience (wszechwiedza) oraz całkowita dobroć.

**Fragment odpowiedzi — zamknięcie:**

> To, czym jest Bóg, zależy więc od tego, czy szukamy Osoby, Osobowego Sensu, Prawa Natury, Ostatecznej Przyczyny czy Struktury naszej własnej psychiki. Która z tych perspektyw jest Ci najbliższa lub pod jakim kątem chcesz to pojęcie pogłębić?

</section>
<section class="session-panel" aria-labelledby="session-god-skill-pl" markdown="1">

### Po `/xh` — czym jest bóg
{: #session-god-skill-pl}

**Polecenie:** `/xh czym jest bóg`, potem `uruchom` bez ponownego wywoływania skilla. Gemini 3.6 Flash, Medium.

**Fragment odpowiedzi — pierwsze z trzech ujęć w partii pierwszej:**

> **1. Teizm Klasyczny (Nurt Arystotelesowsko-Tomistyczny)**
>
> **Definicja Bóstwa / Absolutu:** Bóg jako Actus Purus (Czysty Akt) oraz Ipsum Esse Subsistens (Samoistne Istnienie). Bóg nie jest jednym z wielu bytów we wszechświecie (nawet najwyższym), lecz samym czystym aktem istnienia, stanowiącym ostateczną przyczynę sprawczą i celową wszelkiego bytu stworzonego.
>
> **Kluczowe Dystynkcje i Niuanse:** Całkowita transcendencja połączona z absolutną prostotą bożą (divine simplicity). W Bogu nie występuje żaden podział na istotę (essentia) i istnienie (existentia), materię i formę czy potencjalność i akt. Odróżnia się to od nowożytnego „teizmu personalistycznego” (gdzie Bóg bywa pojmowany jako potężny podmiot wewnątrz relacji czasowo-przestrzennych) oraz od panteizmu.
>
> **Główni Przedstawiciele i Pisma:** Arystoteles (Metafizyka – pojęcie Pierwszego Poruszyciela), św. Tomasz z Akwinu (Summa Theologiae, Summa contra Gentiles), Pseudo-Dionizy Areopagita.
>
> **Źródła Akademickie:** [Stanford Encyclopedia of Philosophy: Divine Simplicity](https://plato.stanford.edu/entries/divine-simplicity/), [Stanford Encyclopedia of Philosophy: Saint Thomas Aquinas](https://plato.stanford.edu/entries/aquinas/)

Partia pierwsza ma trzy ujęcia (teizm klasyczny, panteizm Spinozy, Advaita Vedānta) i kończy się prośbą o wpisanie `NEXT` lub `n` po kolejne trzy.

**Ocena:** dla każdego ujęcia jest wymagana struktura, z nazwanymi dziełami i źródłami. Wszystkie sześć linków do źródeł w partii się otwiera (HTTP 200: pięć z Stanford Encyclopedia i jeden z Internet Encyclopedia of Philosophy). Jedyne miejsce, gdzie odpowiedź oddaje decyzję użytkownikowi, to prośba o wybór nurtu do pogłębienia.

</section>
</div>

## Aktualny meta skill do skopiowania
{: #copy-skill-pl}

Utwórz w Gemini skill `xh` z poniższym opisem i instrukcjami. To moja pierwsza wersja poprawiona na trzy sposoby (opis pod blokiem); nie łącz jej z wcześniejszymi definicjami.

<details markdown="1">
<summary style="cursor: pointer; font-weight: bold; padding: 8px 12px; border: 1px solid #999; border-radius: 4px;">&#9654; Kliknij, aby rozwinąć: pełne instrukcje xh do skopiowania</summary>

```plaintext
Nazwa skilla: xh

Pole Opis: Przekształca krótkie intencje użytkownika w kompletne prompty sesyjne: precyzyjna struktura, weryfikacja faktów w wyszukiwarce, jawne komunikowanie braku danych i praca w partiach.

Instrukcje:
## Konstrukcja Generowanego Prompta

Gdy użytkownik prosi o przygotowanie prompta do nowej sesji, wygeneruj gotowy blok tekstu, który zawiera:

1. **Rola i Rygor Weryfikacji:** Narzucenie roli ekspert-analityka. Zakaz uogólnień, zmyślania i opierania się na domysłach. Każda pozycja musi zostać zweryfikowana przed wypisaniem. Nazwy i założenia podane przez użytkownika (także robocze lub hipotetyczne) przyjmij jako konwencję zadania: oddziel je od faktów i nie zgłaszaj błędu z powodu braku wpisu w oficjalnych źródłach.
2. **Protokół Wyszukiwania (Search & Fact-Check Protocol):** Nakaz wywoływania narzędzia Google Search dla każdego punktu w celu sprawdzenia aktualnych dat, godzin, dostępności biletów i oficjalnych źródeł. Wymóg podawania bezpośrednich, działających linków w formacie Markdown `[Nazwa](URL)`.
3. **Praca w Partiach po 3 i Klauzula Stopu:**
   - Model generuje **dokładnie 3 pozycje** na wpis i natychmiast zatrzymuje się, czekając na słowo `NEXT` lub `n`.
   - **Zakaz fabrykowania pozycji:** Gdy brakuje potwierdzonych danych, model nie dopycha partii zmyślonymi wpisami. Wyświetla tylko tyle pozycji, ile faktycznie znalazł (np. 2 lub 0), wypisuje komunikat:
     `[BRAK KOLEJNYCH POTWIERDZONYCH POZYCJI - Wyczerpano zweryfikowane źródła]`
     i kończy pętlę.
4. **Sztywna Matryca Danych:** Szablon pól wymuszający podanie pełnych szczegółów (m.in. data, godzina, lokalizacja/dojazd, bilety, bezpośredni link).
5. **Autonomia i Akcja Użytkownika:** Pełna samodzielność w szukaniu bez pytania o zgodę. Użycie DUŻYCH LITER zarezerwowane wyłącznie dla krytycznych akcji po stronie człowieka (np. natychmiastowy zakup ostatnich biletów).
```

</details>

## Co zmieniłem w pierwszej wersji
{: #changes-pl}

Pierwszą definicję zostawiłem jako bazę i wprowadziłem trzy zmiany, idąc za autorecenzją Gemini tego promptu:

- **Hipotezy użytkownika.** Nazwy i założenia podane przez użytkownika, także robocze lub hipotetyczne, są traktowane jako konwencja zadania i oddzielane od faktów, zamiast powodować błąd z powodu braku wpisu w oficjalnym źródle.
- **Neutralne słownictwo.** Opis i klauzula stopu straciły emocjonalne sformułowania („bezkompromisowe”, „BEZWZGLĘDNY ZAKAZ”, „Zero Halucynacji”, „w 100% potwierdzonych”); instrukcje mówią, co zrobić i co zgłosić.
- **Nie przyjęte: jedna runda wyszukiwania na partię.** Recenzja sugerowała też wyszukiwanie raz na partię zamiast raz na pozycję. Pominąłem to: wariant łączący wszystkie trzy zmiany miał dwa linki do Boga zwracające 404 (2 z 6) i w innych próbach spotkał się z odmową, ale nie wydzieliłem tej zmiany, więc nie twierdzę, że była przyczyną.

Poprawiona wersja dorównuje pierwszej na obu przykładach (te same partie po trzy, ten sam stop, działające źródła do Boga, w sklepach tylko strony główne), więc nazywam ją co najmniej tak dobrą, nie lepszą. Próby w Chrome na komputerze tego samego dnia kończyły się odmową przy każdej definicji, także oryginalnej, więc je odrzuciłem; wyniki powyżej pochodzą z aplikacji Gemini.

## Konkurencyjne opcje
{: #repos-pl}

Plan darmowy ma „standardowe" limity i kontekst 32 tys. tokenów; płatne [mnożą limit i kontekst](https://support.google.com/gemini/answer/16275805). Pliki poniżej przeczytałem, ale żadnego nie uruchomiłem w Gemini, więc „darmowe" znaczy, że treść wymaga tylko czatu. Gemy nie są dostępne na darmowym koncie, a Google podaje, że [znikną z kont osobistych w listopadzie 2026 i przejdą w skille](https://support.google.com/gemini/answer/15146780).

<div class="table-responsive" markdown="1">

| Repozytorium | Plan darmowy | Płatne / wymaga więcej |
|---|---|---|
| [AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs/blob/773a52944ba4747a18bd4ae9ade53fff041adcbc/README.md) | Trzy jednoplikowe skille tekstowe: [brainstorming-research-ideas](https://github.com/Orchestra-Research/AI-Research-SKILLs/blob/773a52944ba4747a18bd4ae9ade53fff041adcbc/21-research-ideation/brainstorming-research-ideas/SKILL.md), [creative-thinking-for-research](https://github.com/Orchestra-Research/AI-Research-SKILLs/blob/773a52944ba4747a18bd4ae9ade53fff041adcbc/21-research-ideation/creative-thinking-for-research/SKILL.md), [presenting-conference-talks](https://github.com/Orchestra-Research/AI-Research-SKILLs/blob/773a52944ba4747a18bd4ae9ade53fff041adcbc/20-ml-paper-writing/presenting-conference-talks/SKILL.md). Pierwsze dwa mają 19-22 KB, czyli sporą część z 32 tys. | Większość z 98 skilli: trening na GPU, MLOps, agenci. `ml-paper-writing` ma 51 plików. |
| [gemini-agent-skills](https://github.com/saeed-vayghan/gemini-agent-skills/tree/34ca3ca1db04b092c5f86eba155c23e105fc933b) | Pięć ról do adaptacji na czat (niżej). | Paczki są dla Gemini CLI; konwerter używa klucza API, nie puli czatu. |
| [awesome-gemini-visual-gems](https://github.com/AIwork4me/awesome-gemini-visual-gems/tree/dde992eea191863233210b55b345295db9bd9752/prompts) | Brak: to instrukcje do Gemów. | **Płatne (Gemy).** 20 instrukcji (1-3 KB każda) zamieniających tekst w infografiki, z generowaniem obrazów. `17_Paper_Diagrams` podaje ustawienia temperatury i modalności IMAGE, których nie sprawdzałem w edytorze Gemów. |
{: .table}

</div>

Napisałem `/xh`, zanim sprawdziłem, co już istnieje. Powinienem był najpierw się rozejrzeć; teraz to jedna z opcji obok konkurencyjnych.

## Role do czatu z gemini-agent-skills

Podoba mi się podejście [saeed-vayghan](https://github.com/saeed-vayghan/gemini-agent-skills): wybrać kilka potrzebnych ról zamiast instalować wszystko. Te pięć to kandydaci do adaptacji, nie paczki sprawdzone jako działające bez zmian w Gemini Apps. Wywołania context managera i innych agentów zastąp podanym materiałem, a przykładowe statystyki usuń zamiast podawać je jako zmierzone. Pominąłem wdrożenia przez terminal, infrastrukturę i orkiestrację agentów.

<div class="table-responsive" markdown="1">

| Skill | Zakres w czacie | Warunek adaptacji |
|---|---|---|
| [prompt-engineer](https://github.com/saeed-vayghan/gemini-agent-skills/blob/34ca3ca1db04b092c5f86eba155c23e105fc933b/.gemini/skills/prompt-engineer/SKILL.md) | Poprawa promptu i projektowanie przypadków oceny. | Trafność, czas i oszczędności podawaj tylko po pomiarze. |
| [technical-writer](https://github.com/saeed-vayghan/gemini-agent-skills/blob/34ca3ca1db04b092c5f86eba155c23e105fc933b/.gemini/skills/technical-writer/SKILL.md) | Zamiana podanego kodu i notatek w dokumentację. | Oznacz przykłady jako nieprzetestowane, jeśli ich nie uruchomiono. |
| [business-analyst](https://github.com/saeed-vayghan/gemini-agent-skills/blob/34ca3ca1db04b092c5f86eba155c23e105fc933b/.gemini/skills/business-analyst/SKILL.md) | Wyciąganie wymagań i kryteriów akceptacji z opisu. | Nie wymyślaj akceptacji interesariuszy ani danych do ROI. |
| [code-reviewer](https://github.com/saeed-vayghan/gemini-agent-skills/blob/34ca3ca1db04b092c5f86eba155c23e105fc933b/.gemini/skills/code-reviewer/SKILL.md) | Przegląd wklejonego kodu i wyjaśnianie możliwych błędów. | Bez narzędzi nie potwierdzaj pokrycia testami, skanów ani wydajności. |
| [research-analyst](https://github.com/saeed-vayghan/gemini-agent-skills/blob/34ca3ca1db04b092c5f86eba155c23e105fc933b/.gemini/skills/research-analyst/SKILL.md) | Porównanie podanych źródeł; research WWW wymaga działającego wyszukiwania. | Linkuj dowody; oddziel ustalenia od hipotez. |
{: .table}

</div>

## Inne optymalizatory promptów

- [prompt-optimizer Sentry](https://github.com/getsentry/skills/blob/main/skills/prompt-optimizer/SKILL.md): kryteria sukcesu i porównywanie wariantów promptu.
- [prompt-optimizer GitHub Awesome Copilot](https://github.com/github/awesome-copilot/blob/main/skills/prompt-optimizer/SKILL.md): samodzielne prompty przeznaczone do czatu.
- [prompt-optimizer JoelLewis](https://github.com/JoelLewis/skill-library/blob/main/plugins/meta/skills/prompt-optimizer/SKILL.md): uporządkowane przejście od intencji do promptu. Nie kopiowałbym każdej obowiązkowej techniki.

</div>
