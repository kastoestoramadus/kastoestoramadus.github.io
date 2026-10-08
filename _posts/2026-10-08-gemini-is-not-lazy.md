---
layout: post
section-type: post
title: Getting more out of Gemini for less
category: dev
tags: [ 'ai', 'gemini', 'prompt-engineering' ]
bilingual: true
title-pl: Jak wycisnąć więcej z taniego Gemini
---
<div id="english" class="post-language" lang="en" markdown="1">

**TLDR:** A cheap Gemini plan becomes more useful when I specify the work, split it into batches and check the sources. My shortcut: generate the prompt in a skill, run it in the normal session, then type `n` for each next batch.

I bought a year of Google AI Plus for PLN 239.99 — about USD 61 a year, or USD 5 a month, at the [8 October 2026 exchange rate](https://api.nbp.pl/api/exchangerates/rates/a/usd/2026-10-08/?format=json). Gemini still gives me a short answer and an offer to continue. I want the comparison, not an invitation to ask for it again.

[Google's Gemini 3 guide](https://ai.google.dev/gemini-api/docs/gemini-3#prompting-best-practices) describes a preference for concise answers and recommends clear instructions. More thinking does not tell the model which fields my report needs or when the job is done.

## Let it write the brief

My request to the meta-prompt skill, translated from Polish, was: `/xh Review recommended cat toys. I want to buy some.` `/xh` is my shortcut, not a built-in Gemini command. It drafted a prompt with seven fields per item, a three-batch plan and a stop after three products.

The original Polish request and response excerpt are in the [Polish version](#polski); the examples here are translations.

In my tests, Gmail was unavailable while using the skill. [Google documents Workspace support for skills](https://support.google.com/gemini/answer/18560919?hl=en-GB), so I cannot call this a general MCP restriction. I keep generation separate from execution: the skill writes the prompt; I run it in the normal session with the required connections.

One documented restriction matters for workflows that need internet requests: [scripts bundled with skills cannot make them](https://support.google.com/gemini/answer/17094296?hl=en). That does not prohibit Gemini itself from using supported Connected Apps.

I typed `go`; Gemini covered the first three and ended with this message (translated):

```plaintext
Waiting for your signal: type "n" or "NEXT" to move to the next batch, or give feedback.
```

The useful part of the “armoured prompt” is its structure. Below is my shorter, reusable version, with a progress ledger added:

```plaintext
Compare <items> for <use case>.
First propose shared criteria and a numbered plan. Wait for approval.

Use current primary sources for specifications, prices and availability.
Open cited pages. Use clickable Markdown links: [product/model or source](URL).
Link the source supporting each material claim; do not put results in a code block.
Separate facts from judgement. Mark missing evidence UNVERIFIED.
If search or page access is unavailable, say so. Do not invent data.

For each item: name/model, finding, source link, trade-off, missing information.
Keep the same criteria and required fields for every item.

Work through at most three plan items per batch, then stop.
Start each batch with DONE / NEXT / UNVERIFIED and the remaining plan.
n = next batch; d = expand the last item; s = skip it; x = stop.
Ask a specific question if a decision blocks progress.
Finish with a comparison and a recommendation for the stated use case.
```

Three is convenient, not magic. I want an answer small enough to inspect before typing `n`. The ledger makes omissions visible.

Once the work is complete, I ask for an editing pass: remove repetition, filler and contradictions; preserve useful facts and links. I start the next deliverable in a fresh chat.

This costs more turns and reading. The prompt cannot grant tool access or guarantee citations: I still open the links that carry the recommendation.

</div>

<div id="polski" class="post-language" lang="pl" markdown="1">

**TLDR:** Tani plan Gemini daje mi więcej pożytku, gdy określam zadanie, dzielę pracę na partie i sprawdzam źródła. Mój skrót: generuję prompt w skillu, uruchamiam go w zwykłej sesji, a potem wpisuję `n` po każdą następną partię.

Kupiłem rok Google AI Plus za 239,99 PLN, czyli mniej więcej 20 PLN miesięcznie. Gemini nadal daje mi krótką odpowiedź z propozycją kontynuacji. Chcę porównania, a nie zaproszenia do ponownego poproszenia o nie.

[Przewodnik Google po Gemini 3](https://ai.google.dev/gemini-api/docs/gemini-3#prompting-best-practices) opisuje skłonność do zwięzłych odpowiedzi i zaleca jasne instrukcje. Więcej myślenia nie mówi modelowi, jakich pól potrzebuję w raporcie ani kiedy robota jest skończona.

## Niech sam napisze instrukcję

Do skilla układającego meta-prompty wpisałem: `/xh Przejrzyj co się poleca kotom do zabawy. chcę kupić`. `/xh` jest moim skrótem, nie wbudowaną komendą Gemini. Skill ułożył prompt z siedmioma polami na pozycję, planem trzech partii i zatrzymaniem po trzech produktach.

W moich testach Gmail był niedostępny podczas używania skilla. [Google dokumentuje obsługę Workspace przez skille](https://support.google.com/gemini/answer/18560919?hl=en-GB), więc nie mogę nazwać tego ogólnym ograniczeniem MCP. Oddzielam generowanie od wykonania: skill pisze prompt, a ja uruchamiam go w zwykłej sesji z potrzebnymi połączeniami.

Przy zadaniach wymagających żądań internetowych istotne jest jedno udokumentowane ograniczenie: [skrypty dołączone do skilli nie mogą ich wykonywać](https://support.google.com/gemini/answer/17094296?hl=en). To nie zakazuje samemu Gemini korzystania z obsługiwanych połączonych aplikacji.

Wpisałem `go`; Gemini omówił pierwsze trzy i zakończył tak:

```plaintext
Czekam na sygnał: wpisz "n" lub "NEXT", aby przejść do kolejnej partii, lub podaj uwagi.
```

Przydatną częścią „pancernego promptu” jest jego struktura. Poniżej moja krótsza wersja do ponownego użycia, z dodanym licznikiem postępu:

```plaintext
Porównaj <elementy> do <zastosowania>.
Najpierw zaproponuj wspólne kryteria i numerowany plan. Czekaj na akceptację.

Sprawdzaj specyfikacje, ceny i dostępność w aktualnych źródłach pierwotnych.
Otwieraj cytowane strony. Stosuj klikalne linki Markdown: [produkt/model lub źródło](URL).
Linkuj dowody istotnych twierdzeń; nie umieszczaj wyników w bloku kodu.
Oddzielaj fakty od oceny. Brak dowodu oznacz NIESPRAWDZONE.
Jeśli nie masz wyszukiwarki lub dostępu do strony, powiedz to. Nie wymyślaj danych.

Dla każdego elementu: nazwa/model, ustalenie, link do źródła, kompromis, brakujące dane.
Stosuj te same kryteria i wymagane pola do wszystkich elementów.

Pracuj nad najwyżej trzema punktami planu w jednej partii, potem się zatrzymaj.
Zacznij partię od ZROBIONE / NASTĘPNE / NIESPRAWDZONE i pozostałego planu.
n = następna partia; d = rozwiń ostatni punkt; s = pomiń go; x = stop.
Jeśli postęp wymaga decyzji, zadaj konkretne pytanie.
Zakończ porównaniem i rekomendacją dla podanego zastosowania.
```

Trzy to wygodna liczba, nie magiczna. Chcę odpowiedzi dość małej, bym mógł ją sprawdzić przed wpisaniem `n`. Licznik ujawnia pominięcia.

Po skończonej pracy proszę o przebieg redakcyjny: usuń powtórzenia, watę i sprzeczności; zachowaj przydatne fakty i linki. Następny materiał zaczynam w świeżym czacie.

Płacę za to większą liczbą tur i większą ilością czytania. Prompt nie daje dostępu do narzędzi ani nie gwarantuje wiarygodności cytowań: linki, na których opiera się rekomendacja, nadal otwieram sam.

</div>
