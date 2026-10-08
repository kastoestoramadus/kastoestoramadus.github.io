---
layout: post
section-type: post
title: Two screens never add up to one
category: hardware
tags: [ 'hardware', 'second-screen', 'productivity' ]
---
**TLDR:** Two 27-inch monitors have less panel and fewer pixels than one 40-inch monitor, plus a seam nobody can move. I use a 40-inch 16:9 standing upright on an arm. 16:9 is the only ratio that works both lying down and standing up, and on a laptop, where you cannot rotate, the ratio decides how much height you get.

## One surface divides, several never add up
A big screen can pretend to be any number of small ones - [FancyZones](https://learn.microsoft.com/en-us/windows/powertoys/fancyzones), a tiling window manager, or two maximised halves - and the split changes in a second. Two 27-inch monitors never become one 40-inch one: the seam is permanent, and so are the two stands, the two calibrations and the window that has to pick a side.

<div style="margin: 1.5em 0; text-align: center;">
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

## Geometry
My screen is a curved 40-inch 16:9: 88.6 x 49.8 cm of panel.

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

More surface and more pixels at the same density - and the pixels are continuous.

## Why upright
The web, source files, diffs, logs, terminals and chats are columns: content lives vertically, and width is mostly margin. Wide is for grids - spreadsheets, side-by-side diffs, video timelines. Upright, my 4K panel is 2160 x 3840: around 200 lines of code in one editor at a typical 19-pixel line, against about 110 in landscape. A 400-line review becomes two screenfuls instead of four. Width pays off when you tile: documentation beside the editor, the app beside devtools.

## 16:9 is the only ratio that survives rotation
Four years ago I wrote that this screen has [no successor]({% post_url 2022-02-10-big-wide-displays-extintion %}). It still has not, and turning it on its side was the upgrade I could have had back then.

<div style="margin: 1.5em 0; text-align: center;">
<svg viewBox="0 0 620 215" width="100%" style="max-width: 620px; height: auto;" role="img" aria-label="The same 40-inch diagonal in 21:9, 16:9 and 4:3, each drawn lying down and standing up. Rotated widths at 110 PPI: 1730, 2160 and 2640 pixels.">
  <g font-family="Helvetica, Arial, sans-serif" font-size="12">
    <rect x="10" y="102" width="112" height="48" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55" />
    <rect x="132" y="38" width="48" height="112" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55" />
    <text x="10" y="172" fill="currentColor" font-size="14">21:9</text>
    <text x="10" y="190" fill="currentColor" opacity="0.75">rotates into a chimney</text>
    <text x="10" y="206" fill="currentColor" opacity="0.75">1730 px wide, 93 cm tall</text>
    <rect x="210" y="90" width="106" height="60" fill="none" stroke="#00cdff" stroke-width="2" />
    <rect x="326" y="44" width="60" height="106" fill="none" stroke="#00cdff" stroke-width="2" />
    <text x="210" y="172" fill="#00cdff" font-size="14">16:9</text>
    <text x="210" y="190" fill="#00cdff">two columns, films still fit</text>
    <text x="210" y="206" fill="#00cdff">2160 px wide, 89 cm tall</text>
    <rect x="410" y="77" width="98" height="73" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55" />
    <rect x="518" y="52" width="73" height="98" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55" />
    <text x="410" y="172" fill="currentColor" font-size="14">4:3</text>
    <text x="410" y="190" fill="currentColor" opacity="0.75">two columns, but every</text>
    <text x="410" y="206" fill="currentColor" opacity="0.75">film is pillarboxed</text>
    <text x="10" y="22" fill="currentColor" opacity="0.6">one 40-inch diagonal, lying down and standing up, to scale</text>
  </g>
</svg>
</div>

An ultrawide rotated is a chimney, taller than a door. A rotated 4:3 is fine, but lying down it pillarboxes every film. 16:9 turns into two text columns and back into cinema - the only ratio usable in both. That is why the screen I would replace this one with is still 16:9.

## On a laptop, the ratio is the only rotation you get
A lid cannot be turned, and height is what runs out first. So the smaller the panel, the squarer it should be: 3:2 for a small laptop, 16:10 for a larger one. The keyboard sets the width, so in the same 13-inch chassis 3:2 is 19% more panel than 16:9, all of it height. That is why [3:2 and 16:10 coming back](https://www.theverge.com/2021/1/19/22238671/16-9-aspect-ratio-hp-elite-folio-dell-latitude-lenovo-thinkbook-plus-legion-7) is the display trend I like best.

<div style="margin: 1.5em 0; text-align: center;">
<svg viewBox="0 0 620 280" width="100%" style="max-width: 620px; height: auto;" role="img" aria-label="Four panels drawn to scale on a common baseline: a 13-inch 3:2 laptop 18.7 cm tall, a 16-inch 16:10 laptop 21.5 cm, a 40-inch 16:9 screen lying down 49.8 cm, and the same screen standing up 88.6 cm.">
  <g font-family="Helvetica, Arial, sans-serif" font-size="13">
    <text x="310" y="16" fill="currentColor" opacity="0.6" font-size="12" text-anchor="middle">every panel to scale - height is the thing that runs out</text>
    <rect x="20" y="185" width="60" height="40" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55" />
    <rect x="100" y="179" width="74" height="46" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55" />
    <rect x="194" y="118" width="190" height="107" fill="none" stroke="currentColor" stroke-width="2" />
    <rect x="404" y="35" width="107" height="190" fill="none" stroke="#00cdff" stroke-width="2" />
    <text x="50" y="245" fill="currentColor" opacity="0.75" font-size="12" text-anchor="middle">13-inch 3:2</text>
    <text x="50" y="262" fill="currentColor" opacity="0.75" font-size="12" text-anchor="middle">18.7 cm</text>
    <text x="137" y="245" fill="currentColor" opacity="0.75" font-size="12" text-anchor="middle">16-inch 16:10</text>
    <text x="137" y="262" fill="currentColor" opacity="0.75" font-size="12" text-anchor="middle">21.5 cm</text>
    <text x="289" y="245" fill="currentColor" text-anchor="middle">40-inch 16:9</text>
    <text x="289" y="262" fill="currentColor" opacity="0.75" font-size="12" text-anchor="middle">49.8 cm</text>
    <text x="457" y="245" fill="#00cdff" text-anchor="middle">40-inch upright</text>
    <text x="457" y="262" fill="#00cdff" opacity="0.85" font-size="12" text-anchor="middle">88.6 cm</text>
  </g>
</svg>
</div>

## Eye level
[OSHA](https://www.osha.gov/etools/computer-workstations/components/monitors) wants the centre of the screen 15-20 degrees below eye level and the top at or below it. On a tall panel those two pull apart:

<div style="margin: 1.5em 0; text-align: center;">
<svg viewBox="0 0 620 306" width="100%" style="max-width: 620px; height: auto;" role="img" aria-label="Two side views of an upright 40-inch panel at 70 cm. With its top at eye level the centre falls 32 degrees below eye level; with the centre 15 degrees below eye level a quarter of the panel sits above eye level, and the shaded wedge shows how much of it the eyes reach without moving the neck.">
  <g font-family="Helvetica, Arial, sans-serif" font-size="12">
    <circle cx="40" cy="60" r="5" fill="currentColor" />
    <line x1="48" y1="60" x2="180" y2="60" stroke="currentColor" stroke-width="1" stroke-dasharray="5 4" opacity="0.6" />
    <text x="48" y="52" fill="currentColor" opacity="0.6">eye level</text>
    <line x1="180" y1="60" x2="180" y2="237" stroke="currentColor" stroke-width="5" opacity="0.5" />
    <line x1="45" y1="62" x2="180" y2="148" stroke="currentColor" stroke-width="1" opacity="0.8" />
    <line x1="45" y1="64" x2="180" y2="237" stroke="currentColor" stroke-width="1" opacity="0.4" />
    <text x="86" y="104" fill="currentColor">32&#176;</text>
    <text x="190" y="145" fill="currentColor" opacity="0.75">centre</text>
    <text x="10" y="262" fill="currentColor">top at eye level, as the rule asks -</text>
    <text x="10" y="278" fill="currentColor">and the centre drops to 32&#176;, which it forbids</text>
    <path d="M 360 60 L 500 35 L 500 178 Z" fill="currentColor" opacity="0.12" />
    <circle cx="360" cy="60" r="5" fill="currentColor" />
    <line x1="368" y1="60" x2="500" y2="60" stroke="currentColor" stroke-width="1" stroke-dasharray="5 4" opacity="0.6" />
    <text x="368" y="52" fill="currentColor" opacity="0.6">eye level</text>
    <line x1="500" y1="9" x2="500" y2="60" stroke="#00cdff" stroke-width="5" />
    <line x1="500" y1="60" x2="500" y2="186" stroke="currentColor" stroke-width="5" opacity="0.5" />
    <line x1="365" y1="62" x2="500" y2="98" stroke="currentColor" stroke-width="1" opacity="0.8" />
    <text x="406" y="86" fill="currentColor">15&#176;</text>
    <text x="510" y="30" fill="#00cdff">the shelf:</text>
    <text x="510" y="46" fill="#00cdff">29% of the panel</text>
    <text x="510" y="100" fill="currentColor" opacity="0.75">centre</text>
    <text x="330" y="262" fill="currentColor">centre 15&#176; below, as the rule asks -</text>
    <text x="330" y="278" fill="currentColor">and a quarter of the panel rises above eye level</text>
    <text x="330" y="296" fill="currentColor" opacity="0.6">shaded: what the eyes reach with the neck still</text>
  </g>
</svg>
</div>

At 70 cm both hold only up to about 51 cm of panel height: a 40-inch 16:9 lying down (49.8 cm) just squeaks under, nothing standing up can. The rule rests on the eyes resting [about 15 degrees below horizontal](https://pubmed.ncbi.nlm.nih.gov/2798019/) and on looking up opening the lids wider ([Tsubota and Nakamori](https://jamanetwork.com/journals/jamaophthalmology/fullarticle/641007): 1.2 cm² of exposed eye in downgaze against 3.0 cm² in upgaze). Both are about sustained gaze: an hour with the eyes up dries them, a two-second glance does not.

Mine sits with its centre roughly at eye level, so the top strip is about 32 degrees up - far enough that reading there earns a small nod, which is rather the point. The editor lives at eye level; the shelf above holds a running build, a log, a browser I glance at. Seven years, no complaints: one desk's worth of evidence, not a recommendation. Check two things on your panel first: a curved screen bends top to bottom, and a VA panel's viewing angles rotate with it.

## Fewer screens, fewer invitations
The "42% more productive with multiple monitors" figure is vendor-sponsored. The quieter results:
- [NEC/University of Utah](https://www.sharpnecdisplays.us/about/press-release/increasing-monitor-size-translates-to-higher-worke/316): one 24-inch widescreen beat two 20-inch screens by 6% on text editing, although the pair carried 48% more panel and 67% more pixels - and lost that lead on spreadsheets, along the column-grid line.
- [Colvin et al.](https://link.springer.com/chapter/10.1007/978-3-642-21669-5_11): no significant difference in completion time between one and two monitors.

A second screen is not extra space, it is a standing invitation: somewhere to park a chat window where it costs nothing. On one surface everything that wants my attention has to take it from what I am working on. The one real argument for a second screen: on a video call, a single screen means the meeting covers the work you are talking about.

## On the desk
A VESA arm, the original stand gone, the desk underneath free again. Rotating takes a few seconds. Upright for work, landscape for films and for gaming with my daughter. Upright, 4K is enough, not plenty: put a 6K or 8K 16:9 on the arm, curved, and it replaces this one the same afternoon.
