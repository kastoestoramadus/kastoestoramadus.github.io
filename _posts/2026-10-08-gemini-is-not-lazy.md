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

**TLDR:** A cheap Gemini plan becomes more useful when I specify the work, split it into batches and check the sources. My shortcut: let the model draft the prompt, review it, then type `n` for each next batch.

I bought a year of Google AI Plus for 239.99 zł, roughly twenty zł a month. Gemini still gives me a short answer and an offer to continue. I want the comparison, not an invitation to ask for it again.

[Google's Gemini 3 guide](https://ai.google.dev/gemini-api/docs/gemini-3#prompting-best-practices) describes a preference for concise answers and recommends clear instructions. More thinking does not tell the model which fields my report needs or when the job is done.

## Let it write the brief

I use a meta-prompt skill through my own `/gh` shortcut, not a built-in Gemini command. I describe the task — say, compare three HDDs for a NAS with links — and it drafts the session prompt. I review it, type “execute”, then `n` after each batch.

The useful part of the “armoured prompt” is its structure. Here is a starting point:

```plaintext
Compare <items> for <use case>.
First propose shared criteria and a numbered plan. Wait for approval.

Use current primary sources for specifications, prices and availability.
Open cited pages; link the source supporting each material claim.
Separate facts from judgement. Mark missing evidence UNVERIFIED.
If search or page access is unavailable, say so. Do not invent data.

For each item: finding, source, trade-off, missing information.
Keep the same criteria and required fields for every item.

Work through at most five plan items per batch, then stop.
Start each batch with DONE / NEXT / UNVERIFIED and the remaining plan.
n = next batch; d = expand the last item; s = skip it; x = stop.
Ask a specific question if a decision blocks progress.
Finish with a comparison and a recommendation for the stated use case.
```

Five is convenient, not magic. I want an answer small enough to inspect before the next one. The ledger makes omissions visible.

## Keep the evidence, cut the rest

[LongWriter](https://arxiv.org/abs/2408.07055) produced long, coherent texts by splitting writing into planned subtasks. [Huang et al.](https://arxiv.org/abs/2310.01798) found that self-correction without external feedback could fail or worsen reasoning in the tested models. These support decomposition and external checks; neither validates this exact Gemini workflow.

Once the work is complete, I ask for an editing pass: remove repetition, filler and contradictions; preserve useful facts and links. I start the next deliverable in a fresh chat.

This costs more turns and reading. The prompt cannot grant tool access or guarantee citations: I still open the links that carry the recommendation.

</div>

<div id="polski" class="post-language" lang="pl" markdown="1">

**TLDR:** Tani plan Gemini daje mi więcej pożytku, gdy określam zadanie, dzielę pracę na partie i sprawdzam źródła. Mój skrót: model układa prompt, ja go sprawdzam, a potem wpisuję `n` po każdą następną partię.

Kupiłem rok Google AI Plus za 239,99 zł, czyli mniej więcej dwadzieścia złotych miesięcznie. Gemini nadal daje mi krótką odpowiedź z propozycją kontynuacji. Chcę porównania, a nie zaproszenia do ponownego poproszenia o nie.

[Przewodnik Google po Gemini 3](https://ai.google.dev/gemini-api/docs/gemini-3#prompting-best-practices) opisuje skłonność do zwięzłych odpowiedzi i zaleca jasne instrukcje. Więcej myślenia nie mówi modelowi, jakich pól potrzebuję w raporcie ani kiedy robota jest skończona.

## Niech sam napisze instrukcję

Korzystam ze skilla do meta-promptów przez własny skrót `/gh`, nie wbudowaną komendę Gemini. Opisuję zadanie — choćby porównanie trzech dysków HDD do NAS-a, z linkami — a skill układa prompt sesyjny. Sprawdzam go, wpisuję „wykonaj”, a po każdej partii — `n`.

Przydatną częścią „pancernego promptu” jest jego struktura. Od tego można zacząć:

```plaintext
Porównaj <elementy> do <zastosowania>.
Najpierw zaproponuj wspólne kryteria i numerowany plan. Czekaj na akceptację.

Sprawdzaj specyfikacje, ceny i dostępność w aktualnych źródłach pierwotnych.
Otwieraj cytowane strony; przy istotnych twierdzeniach linkuj źródło dowodu.
Oddzielaj fakty od oceny. Brak dowodu oznacz NIESPRAWDZONE.
Jeśli nie masz wyszukiwarki lub dostępu do strony, powiedz to. Nie wymyślaj danych.

Dla każdego elementu: ustalenie, źródło, kompromis, brakujące informacje.
Stosuj te same kryteria i wymagane pola do wszystkich elementów.

Pracuj nad najwyżej pięcioma punktami planu w jednej partii, potem się zatrzymaj.
Zacznij partię od ZROBIONE / NASTĘPNE / NIESPRAWDZONE i pozostałego planu.
n = następna partia; d = rozwiń ostatni punkt; s = pomiń go; x = stop.
Jeśli postęp wymaga decyzji, zadaj konkretne pytanie.
Zakończ porównaniem i rekomendacją dla podanego zastosowania.
```

Pięć to wygodna liczba, nie magiczna. Chcę odpowiedzi dość małej, bym mógł ją sprawdzić przed następną. Licznik ujawnia pominięcia.

## Zostawić dowody, wyciąć resztę

[LongWriter](https://arxiv.org/abs/2408.07055) uzyskał długie, spójne teksty przez podział pisania na zaplanowane podzadania. [Huang i wsp.](https://arxiv.org/abs/2310.01798) pokazali, że samokorekta bez zewnętrznej informacji zwrotnej mogła zawieść lub pogorszyć rozumowanie badanych modeli. To argumenty za podziałem pracy i zewnętrzną kontrolą; żadne z tych badań nie sprawdza mojego konkretnego sposobu pracy z Gemini.

Po skończonej pracy proszę o przebieg redakcyjny: usuń powtórzenia, watę i sprzeczności; zachowaj przydatne fakty i linki. Następny materiał zaczynam w świeżym czacie.

Płacę za to większą liczbą tur i większą ilością czytania. Prompt nie daje dostępu do narzędzi ani nie gwarantuje wiarygodności cytowań: linki, na których opiera się rekomendacja, nadal otwieram sam.

</div>
