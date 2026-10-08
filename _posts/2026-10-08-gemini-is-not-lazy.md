---
layout: post
section-type: post
title: Gemini is not lazy, it is brief
category: dev
tags: [ 'ai', 'gemini', 'prompt-engineering' ]
---
*(Polish readers: a full Polish version is at the end of this post.)*

A paid Gemini answers like a colleague with somewhere else to be: three confident paragraphs, a summary of the summary, and an offer to continue if I would like. Everyone reads that as laziness. Google's own prompt guide says it out loud - Gemini 3 models "provide direct and efficient answers" by default, and "if you need a more conversational or detailed response, you must explicitly request it in your instructions". Brevity is the factory setting, not a fault.

I bought a year of Google AI Plus on the 400 GB tier for 239,99 zł - twenty zł a month. The model in the box is the same one the expensive tiers serve; what tiers sell is quota, Drive space and bigger research allowances, not effort. What my plan lacks is not a setting, it is a habit of asking.

## Thinking is not effort
The app does have a dial: Standard thinking, the default, Extended thinking, "best for complex problem solving", and Deep think - Ultra only, "requires the Pro model", and it "generally can take a few minutes". The footnote is the honest one: "more advanced models and higher thinking levels consume more of your usage."

That dial buys reasoning, and reasoning is not the deliverable. Thought summaries are off by default - "only the final output is returned" - so the extra thinking happens where I cannot audit it. And `max_output_tokens` "includes thought tokens" and acts as "a hard cutoff": a long think and a long answer do not fit in one budget, and at the cap the model "stops generating with status 'incomplete' and returns truncated or empty output". A higher thinking level can make the visible answer shorter, because thinking eats the room the answer wanted. Google's remedy is to lower the thinking level, not to raise the ceiling.

So the lever that shapes the work is the prompt, and a prompt for real work has two jobs: say what to produce, and say how it will be checked. Everything else is decoration - the fearsome persona included, and the research agrees it is decoration.

Which is why, in my own use, Flash with a precise prompt beats Pro with thinking. The top levels need the Pro model and minutes of latency, and they buy mostly arithmetic and symbolic reasoning: a meta-analysis of more than a hundred papers found step-by-step gains cluster in exactly those tasks, and on reasoning models the measured gain is marginal against a significant token bill. For a report, the shape of the answer matters more than the depth of the model, and shape is set by the prompt. Flash answers faster and cheaper; the protocol does the rest.

## What the evidence supports, and what it does not

<div class="table-responsive" markdown="1">

