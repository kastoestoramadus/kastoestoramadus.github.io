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

**TLDR:** A meta skill turns my short request into a task prompt with sources, verification rules and batches. The revised `/xh` keeps those requirements without promising perfect results. Use Flash with at least Medium effort; the skill cannot select it for you.

**Updated 12 October 2026:** the copyable definition and examples below replace the earlier version. The Polish section contains the original test wording; English excerpts are translations.

## Use it in two steps

Create a skill named `xh` using [Google's skill-creation guide](https://support.google.com/gemini/answer/17094296?hl=en-GB). Select `/xh` from the dropdown and type the task itself. It produces a prompt; run that prompt without selecting the skill again, or paste it into a fresh chat. For conversational lists longer than three items, `NEXT` or `n` continues the next batch. Scheduled actions instead require one pass without waiting for a reply.

**Remember to set the model's effort level: Medium or High.** Check the actual picker when starting a chat. I do not use Low for this workflow. Avoid the Pro model for routine work if preserving the Plus allowance matters: it can use the allowance quickly. This means the model, not the Google AI Pro subscription. Google says advanced models and higher thinking levels [consume more usage](https://support.google.com/gemini/answer/16275805?hl=en); I have not measured a fixed Pro/Flash multiplier. A skill does not configure effort, and I have not confirmed a separate effort control for scheduled actions.

## Latest trials: check the output, not just the prompt

I kept the original two `/xh` requests. These are individual browser trials on Gemini 3.6 Flash, not a controlled benchmark: the effort of the older runs was not recorded. A working product link and evidence of availability are separate checks.

### Shopping for cat toys

**Input:** `/xh Review recommended cat toys. I want to buy some.` (the original Polish wording is below), then `uruchom`. Effort: High.

**Latest generated prompt, excerpt:**

> Give at most 3 items per answer, fewer if only that many meet the criteria. Pause after the batch and wait for NEXT or n. Continue without repetition or artificial padding.

It also required opening the specific product page, checking stock and omitting invented URLs. Nevertheless, the executed answer returned three categories without purchase links. Its closing explanation was:

> Due to the lack of an active connection to the internet search module at this moment, I am not including verified direct links to shop baskets.

**Assessment:** the instructions are more precise, but this run failed the shopping requirement. Missing links are a failed check, not a successful recommendation. The model's explanation does not establish whether access, a temporary limit or something else caused it.

### What is God?

**Input:** `/xh what is God` (original: `/xh czym jest bóg`), followed by execution of the generated prompt. Effort: Medium.

**The latest prompt kept batching and separate perspectives:**

> Conduct a multidimensional, rigorous analysis of “God” from the perspectives of philosophy, theology, religious studies, natural science and cognitive science.

> Give at most 3 approaches/perspectives per answer. Pause after each batch and wait for “NEXT” or “n”. Continue without repetition or artificial padding.

It required thinkers, works, arguments and limitations, but omitted direct source links. The final result after `uruchom` was:

> I am not intended for such purposes.

**Assessment:** the prompt is more specific but incomplete, and execution delivered no answer. This trial does not demonstrate a better result or establish the cause of the refusal. Raising effort alone does not guarantee compliance with the skill.

## Copy the current meta skill
{: #copy-skill-en}

Name: `xh`. Description: “Turn the task supplied with this skill into a complete prompt for another session, including relevant sources, verification and batching rules.” The instructions are the current version; do not combine them with earlier definitions.

<details markdown="1">
<summary>Current instructions — expand to copy</summary>

```plaintext
# /xh — prompt generator

When this skill is selected, turn the user's task into a ready prompt for another session. “Find offers” or “what is God” is input for the generator: do not execute the task yet. Return the entire prompt in one copyable block. Only an explicit execution command after generation (run, execute, go) means execute that existing prompt rather than generate another.

## Prompt construction
Preserve the goal, every criterion and the user's latest corrections. Establish the required result and choose fields appropriate to the task. Ask only about essential missing information. Do not add placeholders for data already supplied.
Completeness takes precedence over brevity: cut repetition and decoration, never verification, continuation or reporting rules. Do not copy the entire skill into every prompt; select the relevant rules below.
For analysis, require concrete definitions and distinctions, arguments, examples and limitations. For a review of perspectives, choose representatives, works and sources where they help explain the subject. An “expert” persona or a request for “maximum effort” is not a substitute for substance. Separate facts, user assumptions, hypotheses and conclusions. Accept hypothetical scenarios without presenting them as reality.

## Research and working links
For research, shopping and changing information, require Google Search or an available search engine and reading the relevant sources. Group queries, then check gaps; do not impose a fixed number of searches. Sources must support material claims, not just appear as a list of names at the end.
Require direct Markdown links to specific sources. Every shopping offer and lead must have a specific URL found in a source. Open the link: an error, wrong product or category/search redirect excludes it from working links. Do not guess addresses, prices or shops. If an address cannot be read, show it only in a separate section labelled “link unverified”. Omit items without URLs. If no checked link required by the task is available, end with a verification limitation, without apparent offers or NEXT.
Require an actual attempt to use available tools before declaring them absent. Do not diagnose an error without evidence. The model's statement about missing tools is not itself a diagnosis of account access or usage limits. Describe only actions performed; unexecuted code is not a test. Do not promise absolute certainty or exhaustion of every possible source.

## Offer and event freshness
A working link does not prove availability. Check the current page for the specific listing, product, variant or date before each report. Exclude sold, reserved, ended and unavailable offers. An unavailable notice overrides a price or purchase button. An active listing is not the seller's confirmation.
Search results, archived copies and reads of unknown freshness are leads, not confirmed offers. With only search snippets, leave the confirmed-offers table empty. Separate freshness, model and condition; used condition is the seller's claim. Apply stricter requirements only to the categories the user specifies. Label missing secondary information; exclude results lacking required evidence from confirmed results. Do not invent delivery charges, exchange rates, net prices or forecasts. Distinguish source, event and checking dates. Missing access means missing verification, not absence of market offers.

## Conversational batches
For lists longer than three items, put this in the prompt: “Return at most three items per answer, fewer if only that many meet the criteria. Pause after the batch and wait for NEXT or n. Continue without repetition or padding.” Asking for all results defines coverage and does not cancel batching. Disable batches only for an explicit request for everything in one answer or for a scheduled action. Batching applies to the target task, not generation of the prompt itself. “All” means all matching results found, without claiming complete market coverage.

## Scheduled action — conditional section
For scheduled actions, require one independent pass without NEXT, pauses or waiting for the user. Separate the schedule from the task and preserve supplied dates and timezone. Do not assume browser, login, API, files, integrations or history. Set priorities and define the result for partial checks, leads only or missing tools. Compare only with an available previous report; otherwise state that no comparison was possible. Preserve the choice of regular reporting or meaningful-change notifications. Do not promise to suppress platform notifications or work between runs. An analytical task does not authorise purchases, reservations, messages or data changes.

## Effort and final check
Preference: Gemini 3.6 Flash with at least Medium effort. Low and Minimal are unacceptable; High is allowed. Do not substitute Flash-Lite without permission. Neither the skill nor prompt text changes that setting. When the target chat setting is unconfirmed, add only: “Remember to set the model's effort level: Medium or High.” For scheduled actions: “Run effort unconfirmed.” Do not instruct the user to set effort on an action when that control has not been confirmed, or assume inheritance from the chat.
Check the copyable prompt itself before returning it: requirements, relevant sources and links, freshness, missing data and the correct batching mode. Repair omissions: a rule only present in the skill or an external note does not suffice. Remove contradictory old criteria and irrelevant sections.
```

</details>

## Other approaches worth reading

- [Sentry's prompt-optimizer](https://github.com/getsentry/skills/blob/main/skills/prompt-optimizer/SKILL.md): success criteria and comparisons of prompt variants.
- [GitHub Awesome Copilot's prompt-optimizer](https://github.com/github/awesome-copilot/blob/main/skills/prompt-optimizer/SKILL.md): self-contained prompts intended for chat.
- [JoelLewis's prompt-optimizer](https://github.com/JoelLewis/skill-library/blob/main/plugins/meta/skills/prompt-optimizer/SKILL.md): a structured intent-to-prompt workflow. I would not copy every mandatory technique.

[saeed-vayghan/gemini-agent-skills](https://github.com/saeed-vayghan/gemini-agent-skills) takes this idea further: a useful catalogue of specialist roles and a converter for Claude configurations, with credit to the original VoltAgent work. I especially like being able to choose a few relevant roles instead of installing everything. Its documented target is Gemini CLI; the converter uses a Gemini API key, not the chat allowance.

My filtered shortlist for **instruction-based chat work** is below. These are adaptation candidates, not packages I have proved work unchanged in Gemini Apps. Replace context-manager and cross-agent calls with supplied input; include referenced resources where needed; remove example completion statistics rather than reporting them as measured results. The original definitions contain workflow assumptions that chat does not provide.

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


I left terminal-driven deployment, infrastructure changes and multi-agent orchestration out of the chat shortlist. For scheduled actions, each adapted skill still needs an independent pass, available sources and explicit handling of missing tools/history.

</div>

<div id="polski" class="post-language" lang="pl" markdown="1">

**TLDR:** Meta skill zamienia moje krótkie polecenie w prompt z wymaganiami źródeł, weryfikacji i partii. Poprawiony `/xh` zachowuje te reguły bez obiecywania idealnych wyników. Używaj Flasha z co najmniej Medium — skill nie wybiera tego ustawienia za Ciebie.

**Aktualizacja 12 października 2026:** definicja do skopiowania i przykłady poniżej zastępują poprzednią wersję.

## Dwa kroki użycia

Utwórz skill `xh` według [instrukcji Google](https://support.google.com/gemini/answer/17094296?hl=pl). Wybierz `/xh` z listy rozwijanej i wpisz samo zadanie. Dostaniesz prompt; wykonaj go bez ponownego wybierania skilla albo wklej do świeżej rozmowy. Dla list dłuższych niż trzy pozycje w zwykłej rozmowie `NEXT` lub `n` uruchamia kolejną partię. Scheduled action ma zamiast tego wykonać jeden przebieg bez czekania na odpowiedź.

**Pamiętaj ustawić poziom wysiłku modelu! Średni lub wysoki.** Sprawdź faktyczny wybór przy nowym czacie. Nie używam Low do tego sposobu pracy. Unikaj modelu Pro w rutynowych zadaniach, jeśli zależy Ci na oszczędzaniu puli Plus: może ją szybko zużyć. Chodzi o model, nie o subskrypcję Google AI Pro. Google podaje, że bardziej zaawansowane modele i wyższe poziomy myślenia [zużywają więcej limitu](https://support.google.com/gemini/answer/16275805?hl=pl); nie zmierzyłem stałego mnożnika Pro/Flash. Skill nie ustawia effort, a osobnej regulacji effort dla scheduled actions nie potwierdziłem.

## Najnowsze próby: sprawdzaj wynik, nie tylko prompt

Zachowałem dwa pierwotne wejścia do `/xh`. To pojedyncze próby w przeglądarce na Gemini 3.6 Flash, nie kontrolowany benchmark: poziomu wysiłku wcześniejszych przebiegów nie zapisano. Działający link produktu i potwierdzenie dostępności to osobne kontrole.

### Zakupy dla kota

**Polecenie:** `/xh Przejrzyj co się poleca kotom do zabawy. chcę kupić`, potem `uruchom`. Effort: High.

**Fragment najnowszego wygenerowanego promptu:**

> Podawaj maksymalnie 3 pozycje na odpowiedź, mniej jeśli tylko tyle spełnia kryteria. Po partii zatrzymaj się i czekaj na NEXT lub n. Kontynuuj bez powtórzeń i sztucznego dopełniania.

Prompt wymagał również otwarcia konkretnej oferty, sprawdzenia dostępności i pomijania zmyślonych URL. Mimo tego wykonana odpowiedź podała trzy kategorie bez linków zakupowych. Zakończyła się wyjaśnieniem:

> Ze względu na brak aktywnego połączenia z modułem wyszukiwania internetowego w tym momencie, nie dołączam zweryfikowanych linków bezpośrednich do koszyków sklepowych.

**Ocena:** instrukcje są precyzyjniejsze, ale ten przebieg nie spełnił celu zakupowego. Brak linków to niezaliczona kontrola, nie udana rekomendacja. Wyjaśnienie modelu nie dowodzi, czy przyczyną był dostęp, chwilowy limit czy coś innego.

### Czym jest bóg?

**Polecenie:** `/xh czym jest bóg`, następnie wykonanie wygenerowanego promptu. Effort: Medium.

**Najnowszy prompt zachował partie i rozdzielenie stanowisk:**

> Przeprowadź wieloaspektową, rzetelną analizę pojęcia „Bóg” z perspektywy filozofii, teologii, religioznawstwa oraz nauk przyrodniczych i poznawczych.

> Podawaj maksymalnie 3 ujęcia/perspektywy na odpowiedź. Po każdej partii zatrzymaj się i czekaj na sygnał „NEXT” lub „n”. Kontynuuj bez powtórzeń i sztucznego dopełniania.

Wymagał przedstawicieli, dzieł, argumentów i ograniczeń, ale pominął bezpośrednie linki do źródeł. Końcowy wynik po `uruchom`:

> Nie jestem przeznaczony do takich celów.

**Ocena:** prompt jest konkretniejszy, lecz niekompletny, a wykonanie nie dostarczyło odpowiedzi. Nie ma podstaw, żeby ten przebieg nazywać poprawą wyniku ani przypisywać odmowie konkretną przyczynę. Samo podniesienie effort nie gwarantuje przestrzegania skilla.

## Aktualny meta skill do skopiowania
{: #copy-skill-pl}

Nazwa: `xh`. Opis: „Zamień zadanie podane z tym skillem w kompletny prompt do innej sesji, uwzględniając potrzebne źródła, weryfikację i partie”. Poniżej jest aktualna definicja — nie łącz jej z poprzednimi wersjami.

<details markdown="1">
<summary>Aktualne instrukcje — rozwiń i skopiuj</summary>

```plaintext
# /xh — generator promptów

Gdy ten skill jest wybrany, przekształć polecenie użytkownika w gotowy prompt do innej sesji. Samo „szukaj ofert” lub „czym jest bóg” jest wejściem do generatora — nie wykonuj jeszcze zadania. Oddaj cały prompt w jednym bloku do skopiowania. Dopiero jednoznaczna komenda wykonania po wygenerowaniu (uruchom, wykonaj, go) oznacza wykonanie tego promptu, bez ponownego generowania.

## Konstrukcja promptu
Zachowaj cel, wszystkie kryteria i najnowsze korekty użytkownika. Ustal potrzebny wynik i dobierz pola do zadania. Pytaj tylko o niezbędne braki. Nie dodawaj pustych miejsc dla danych już podanych.
Kompletność ma pierwszeństwo przed zwięzłością: skracaj powtórzenia i ozdobniki, nigdy reguły weryfikacji, kontynuacji lub raportowania. Nie kopiuj całego skilla do każdego promptu; wybierz właściwe reguły poniżej.
Dla analizy wymagaj konkretów: definicji i różnic, argumentów, przykładów oraz ograniczeń. Przy przeglądzie stanowisk dobierz przedstawicieli, dzieła i źródła, gdy pomagają zrozumieć temat. Nie zastępuj treści samą rolą „eksperta” ani żądaniem „maksymalnego wysiłku”. Oddziel fakty, założenia użytkownika, hipotezy i wnioski. Nie odrzucaj hipotetycznego scenariusza tylko dlatego, że nie ma go w źródłach; nie przedstawiaj go jako rzeczywistości.

## Research i działające linki
Dla researchu, zakupów oraz informacji zmiennych wstaw nakaz użycia Google Search lub dostępnej wyszukiwarki i odczytania właściwych źródeł. Grupuj zapytania, potem sprawdzaj braki; bez stałej liczby wyszukiwań. Źródła mają wspierać istotne twierdzenia, nie tylko być listą nazw na końcu.
Wymagaj bezpośrednich linków Markdown do konkretnych źródeł. Dla zakupów każda oferta i każdy trop musi mieć konkretny URL znaleziony w źródle. Link sprawdź przez otwarcie; błąd, niewłaściwy produkt lub przekierowanie do kategorii/wyszukiwania wykluczają go z działających linków. Nie zgaduj adresów, cen ani sklepów. Gdy adresu nie można odczytać, pokaż go tylko osobno jako „link niezweryfikowany”. Pozycje bez URL pomijaj. Jeśli nie ma żadnego sprawdzonego linku wymaganego przez zadanie, zakończ informacją o braku weryfikacji; bez listy pozornych ofert i bez NEXT.
Nakazuj podjęcie rzeczywistej próby użycia dostępnych narzędzi przed stwierdzeniem ich braku. Nie dopisuj diagnozy przyczyny błędu bez dowodu. Odpowiedź modelu o braku narzędzi nie jest sama w sobie diagnozą konta lub limitów. Opisuj tylko wykonane czynności; nieuruchomiony kod nie jest testem. Nie obiecuj 100% pewności ani wyczerpania wszystkich źródeł.

## Aktualność ofert i wydarzeń
Link działający nie oznacza dostępności. Sprawdź aktualną stronę konkretnego ogłoszenia, produktu, wariantu lub terminu przed każdym raportem. Sprzedane, zarezerwowane, zakończone i niedostępne odrzucaj; komunikat o niedostępności ma pierwszeństwo przed ceną i przyciskiem zakupu. Aktywne ogłoszenie nie jest potwierdzeniem sprzedawcy.
Wyniki wyszukiwarki, kopie archiwalne i odczyty o nieznanej świeżości są tropami, nie potwierdzonymi ofertami. Gdy są tylko fragmenty wyszukiwarki, tabela potwierdzonych ofert pozostaje pusta. Oddziel aktualność, model i stan; używany stan jest deklaracją sprzedawcy. Ostrzejsze wymogi stosuj tylko do kategorii wskazanych przez użytkownika. Brak danych drugorzędnych oznacz; brak wymaganych dowodów wyklucza wynik z sekcji potwierdzonej. Nie wymyślaj dostawy, kursów, ceny netto ani prognoz. Rozróżnij daty źródła, zdarzenia i sprawdzenia. Brak dostępu oznacza brak weryfikacji, nie brak ofert na rynku.

## Partie w rozmowie
Dla list dłuższych niż 3 pozycje wpisz do promptu: „Podawaj maksymalnie 3 pozycje na odpowiedź, mniej jeśli tylko tyle spełnia kryteria. Po partii zatrzymaj się i czekaj na NEXT lub n. Kontynuuj bez powtórzeń i sztucznego dopełniania”. Żądanie wszystkich wyników określa zakres, nie wyłącza partii. Wyłącz je tylko na wyraźne życzenie całości w jednej odpowiedzi lub dla scheduled action. Partie dotyczą wyników docelowego zadania; sam prompt oddaj w całości. „Wszystkie” oznacza wszystkie znalezione pasujące wyniki, bez obietnicy kompletności rynku.

## Scheduled action — sekcja warunkowa
Gdy celem jest zaplanowane działanie, wpisz do promptu jeden samodzielny przebieg: bez NEXT, pauz i oczekiwania na użytkownika. Oddziel harmonogram od treści; zachowaj podaną strefę i terminy. Nie zakładaj przeglądarki, logowania, API, plików, integracji ani historii. Ustal priorytety oraz wynik przy częściowym sprawdzeniu, samych tropach lub braku narzędzi. Porównuj tylko z dostępnym poprzednim raportem, inaczej oznacz brak porównania. Zachowaj wybór regularnego raportu albo informacji tylko o istotnych zmianach. Nie obiecuj wyciszenia powiadomień platformy ani pracy między przebiegami. Zadanie analityczne nie upoważnia do zakupu, rezerwacji, wiadomości czy zmiany danych.

## Effort i kontrola końcowa
Preferencja: Gemini 3.6 Flash, co najmniej Medium; Low i Minimal są nieakceptowane, High dopuszczalny. Nie zastępuj go Flash-Lite bez zgody. Skill ani tekst promptu nie zmieniają ustawienia. Gdy ustawienie docelowego czatu nie jest potwierdzone, dodaj tylko: „Pamiętaj ustawić poziom wysiłku modelu! Średni lub wysoki.” Dla scheduled action: „Effort uruchomienia niepotwierdzony.” Nie instruuj ustawiania effort w akcji, skoro takiej opcji nie potwierdzono, i nie zakładaj dziedziczenia go z czatu.
Przed oddaniem sprawdź sam kopiowany prompt: czy zachował wymagania, potrzebne źródła i linki, reguły aktualności, braków danych i właściwy tryb partii. Popraw pominięcia; reguła istniejąca tylko w skillu lub komentarzu poza blokiem nie wystarcza. Usuń sprzeczne stare kryteria i nieadekwatne sekcje.
```

</details>

## Inne podejścia warte przeczytania

- [prompt-optimizer Sentry](https://github.com/getsentry/skills/blob/main/skills/prompt-optimizer/SKILL.md): kryteria sukcesu i porównywanie wariantów promptu.
- [prompt-optimizer GitHub Awesome Copilot](https://github.com/github/awesome-copilot/blob/main/skills/prompt-optimizer/SKILL.md): samodzielne prompty przeznaczone do czatu.
- [prompt-optimizer JoelLewis](https://github.com/JoelLewis/skill-library/blob/main/plugins/meta/skills/prompt-optimizer/SKILL.md): uporządkowane przejście od intencji do promptu. Nie kopiowałbym każdej obowiązkowej techniki.

[saeed-vayghan/gemini-agent-skills](https://github.com/saeed-vayghan/gemini-agent-skills) rozwija ten pomysł dalej: daje użyteczny katalog specjalistycznych ról i konwerter konfiguracji Claude, z uznaniem dla źródłowej pracy VoltAgent. Podoba mi się wybór kilku potrzebnych ról zamiast instalowania całego zestawu. Udokumentowanym środowiskiem jest Gemini CLI; konwerter korzysta z klucza API Gemini, nie z puli czatu.

Poniżej moja przefiltrowana lista do **pracy tekstowej w czacie**. To kandydaci do adaptacji, nie paczki sprawdzone przeze mnie jako działające bez zmian w Gemini Apps. Wywołania context managera i innych agentów zastąp podanym materiałem; w razie potrzeby dołącz zasoby wskazane w definicji; usuń przykładowe statystyki ukończenia, zamiast raportować je jako pomiary. Oryginały zakładają elementy środowiska, których czat nie zapewnia.

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


Z listy dla czatu odrzuciłem wdrożenia przez terminal, zmiany infrastruktury i orkiestrację wielu agentów. Dla scheduled actions adaptacja musi dodatkowo określić jeden samodzielny przebieg, dostępne źródła oraz postępowanie przy braku narzędzi i historii.

</div>
