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

**TLDR:** A cheap Gemini plan becomes more useful when I specify the work and check the sources. My meta skill writes the instructions: batches controlled by `n` for interactive work, or a complete report for daily scheduled actions.

I bought a year of Google AI Plus for PLN 239.99 — about USD 61 a year, or USD 5 a month, at the [8 October 2026 exchange rate](https://api.nbp.pl/api/exchangerates/rates/a/usd/2026-10-08/?format=json). Gemini still gives me a short answer and an offer to continue. I want the comparison, not an invitation to ask for it again.

[Google's Gemini 3 guide](https://ai.google.dev/gemini-api/docs/gemini-3#prompting-best-practices) describes a preference for concise answers and recommends clear instructions. More thinking does not tell the model which fields my report needs or when the job is done.

## What Plus buys

[Google AI Plus](https://one.google.com/about/google-ai-plans/) includes 400 GB across Gmail, Drive and Photos, advertises twice the Gemini access of non-AI subscribers, and adds more access to Deep Research, notebook features and image, music and video generation. Gmail features depend on region. Antigravity's expanded limits are listed under Pro and Ultra, not Plus.

The useful part for routine work is [scheduled actions](https://support.google.com/gemini/answer/16316416?hl=en): up to ten active tasks, including daily reports. With an AI plan, Gemini prepares them within the hour before delivery; without one, it may prepare them several hours earlier. Scheduling is therefore not exclusive to Plus.

The same meta skill can turn a one-line request into instructions for a daily news digest, offer check or review. Define the scope, evidence and report once, then let scheduled runs put the available usage to work. For example: `/xh Write instructions for a daily scheduled report on Scala releases: official sources, release dates, clickable links and practical impact. Complete each report without waiting for me.` Copy the generated instructions into a scheduled action and set your delivery time. Unlike the interactive example below, this mode must not wait for `go` or `n`. It must report unavailable tools or sources rather than pretend the check succeeded.

## Same request, two results

### Plain request

Without a skill or a generated prompt, I asked: `Review recommended cat toys. I want to buy some.` Gemini covered five categories, named some models and offered to narrow the choice based on my cat's preferences. An excerpt, translated from Polish:

> **Recommended models:** *Purr Propulsion* / *GoCat Da Bird* wands (with feathers that spin in the air, making a sound resembling a bird in flight), or wands with a long, flexible wire and a bunch of feathers/leather strips at the end.

> **What to look for:** Avoid rigid sticks with a short cord; a long, flexible wand lets you imitate prey precisely (hiding behind furniture, moving away from the cat, rather than waving it in front of its nose).

### Generated prompt, executed in the normal session

I gave the same request to my meta-prompt skill: `/xh Review recommended cat toys. I want to buy some.` Then I typed `go` in a normal Gemini turn, without invoking the skill. These are excerpts from the resulting answer, not from the generated prompt. The first batch included a wire-and-cardboard toy:


> **Safety and risks:** The toy is extremely simple, but requires supervision. The wire itself is safe, but after extended use the paper ends may be torn apart and swallowed. It is worth checking their condition before each session.
>
> **Estimated cost in PLN and value for money:** 15–25 PLN. Excellent value for money; one of the cheapest yet most effective accessories on the market.
>
> **Expert verdict and recommendation:** A must-have in every home with a cat. Remember to let the cat physically catch the end of the toy and offer a treat or meal at the end of play (completing the hunting sequence).

After three items, Gemini stopped with:

```plaintext
Waiting for your signal: type "n" or "NEXT" to move to the next batch, or give feedback.
```

The plain answer gives a broad overview; the prompted batch gives more detail per item, including price, suitability and risks. This is one example, not proof that its recommendations are more accurate. Both excerpts above are translated; the [original evidence is in Polish](#polski). The recorded prompted result is the first batch, not a completed report.

## Copy the meta skill

Create a Gemini skill with the instructions below and name it `xh` (or choose your own name). This is a reusable version of the workflow, not the exact original skill used in the example. It **generates a task prompt**; it does not carry out the task.

```plaintext
Turn the user's request into a complete, ready-to-run session prompt.
Do not answer the request, research it or execute the resulting prompt.
Output one plaintext code block containing the task prompt, followed by:
For interactive tasks: "Run this prompt in a normal Gemini session. Type go to start."
For scheduled tasks: "Use these instructions in a scheduled action and set its schedule."

The generated prompt must include:
1. The user's objective and deliverable. Preserve stated constraints.
   State assumptions; ask only for information that blocks useful work.
2. A domain-specific role, shared evaluation criteria and a numbered plan.
3. A search protocol when the task needs current or external information:
   use available search, page access and Connected Apps as needed;
   open cited pages; use clickable Markdown links [name](URL) beside claims;
   distinguish verified facts, opinions and uncertainty;
   disclose unavailable tools or unverified data, never invent evidence.
   Display results as normal Markdown, not inside code blocks.
4. A fixed per-item template tailored to the task. For buying advice include
   model/source link, use case, evidence, advantages, risks, suitability,
   current price/currency and a recommendation. Mark missing fields UNVERIFIED.
5. For interactive work: batches of at most three items, then stop. Preserve the plan.
   End each batch with DONE / NEXT / UNVERIFIED.
   n or NEXT = next batch; d = expand; s = skip; x = stop.
   Use capitals only for status labels or a decision requiring the user.
6. A final comparison and recommendation after all batches are complete.
7. For interactive work: "Do not execute yet. Wait for go."

For a scheduled action, instead generate self-contained instructions for one run.
Keep the requested schedule/time zone separate; do not create the schedule yourself.
Complete the report without go/n pauses, within available tools and usage limits.
Distinguish confirmed findings, unverified leads and a failed check.
Compare with earlier runs only if their results are actually available.

Adapt these rules to the task. Do not add irrelevant fields or filler.
```

Invoke it with `/xh` and your request, copy its generated prompt into the normal session, then type `go`. Use `n` for the next batch. `/xh` is a chosen skill name, not a built-in Gemini command.

In my tests, Gmail was unavailable while using the skill. [Google documents Workspace support for skills](https://support.google.com/gemini/answer/18560919?hl=en-GB), so I cannot call this a general MCP restriction. I generate the prompt in the skill and execute it in the normal session with the required connections. Separately, [scripts bundled with skills cannot make internet requests](https://support.google.com/gemini/answer/17094296?hl=en); this does not prohibit Gemini itself from using supported Connected Apps.

This costs more turns and reading. The prompt cannot grant tool access or guarantee citations: I still open the links that carry the recommendation.

</div>

<div id="polski" class="post-language" lang="pl" markdown="1">

**TLDR:** Tani plan Gemini daje mi więcej pożytku, gdy określam zadanie i sprawdzam źródła. Mój meta skill układa instrukcje: partie sterowane przez `n` przy pracy w rozmowie albo kompletny raport do codziennych scheduled actions.

Kupiłem rok Google AI Plus za 239,99 PLN, czyli mniej więcej 20 PLN miesięcznie. Gemini nadal daje mi krótką odpowiedź z propozycją kontynuacji. Chcę porównania, a nie zaproszenia do ponownego poproszenia o nie.

[Przewodnik Google po Gemini 3](https://ai.google.dev/gemini-api/docs/gemini-3#prompting-best-practices) opisuje skłonność do zwięzłych odpowiedzi i zaleca jasne instrukcje. Więcej myślenia nie mówi modelowi, jakich pól potrzebuję w raporcie ani kiedy robota jest skończona.

## Co daje Plus

[Google AI Plus](https://one.google.com/about/google-ai-plans/) obejmuje 400 GB dla Gmaila, Dysku i Zdjęć, reklamuje dwukrotnie większy dostęp do Gemini niż bez planu AI i daje więcej dostępu do Deep Research, funkcji notatników oraz generowania obrazów, muzyki i filmów. Funkcje Gmaila zależą od regionu. Zwiększone limity Antigravity są wymienione przy Pro i Ultra, nie Plus.

Do regularnej pracy przydają się [scheduled actions](https://support.google.com/gemini/answer/16316416?hl=en): do dziesięciu aktywnych zadań, w tym codzienne raporty. Z planem AI Gemini przygotowuje je w ciągu godziny przed dostarczeniem; bez niego może zrobić to kilka godzin wcześniej. Sam harmonogram nie jest więc wyłączną zaletą Plus.

Ten sam meta skill może zamienić jednozdaniową prośbę w instrukcje codziennego przeglądu wiadomości, ofert lub recenzji. Raz określasz zakres, dowody i raport, a cykliczne wykonania wykorzystują dostępną pulę użycia. Przykład: `/xh Napisz instrukcje do codziennego scheduled action o wydaniach Scali: oficjalne źródła, daty wydań, klikalne linki i praktyczne znaczenie. Kończ każdy raport bez czekania na mnie.` Wygenerowane instrukcje wklej do scheduled action i ustaw godzinę dostarczenia. W odróżnieniu od przykładu rozmowy poniżej ten tryb nie może czekać na `go` ani `n`. Niedostępne narzędzia lub źródła ma zgłaszać, zamiast udawać udaną weryfikację.

## To samo pytanie, dwa wyniki

### Zwykłe zapytanie

Bez skilla i bez wygenerowanego promptu zapytałem: `Przejrzyj co się poleca kotom do zabawy. chcę kupić`. Gemini omówił pięć kategorii, wymienił kilka modeli i zaproponował zawężenie wyboru do preferencji mojego kota. Fragment odpowiedzi:

> **Polecane modele:** Wędki typu *Purr Propulsion* / *GoCat Da Bird* (z piórami, które kręcą się w powietrzu, wydając dźwięk przypominający lot ptaka) lub wędki z długim, elastycznym drutem i pękiem piór/skórzanych rzemieni na końcu.

> **Na co zwrócić uwagę:** Unikaj sztywnych patyków na krótkiej sznurówce; długa, giętka wędka pozwala na precyzyjne imitowanie ruchu ofiary (krycie się za meblami, odjeżdżanie od kota, a nie machanie mu przed nosem).

### Wygenerowany prompt wykonany w zwykłej sesji

To samo pytanie podałem skillowi układającemu meta-prompty: `/xh Przejrzyj co się poleca kotom do zabawy. chcę kupić`. Potem w zwykłej wiadomości do Gemini, bez wywoływania skilla, wpisałem `go`. Poniżej fragmenty odpowiedzi na zadanie, nie wygenerowanej instrukcji. Pierwsza partia zawierała zabawkę z drutu i kartonu:

> **Kwestie bezpieczeństwa i ryzyka:** Zabawka jest niezwykle prosta, ale wymaga nadzoru. Sam drut jest bezpieczny, lecz po dłuższym użytkowaniu papierowe końcówki mogą zostać rozszarpane i połknięte. Warto sprawdzać ich stan przed każdą sesją.
>
> **Szacowany koszt w PLN i stosunek jakości do ceny:** 15 – 25 PLN. Genialny stosunek ceny do jakości; jeden z najtańszych, a zarazem najbardziej skutecznym akcesoriów na rynku.
>
> **Werdykt eksperta i rekomendacja:** Pozycja obowiązkowa w każdym domu z kotem. Pamiętaj, aby na koniec zabawy dać kotu fizycznie pochwycić końcówkę i zaoferować mu smakołyk lub posiłek (zamknięcie łańcucha łowieckiego).

Po trzech pozycjach Gemini zatrzymał się tak:

```plaintext
Czekam na sygnał: wpisz "n" lub "NEXT", aby przejść do kolejnej partii, lub podaj uwagi.
```

Zwykła odpowiedź daje przegląd kategorii; partia po wygenerowanym prompcie podaje więcej szczegółów na pozycję, w tym cenę, dopasowanie i ryzyka. To jeden przykład, nie dowód większej trafności rekomendacji. Powyżej jest oryginalny polski materiał; zapisany wynik wykonania to pierwsza partia, nie ukończony raport.

## Meta skill do skopiowania

Utwórz skill w Gemini, wklej poniższe instrukcje i nazwij go `xh` (lub wybierz własną nazwę). To wersja do ponownego użycia według tego schematu, nie dokładna treść pierwotnego skilla z przykładu. Skill **generuje prompt zadania**, zamiast wykonywać zadanie.

```plaintext
Zamień prośbę użytkownika w kompletny prompt gotowy do uruchomienia w sesji.
Nie odpowiadaj na prośbę, nie wyszukuj informacji ani nie wykonuj tego promptu.
Zwróć jeden blok kodu plaintext z promptem zadania, a pod nim:
Dla rozmowy: „Uruchom ten prompt w zwykłej sesji Gemini. Wpisz go.”
Dla zadania cyklicznego: „Użyj tych instrukcji w scheduled action i ustaw harmonogram.”

Wygenerowany prompt musi zawierać:
1. Cel i oczekiwany wynik. Zachowaj podane ograniczenia.
   Określ założenia; pytaj tylko o dane, bez których nie da się użytecznie działać.
2. Rolę dopasowaną do dziedziny, wspólne kryteria oceny i numerowany plan.
3. Protokół wyszukiwania, gdy zadanie potrzebuje informacji aktualnych lub zewnętrznych:
   używaj dostępnej wyszukiwarki, dostępu do stron i połączonych aplikacji;
   otwieraj cytowane strony; dodawaj klikalne linki Markdown [nazwa](URL) przy tezach;
   oddzielaj sprawdzone fakty, opinie i niepewność;
   ujawniaj niedostępne narzędzia i niesprawdzone dane, nie wymyślaj dowodów.
   Wyniki prezentuj jako zwykły Markdown, nie w blokach kodu.
4. Stały szablon pozycji dopasowany do zadania. Przy poradach zakupowych uwzględnij
   model/link do źródła, zastosowanie, dowody, zalety, ryzyka, dopasowanie,
   aktualną cenę/walutę i rekomendację. Braki oznacz NIESPRAWDZONE.
5. Przy pracy w rozmowie: partie po najwyżej trzy pozycje, potem stop. Zachowaj plan.
   Kończ partię licznikiem ZROBIONE / NASTĘPNE / NIESPRAWDZONE.
   n lub NEXT = następna partia; d = rozwiń; s = pomiń; x = stop.
   Wielkie litery stosuj tylko w etykietach statusu lub przy decyzji użytkownika.
6. Końcowe porównanie i rekomendację po ukończeniu wszystkich partii.
7. Przy pracy w rozmowie: „Jeszcze nie wykonuj zadania. Czekaj na go.”

Dla scheduled action wygeneruj samodzielne instrukcje jednego uruchomienia.
Podany harmonogram i strefę czasową zachowaj osobno; nie twórz harmonogramu sam.
Kończ raport bez pauz go/n, w granicach dostępnych narzędzi i limitów użycia.
Oddzielaj potwierdzone wyniki, niesprawdzone tropy i nieudane sprawdzenie.
Porównuj z wcześniejszymi uruchomieniami tylko wtedy, gdy masz ich rzeczywiste wyniki.

Dostosuj zasady do zadania. Nie dodawaj zbędnych pól ani wypełniaczy.
```

Wywołaj skill przez `/xh` i swoją prośbę, przekopiuj wygenerowany prompt do zwykłej sesji, potem wpisz `go`. Następną partię uruchamiaj przez `n`. `/xh` to wybrana nazwa skilla, nie wbudowana komenda Gemini.

W moich testach Gmail był niedostępny podczas używania skilla. [Google dokumentuje obsługę Workspace przez skille](https://support.google.com/gemini/answer/18560919?hl=en-GB), więc nie mogę nazwać tego ogólnym ograniczeniem MCP. Generuję prompt w skillu, a wykonuję go w zwykłej sesji z potrzebnymi połączeniami. Osobno: [skrypty dołączone do skilli nie mogą wykonywać żądań internetowych](https://support.google.com/gemini/answer/17094296?hl=en); to nie zakazuje samemu Gemini korzystania z obsługiwanych połączonych aplikacji.

Płacę za to większą liczbą tur i większą ilością czytania. Prompt nie daje dostępu do narzędzi ani nie gwarantuje wiarygodności cytowań: linki, na których opiera się rekomendacja, nadal otwieram sam.

</div>
