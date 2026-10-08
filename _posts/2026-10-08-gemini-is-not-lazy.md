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

**TLDR:** My meta skill makes Gemini useful to me even with the fast Flash model: I give it one line, and it writes the detailed instructions needed to get substantial work done. It addresses my frustration with short answers and repeated prompting while plenty of usage remains, even without Plus. One skill prepares either interactive batches or a complete scheduled report.

The friction is familiar: a short overview, an offer to continue, another turn explaining that I wanted the actual comparison. I have room to use Gemini more, but directing it starts to become the job. “Token saving” is how this feels from my side; I cannot tell what internal mechanism produces it.

## Let Gemini specify the work

`/xh` is my name for a meta-prompt skill. I give it the intent; it writes the task prompt. Execution is a separate step in a normal Gemini turn. This makes the proposed scope and criteria visible before the work starts.

The important requirements are shared comparison criteria, sources beside claims, explicit missing evidence and a completion condition. A thinking setting cannot specify those for me. Batches let me inspect progress; an unattended run needs a complete report without conversational pauses.

The point is to make Gemini do the work of expanding the brief. Success means less steering for a useful result, not simply a longer answer.

## What changed in the trial

**Flash without `/xh` versus Flash executing the prompt from `/xh`.** All the trials used Flash through Gemini's desktop/web chat interface. The input in both cases was: `Review recommended cat toys. I want to buy some.` We compare executed answers; the generated prompt is the intermediate step.

<div class="table-responsive" markdown="1">

| Check | Flash: plain request | Flash: prompt from `/xh`, executed |
|---|---|---|
| Scope of recorded output | Five categories, example models and play/safety advice | First batch: telescopic feather wand, Cat Dancer, Aumüller toy |
| Buying detail | General selection advice; offer to tailor it to the cat | Product fields, indicative prices and purchase links |
| What remains | Narrow the choice | Verify claims and links; finish remaining batches and comparison |
{: .table}

</div>

<details markdown="1">
<summary>Evidence: excerpts from both Flash answers (translated from Polish)</summary>

### Plain request

An excerpt from the answer to the plain request:

> **Recommended models:** *Purr Propulsion* / *GoCat Da Bird* wands (with feathers that spin in the air, making a sound resembling a bird in flight), or wands with a long, flexible wire and a bunch of feathers/leather strips at the end.

> **What to look for:** Avoid rigid sticks with a short cord; a long, flexible wand lets you imitate prey precisely (hiding behind furniture, moving away from the cat, rather than waving it in front of its nose).

### Generated prompt, executed in the normal session

I invoked `/xh` with the same request, then typed `go` in a normal Gemini turn without invoking the skill again. An excerpt from the resulting Cat Dancer entry:


