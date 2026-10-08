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

**TLDR:** I have plenty of Gemini usage available, even without Plus, but its short answers leave much of the work to me. My workaround: let Gemini tell itself how to work harder. A reusable meta skill turns one line into demanding instructions, making even fast Flash useful to me without my writing those instructions each time.

**Try it now:** [copy the skill below](#copy-skill-en) and follow [Google's skill-creation guide](https://support.google.com/gemini/answer/17094296?hl=en-GB). A skill is a saved set of instructions you can reuse in Gemini chats. This one is a *meta* skill because it writes the instructions for the next task.

## Let Gemini tell itself how to work harder

Other AI assistants I use do this work without such a meta skill. With Gemini, I kept getting an overview and an offer to continue. I could spell out every requirement myself, but that defeats the convenience of a chat assistant. It feels like enforced “token saving”, though I cannot see the mechanism behind it.

So I ask Gemini to write the instructions that push it beyond that default: examine each candidate, search for evidence, fill the relevant fields and carry the work through. `/xh` is my chosen skill name. It generates the prompt; a normal Gemini turn executes it.

“Work harder” means more of the requested work gets done. More words alone would not help.

## What changed in the trial

**Flash without `/xh` versus Flash executing the prompt from `/xh`.** All the trials used Flash through Gemini's desktop/web chat interface. The input in both cases was: `Review recommended cat toys. I want to buy some.` We compare executed answers; the generated prompt is the intermediate step.

The two sessions below show **answer excerpts**, translated from the [Polish originals](#polski). The right-hand result is the first batch, not the whole job.

<div class="session-comparison" markdown="1">
<section class="session-panel" aria-labelledby="session-plain-en" markdown="1">

### Flash: plain request
{: #session-plain-en}

**Input:** `Review recommended cat toys. I want to buy some.`

**Answer excerpt — wands:**

> **Recommended models:** *Purr Propulsion* / *GoCat Da Bird* wands (with feathers that spin in the air, making a sound resembling a bird in flight), or wands with a long, flexible wire and a bunch of feathers/leather strips at the end.

> **What to look for:** Avoid rigid sticks with a short cord; a long, flexible wand lets you imitate prey precisely (hiding behind furniture, moving away from the cat, rather than waving it in front of its nose).

</section>
<section class="session-panel" aria-labelledby="session-skill-en" markdown="1">

### Flash: after `/xh`
{: #session-skill-en}

**Input:** `/xh Review recommended cat toys. I want to buy some.`, then `go` without invoking the skill again.

**Answer excerpt — Cat Dancer:**

> **Why it is worth considering (behaviourist's perspective):** An exceptionally simple yet ingenious design. The springy metal wire makes the rolled-up pieces of cardboard at the end move unpredictably, imitating flying insects. It is well suited to cats that quickly lose interest in conventional soft toys.

> **Safety and durability:** Very high durability of the metal wire. The cardboard elements are safe for cats' teeth and gums, but wear out with heavy use.
>
> **Approximate price:** around 15–20 PLN.
>
> **Where to buy / link:** [Check Cat Dancer at Zooplus](https://www.zooplus.pl/shop/koty/zabawki_tunele_kota/wedki_dla_kota)

After three entries:

```plaintext
Waiting for your signal (n or NEXT) to generate the next batch of recommendations.
```

</section>
</div>

The baseline was already useful as an overview. The change I wanted was product-by-product work with prices and links. The links still fall short: Cat Dancer leads to a category, and the Allegro link went through Google Search. They do not verify the quoted prices or safety claims.

This trial combines a more specific brief with batching. It does not isolate the benefit of the meta skill over writing that same brief myself, or compare cheap and expensive models.

## One skill, two ways to run the work

<div class="table-responsive" markdown="1">

| | Interactive chat | Scheduled action |
|---|---|---|
| Ask `/xh` for | A task to work through in chat | A recurring task, with its schedule |
| Execution | `go` starts; `n` / `NEXT` continues batches | Each run delivers the report without waiting for me |
| Control | I can inspect a batch and redirect the work | Scope, sources and reporting window must be set in advance |
{: .table}

</div>

I also tried: `/xh I'd like to check cat news regularly; give me some.` Gemini returned a scheduled and an interactive variant. After `go with option a`, it created “Cat report — every day by 9 AM”. This demonstrates creating the schedule; I have not included an executed news report here.

## Copy the meta skill
{: #copy-skill-en}

Create a Gemini skill named `xh`, with the description “Generate a task prompt when explicitly asked; do not apply when executing it.” Paste the proposed instructions below. They adapt the two-mode skill used in the trials; they are not a verbatim record of that tested version.

<details markdown="1">
<summary>Full meta-skill instructions — expand to copy</summary>

```plaintext
Turn the user's request into a complete, ready-to-run session prompt.
Its purpose is to make Gemini do thorough work instead of defaulting to an overview.
Require substantive detail, active investigation and completion of the stated scope.
Do not drop relevant work merely to shorten the answer or offer to do it later.
Spend available output on evidence and analysis, not repetition or decorative prose.
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

For a conversation, invoke `/xh` with your request, then run it in a normal Gemini turn with `go`; `n` continues unfinished work. For recurring work, include “scheduled action” and the schedule in your request, then use the generated instructions to set up the action. `/xh` is my chosen name, not a built-in command.

Important: [scripts bundled with skills cannot make internet requests](https://support.google.com/gemini/answer/17094296?hl=en); hence printing the prompt into the session first and only then executing it.

</div>

<div id="polski" class="post-language" lang="pl" markdown="1">

**TLDR:** Mam sporą pulę użycia Gemini, nawet bez Plus, ale jego zdawkowe odpowiedzi zostawiają mi dużą część pracy. Mój sposób: niech Gemini sam sobie powie, jak pracować intensywniej. Meta skill zamienia jedno zdanie w wymagające instrukcje, dzięki którym nawet szybki Flash staje się dla mnie użyteczny, bez ręcznego rozpisywania tych instrukcji za każdym razem.

**Wypróbuj od razu:** [skopiuj skill poniżej](#copy-skill-pl) i skorzystaj z [instrukcji tworzenia skilli Google](https://support.google.com/gemini/answer/17094296?hl=pl). Skill to zapisany zestaw instrukcji do wielokrotnego użycia w czatach Gemini. Ten jest *meta* skillem, bo pisze instrukcje następnego zadania.

## Niech Gemini sam sobie powie, jak pracować intensywniej

Inne AI, z których korzystam, wykonują tę pracę bez takiego meta skilla. W Gemini ciągle dostawałem przegląd i propozycję kontynuacji. Mógłbym sam rozpisać wszystkie wymagania, ale wtedy tracę wygodę asystenta. Wygląda to jak narzucone „oszczędzanie tokenów”, choć nie widzę mechanizmu, który za tym stoi.

Proszę więc Gemini, żeby sam napisał instrukcje skłaniające go do wyjścia poza ten domyślny wynik: przeanalizuj każdego kandydata, poszukaj dowodów, wypełnij istotne pola i wykonaj pracę do końca. `/xh` to moja nazwa skilla. Generuje prompt; zwykła wiadomość do Gemini uruchamia wykonanie.

„Pracować intensywniej” oznacza wykonać więcej zleconej pracy. Sama większa liczba słów niczego nie załatwia.

## Co zmieniło się w próbie

**Flash bez `/xh` kontra Flash wykonujący prompt z `/xh`.** Wszystkie próby były na Flashu we wspólnym interfejsie czatu aplikacji desktopowej i webowej Gemini. W obu przypadkach punktem wyjścia było: `Przejrzyj co się poleca kotom do zabawy. chcę kupić`. Porównujemy wykonane odpowiedzi; wygenerowany prompt jest krokiem pośrednim.

Poniżej **oryginalne fragmenty odpowiedzi** z dwóch sesji. Po prawej jest pierwsza partia, nie wynik całego zadania.

<div class="session-comparison" markdown="1">
<section class="session-panel" aria-labelledby="session-plain-pl" markdown="1">

### Flash: zwykła prośba
{: #session-plain-pl}

**Polecenie:** `Przejrzyj co się poleca kotom do zabawy. chcę kupić`

**Fragment odpowiedzi — wędki:**

> **Polecane modele:** Wędki typu *Purr Propulsion* / *GoCat Da Bird* (z piórami, które kręcą się w powietrzu, wydając dźwięk przypominający lot ptaka) lub wędki z długim, elastycznym drutem i pękiem piór/skórzanych rzemieni na końcu.

> **Na co zwrócić uwagę:** Unikaj sztywnych patyków na krótkiej sznurówce; długa, giętka wędka pozwala na precyzyjne imitowanie ruchu ofiary (krycie się za meblami, odjeżdżanie od kota, a nie machanie mu przed nosem).

</section>
<section class="session-panel" aria-labelledby="session-skill-pl" markdown="1">

### Flash: po `/xh`
{: #session-skill-pl}

**Polecenie:** `/xh Przejrzyj co się poleca kotom do zabawy. chcę kupić`, potem `go` bez ponownego wywołania skilla.

**Fragment odpowiedzi — Cat Dancer:**

> **Dlaczego warto (Perspektywa behawiorysty):** Wyjątkowo prosta, a zarazem genialna konstrukcja. Sprężysty metalowy drut sprawia, że zwinięte kawałki tektury na końcu poruszają się w sposób całkowicie nieprzewidywalny, udając latające owady. Doskonale sprawdzi się u kotów, które szybko nudzą się klasycznymi pluszakami.

> **Bezpieczeństwo i trwałość:** Bardzo wysoka trwałość metalowego drutu. Tekturowe elementy są bezpieczne dla kocich zębów i dziąseł, ale mocno eksploatowane z czasem ulegają zużyciu.
>
> **Orientacyjna cena:** ok. 15 – 20 PLN
>
> **Gdzie kupić / Link:** [Sprawdź Cat Dancer w Zooplus](https://www.zooplus.pl/shop/koty/zabawki_tunele_kota/wedki_dla_kota)

Po trzech pozycjach:

```plaintext
Czekam na Twój sygnał (n lub NEXT), aby wygenerować kolejną partię rekomendacji.
```

</section>
</div>

Zwykła odpowiedź już była użyteczna jako przegląd. Zależało mi jednak na pracy produkt po produkcie, z cenami i linkami. Te ostatnie nadal zawodzą: Cat Dancer prowadzi do kategorii, a link Allegro prowadził przez Google Search. Nie weryfikują podanych cen ani twierdzeń o bezpieczeństwie.

Ta próba łączy doprecyzowanie zadania z podziałem na partie. Nie oddziela korzyści ze skilla od korzyści z samodzielnego napisania równie dokładnej instrukcji ani nie porównuje taniego modelu z drogim.

## Jeden skill, dwa sposoby wykonania

<div class="table-responsive" markdown="1">

| | Rozmowa | Scheduled action |
|---|---|---|
| O co proszę `/xh` | Zadanie do przejścia w czacie | Zadanie cykliczne z harmonogramem |
| Wykonanie | `go` uruchamia; `n` / `NEXT` kontynuuje partie | Każde uruchomienie daje raport bez czekania na mnie |
| Kontrola | Mogę sprawdzić partię i skorygować kierunek | Zakres, źródła i okno raportu trzeba określić z góry |
{: .table}

</div>

Spróbowałem też: `/xh chciałbym cyklicznie sprawdzać newsy o kotach, daj mi jakieś`. Gemini zwrócił wariant cykliczny i konwersacyjny. Po `go with option a` utworzył „Raport o kotach — codziennie do 9:00”. To pokazuje utworzenie harmonogramu; nie zamieszczam tu wykonanego raportu z wiadomościami.

## Meta skill do skopiowania
{: #copy-skill-pl}

Utwórz w Gemini skill `xh` z opisem „Generuj prompt zadania na wyraźną prośbę; nie stosuj podczas jego wykonywania”. Wklej proponowane instrukcje poniżej. To adaptacja skilla z dwoma trybami użytego w próbach, a nie wierny zapis testowanej wersji.

<details markdown="1">
<summary>Pełne instrukcje meta skilla — rozwiń i skopiuj</summary>

```plaintext
Zamień prośbę użytkownika w kompletny prompt gotowy do uruchomienia w sesji.
Celem jest skłonienie Gemini do wytężonej pracy zamiast domyślnego przeglądu.
Wymagaj istotnych szczegółów, aktywnego sprawdzania i wykonania podanego zakresu.
Nie pomijaj potrzebnej pracy tylko po to, by skrócić odpowiedź lub zaoferować ją później.
Wykorzystaj dostępne wyjście na dowody i analizę, nie powtórzenia i ozdobniki.
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

Dla rozmowy wywołaj `/xh` ze swoją prośbą i uruchom go w zwykłej wiadomości do Gemini przez `go`; `n` kontynuuje niedokończoną pracę. Dla zadania cyklicznego dopisz w prośbie „scheduled action” i harmonogram, a następnie użyj wygenerowanych instrukcji do ustawienia zadania. `/xh` to moja nazwa, nie wbudowana komenda.

Ważne: [skrypty dołączone do skilli nie mogą wykonywać żądań internetowych](https://support.google.com/gemini/answer/17094296?hl=pl); stąd wydrukowanie najpierw prompta nam do sesji i dopiero po nim jego wykonanie.

</div>
