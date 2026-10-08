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

So I ask Gemini to write the instructions that push it beyond that default: examine each perspective, search for evidence, fill the relevant fields and carry the work through. `/xh` is my chosen skill name. It generates the prompt; I type `go` and that's it, the long prompt runs.

“Work harder” means more of the requested work gets done. More words alone would not help.

## What changed in the trial

**Flash without `/xh` versus Flash executing the prompt from `/xh`.** All the trials used Flash through Gemini's desktop/web chat interface. We compare executed answers; the generated prompt is the intermediate step.

The four sessions below show **answer excerpts**; the Polish ones are translated from the [Polish originals](#polski). The right-hand results are the first batches, not the whole job.

**Example one - a shopping brief.** The input in both cases was `Review recommended cat toys. I want to buy some.`

<div class="session-comparison" markdown="1">
<section class="session-panel" aria-labelledby="session-plain-en" markdown="1">

### Flash: plain request - cat toys
{: #session-plain-en}

**Input:** `Review recommended cat toys. I want to buy some.`

**Answer excerpt — wands:**

> **Recommended models:** *Purr Propulsion* / *GoCat Da Bird* wands (with feathers that spin in the air, making a sound resembling a bird in flight), or wands with a long, flexible wire and a bunch of feathers/leather strips at the end.

> **What to look for:** Avoid rigid sticks with a short cord; a long, flexible wand lets you imitate prey precisely (hiding behind furniture, moving away from the cat, rather than waving it in front of its nose).

</section>
<section class="session-panel" aria-labelledby="session-skill-en" markdown="1">

### Flash: after `/xh` - cat toys
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

The baseline was already useful as an overview. The change I wanted was product-by-product work with prices and links.

**Example two - a conceptual question.** The question in both cases was `czym jest bóg?` (what is God), asked in Polish.

<div class="session-comparison" markdown="1">
<section class="session-panel" aria-labelledby="session-god-plain-en" markdown="1">

### Flash: plain request - what is God
{: #session-god-plain-en}

**Input:** `czym jest bóg?`

**Answer excerpt - the opening (translated):**

> The question of what God is touches the very fabric of human reflection - and depending on the perspective from which we look at it, the answer takes a completely different shape. There is no single coherent definition, because the history of humanity has produced several fundamentally different approaches.

**Answer excerpt - the first perspective (translated):**

> **1. Theistic view (monotheistic religions)** In Christianity, Judaism and Islam God is understood as a personal, transcendent being - the Creator of the universe, who exists beyond time and space, but at the same time enters history and enters into a relationship with people. He is characterised by absolute perfection, omnipotence, omniscience and complete goodness.

**Answer excerpt - the closing lines (translated):**

> What God is, then, depends on whether we are looking for a Person, a personal Meaning, a Law of Nature, an ultimate Cause or a Structure of our own psyche. Which of these perspectives is closest to you, or from what angle would you like to explore this concept further?

</section>
<section class="session-panel" aria-labelledby="session-god-skill-en" markdown="1">

### Flash: after `/xh` - what is God
{: #session-god-skill-en}

**Input:** `/xh czym jest bóg`, then `wykonaj` (run) without invoking the skill again.

**Answer excerpt - the first module of batch one (translated):**

> **1. CLASSICAL THEISM AND MONOTHEISTIC RELIGIONS**
>
> **Ontological framework:** God is understood as a personal being, wholly transcendent with respect to creation, existing necessarily beyond time (eternity as *nunc stans*) and space. He is characterised by absolute ontological simplicity (*divina simplicitas*), which means that in God there is no division into act and potency, essence and existence, or attributes and their subject. God creates the world *ex nihilo* (out of nothing) and sustains it in being (*creatio continua*), yet without entering into a relation of ontological dependence with it - the world depends on God, but God in his essence does not depend on the world.
>
> **Nuance and distinguishing subtleties:** classical theism vs Open Theism: classical theism assumes absolute immutability (*immutabilitas*), impassibility (*impassibilitas*) and God's absolute omniscience covering all future contingent events. Open theism rejects the traditional conception of immutability and of full deterministic knowledge of the future of free beings; God is framed there as a relational, dynamic subject, entering a genuine dialogue with time and human decisions, voluntarily limiting his absolute insight into the future.
>
> **Main representatives and works, step by step:** St Thomas Aquinas (*Summa Theologiae*): God as *Ipsum Esse Subsistens* (self-subsistent pure existence). Aquinas argues that in every created being existence (*esse*) differs from essence (*essentia*). To avoid an infinite regress in the chain of causes, there must exist a being in which essence *is* existence. That being is God. Al-Ghazali (*Tahafut al-Falasifa* / *The Incoherence of the Philosophers*): defends rigorous Islamic monotheism (Tawhid) against the Neoplatonising Islamic philosophers (Avicenna). Al-Ghazali argues for the creation of the world in time by God's free, personal will, rejecting the conception of an eternal, necessary emanation.
>
> **Criticism and weak points:** the problem of evil (Epicurus / Mackie) - the impossibility of reconciling omnipotence, omnibenevolence and omniscience with the fact of undeserved suffering; the paradox of omnipotence (can God create a stone he cannot lift?); the contradiction between God's immutability and impassibility and his personal care and the hearing of prayers.
>
> **Verification / sources:** Stanford Encyclopedia of Philosophy: Classical Theism | SEP: Open Theism

Batch one holds three modules (classical theism, the philosophical Absolute, pantheism and process thought); the remaining six wait for `NEXT`.

</section>
</div>

Both answers are useful, and the difference is in the shape. The baseline surveys five perspectives in a page and ends by asking which one to explore; the prompt from `/xh` opens a nine-module plan and delivers the first batch as specified: ontological framework, the nuances that blur in everyday use, two named works with their arguments, and the standard objections. It stops after the batch instead of handing the choice back to me.

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

Proszę więc Gemini, żeby sam napisał instrukcje skłaniające go do wyjścia poza ten domyślny wynik: przeanalizuj każdą perspektywę, poszukaj dowodów, wypełnij istotne pola i wykonaj pracę do końca. `/xh` to moja nazwa skilla. Generuje prompt; wpisuję `uruchom` i gotowe, długi prompt się wykonuje.

„Pracować intensywniej” oznacza wykonać więcej zleconej pracy. Sama większa liczba słów niczego nie załatwia.

## Co zmieniło się w próbie

**Flash bez `/xh` kontra Flash wykonujący prompt z `/xh`.** Wszystkie próby były na Flashu we wspólnym interfejsie czatu aplikacji desktopowej i webowej Gemini. Porównujemy wykonane odpowiedzi; wygenerowany prompt jest krokiem pośrednim.

Poniżej **oryginalne fragmenty odpowiedzi** z czterech sesji. Po prawej stronie są pierwsze partie, nie wynik całego zadania.

**Przykład pierwszy — zakupy dla kota.** W obu przypadkach punktem wyjścia było: `Przejrzyj co się poleca kotom do zabawy. chcę kupić`.

<div class="session-comparison" markdown="1">
<section class="session-panel" aria-labelledby="session-plain-pl" markdown="1">

### Flash: zwykła prośba — zakupy dla kota
{: #session-plain-pl}

**Polecenie:** `Przejrzyj co się poleca kotom do zabawy. chcę kupić`

**Fragment odpowiedzi — wędki:**

> **Polecane modele:** Wędki typu *Purr Propulsion* / *GoCat Da Bird* (z piórami, które kręcą się w powietrzu, wydając dźwięk przypominający lot ptaka) lub wędki z długim, elastycznym drutem i pękiem piór/skórzanych rzemieni na końcu.

> **Na co zwrócić uwagę:** Unikaj sztywnych patyków na krótkiej sznurówce; długa, giętka wędka pozwala na precyzyjne imitowanie ruchu ofiary (krycie się za meblami, odjeżdżanie od kota, a nie machanie mu przed nosem).

</section>
<section class="session-panel" aria-labelledby="session-skill-pl" markdown="1">

### Flash: po `/xh` — zakupy dla kota
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

Zwykła odpowiedź już była użyteczna jako przegląd. Zależało mi jednak na pracy produkt po produkcie, z cenami i linkami.

**Przykład drugi — pytanie pojęciowe.** W obu przypadkach punktem wyjścia było pytanie: `czym jest bóg?`.

<div class="session-comparison" markdown="1">
<section class="session-panel" aria-labelledby="session-god-plain-pl" markdown="1">

### Flash: zwykła prośba — czym jest bóg
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

### Flash: po `/xh` — czym jest bóg
{: #session-god-skill-pl}

**Polecenie:** `/xh czym jest bóg`, potem `wykonaj` bez ponownego wywołania skilla.

**Fragment odpowiedzi — pierwszy moduł pierwszej partii:**

> **1. TEIZM KLASYCZNY I RELIGIE MONOTEISTYCZNE**
>
> **Ramy Ontologiczne:** Bóg jest rozumiany jako byt osobowy, całkowicie transcendentny wobec stworzenia, istniejący w sposób konieczny poza czasem (wieczność jako nunc stans) i przestrzenią. Cechuje go absolutna prostota ontologiczna (divina simplicitas), co oznacza, że w Bogu nie ma podziału na akty i możności, istotę i istnienie, czy cechy i ich podmiot. Bóg stwarza świat ex nihilo (z niczego) i podtrzymuje go w istnieniu (creatio continua), nie wchodząc z nim jednak w relację zależności ontologicznej — świat zależy od Boga, ale Bóg w swojej istocie nie zależy od świata.
>
> **Niuans i Subtelności Różnicujące:** Teizm Klasyczny vs Teizm Otwarty (Open Theism): teizm klasyczny zakłada absolutną niezmienność (immutabilitas), beznamiętność (impassibilitas) oraz bezwzględną wszechwiedzę Boga obejmującą wszystkie przyszłe zdarzenia przygodne. Teizm otwarty odrzuca tradycyjną koncepcję niezmienności i pełnej deterministycznej wiedzy o przyszłości wolnych istot; Bóg jest w nim ujęty jako podmiot relacyjny, dynamiczny, wchodzący w autentyczny dialog z czasem i ludzkimi decyzjami, dobrowolnie ograniczający swój absolutny wgląd w przyszłość.
>
> **Główni Przedstawiciele i Dzieła Krok po Kroku:** Św. Tomasz z Akwinu (Summa Theologiae): Bóg jako Ipsum Esse Subsistens (Samoistne Czyste Istnienie). Tomasz argumentuje, że w każdym bycie stworzonym istnienie (esse) różni się od istoty (essentia). Aby uniknąć regresu w nieskończoność w łańcuchu przyczyn, musi istnieć byt, w którym istota JEST istnieniem. Tym bytem jest Bóg. Al-Ghazali (Tahafut al-Falasifa / Niezborność filozofów): Broni rygorystycznego monoteizmu islamskiego (Tawhid) przeciwko neoplatonizującym filozofom islamskim (Avicennie). Al-Ghazali argumentuje na rzecz stworzenia świata w czasie przez wolną, osobową wolę Boga, odrzucając koncepcję wiecznej, koniecznej emanacji.
>
> **Krytyka i Słabe Punkty:** Problem Zła (Epicurus / Mackie) — niemożność pogodzenia wszechmocy, wszechdobroci i wszechwiedzy z faktem istnienia niezasłużonego cierpienia; paradoks wszechmocy (czy Bóg może stworzyć kamień, którego nie zdoła podnieść?); sprzeczność między niezmiennością i beznamiętnością Boga a Jego osobową troską i wysłuchiwaniem modlitw.
>
> **Weryfikacja / Źródła:** Stanford Encyclopedia of Philosophy: Classical Theism | SEP: Open Theism

Pierwsza partia to trzy moduły (teizm klasyczny, Absolut filozoficzny, panteizm i filozofia procesu); pozostałe sześć czekają na `NEXT`.

</section>
</div>

Obie odpowiedzi są użyteczne, a różnica jest w kształcie. Zwykła odpowiedź przerzuca pięć perspektyw na jednej stronie i kończy pytaniem, którą pogłębić; prompt z `/xh` otwiera dziewięciomodułowy plan i dostarcza pierwszą partię zgodnie ze sztywnym szablonem: ramy ontologiczne, niuanse różnicujące, dwóch nazwanych przedstawicieli z argumentacją i standardową krytykę. Partia kończy się sama, zamiast oddawać mi decyzję.

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
