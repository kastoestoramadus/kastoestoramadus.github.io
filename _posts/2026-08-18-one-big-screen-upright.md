---
layout: post
section-type: post
title: Two screens never add up to one
category: hardware
tags: [ 'hardware', 'second-screen', 'productivity' ]
---
Two 27-inch monitors have less panel and fewer pixels than one 40-inch monitor, plus a seam down the middle that nobody can move. The standard two-screen desk is not more screen. It is less screen, cut in half.

That half of the argument is just arithmetic, and it is in the table below. The half people raise an eyebrow at is that mine stands up - a 40-inch 16:9 on an arm, rotated by 90 degrees, which is how it spends most of its life. Four years ago I wrote that this screen has [no successor]({% post_url 2022-02-10-big-wide-displays-extintion %}) and praised it for working like two big, almost square screens side by side. That was the compromise talking: 16:9 is the only shape that does both jobs, and at 4K it is finally tall enough to be worth turning.

## A big screen is divisible, small ones are not addable
A big screen can pretend to be any number of small ones - [FancyZones](https://learn.microsoft.com/en-us/windows/powertoys/fancyzones), a tiling window manager, or two maximised halves - and the split changes in a second to suit the task. Small screens cannot do the reverse. Two 27-inch monitors never become one 40-inch one: the seam is permanent, and so are the two stands, the two calibrations and the window that has to pick a side.

That asymmetry is the whole argument. One surface divides any way you like; several surfaces never add up.

<div style="margin: 1.5em 0;">
<svg viewBox="0 0 620 215" width="100%" style="max-width: 620px; height: auto;" role="img" aria-label="Left: one screen split into three zones by dashed lines. Right: two screens with a fixed bezel seam and a window that cannot cross it.">
  <g fill="none" stroke="currentColor" stroke-width="2" font-family="Helvetica, Arial, sans-serif">
    <rect x="15" y="20" width="250" height="140" />
    <line x1="120" y1="20" x2="120" y2="160" stroke-dasharray="6 5" stroke-width="1.5" />
    <line x1="120" y1="95" x2="265" y2="95" stroke-dasharray="6 5" stroke-width="1.5" />
    <line x1="190" y1="20" x2="190" y2="95" stroke-dasharray="6 5" stroke-width="1.5" />
    <text x="15" y="185" fill="currentColor" stroke="none" font-size="14">one surface, any split, changed in a second</text>
    <rect x="355" y="20" width="115" height="140" />
    <rect x="495" y="20" width="115" height="140" />
    <line x1="470" y1="20" x2="470" y2="160" stroke="#00cdff" stroke-width="8" />
    <line x1="495" y1="20" x2="495" y2="160" stroke="#00cdff" stroke-width="8" />
    <rect x="430" y="55" width="140" height="70" stroke="#00cdff" stroke-dasharray="5 4" stroke-width="1.5" />
    <text x="355" y="185" fill="currentColor" stroke="none" font-size="14">two surfaces, one split you cannot move</text>
  </g>
</svg>
</div>

Graphics cards taught the same lesson. Two mid-range cards never rendered one scene as well as a single strong one, and Nvidia [stopped writing SLI profiles](https://www.pcworld.com/article/393426/rip-nvidia-slams-the-final-nail-in-slis-coffin-no-new-profiles-after-2020.html) after 2020. Different reasons - frame pacing rather than plastic bezels - identical shape: one strong card drives several screens, and no number of weak ones makes a strong one.

## Not work against play, but column against grid
The web is a column. [Mobile-first indexing](https://developers.google.com/search/blog/2023/10/mobile-first-is-here) finished the job in 2023, and horizontal scrolling is a bug. Source files, unified diffs, logs, terminals, chats, pull requests, documentation: same shape. Content lives vertically, and width is mostly margin.

It is tempting to call wide screens the entertainment shape and leave it there, but that is not the line. Cinema and games are wide - and so are spreadsheets, side-by-side diffs and video timelines, which are work by anyone's definition. The split is between columns and grids, and columns are what most of us stare at all day. (Entertainment only stayed wide on the desk anyway; on a phone it went vertical years ago.)

Upright, my 4K panel is 2160 x 3840: around 200 lines of code in one editor at a typical 19-pixel line, against about 110 in landscape. A 400-line review becomes two screenfuls instead of four.

<div style="margin: 1.5em 0;">
<svg viewBox="0 0 620 270" width="100%" style="max-width: 620px; height: auto;" role="img" aria-label="A landscape screen showing a narrow content column with wide empty margins, next to an upright screen where the same column fills most of the width and shows about twice as many lines.">
  <g font-family="Helvetica, Arial, sans-serif">
    <rect x="15" y="20" width="270" height="152" fill="none" stroke="currentColor" stroke-width="2" />
    <g fill="currentColor" opacity="0.18">
      <rect x="15" y="20" width="93" height="152" /><rect x="192" y="20" width="93" height="152" />
    </g>
    <g stroke="#00cdff" stroke-width="3">
      <line x1="118" y1="34" x2="175" y2="34" /><line x1="118" y1="48" x2="182" y2="48" /><line x1="118" y1="62" x2="160" y2="62" />
      <line x1="118" y1="76" x2="182" y2="76" /><line x1="118" y1="90" x2="170" y2="90" /><line x1="118" y1="104" x2="182" y2="104" />
      <line x1="118" y1="118" x2="150" y2="118" /><line x1="118" y1="132" x2="178" y2="132" /><line x1="118" y1="146" x2="165" y2="146" />
      <line x1="118" y1="160" x2="182" y2="160" />
    </g>
    <text x="15" y="196" fill="currentColor" font-size="14">landscape: the column uses a third of the width,</text>
    <text x="15" y="214" fill="currentColor" font-size="14">the margins are grey pixels you paid for</text>
    <rect x="380" y="20" width="152" height="225" fill="none" stroke="currentColor" stroke-width="2" />
    <g fill="currentColor" opacity="0.18">
      <rect x="380" y="20" width="33" height="225" /><rect x="499" y="20" width="33" height="225" />
    </g>
    <g stroke="#00cdff" stroke-width="3">
      <line x1="423" y1="32" x2="480" y2="32" /><line x1="423" y1="44" x2="489" y2="44" /><line x1="423" y1="56" x2="465" y2="56" />
      <line x1="423" y1="68" x2="489" y2="68" /><line x1="423" y1="80" x2="475" y2="80" /><line x1="423" y1="92" x2="489" y2="92" />
      <line x1="423" y1="104" x2="455" y2="104" /><line x1="423" y1="116" x2="483" y2="116" /><line x1="423" y1="128" x2="470" y2="128" />
      <line x1="423" y1="140" x2="489" y2="140" /><line x1="423" y1="152" x2="462" y2="152" /><line x1="423" y1="164" x2="486" y2="164" />
      <line x1="423" y1="176" x2="478" y2="176" /><line x1="423" y1="188" x2="489" y2="188" /><line x1="423" y1="200" x2="458" y2="200" />
      <line x1="423" y1="212" x2="484" y2="212" /><line x1="423" y1="224" x2="472" y2="224" /><line x1="423" y1="236" x2="489" y2="236" />
    </g>
    <text x="325" y="265" fill="currentColor" font-size="13">upright: the same column, twice the content</text>
  </g>
</svg>
</div>

The honest caveat: upright does not fill itself either. A page whose container stops at 1200 pixels leaves 900 unused beside it. Height comes for free; width only pays off when you tile - documentation beside the editor, the app beside devtools. Upright just moves the empty space to where a second window fits.

## Geometry, not marketing
My screen is a curved 40-inch 16:9, so 88.6 x 49.8 cm of panel. Against the two dual setups people usually compare it with:

<div class="table-responsive" markdown="1">

| | one 40" 4K | two 27" 1440p | two 24" 1080p |
|---|:-:|:-:|:-:|
| Panel area | 4411 cm² | 4019 cm² | 3176 cm² |
| Pixels | 8.3 Mpx | 7.4 Mpx | 4.1 Mpx |
| Density | 110 PPI | 109 PPI | 92 PPI |
| Scaling needed | none | none | none |
| Seams | 0 | 1 | 1 |
| Stands on the desk | 1 (or none, on an arm) | 2 | 2 |
{: .table .table-winner}

</div>

One 40-inch panel has more surface and more pixels than two 27-inch ones at the same density - and the pixels are continuous.

<div style="margin: 1.5em 0;">
<svg viewBox="0 0 620 320" width="100%" style="max-width: 620px; height: auto;" role="img" aria-label="Scale drawing: a 40-inch screen upright, 49.8 by 88.6 cm, next to two 27-inch screens side by side, 59.8 by 33.6 cm each, separated by a bezel.">
  <g font-family="Helvetica, Arial, sans-serif">
    <rect x="20" y="30" width="149" height="266" fill="none" stroke="#00cdff" stroke-width="2" />
    <text x="20" y="20" fill="#00cdff" font-size="14">40" upright - 4411 cm²</text>
    <text x="28" y="170" fill="#00cdff" font-size="13">49.8 x 88.6 cm</text>
    <rect x="235" y="112" width="179" height="101" fill="none" stroke="currentColor" stroke-width="2" />
    <rect x="420" y="112" width="179" height="101" fill="none" stroke="currentColor" stroke-width="2" />
    <line x1="417" y1="105" x2="417" y2="220" stroke="currentColor" stroke-width="6" />
    <text x="235" y="102" fill="currentColor" font-size="14">two 27" - 4019 cm², plus a seam</text>
    <text x="243" y="168" fill="currentColor" font-size="13">59.8 x 33.6 cm</text>
    <text x="428" y="168" fill="currentColor" font-size="13">59.8 x 33.6 cm</text>
    <text x="235" y="240" fill="currentColor" font-size="13">drawn to scale, 3 px per cm</text>
  </g>
</svg>
</div>

## Eye level is a rule about staring, not about height
Upright the panel is 88.6 cm tall, about 65 degrees of vertical field from 70 cm away, where [OSHA](https://www.osha.gov/etools/computer-workstations/components/monitors) wants the centre 15-20 degrees below eye level and the top at or below it. By the letter of that rule, a screen this tall is simply wrong.

The rule is quoted far more often than it is explained. It rests on two measured things: the resting posture of the eyes is [about 15 degrees below horizontal](https://pubmed.ncbi.nlm.nih.gov/2798019/), and looking up opens the lids wider - Tsubota and Nakamori [measured](https://jamanetwork.com/journals/jamaophthalmology/fullarticle/641007) 1.2 cm² of exposed eye in downgaze against 3.0 cm² in upgaze, with tear evaporation 3.4 times higher. Blinking drops from about 22 a minute to 7 in front of a screen.

Both mechanisms are about **sustained** gaze, not about where the panel ends. Holding your eyes up for an hour dries them; glancing up for two seconds does not. This is a comfort optimum averaged over a working day, not a health limit - and the reported prevalence of dry eye among screen workers, anywhere from 9.5% to 87.5%, says more about questionnaires than about eyes.

So the height costs nothing as long as nobody reads up there. The band at eye level is where the editor lives; the top third is a shelf for a running build, a log, a browser I glance at. If you want every row to be working space instead, about 32 inches (70.8 cm tall) is where that stops being possible. Two things to check on your own panel first: a curved screen now bends top to bottom, and a VA panel's viewing angles rotate with it.

The one honest argument for a real second screen is narrower than it looks: on a video call, a single screen means the meeting covers the work you are talking about.

## Fewer screens, fewer invitations
The "42% more productive with multiple monitors" figure is vendor-sponsored, and Coding Horror [picked it apart](https://blog.codinghorror.com/does-more-than-one-monitor-improve-productivity/) years ago. The quieter results are the useful ones:

- [NEC/University of Utah](https://www.sharpnecdisplays.us/about/press-release/increasing-monitor-size-translates-to-higher-worke/316): one 24-inch widescreen beat two 20-inch screens by 6% on text editing - and lost that lead on spreadsheets, exactly along the column-grid line.
- [Colvin et al.](https://link.springer.com/chapter/10.1007/978-3-642-21669-5_11): no significant difference in completion time between one and two monitors.
- [Hutchings et al.](https://dl.acm.org/doi/10.1145/989863.989867): more screen space raises window-management overhead, sometimes to counterproductive levels.
- [A 2021 survey of developers at home](https://arxiv.org/abs/2103.13198): the strongest influence on perceived productivity was not the setup, but interruptions.

So no percentages from me, just a distinction. A second screen is not extra space, it is a standing invitation: somewhere to park a chat window where it costs nothing. On one surface everything that wants my attention has to take it from what I am working on, which makes it my decision rather than the desk's.

## How it sits on the desk
A VESA arm behind the screen, the original stand gone, the desk underneath it free again. Rotating takes a few seconds - pull it towards me, turn it, push it back. Upright for work, landscape for films and for gaming with my daughter, which is still the best argument for a big 16:9 that I know.

The successor I asked for in 2022 still does not exist, and turning the old screen on its side turned out to be the upgrade I could have had back then. It does not make me want less panel, though. Upright, 4K is enough, not plenty: a taller one would show more of the column, and the only part of it that has to behave itself is the band at eye level.