> **Safety and durability:** Very high durability of the metal wire. The cardboard elements are safe for cats' teeth and gums, but wear out with heavy use.
>
> **Approximate price:** around 15–20 PLN.
>
> **Where to buy / link:** [Check Cat Dancer at Zooplus](https://www.zooplus.pl/shop/koty/zabawki_tunele_kota/wedki_dla_kota)

After three items, Gemini stopped with:

```plaintext
Waiting for your signal (n or NEXT) to generate the next batch of recommendations.
```

</details>

The [original excerpts are in Polish](#polski). Product-level detail is useful, but the Cat Dancer link leads to a category and the Allegro link went through Google Search. Those links do not verify the quoted prices or the safety claims. The first batch is not a completed buying comparison.

This trial combines a more specific brief with batching. It does not isolate the benefit of the meta skill over writing that same brief myself, or compare cheap and expensive models.

## The same skill for scheduled actions

I also tried: `/xh I'd like to check cat news regularly; give me some.` Gemini returned a scheduled and an interactive variant. After `go with option a`, it created “Cat report — every day by 9 AM”. This demonstrates creating the schedule; I have not included an executed news report here.

The skill returned two modes despite “regularly”, and broadened “last 24 hours” to “last 24 hours or week”. The proposed revision below instructs it to select one mode and preserve the window. **That revision has not been retested in Gemini.**

## What the subscription adds

I paid PLN 239.99 for a year of Plus: about USD 61 at [NBP's 8 October 2026 rate](https://api.nbp.pl/api/exchangerates/rates/a/usd/2026-10-08/?format=json) of PLN 3.9132 per USD. That is my purchase price, not a standing offer. [Plus](https://one.google.com/intl/en/about/google-ai-plans/) adds 400 GB for Gmail, Drive and Photos, advertised 2× Gemini access, and more research, notebook and media-generation usage. Features vary by region. With Gmail already in use, having Gemini close at hand is useful too.

The method does not require Plus. What I loosely call “tokens” here is the app's usage allowance, not a measured API token budget.

[Scheduled actions](https://support.google.com/gemini/answer/16316416?hl=en) can put those allowances to daily use with instructions prepared by the same skill. Google allows up to ten active actions and is rolling scheduling out to personal accounts without an AI plan too. An AI plan moves preparation into the hour before delivery; free accounts may prepare content several hours earlier. A daily report still needs a defined reporting window and working sources.

## Copy the meta skill

Create a Gemini skill named `xh`, with the description “Generate a task prompt when explicitly asked; do not apply when executing it.” Paste the proposed instructions below. They adapt the two-mode skill used in the trials; they are not a verbatim record of that tested version.

<details markdown="1">
<summary>Full meta-skill instructions — expand to copy</summary>

```plaintext
Turn the user's request into a complete, ready-to-run session prompt.
Do not answer the request, research it or execute the resulting prompt.
Apply this skill only when asked to generate or revise a task prompt.
Do not reapply it to go, n/NEXT or execution of a prompt already generated.
Output one plaintext code block containing the task prompt, followed by:
For interactive tasks: "Run this prompt in a normal Gemini session. Type go to start."
For scheduled tasks: "Use these instructions in a scheduled action and set its schedule."
For one-off unattended tasks: "Run these instructions once in a normal Gemini session."

Choose exactly one execution mode. Honour an explicitly requested mode first.
A scheduled action or recurring delivery means unattended mode; recognise
recurring/daily/regularly and Polish cyklicznie/regularnie/codziennie in context.
A one-off background task is also unattended, but does not imply recurrence.
Otherwise use interactive mode. Do not infer a schedule from the topic alone.
Do not output both alternatives unless asked.

The generated prompt must include:
1. The user's objective and deliverable. Preserve stated constraints.
   State assumptions; ask only for information that blocks useful work.
2. Relevant domain criteria, a bounded numbered plan and a completion condition.
   For comparisons, name the alternatives and shared criteria before the details.
3. A search protocol when the task needs current or external information:
   use available search, page access and Connected Apps as needed;
   open cited pages; use clickable Markdown links [name](URL) beside claims;
   link directly to products/articles; label category/search pages as leads;
   a retrieved URL alone is not verification: the page must support the claim;
   distinguish verified facts, opinions and uncertainty;
   disclose unavailable tools or unverified data, never invent evidence.
   Display results as normal Markdown, not inside code blocks.
4. A fixed per-item template tailored to the task. For buying advice include
   model/source link, use case, evidence, advantages, risks, suitability,
   current price/currency and a recommendation. Mark missing fields UNVERIFIED.
5. For interactive work: at most three items per batch; stop only if work remains.
   End with DONE / NEXT / UNVERIFIED. Keep the remaining plan visible.
   n or NEXT = next batch; d = expand the last batch;
   s = skip the next planned item and record the omission; x = stop.
6. Deliver the requested conclusion in the final batch without another go/n.
   For comparisons, include a recommendation and the evidence still missing.
7. For interactive work: wait for go unless the user already asked to execute.

For unattended work, generate self-contained instructions for one run.
Keep any requested schedule/time zone separate; do not invent or create a schedule.
Complete the report without go/n pauses or questions awaiting a human reply.
Use stated assumptions for non-blocking gaps; report blockers and finish useful work.
Preserve one reporting time window; never broaden it just to find more results.
For "last 24 hours", anchor it to the actual run time and state the checked interval.
State a missing window as an assumption. Stay within available tools and usage limits.
Use an "up to N" report limit where useful, not an obligation to fill N slots.
Do not promise all information or 100% coverage; report the scope actually checked.
Distinguish confirmed findings, no matching results, unverified leads and failed checks.
Compare with earlier runs only if their results are actually available.

Adapt these rules to the task. Do not add irrelevant fields or filler.
```

</details>

For a conversation, invoke `/xh` with your request, inspect the generated prompt, then run it in a normal Gemini turn with `go`; `n` continues unfinished work. For recurring work, include “scheduled action” and the schedule in your request, then use the generated instructions to set up the action. `/xh` is my chosen name, not a built-in command.

In my tests, Gmail was unavailable while using the skill. [Google documents Workspace support for skills](https://support.google.com/gemini/answer/18560919?hl=en-GB), so I cannot call this a general MCP restriction. I generate the prompt in the skill and execute it in the normal session with the required connections. Separately, [scripts bundled with skills cannot make internet requests](https://support.google.com/gemini/answer/17094296?hl=en); this does not prohibit Gemini itself from using supported Connected Apps.

This costs more turns and reading. The prompt cannot grant tool access or guarantee citations: I still open the links that carry the recommendation.

</div>

<div id="polski" class="post-language" lang="pl" markdown="1">

**TLDR:** Mój meta skill sprawia, że Gemini staje się dla mnie użyteczny nawet na szybkim Flashu: podaję jedno zdanie, a model sam rozpisuje instrukcje potrzebne do wykonania konkretnej pracy. To sposób na zdawkowe odpowiedzi i ciągłe dopominanie, mimo sporej dostępnej puli użycia — także bez Plus. Jeden skill przygotowuje pracę partiami albo pełny raport cykliczny.

Problem wygląda znajomo: krótki przegląd, propozycja kontynuacji, kolejna tura tłumaczenia, że chciałem właściwego porównania. Mam jeszcze z czego korzystać, ale kierowanie modelem zaczyna być osobną robotą. Z mojej strony wygląda to jak „oszczędzanie tokenów”; nie wiem, jaki mechanizm wewnętrzny za tym stoi.

## Niech Gemini rozpisze sobie zadanie

`/xh` to moja nazwa skilla do meta-promptów. Podaję intencję; skill pisze prompt zadania. Wykonanie jest osobnym krokiem w zwykłej wiadomości do Gemini. Dzięki temu proponowany zakres i kryteria widać, zanim zacznie się praca.

Istotne wymagania to wspólne kryteria porównania, źródła przy twierdzeniach, jawne braki w dowodach i warunek zakończenia. Ustawienie poziomu myślenia nie określi ich za mnie. Partie pozwalają kontrolować postęp; wykonanie bez mojego udziału wymaga pełnego raportu bez pauz na rozmowę.

Sedno: niech Gemini wykona także pracę rozpisania zadania. Miarą sukcesu jest mniej mojego sterowania do uzyskania użytecznego wyniku, nie sama długość odpowiedzi.

## Co zmieniło się w próbie

**Flash bez `/xh` kontra Flash wykonujący prompt z `/xh`.** Wszystkie próby były na Flashu we wspólnym interfejsie czatu aplikacji desktopowej i webowej Gemini. W obu przypadkach punktem wyjścia było: `Przejrzyj co się poleca kotom do zabawy. chcę kupić`. Porównujemy wykonane odpowiedzi; wygenerowany prompt jest krokiem pośrednim.

<div class="table-responsive" markdown="1">

| Co sprawdzamy | Flash: zwykła prośba | Flash: wykonany prompt z `/xh` |
|---|---|---|
| Zakres zapisanego wyniku | Pięć kategorii, przykładowe modele, porady o zabawie i bezpieczeństwie | Pierwsza partia: teleskopowa wędka z piórami, Cat Dancer, zabawka Aumüller |
| Konkret zakupowy | Ogólne kryteria wyboru; propozycja dopasowania do kota | Pola dla produktów, orientacyjne ceny i linki zakupowe |
| Co pozostaje | Zawęzić wybór | Sprawdzić twierdzenia i linki; dokończyć partie i porównanie |
{: .table}

</div>

<details markdown="1">
<summary>Materiał porównawczy: oryginalne fragmenty obu odpowiedzi Flasha</summary>

### Zwykłe zapytanie

Fragment odpowiedzi na zwykłą prośbę:

> **Polecane modele:** Wędki typu *Purr Propulsion* / *GoCat Da Bird* (z piórami, które kręcą się w powietrzu, wydając dźwięk przypominający lot ptaka) lub wędki z długim, elastycznym drutem i pękiem piór/skórzanych rzemieni na końcu.

> **Na co zwrócić uwagę:** Unikaj sztywnych patyków na krótkiej sznurówce; długa, giętka wędka pozwala na precyzyjne imitowanie ruchu ofiary (krycie się za meblami, odjeżdżanie od kota, a nie machanie mu przed nosem).

### Wygenerowany prompt wykonany w zwykłej sesji

Wywołałem `/xh` z tą samą prośbą, potem wpisałem `go` w zwykłej wiadomości do Gemini, bez ponownego wywołania skilla. Fragment otrzymanego opisu Cat Dancer:

> **Bezpieczeństwo i trwałość:** Bardzo wysoka trwałość metalowego drutu. Tekturowe elementy są bezpieczne dla kocich zębów i dziąseł, ale mocno eksploatowane z czasem ulegają zużyciu.
>
> **Orientacyjna cena:** ok. 15 – 20 PLN
>
> **Gdzie kupić / Link:** [Sprawdź Cat Dancer w Zooplus](https://www.zooplus.pl/shop/koty/zabawki_tunele_kota/wedki_dla_kota)

Po trzech pozycjach Gemini zatrzymał się tak:

```plaintext
Czekam na Twój sygnał (n lub NEXT), aby wygenerować kolejną partię rekomendacji.
```

</details>

Szczegóły produktów są użyteczne, ale link Cat Dancer prowadzi do kategorii, a link Allegro prowadził przez Google Search. Te odnośniki nie weryfikują podanych cen ani twierdzeń o bezpieczeństwie. Pierwsza partia nie jest ukończonym porównaniem zakupowym.

Ta próba łączy doprecyzowanie zadania z podziałem na partie. Nie oddziela korzyści ze skilla od korzyści z samodzielnego napisania równie dokładnej instrukcji ani nie porównuje taniego modelu z drogim.

## Ten sam skill do scheduled actions

Spróbowałem też: `/xh chciałbym cyklicznie sprawdzać newsy o kotach, daj mi jakieś`. Gemini zwrócił wariant cykliczny i konwersacyjny. Po `go with option a` utworzył „Raport o kotach — codziennie do 9:00”. To pokazuje utworzenie harmonogramu; nie zamieszczam tu wykonanego raportu z wiadomościami.

Mimo słowa „cyklicznie” skill zwrócił dwa tryby, a „ostatnie 24 godziny” rozszerzył do „ostatnie 24 godziny lub tydzień”. Proponowana wersja poniżej nakazuje wybór jednego trybu i zachowanie okna. **Ta wersja nie została ponownie przetestowana w Gemini.**

## Co wnosi abonament

Kupiłem rok Plus za 239,99 PLN, około 20 PLN miesięcznie. To cena mojego zakupu, nie stała oferta. [Plus](https://one.google.com/intl/en/about/google-ai-plans/) dodaje 400 GB dla Gmaila, Dysku i Zdjęć, reklamowany dwukrotnie większy dostęp do Gemini oraz większą pulę na research, notatniki i generowanie multimediów. Funkcje zależą od regionu. Gdy korzysta się już z Gmaila, Gemini pod ręką też się przydaje.

Metoda nie wymaga Plus. To, co potocznie nazywam tu „tokenami”, jest pulą użycia aplikacji, a nie zmierzonym budżetem tokenów API.

[Scheduled actions](https://support.google.com/gemini/answer/16316416?hl=en) pozwalają codziennie korzystać z tej puli według instrukcji przygotowanych przez ten sam skill. Google dopuszcza do dziesięciu aktywnych zadań i udostępnia harmonogramy także kontom osobistym bez planu AI. Plan AI przesuwa przygotowanie wyniku na godzinę przed dostarczeniem; konto bez planu może przygotować go kilka godzin wcześniej. Codzienny raport nadal potrzebuje określonego okna czasowego i działających źródeł.

## Meta skill do skopiowania

Utwórz w Gemini skill `xh` z opisem „Generuj prompt zadania na wyraźną prośbę; nie stosuj podczas jego wykonywania”. Wklej proponowane instrukcje poniżej. To adaptacja skilla z dwoma trybami użytego w próbach, a nie wierny zapis testowanej wersji.

<details markdown="1">
<summary>Pełne instrukcje meta skilla — rozwiń i skopiuj</summary>

```plaintext
Zamień prośbę użytkownika w kompletny prompt gotowy do uruchomienia w sesji.
Nie odpowiadaj na prośbę, nie wyszukuj informacji ani nie wykonuj tego promptu.
Stosuj ten skill tylko na prośbę o wygenerowanie lub zmianę promptu zadania.
Nie stosuj go ponownie do go, n/NEXT ani wykonania już wygenerowanego promptu.
Zwróć jeden blok kodu plaintext z promptem zadania, a pod nim:
Dla rozmowy: „Uruchom ten prompt w zwykłej sesji Gemini. Wpisz go.”
Dla zadania cyklicznego: „Użyj tych instrukcji w scheduled action i ustaw harmonogram.”
Dla jednorazowej pracy bez udziału człowieka: „Wykonaj te instrukcje raz w zwykłej sesji Gemini.”

Wybierz jeden tryb wykonania. Pierwszeństwo ma tryb wskazany wprost.
Scheduled action lub cykliczne dostarczanie wyniku oznacza pracę bez udziału człowieka;
rozpoznawaj cyklicznie/regularnie/codziennie i recurring/daily/regularly w kontekście.
Jednorazowe zadanie w tle też nie wymaga udziału człowieka, ale nie oznacza cykliczności.
W innych przypadkach wybierz rozmowę. Nie wnioskuj harmonogramu z samego tematu.
Nie zwracaj obu wariantów, chyba że użytkownik o to poprosi.

Wygenerowany prompt musi zawierać:
1. Cel i oczekiwany wynik. Zachowaj podane ograniczenia.
   Określ założenia; pytaj tylko o dane, bez których nie da się użytecznie działać.
2. Kryteria właściwe dla dziedziny, ograniczony numerowany plan i warunek zakończenia.
   Przy porównaniu pokaż warianty i wspólne kryteria przed szczegółami.
3. Protokół wyszukiwania, gdy zadanie potrzebuje informacji aktualnych lub zewnętrznych:
   używaj dostępnej wyszukiwarki, dostępu do stron i połączonych aplikacji;
   otwieraj cytowane strony; dodawaj klikalne linki Markdown [nazwa](URL) przy tezach;
   linkuj bezpośrednio produkty/artykuły; kategorie i wyszukiwarki oznacz jako tropy;
   sam znaleziony URL nie jest weryfikacją: treść strony musi potwierdzać tezę;
   oddzielaj sprawdzone fakty, opinie i niepewność;
   ujawniaj niedostępne narzędzia i niesprawdzone dane, nie wymyślaj dowodów.
   Wyniki prezentuj jako zwykły Markdown, nie w blokach kodu.
4. Stały szablon pozycji dopasowany do zadania. Przy poradach zakupowych uwzględnij
   model/link do źródła, zastosowanie, dowody, zalety, ryzyka, dopasowanie,
   aktualną cenę/walutę i rekomendację. Braki oznacz NIESPRAWDZONE.
5. Przy rozmowie: najwyżej trzy pozycje w partii; pauza tylko gdy zostało coś do zrobienia.
   Kończ przez ZROBIONE / NASTĘPNE / NIESPRAWDZONE. Pokazuj pozostały plan.
   n lub NEXT = następna partia; d = rozwiń ostatnią partię;
   s = pomiń następną zaplanowaną pozycję i odnotuj pominięcie; x = stop.
6. W ostatniej partii podaj wnioski bez dodatkowego go/n.
   Przy porównaniu dodaj rekomendację i brakujące dowody.
7. Przy rozmowie: czekaj na go, chyba że użytkownik już polecił wykonanie.

Dla pracy bez udziału człowieka wygeneruj samodzielne instrukcje jednego uruchomienia.
Podany harmonogram i strefę zachowaj osobno; nie wymyślaj ani nie twórz harmonogramu.
Kończ raport bez pauz go/n i bez pytań oczekujących na odpowiedź człowieka.
Przy nieblokujących brakach podaj założenia; zgłoś blokady i wykonaj możliwą część pracy.
Zachowaj jedno okno raportu; nie rozszerzaj go tylko po to, by znaleźć więcej wyników.
„Ostatnie 24 godziny” licz od faktycznej chwili wykonania i podaj sprawdzony przedział.
Brakujące okno określ jako założenie. Działaj w granicach dostępnych narzędzi i limitów.
W razie potrzeby ogranicz raport przez „do N”, nie obowiązek zapełnienia N pozycji.
Nie obiecuj wszystkich informacji ani 100% pokrycia; podaj faktycznie sprawdzony zakres.
Oddzielaj potwierdzone wyniki, brak pasujących wyników, niesprawdzone tropy i błędy sprawdzenia.
Porównuj z wcześniejszymi uruchomieniami tylko wtedy, gdy masz ich rzeczywiste wyniki.

Dostosuj zasady do zadania. Nie dodawaj zbędnych pól ani wypełniaczy.
```

</details>

Dla rozmowy wywołaj `/xh` ze swoją prośbą, sprawdź wygenerowany prompt i uruchom go w zwykłej wiadomości do Gemini przez `go`; `n` kontynuuje niedokończoną pracę. Dla zadania cyklicznego dopisz w prośbie „scheduled action” i harmonogram, a następnie użyj wygenerowanych instrukcji do ustawienia zadania. `/xh` to moja nazwa, nie wbudowana komenda.

W moich testach Gmail był niedostępny podczas używania skilla. [Google dokumentuje obsługę Workspace przez skille](https://support.google.com/gemini/answer/18560919?hl=en-GB), więc nie mogę nazwać tego ogólnym ograniczeniem MCP. Generuję prompt w skillu, a wykonuję go w zwykłej sesji z potrzebnymi połączeniami. Osobno: [skrypty dołączone do skilli nie mogą wykonywać żądań internetowych](https://support.google.com/gemini/answer/17094296?hl=en); to nie zakazuje samemu Gemini korzystania z obsługiwanych połączonych aplikacji.

Płacę za to większą liczbą tur i większą ilością czytania. Prompt nie daje dostępu do narzędzi ani nie gwarantuje wiarygodności cytowań: linki, na których opiera się rekomendacja, nadal otwieram sam.

</div>
