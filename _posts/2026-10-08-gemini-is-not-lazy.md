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
"Run this prompt in a normal Gemini session with the tools it needs. Type go to start."

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
5. Batches of at most three items, followed by a stop. Preserve the plan.
   End each batch with DONE / NEXT / UNVERIFIED.
   n or NEXT = next batch; d = expand; s = skip; x = stop.
   Use capitals only for status labels or a decision requiring the user.
6. A final comparison and recommendation after all batches are complete.
7. A hard hand-off: "Do not execute yet. Wait for go."

Adapt these rules to the task. Do not add irrelevant fields or filler.
```

Invoke it with `/xh` and your request, copy its generated prompt into the normal session, then type `go`. Use `n` for the next batch. `/xh` is a chosen skill name, not a built-in Gemini command.

In my tests, Gmail was unavailable while using the skill. [Google documents Workspace support for skills](https://support.google.com/gemini/answer/18560919?hl=en-GB), so I cannot call this a general MCP restriction. I generate the prompt in the skill and execute it in the normal session with the required connections. Separately, [scripts bundled with skills cannot make internet requests](https://support.google.com/gemini/answer/17094296?hl=en); this does not prohibit Gemini itself from using supported Connected Apps.

This costs more turns and reading. The prompt cannot grant tool access or guarantee citations: I still open the links that carry the recommendation.

</div>

<div id="polski" class="post-language" lang="pl" markdown="1">

**TLDR:** Tani plan Gemini daje mi więcej pożytku, gdy określam zadanie, dzielę pracę na partie i sprawdzam źródła. Mój skrót: generuję prompt w skillu, uruchamiam go w zwykłej sesji, a potem wpisuję `n` po każdą następną partię.

Kupiłem rok Google AI Plus za 239,99 PLN, czyli mniej więcej 20 PLN miesięcznie. Gemini nadal daje mi krótką odpowiedź z propozycją kontynuacji. Chcę porównania, a nie zaproszenia do ponownego poproszenia o nie.

[Przewodnik Google po Gemini 3](https://ai.google.dev/gemini-api/docs/gemini-3#prompting-best-practices) opisuje skłonność do zwięzłych odpowiedzi i zaleca jasne instrukcje. Więcej myślenia nie mówi modelowi, jakich pól potrzebuję w raporcie ani kiedy robota jest skończona.

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
„Uruchom ten prompt w zwykłej sesji Gemini z potrzebnymi narzędziami. Wpisz go.”

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
5. Partie po najwyżej trzy pozycje, potem zatrzymanie. Zachowaj plan.
   Kończ partię licznikiem ZROBIONE / NASTĘPNE / NIESPRAWDZONE.
   n lub NEXT = następna partia; d = rozwiń; s = pomiń; x = stop.
   Wielkie litery stosuj tylko w etykietach statusu lub przy decyzji użytkownika.
6. Końcowe porównanie i rekomendację po ukończeniu wszystkich partii.
7. Jednoznaczne przekazanie: „Jeszcze nie wykonuj zadania. Czekaj na go.”

Dostosuj zasady do zadania. Nie dodawaj zbędnych pól ani wypełniaczy.
```

Wywołaj skill przez `/xh` i swoją prośbę, przekopiuj wygenerowany prompt do zwykłej sesji, potem wpisz `go`. Następną partię uruchamiaj przez `n`. `/xh` to wybrana nazwa skilla, nie wbudowana komenda Gemini.

W moich testach Gmail był niedostępny podczas używania skilla. [Google dokumentuje obsługę Workspace przez skille](https://support.google.com/gemini/answer/18560919?hl=en-GB), więc nie mogę nazwać tego ogólnym ograniczeniem MCP. Generuję prompt w skillu, a wykonuję go w zwykłej sesji z potrzebnymi połączeniami. Osobno: [skrypty dołączone do skilli nie mogą wykonywać żądań internetowych](https://support.google.com/gemini/answer/17094296?hl=en); to nie zakazuje samemu Gemini korzystania z obsługiwanych połączonych aplikacji.

Płacę za to większą liczbą tur i większą ilością czytania. Prompt nie daje dostępu do narzędzi ani nie gwarantuje wiarygodności cytowań: linki, na których opiera się rekomendacja, nadal otwieram sam.

</div>
