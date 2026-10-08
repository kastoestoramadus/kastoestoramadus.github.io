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

So I ask Gemini to write the instructions that push it beyond that default: examine each candidate, search for evidence, fill the relevant fields and carry the work through. `/xh` is my chosen skill name. It generates the prompt; I type `go` and that's it, the long prompt runs.

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

## Copy the meta skill
{: #copy-skill-en}

Create a Gemini skill named `xh`, with the description “Generate a task prompt when explicitly asked; do not apply when executing it.” Paste the proposed instructions below.

<details markdown="1">
<summary>Full meta-skill instructions — expand to copy</summary>

```plaintext
Skill name: xh

Description field:
Turns short user intentions into complete, uncompromising session prompts that force maximum effort, deep fact verification and work in batches.

Instructions:
## Structure of the generated prompt

When the user asks for a prompt for a new session, generate a ready block of text containing:

1. **An extreme role and rigour:** impose an expert role and forbid any saving of tokens, any shortening and any vague generalities.
2. **An active search mandate (search protocol):** instruct the model explicitly to call Google Search for every point, verify facts, and produce working links in Markdown format `[Name](URL)`.
3. **Flow control and a continuation mark:** split the work into small batches (for example four items) and require an immediate pause after each batch. Use `n` or the word `NEXT` as the continuation mark.
4. **A rigid data template:** an exact matrix of fields the model must fill for every item, with no section skippable. Separate every item with a blank line.
5. **Autonomy and self-reliance:** perform all searching and analysis without asking the user for permission, and use CAPITALS only when a human action is required.
```

</details>

To use it, invoke `/xh` with your request, then run it in a normal Gemini turn with `go`; `n` continues unfinished work. `/xh` is my chosen name, not a built-in command.

Important: [scripts bundled with skills cannot make internet requests](https://support.google.com/gemini/answer/17094296?hl=en); hence printing the prompt into the session first and only then executing it.

</div>

<div id="polski" class="post-language" lang="pl" markdown="1">

**TLDR:** Mam sporą pulę użycia Gemini, nawet bez Plus, ale jego zdawkowe odpowiedzi zostawiają mi dużą część pracy. Mój sposób: niech Gemini sam sobie powie, jak pracować intensywniej. Meta skill zamienia jedno zdanie w wymagające instrukcje, dzięki którym nawet szybki Flash staje się dla mnie użyteczny, bez ręcznego rozpisywania tych instrukcji za każdym razem.

**Wypróbuj od razu:** [skopiuj skill poniżej](#copy-skill-pl) i skorzystaj z [instrukcji tworzenia skilli Google](https://support.google.com/gemini/answer/17094296?hl=pl). Skill to zapisany zestaw instrukcji do wielokrotnego użycia w czatach Gemini. Ten jest *meta* skillem, bo pisze instrukcje następnego zadania.

## Niech Gemini sam sobie powie, jak pracować intensywniej

Inne AI, z których korzystam, wykonują tę pracę bez takiego meta skilla. W Gemini ciągle dostawałem przegląd i propozycję kontynuacji. Mógłbym sam rozpisać wszystkie wymagania, ale wtedy tracę wygodę asystenta. Wygląda to jak narzucone „oszczędzanie tokenów”, choć nie widzę mechanizmu, który za tym stoi.

Proszę więc Gemini, żeby sam napisał instrukcje skłaniające go do wyjścia poza ten domyślny wynik: przeanalizuj każdego kandydata, poszukaj dowodów, wypełnij istotne pola i wykonaj pracę do końca. `/xh` to moja nazwa skilla. Generuje prompt; wpisuję `uruchom` i gotowe, długi prompt się wykonuje.

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

## Meta skill do skopiowania
{: #copy-skill-pl}

Utwórz w Gemini skill `xh` z opisem „Generuj prompt zadania na wyraźną prośbę; nie stosuj podczas jego wykonywania”. Wklej proponowane instrukcje poniżej.

<details markdown="1">
<summary>Pełne instrukcje meta skilla — rozwiń i skopiuj</summary>

```plaintext
Nazwa skilla: xh

Pole Opis: Przekształca krótkie intencje użytkownika w kompletne, bezkompromisowe prompty sesyjne, które wymuszają na modelu maksymalny wysiłek, głęboką weryfikację faktów i pracę w partiach.

Instrukcje:
## Konstrukcja Generowanego Prompta

Gdy użytkownik prosi o przygotowanie prompta do nowej sesji, wygeneruj gotowy blok tekstu, który zawiera:

1. **Ekstremalną Rolę i Rygor:** Narzucenie roli eksperta i zakaz jakiegokolwiek oszczędzania tokenów, skracania czy pisania ogólnikami.
2. **Aktywny Nakaz Wyszukiwania (Search Protocol):** Wprost nakazuje modelowi wywoływanie narzędzia Google Search dla każdego punktu, weryfikowanie faktów i generowanie aktywnych linków w formacie Markdown `[Nazwa](URL)`.
3. **Sterowanie Przepływem i Znak Kontynuacji:** Dzielenie pracy na małe partie (np. po 4 pozycje) i wymóg natychmiastowej pauzy po każdej partii. Jako znak kontynuacji używa znaku `n` lub słowa `NEXT`.
4. **Sztywny Szablon Danych:** Dokładna matryca pól, które model musi wypełnić dla każdego punktu (brak możliwości pominięcia sekcji). Każda pozycja oddzielona pustą linią.
5. **Autonomia i Samodzielność:** Nakaz wykonywania wszystkich akcji wyszukiwania i analizy bez pytania użytkownika o zgodę, a używanie DUŻYCH LITER tylko w sytuacji, gdy wymagana jest akcja ze strony człowieka.
```

</details>

Aby użyć skilla, wywołaj `/xh` ze swoją prośbą i uruchom go w zwykłej wiadomości do Gemini przez `go`; `n` kontynuuje niedokończoną pracę. `/xh` to moja nazwa, nie wbudowana komenda.

Ważne: [skrypty dołączone do skilli nie mogą wykonywać żądań internetowych](https://support.google.com/gemini/answer/17094296?hl=pl); stąd wydrukowanie najpierw prompta nam do sesji i dopiero po nim jego wykonanie.

</div>