| Lever | What the evidence shows | Source |
|---|---|---|
| An explicit output budget | Models respect short length targets and "deteriorate sharply" beyond them; about 4,000 words is a hard ceiling for one answer | [LIFEBench](https://arxiv.org/abs/2505.16234), [HelloBench](https://arxiv.org/abs/2409.16191) |
| Plan, then write in batches | Plan-then-write subtasks reached 20,000+ words at maintained quality; a single pass caps near 2,000 | [LongWriter](https://arxiv.org/abs/2408.07055) |
| Restate the plan every turn | Constraint compliance decays across turns and as constraints accumulate; long inputs and long sessions rot | [Multi-IF](https://arxiv.org/abs/2410.15553), [FollowBench](https://arxiv.org/abs/2310.20410), [Context Rot](https://www.trychroma.com/research/context-rot) |
| Verify with a tool, not a hunch | Self-correction without external feedback fails or harms; tool-using critique improves results | [Huang et al.](https://arxiv.org/abs/2310.01798), [CRITIC](https://arxiv.org/abs/2305.11738) |
| A meta-prompt that writes the prompt | Generated prompts beat hand-written ones: 17.1% on one benchmark, up to 31% in another | [Meta-Prompting](https://arxiv.org/abs/2401.12954), [APO](https://arxiv.org/abs/2305.03495) |
| A fearsome persona | 162 expert roles across 2,410 factual questions: no gain, and low-knowledge personas can hurt | [Zheng et al.](https://arxiv.org/abs/2311.10054) |
{: .table}

</div>

Start with the ceiling on one answer. HelloBench found most models cannot write more than about 4,000 words, whatever length they were asked for; LIFEBench, across 10,800 instances, found them following short targets and then falling apart. My protocol asks for batches of five items and then stops, because a thousand-odd words sits inside the reliable zone and the rest of the plan lives in a ledger instead of the model's memory. LongWriter shows the same shape from the other end: one pass caps near 2,000 words, while plan-then-write subtasks reached 20,000+ at maintained quality.

Batching also protects the instructions. FollowBench measured accuracy falling as constraints accumulate; Multi-IF caught a strong model sliding from 0.877 compliance on turn one to 0.707 by turn three. "Lost in the Middle" (75.8% when the fact is first, 53.8% when it is buried), Chroma's Context Rot report and Microsoft's multi-turn study (39% average drop across six tasks) say the same about long context in general. Restating a ledger at the top of every batch is how a plan survives turn ten.

Verification gets the strictest clause, because here the research is unambiguous. "Large Language Models Cannot Self-Correct Reasoning Yet" found self-correction without external feedback often fails and sometimes makes things worse; models in Tyen et al. could not locate their own reasoning errors but fixed them readily when shown where; CRITIC found tool-assisted critique - a search, an interpreter - consistently improves results. Hence the source rules: a link must come out of this session's searches, a claim carries the sentence that supports it, and what could not be checked is marked `[UNVERIFIED]`. "Double-check your work" is theatre; a search is evidence.

The leverage sits in the meta-layer: a meta-prompt scaffold beat standard prompting by 17.1% on the same model, and automatic prompt optimisation lifted an initial prompt by up to 31%. I am not writing a better prompt than the model can - I am asking the model to write the prompt, as a specification rather than a wish.

The folklore deserves naming too. Expert personas: 162 roles across 2,410 factual questions, no improvement, with best-persona selection barely above random. Emotional pressure and promised tips: no significant effect. The armour in an armoured prompt is structural - output budget, batching, evidence rules, a rigid template - not a tone of voice.

<div style="margin: 1.5em 0; text-align: center;">
<svg viewBox="0 0 620 190" width="100%" style="max-width: 620px; height: auto;" role="img" aria-label="Left: one long answer drawn as bars that fade out and end in a dashed bar that never gets written. Right: four short bars of equal strength, separated by the letter n.">
  <g font-family="Helvetica, Arial, sans-serif" font-size="13">
    <text x="310" y="16" fill="currentColor" opacity="0.6" font-size="12" text-anchor="middle">the same task, two ways - one long answer, or four short ones</text>
    <text x="15" y="44" fill="currentColor">one answer</text>
    <rect x="15" y="54" width="290" height="18" fill="#00cdff" opacity="0.9" />
    <rect x="15" y="78" width="268" height="18" fill="#00cdff" opacity="0.62" />
    <rect x="15" y="102" width="232" height="18" fill="#00cdff" opacity="0.34" />
    <rect x="15" y="126" width="150" height="18" fill="none" stroke="#00cdff" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.6" />
    <line x1="318" y1="30" x2="318" y2="152" stroke="currentColor" stroke-width="1" stroke-dasharray="5 4" opacity="0.3" />
    <text x="345" y="44" fill="currentColor">four batches</text>
    <rect x="345" y="54" width="150" height="18" fill="#00cdff" opacity="0.9" />
    <rect x="345" y="78" width="150" height="18" fill="#00cdff" opacity="0.9" />
    <rect x="345" y="102" width="150" height="18" fill="#00cdff" opacity="0.9" />
    <rect x="345" y="126" width="150" height="18" fill="#00cdff" opacity="0.9" />
    <text x="505" y="69" fill="#00cdff">n</text>
    <text x="505" y="93" fill="#00cdff">n</text>
    <text x="505" y="117" fill="#00cdff">n</text>
    <text x="310" y="176" fill="currentColor" opacity="0.7" font-size="12" text-anchor="middle">one answer fades and stops early; four batches stay even, one letter apart</text>
  </g>
</svg>
</div>

## The prompt I no longer write
The tool is a meta-prompt. I type a skill command and one line of intent - `/gh compare three HDDs for a NAS, with links` - and it returns a full session prompt with five clauses: an extreme role with a ban on saving tokens, on preambles and on summaries of summaries; a search protocol with a search per claim and links as `[name](url)`, never raw text and never from memory; flow control in batches of five, then a stop and one letter to continue; a rigid data template whose fields cannot be skipped; and autonomy, with capitals reserved for the one case where a human has to act. Then I type "execute", and after every batch, `n`.

The block below is that protocol trimmed to its bones, with the additions from the next section folded in:

```text
ROLE
You are a senior <domain> reviewer writing for publication, not a chat assistant.
Do not save tokens: no preambles, no restating the question, no "in this article".

SOURCES
Run a search for every factual claim before you make it.
Link only URLs that came back in this session, as [name](url) - never from memory.
Quote the sentence that supports the claim. Mark what you could not check as [UNVERIFIED].

BATCHES
Work through the plan in batches of five items, then stop.
End each batch with the ledger: DONE / NEXT / UNVERIFIED.
Wait for one letter: n = next batch, d = deeper, s = skip, x = stop.
If only a human can unblock you, print DECISION NEEDED: <question> and continue with the rest.

TEMPLATE - every item, no omissions
1. Claim. 2. Evidence (link + quoted sentence). 3. Confidence (high / medium / low).
4. What would falsify it.
```

## Five additions of mine
1. **A ledger, first line of every batch.** DONE / NEXT / UNVERIFIED, restated before new material. Constraint compliance decays across turns, so the plan has to be re-read, not remembered - and I see the state of a long job at a glance.
2. **More letters than `n`.** `d` goes deeper on the last item, `s` skips, `x` stops, and DECISION NEEDED: in capitals marks the one thing only a human can decide. One letter per decision is the cheapest control surface I have found for a chat window.
3. **Evidence rules with teeth.** Quote the supporting sentence; link only what came back in this session; mark the rest `[UNVERIFIED]`. This is where invented citations die: a model allowed to link only what it retrieved has nothing to hallucinate from.
4. **Diverge, then a reviewer whose only job is to delete.** Ask for three competing angles before the writing starts, then hand the result to a second pass with one instruction: remove what repeats, pads or contradicts, keep the rest verbatim. Models reward length when they judge text, so pruning has to be adversarial to be worth anything. This post went through that pass; a second reviewer is welcome to cut more.
5. **A fresh chat per deliverable, short persistent instructions.** Google's own advice for skills is to "keep it concise: focus your instructions only on the unique guidelines for the task"; Gems on personal accounts become skills next month, 100 active at most. The armoured prompt belongs in the first message of a session, not in settings - long sessions rot, and a twelve-clause preamble in every chat would be half-ignored.

## Where it travels, and where it does not
The protocol is text, so it works wherever there is a prompt box: the web app, the phone, AI Studio, the API - where `thinking_level` is a request parameter rather than a menu item. What does not travel is the dial: thinking levels live in the app's model menu, the top one needs Ultra and the Pro model, and the persistent instructions live in settings. Where the dial is missing or hidden, the prompt is the only effort control, and the only one that runs on Flash.

The plan's other half pays off here too: up to ten active scheduled actions, written as a prompt and run daily, weekly or monthly, with the result delivered into the chat "within the hour leading up to your delivery time". Ten recurring slots, each a small program - a weekly status report, a Monday digest, a monthly repository review. Written once as an armoured prompt, they stop being a chat and become a service.

And one surface the protocol does not travel to at all: Gemini Live, which is voice, camera and screen sharing on Android - not in the web app, and, for now, without Gems ("Gems can't be used with Gemini Live"). Live sits outside the usage limits as far as I can tell, and it is excellent once you know what not to expect from Gemini 3: it is a conversation about what the camera sees, not a worker with a specification.

## What the tier adds over free
The subscription does not buy a better Gemini, and it is worth being precise about what it does buy, because "the same model, with more of it" undersells the list.

- **Limits.** "AI Plus 2x higher than standard limits", in Google's own words - and the standard limits are what you hit first on the free tier.
- **Storage.** Drive goes from the free 15 GB to 400 GB, and the research and notebook allowances grow with the plan.
- **Features behind the door.** "Some features are only available with Google AI subscription plans", and scheduled actions are among them - the free tier prepares their content "up to several hours in advance", a paid plan "within the hour leading up to your delivery time". That delivery window is the difference between a report written for today and a report written for whenever the free tier got round to it; video generation and the early and priority access rows sit on the same side of the line.
- **And Antigravity.** Google's agent IDE sells its own credits and plans, and nothing in my subscription reaches it - worth knowing before buying the plan for that.

That is the honest ledger: more usage, more storage, a few paid-only doors, and one Google product that ignores the whole thing. The model itself is a stopgap too - until Gemini 4 arrives, Gemini is simply the handicap - and the one lever the subscription never touches is the prompt.

## What it costs
The bill is paid in turns, not in money: batches are more messages, evidence demands more searching, and the reviewer pass doubles the reading. The app decides when to search - you can ask, not force - and a grounded answer carries a Sources section when it does. Deep Research is the same trade in Google's own packaging: multi-step searching with links, quotas unpublished in absolute numbers, available from the entry plan.

None of it makes the model right, and none of it makes citations true by decree. A protocol makes the model thorough, and thoroughness is what I want from a drafting assistant, not the last word; the citations that matter I still open myself.

Two things are true about a cheap plan at once: it serves the same models as the expensive plans, and it behaves like a lazy one until asked not to. Effort is not the tier. It is the first message, the ledger, the letter `n`, and the reviewer that deletes. The cheapest upgrade in AI is not a bigger plan - it is a stricter prompt.

---

## Wersja polska

### Gemini nie jest leniwy, jest zwięzły
Płatny Gemini odpowiada jak kolega, któremu gdzieś się śpieszy: trzy pewne siebie akapity, streszczenie streszczenia i propozycja, że może dokończy, jeśli chcę. Wszyscy czytają to jako lenistwo. Tymczasem sam przewodnik Google po promptach mówi to na głos - modele Gemini 3 domyślnie "provide direct and efficient answers", a "if you need a more conversational or detailed response, you must explicitly request it in your instructions". Zwięzłość to ustawienie fabryczne, nie usterka.

Kupiłem Google AI Plus na rok, w wariancie 400 GB, za 239,99 zł - dwadzieścia złotych miesięcznie. W środku siedzi ten sam model, który obsługują drogie plany, a plany sprzedają limit, miejsce na Dysku i większe pule researchu, nie wysiłek. Brakuje nie ustawienia, tylko nawyku dopominania się.

### Myślenie to nie wysiłek
W aplikacji jest pokrętło: Standard (domyślne), Extended thinking, "best for complex problem solving", oraz Deep think - tylko dla Ultra, "requires the Pro model", i "generally can take a few minutes". Najuczciwsza jest ta uwaga: "more advanced models and higher thinking levels consume more of your usage".

Pokrętło kupuje rozumowanie, a rozumowanie nie jest produktem. Podsumowania myślenia są domyślnie wyłączone - "only the final output is returned" - więc dodatkowe myślenie dzieje się tam, gdzie nie mogę go sprawdzić. A `max_output_tokens` "includes thought tokens" i działa jak "a hard cutoff": długie myślenie i długa odpowiedź nie mieszczą się w jednym budżecie, a po dobiciu do sufitu model "stops generating with status 'incomplete' and returns truncated or empty output". Wyższy poziom myślenia potrafi więc skrócić widoczną odpowiedź, bo zjada miejsce, którego chciała odpowiedź. Rada Google jest odwrotna niż intuicja: obniż poziom myślenia, nie podnoś limitu.

Dźwignią, która kształtuje pracę, jest więc prompt, a prompt do prawdziwej roboty ma dwa zadania: powiedzieć, co ma powstać, i powiedzieć, jak to będzie sprawdzone. Reszta to dekoracja - łącznie z groźną personą, i badania potwierdzają, że to dekoracja.

Dlatego w moim własnym użyciu Flash z precyzyjnym promptem bije Pro z thinkingiem. Najwyższe poziomy myślenia wymagają modelu Pro i minut zwłoki, a kupują głównie rozumowanie arytmetyczne i symboliczne; meta-analiza ponad stu prac pokazała, że zyski z "krok po kroku" koncentrują się właśnie w takich zadaniach, a na modelach rozumujących zmierzony zysk jest marginalny wobec rachunku za tokeny. Przy pisaniu raportu kształt odpowiedzi znaczy więcej niż głębia modelu, a kształt ustawia prompt. Flash odpowiada szybciej i taniej, a resztę robi protokół.

### Co mówią dowody, a czego nie

<div class="table-responsive" markdown="1">

| Dźwignia | Co pokazują dowody | Źródło |
|---|---|---|
| Jawny budżet wyjścia | Modele trzymają krótkie cele, a dłużej "deteriorate sharply"; około 4000 słów to twardy sufit jednej odpowiedzi | [LIFEBench](https://arxiv.org/abs/2505.16234), [HelloBench](https://arxiv.org/abs/2409.16191) |
| Plan, potem pisanie partiami | Podzadania "plan, potem pisz" dochodziły do 20 000+ słów bez utraty jakości; pojedyncze przejście kończy się przy 2000 | [LongWriter](https://arxiv.org/abs/2408.07055) |
| Powtarzaj plan w każdej turze | Zgodność z ograniczeniami spada z turami i wraz z ich liczbą; długie wejścia i długie sesje gniją | [Multi-IF](https://arxiv.org/abs/2410.15553), [FollowBench](https://arxiv.org/abs/2310.20410), [Context Rot](https://www.trychroma.com/research/context-rot) |
| Weryfikuj narzędziem, nie przeczuciem | Samokorekta bez zewnętrznego sygnału zawodzi lub szkodzi; krytyka z użyciem narzędzi poprawia wyniki | [Huang i wsp.](https://arxiv.org/abs/2310.01798), [CRITIC](https://arxiv.org/abs/2305.11738) |
| Meta-prompt, który pisze prompt | Generowane prompty biją pisane ręcznie: 17,1% na jednym benchmarku, do 31% w innym | [Meta-Prompting](https://arxiv.org/abs/2401.12954), [APO](https://arxiv.org/abs/2305.03495) |
| Groźna persona | 162 role eksperckie na 2410 pytaniach faktograficznych: brak poprawy, a persony o niskiej wiedzy szkodzą | [Zheng i wsp.](https://arxiv.org/abs/2311.10054) |
{: .table}

</div>

Najpierw sufit jednej odpowiedzi. HelloBench: większość modeli nie napisze więcej niż około 4000 słów, niezależnie od tego, o jaką długość je poproszono; LIFEBench, na 10 800 przypadkach, pokazał, że modele trzymają krótkie cele, a potem się rozsypują. Mój protokół prosi o partie po pięć punktów i wtedy się zatrzymuje, bo odpowiedź na tysiąc kilkaset słów leży w strefie niezawodnej, a resztę planu trzyma licznik, nie pamięć modelu. LongWriter pokazuje to samo z drugiej strony: pojedyncze przejście kończy się w okolicy 2000 słów, a podzadania "najpierw plan, potem pisz" dochodziły do ponad 20 000 słów bez utraty jakości.

Partie chronią też instrukcje. FollowBench mierzył spadek dokładności, gdy ograniczeń przybywa; Multi-IF przyłapał mocny model na zejściu z 0,877 zgodności w pierwszej turze do 0,707 w trzeciej. "Lost in the Middle" (75,8% trafień, gdy fakt jest na początku, 53,8%, gdy jest zakopany), raport Context Rot od Chromy i badanie Microsoftu o wieloturowości - średni spadek 39% w sześciu zadaniach. Kontekst nie jest darmowy. Powtarzanie licznika na początku każdej partii to sposób, w jaki plan dożywa dziesiątej tury.

Weryfikacja dostaje najostrzejszą klauzulę, bo tu badania są jednoznaczne. "Large Language Models Cannot Self-Correct Reasoning Yet": samokorekta bez zewnętrznego sygnału często zawodzi, a czasem psuje odpowiedź; modele z pracy Tyena i wsp. nie umiały znaleźć własnego błędu w rozumowaniu, ale naprawiały go od razu, gdy wskazano im miejsce; CRITIC pokazał, że krytyka z użyciem narzędzi - wyszukiwarki, interpretera - poprawia wyniki. Stąd zasady źródeł: link musi pochodzić z wyszukiwań tej sesji, twierdzenie niesie ze sobą zdanie, które je potwierdza, a czego nie dało się sprawdzić, dostaje znacznik `[UNVERIFIED]`. "Sprawdź dwa razy" to teatr; wyszukiwanie to dowód.

Dźwignia siedzi w meta-warstwie: szkielet meta-promptu pobił zwykłe promptowanie o 17,1% na tym samym modelu, a automatyczna optymalizacja promptu podniosła startowy prompt o nawet 31%. Nie piszę lepszego promptu, niż potrafi model - proszę model, żeby napisał prompt jako specyfikację, nie życzenie.

Folklór też trzeba nazwać. Eksperckie persony: 162 role na 2410 pytaniach faktograficznych, zero poprawy, a wybór najlepszej persony ledwo ponad losowość. Presja emocjonalna i obiecywane napiwki: brak istotnego efektu. Pancerz w pancernym promptcie jest więc strukturalny - budżet wyjścia, partie, zasady źródeł, sztywny szablon - a nie w tonie głosu. Wykres powyżej pokazuje to samo w dwóch kolumnach: jedna odpowiedź blednie i urywa się przed końcem, cztery partie trzymają równy poziom.

### Prompt, którego już nie piszę
Narzędzie to meta-prompt. Wpisuję komendę skilla i jedną linię intencji - `/gh porównaj trzy dyski HDD do NAS-a, z linkami` - a ono zwraca pełny prompt sesyjny z pięcioma klauzulami: ekstremalna rola z zakazem oszczędzania tokenów, wstępów i streszczania streszczeń; protokół wyszukiwania z osobnym wyszukiwaniem do każdego twierdzenia i linkami jako `[nazwa](url)`, nigdy gołym tekstem i nigdy z pamięci; sterowanie przepływem w partiach po pięć punktów, potem stop i jedna litera na kontynuację; sztywny szablon danych, z którego nie wolno niczego pominąć; i autonomia, z wielkimi literami zarezerwowanymi na ten jeden przypadek, gdy działać musi człowiek. Potem piszę "wykonaj", a po każdej partii - `n`.

Blok poniżej to protokół sprowadzony do kości, z dodatkami z następnej sekcji w środku:

```text
ROLA
Jesteś doświadczonym recenzentem w domenie <X>, piszesz do publikacji, nie na czacie.
Nie oszczędzaj tokenów: żadnych wstępów, powtarzania pytania, "w tym artykule".

ŹRÓDŁA
Do każdego twierdzenia faktograficznego najpierw uruchom wyszukiwanie.
Linkuj wyłącznie adresy, które wróciły w tej sesji, jako [nazwa](url) - nigdy z pamięci.
Zacytuj zdanie, które potwierdza tezę. Czego nie sprawdziłeś, oznacz [UNVERIFIED].

PARTIE
Pracuj partiami po pięć punktów planu, potem się zatrzymaj.
Każdą partię kończ licznikiem: ZROBIONE / NASTĘPNE / NIESPRAWDZONE.
Czekaj na jedną literę: n = następna partia, d = głębiej, s = pomiń, x = stop.
Jeśli odblokować Cię może tylko człowiek, wypisz DECISION NEEDED: <pytanie> i rób dalej resztę.

SZABLON - każdy punkt, bez pomijania
1. Teza. 2. Dowód (link + cytowane zdanie). 3. Pewność (wysoka / średnia / niska).
4. Co by ją obaliło.
```

### Pięć dodatków ode mnie
1. **Licznik w pierwszej linii każdej partii.** ZROBIONE / NASTĘPNE / NIESPRAWDZONE, powtórzone przed nowym materiałem. Zgodność z ograniczeniami spada z każdą turą, więc plan trzeba odczytywać, a nie pamiętać; przy okazji widzę stan długiej roboty na jedno spojrzenie.
2. **Więcej liter niż `n`.** `d` wchodzi głębiej w ostatni punkt, `s` pomija, `x` zatrzymuje, a DECISION NEEDED: wielkimi literami znaczy ten jeden raz, gdy decyduje człowiek. Jedna litera na decyzję to najtańsza powierzchnia sterowania, jaką znalazłem w oknie czatu.
3. **Zasady źródeł z zębami.** Cytuj zdanie, które potwierdza; linkuj tylko to, co wróciło w sesji; resztę oznaczaj `[UNVERIFIED]`. Tu giną wymyślone cytowania: model, który może linkować wyłącznie to, co naprawdę pobrał, nie ma z czego halucynować.
4. **Najpierw rozbieżność, potem recenzent, którego jedynym zadaniem jest wycinanie.** Poproś o trzy konkurencyjne ujęcia, zanim zacznie się pisanie, a potem oddaj wynik drugiemu przebiegowi z jednym poleceniem: usuń to, co się powtarza, watę i sprzeczności, resztę zostaw dosłownie. Modele oceniające tekst nagradzają długość, więc przycinanie musi być wrogie, żeby cokolwiek dało. Ten post przeszedł taki przebieg; kolejny recenzent może ciąć dalej.
5. **Świeży czat na każdy deliverable, krótkie instrukcje stałe.** Google samo radzi przy skillach: "keep it concise: focus your instructions only on the unique guidelines for the task", a Gemy na kontach osobistych zamieniają się w skille w przyszłym miesiącu - maksymalnie 100 aktywnych. Pancerny prompt należy do pierwszej wiadomości sesji, nie do ustawień: długie sesje gniją, a dwunastoklauzulowy wstęp w każdym czacie byłby w połowie ignorowany.

### Gdzie to działa, a gdzie nie
Protokół jest tekstem, więc działa wszędzie, gdzie jest pole na prompt: aplikacja web, telefon, AI Studio i API - tam `thinking_level` jest parametrem żądania, nie pozycją w menu. Nie podróżuje za to pokrętło: poziomy myślenia siedzą w menu modelu w aplikacji, najwyższy wymaga Ultra i modelu Pro, a instrukcje stałe mieszkają w ustawieniach. Tam, gdzie pokrętła nie ma albo jest ukryte, prompt zostaje jedyną dźwignią wysiłku - i jedyną, która działa też na Flashu.

Druga połowa wartości planu gra tu do tej samej bramki: płatny plan daje do dziesięciu aktywnych zaplanowanych akcji, pisanych jako prompt i uruchamianych codziennie, co tydzień albo co miesiąc, z wynikiem dostarczanym do czatu "within the hour leading up to your delivery time". Dziesięć cyklicznych slotów, każdy jak mały program - cotygodniowy raport, poniedziałkowy przegląd tematu, miesięczne podsumowanie repozytorium. Zapisane raz jako pancerny prompt przestają być czatem i stają się usługą.

Jest jeszcze jedna powierzchnia, do której protokół nie dociera wcale: Gemini Live, czyli głos, kamera i udostępnianie ekranu na Androidzie - nie w aplikacji webowej i, póki co, bez Gemów ("Gems can't be used with Gemini Live"). Live jest, o ile widzę, poza limitami użycia, i jest świetny, gdy wie się, czego nie oczekiwać od Gemini 3: to rozmowa o tym, co widzi kamera, a nie pracownik ze specyfikacją.

### Co płatny plan daje ponad darmowy
Abonament nie kupuje lepszego Geminiego i warto dokładnie powiedzieć, co kupuje, bo "ten sam model, tylko więcej" sprzedaje tę listę poniżej wartości.

- **Limity.** "AI Plus 2x higher than standard limits", jak to ujmuje Google - czyli dwa razy wyżej niż standard, a to standard dobija się na darmowym planie pierwszy.
- **Miejsce.** Dysk rośnie z darmowych 15 GB do 400 GB, a limity researchu i notatników rosną razem z planem.
- **Funkcje za drzwiami.** "Some features are only available with Google AI subscription plans", a zaplanowane akcje są wśród nich - darmowy plan przygotowuje ich treść "up to several hours in advance", płatny "within the hour leading up to your delivery time". Ten czas dostawy to różnica między raportem pisanym na dziś a raportem pisanym na wtedy, kiedy darmowemu planowi się zachce; generowanie wideo i wiersze o wczesnym oraz priorytetowym dostępie leżą po tej samej stronie linii.
- **I Antigravity.** IDE agentowe Google sprzedaje własne kredyty i plany, a mój abonament tam nie dociera - warto wiedzieć, zanim kupi się plan dla niego.

Uczciwy bilans: więcej użycia, więcej miejsca, kilka drzwi tylko dla płacących i jeden produkt Google, który całość ignoruje. Sam model też jest prowizorką - póki nie ma Gemini 4, to Gemini jest tym słabym ogniwem - a jedyna dźwignia, której abonament nigdy nie dotyka, to prompt.

### Ile to kosztuje
Rachunek płacę turami, nie pieniędzmi: partie to więcej wiadomości, dowody to więcej wyszukiwania, a przebieg recenzenta podwaja czytanie. O tym, czy szukać, decyduje aplikacja - o wyszukiwanie można poprosić, ale nie można go wymusić - a odpowiedź z ugruntowaniem dostaje sekcję źródeł, gdy już je znajdzie. Deep Research to ten sam handel w opakowaniu Google: wieloetapowe szukanie z linkami, limity niepublikowane w liczbach bezwzględnych, dostępne od najtańszego planu.

Nic z tego nie czyni modelu prawym i nic nie czyni cytowań prawdziwymi na rozkaz. Protokół czyni model starannym, a staranności oczekuję od asystenta piszącego, nie ostatniego słowa; cytowania, które mają znaczenie, otwieram sam.

Dwie rzeczy są prawdziwe o tanim planie jednocześnie: dostarcza te same modele co drogie plany i zachowuje się jak leniwy, dopóki się go nie poprosi. Wysiłek to nie tier. To pierwsza wiadomość, licznik, litera `n` i recenzent, który wycina. Najtańszy upgrade w AI to nie większy plan - to ostrzejszy prompt.
