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
A big screen can pretend to be any number of small ones - [FancyZones](https://learn.microsoft.com/en-us/windows/powertoys/fancyzones), a tiling window manager, or two maximised halves - and the split changes in a second to suit the task.

<div style="margin: 1.5em 0; text-align: center;">
<svg viewBox="0 0 620 200" width="100%" style="max-width: 620px; height: auto;" role="img" aria-label="One upright screen drawn three times, split for review into two columns, for debugging into an editor over a log, and for writing into a single centred column.">
  <g font-family="Helvetica, Arial, sans-serif" font-size="13">
    <rect x="60" y="20" width="100" height="150" fill="none" stroke="currentColor" stroke-width="2" />
    <line x1="110" y1="20" x2="110" y2="170" stroke="#00cdff" stroke-width="1.5" />
    <text x="110" y="192" fill="currentColor" text-anchor="middle">review: two columns</text>
    <rect x="260" y="20" width="100" height="150" fill="none" stroke="currentColor" stroke-width="2" />
    <line x1="260" y1="122" x2="360" y2="122" stroke="#00cdff" stroke-width="1.5" />
    <text x="310" y="192" fill="currentColor" text-anchor="middle">debug: editor over log</text>
    <rect x="460" y="20" width="100" height="150" fill="none" stroke="currentColor" stroke-width="2" />
    <line x1="482" y1="20" x2="482" y2="170" stroke="#00cdff" stroke-width="1.5" />
    <line x1="538" y1="20" x2="538" y2="170" stroke="#00cdff" stroke-width="1.5" />
    <text x="510" y="192" fill="currentColor" text-anchor="middle">write: one column, margins parked</text>
  </g>
</svg>
</div>
 Small screens cannot do the reverse. Two 27-inch monitors never become one 40-inch one: the seam is permanent, and so are the two stands, the two calibrations and the window that has to pick a side.

That asymmetry is the whole argument. One surface divides any way you like; several surfaces never add up.

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

Graphics cards taught the same lesson. Two mid-range cards never rendered one scene as well as a single strong one, and Nvidia [stopped writing SLI profiles](https://www.pcworld.com/article/393426/rip-nvidia-slams-the-final-nail-in-slis-coffin-no-new-profiles-after-2020.html) after 2020. Different reasons - frame pacing rather than plastic bezels - identical shape: one strong card drives several screens, and no number of weak ones makes a strong one.

## Not work against play, but column against grid
The web is a column. [Mobile-first indexing](https://developers.google.com/search/blog/2023/10/mobile-first-is-here) finished the job in 2023, and horizontal scrolling is a bug. Source files, unified diffs, logs, terminals, chats, pull requests, documentation: same shape. Content lives vertically, and width is mostly margin.

It is tempting to call wide screens the entertainment shape and leave it there, but that is not the line. Cinema and games are wide - and so are spreadsheets, side-by-side diffs and video timelines, which are work by anyone's definition. The split is between columns and grids, and columns are what most of us stare at all day. (Entertainment only stayed wide on the desk anyway; on a phone it went vertical years ago.)

<div style="margin: 1.5em 0; text-align: center;">
<svg viewBox="0 0 620 235" width="100%" style="max-width: 620px; height: auto;" role="img" aria-label="On the left an upright screen filled with lines of text, labelled column. On the right a wide screen filled with spreadsheet cells, labelled grid.">
  <g font-family="Helvetica, Arial, sans-serif" font-size="13">
    <rect x="95" y="20" width="110" height="170" fill="none" stroke="currentColor" stroke-width="2" />
    <g stroke="#00cdff" stroke-width="3">
      <line x1="110" y1="36" x2="180" y2="36" /><line x1="110" y1="50" x2="190" y2="50" /><line x1="110" y1="64" x2="165" y2="64" />
      <line x1="110" y1="78" x2="190" y2="78" /><line x1="110" y1="92" x2="175" y2="92" /><line x1="110" y1="106" x2="190" y2="106" />
      <line x1="110" y1="120" x2="155" y2="120" /><line x1="110" y1="134" x2="185" y2="134" /><line x1="110" y1="148" x2="170" y2="148" />
      <line x1="110" y1="162" x2="190" y2="162" /><line x1="110" y1="176" x2="160" y2="176" />
    </g>
    <text x="150" y="212" fill="currentColor" text-anchor="middle">column</text>
    <text x="150" y="230" fill="currentColor" opacity="0.7" font-size="12">code, prose, logs, chat, the web</text>
    <rect x="325" y="45" width="230" height="120" fill="none" stroke="currentColor" stroke-width="2" />
    <g stroke="currentColor" stroke-width="1" opacity="0.55">
      <line x1="325" y1="69" x2="555" y2="69" /><line x1="325" y1="93" x2="555" y2="93" />
      <line x1="325" y1="117" x2="555" y2="117" /><line x1="325" y1="141" x2="555" y2="141" />
      <line x1="371" y1="45" x2="371" y2="165" /><line x1="417" y1="45" x2="417" y2="165" />
      <line x1="463" y1="45" x2="463" y2="165" /><line x1="509" y1="45" x2="509" y2="165" />
    </g>
    <text x="440" y="212" fill="currentColor" text-anchor="middle">grid</text>
    <text x="440" y="230" fill="currentColor" opacity="0.7" font-size="12">spreadsheets, timelines, side-by-side diffs</text>
  </g>
</svg>
</div>

Upright, my 4K panel is 2160 x 3840: around 200 lines of code in one editor at a typical 19-pixel line, against about 110 in landscape. A 400-line review becomes two screenfuls instead of four.

## 16:9 is the only ratio that survives rotation

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

Rotate an ultrawide and you get a chimney: one column wide and taller than a door. Rotate 4:3 and the standing shape is fine, but lying down it pillarboxes every film. 16:9 turns into two text columns and turns back into cinema - not ideal in either orientation, just the only one that is usable in both. That is the whole case for the ratio, and it is why the screen I would replace this one with is still 16:9.

<div style="margin: 1.5em 0; text-align: center;">
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

## On a laptop, the ratio is the only rotation you get
A screen on an arm can be turned, so its shape only has to survive both orientations. A lid cannot be turned: whatever height it has, it keeps for good - and height is what runs out first.

So the ratio should track the size, in the opposite direction to the market: the smaller the panel, the squarer it should be. A small laptop wants 3:2, a larger one 16:10, and 16:9 only starts to pay where the height is there anyway. No laptop is big enough for that. The largest ones sold are 18-inch 16:10 machines - 24 cm of panel height, less than half of what a 40-inch 16:9 has lying down, and a quarter of what it has standing up.

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

On a lid the width is not even a choice - the keyboard sets it. Height is the only free variable, so the ratio is how you spend it. In the same 13-inch chassis, 16:10 is 11% more panel than 16:9 and 3:2 is 19% more, all of it height, and the number on the box grows with it, from 13.3 inches to 13.9. The panel is not what you read on, either: the tab strip and the address bar take about 2.7 cm off the top whatever the shape, so the page grows faster than the glass - 13.9 cm of web page on 16:9 against 16.9 on 3:2, 22% more page for 19% more panel. Centimetres rather than pixels, because zoom moves pixels and leaves the glass where it is; set the same text size on every screen and this is the comparison that survives. Then hold a phone next to it. An iPhone 15 keeps 12.5 cm for the page, so a 13-inch 16:9 laptop - still what most cheap ones ship - shows about 11% more web page than a phone does. Not a multiple. A tenth.

<div style="margin: 1.5em 0; text-align: center;">
<svg viewBox="0 0 620 256" width="100%" style="max-width: 620px; height: auto;" role="img" aria-label="Four screens drawn to physical scale with the same page at the same text size: an iPhone 15 keeps 12.5 cm of page and 19 lines, a 13-inch 16:9 laptop 13.9 cm and 21 lines, a 16:10 one 15.7 cm and 24 lines, a 3:2 one 16.9 cm and 26 lines. Browser bars are shaded off the top, and the shaded side strips are the margins a page leaves beside its text.">
  <g font-family="Helvetica, Arial, sans-serif" font-size="14">
    <text x="310" y="16" fill="currentColor" opacity="0.6" font-size="12" text-anchor="middle">one 13-inch chassis: the keyboard fixes the width, the ratio decides the rest</text>
    <text x="310" y="33" fill="currentColor" opacity="0.6" font-size="12" text-anchor="middle">to scale, same page at the same text size - browser bars and page margins shaded</text>
    <rect x="24" y="119.7" width="32.5" height="70.3" rx="4" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55" />
    <rect x="24" y="119.7" width="32.5" height="4.5" fill="currentColor" opacity="0.32" />
    <rect x="24" y="186.5" width="32.5" height="3.5" fill="currentColor" opacity="0.32" />
    <g stroke="#00cdff" stroke-width="1.4" opacity="0.9">
      <line x1="25.5" y1="126.2" x2="53.5" y2="126.2" /><line x1="25.5" y1="129.4" x2="51.5" y2="129.4" /><line x1="25.5" y1="132.6" x2="52.6" y2="132.6" /><line x1="25.5" y1="135.8" x2="47.3" y2="135.8" />
      <line x1="25.5" y1="139.0" x2="52.0" y2="139.0" /><line x1="25.5" y1="142.2" x2="50.6" y2="142.2" /><line x1="25.5" y1="145.4" x2="52.9" y2="145.4" /><line x1="25.5" y1="148.6" x2="43.5" y2="148.6" />
      <line x1="25.5" y1="151.8" x2="51.8" y2="151.8" /><line x1="25.5" y1="155.0" x2="53.2" y2="155.0" /><line x1="25.5" y1="158.2" x2="49.1" y2="158.2" /><line x1="25.5" y1="161.4" x2="52.3" y2="161.4" />
      <line x1="25.5" y1="164.6" x2="51.2" y2="164.6" /><line x1="25.5" y1="167.8" x2="45.9" y2="167.8" /><line x1="25.5" y1="171.0" x2="52.6" y2="171.0" /><line x1="25.5" y1="174.2" x2="50.3" y2="174.2" />
      <line x1="25.5" y1="177.4" x2="52.0" y2="177.4" /><line x1="25.5" y1="180.6" x2="48.2" y2="180.6" /><line x1="25.5" y1="183.8" x2="52.9" y2="183.8" />
    </g>
    <text x="40.2" y="209" fill="currentColor" opacity="0.75" text-anchor="middle">iPhone 15</text>
    <text x="40.2" y="227" fill="currentColor" opacity="0.75" font-size="12" text-anchor="middle">12.5 cm of page</text>
    <text x="40.2" y="243" fill="currentColor" opacity="0.75" font-size="12" text-anchor="middle">19 lines</text>
    <rect x="96" y="107.2" width="147.2" height="82.8" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55" />
    <rect x="96" y="107.2" width="147.2" height="13.5" fill="currentColor" opacity="0.32" />
    <rect x="102" y="111.7" width="103.2" height="5" rx="2.5" fill="currentColor" opacity="0.45" />
    <rect x="96" y="120.7" width="33.6" height="69.3" fill="currentColor" opacity="0.14" />
    <rect x="209.6" y="120.7" width="33.6" height="69.3" fill="currentColor" opacity="0.14" />
    <g stroke="#00cdff" stroke-width="1.4" opacity="0.9">
      <line x1="129.6" y1="122.7" x2="205.6" y2="122.7" /><line x1="129.6" y1="125.9" x2="200.0" y2="125.9" /><line x1="129.6" y1="129.1" x2="203.2" y2="129.1" /><line x1="129.6" y1="132.3" x2="188.8" y2="132.3" />
      <line x1="129.6" y1="135.5" x2="201.6" y2="135.5" /><line x1="129.6" y1="138.7" x2="197.6" y2="138.7" /><line x1="129.6" y1="141.9" x2="204.0" y2="141.9" /><line x1="129.6" y1="145.1" x2="178.4" y2="145.1" />
      <line x1="129.6" y1="148.3" x2="200.8" y2="148.3" /><line x1="129.6" y1="151.5" x2="204.8" y2="151.5" /><line x1="129.6" y1="154.7" x2="193.6" y2="154.7" /><line x1="129.6" y1="157.9" x2="202.4" y2="157.9" />
      <line x1="129.6" y1="161.1" x2="199.2" y2="161.1" /><line x1="129.6" y1="164.3" x2="184.8" y2="164.3" /><line x1="129.6" y1="167.5" x2="203.2" y2="167.5" /><line x1="129.6" y1="170.7" x2="196.8" y2="170.7" />
      <line x1="129.6" y1="173.9" x2="201.6" y2="173.9" /><line x1="129.6" y1="177.1" x2="191.2" y2="177.1" /><line x1="129.6" y1="180.3" x2="204.0" y2="180.3" /><line x1="129.6" y1="183.5" x2="198.4" y2="183.5" />
      <line x1="129.6" y1="186.7" x2="187.2" y2="186.7" />
    </g>
    <text x="169.6" y="209" fill="currentColor" opacity="0.75" text-anchor="middle">16:9 &#183; 13.3 in</text>
    <text x="169.6" y="227" fill="currentColor" opacity="0.75" font-size="12" text-anchor="middle">13.9 cm of page</text>
    <text x="169.6" y="243" fill="currentColor" opacity="0.75" font-size="12" text-anchor="middle">21 lines</text>
    <rect x="269" y="98" width="147.2" height="92" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55" />
    <rect x="269" y="98" width="147.2" height="13.5" fill="currentColor" opacity="0.32" />
    <rect x="275" y="102.5" width="103.2" height="5" rx="2.5" fill="currentColor" opacity="0.45" />
    <rect x="269" y="111.5" width="33.6" height="78.5" fill="currentColor" opacity="0.14" />
    <rect x="382.6" y="111.5" width="33.6" height="78.5" fill="currentColor" opacity="0.14" />
    <g stroke="#00cdff" stroke-width="1.4" opacity="0.9">
      <line x1="302.6" y1="113.5" x2="378.6" y2="113.5" /><line x1="302.6" y1="116.7" x2="373.0" y2="116.7" /><line x1="302.6" y1="119.9" x2="376.2" y2="119.9" /><line x1="302.6" y1="123.1" x2="361.8" y2="123.1" />
      <line x1="302.6" y1="126.3" x2="374.6" y2="126.3" /><line x1="302.6" y1="129.5" x2="370.6" y2="129.5" /><line x1="302.6" y1="132.7" x2="377.0" y2="132.7" /><line x1="302.6" y1="135.9" x2="351.4" y2="135.9" />
      <line x1="302.6" y1="139.1" x2="373.8" y2="139.1" /><line x1="302.6" y1="142.3" x2="377.8" y2="142.3" /><line x1="302.6" y1="145.5" x2="366.6" y2="145.5" /><line x1="302.6" y1="148.7" x2="375.4" y2="148.7" />
      <line x1="302.6" y1="151.9" x2="372.2" y2="151.9" /><line x1="302.6" y1="155.1" x2="357.8" y2="155.1" /><line x1="302.6" y1="158.3" x2="376.2" y2="158.3" /><line x1="302.6" y1="161.5" x2="369.8" y2="161.5" />
      <line x1="302.6" y1="164.7" x2="374.6" y2="164.7" /><line x1="302.6" y1="167.9" x2="364.2" y2="167.9" /><line x1="302.6" y1="171.1" x2="377.0" y2="171.1" /><line x1="302.6" y1="174.3" x2="371.4" y2="174.3" />
      <line x1="302.6" y1="177.5" x2="360.2" y2="177.5" /><line x1="302.6" y1="180.7" x2="375.4" y2="180.7" /><line x1="302.6" y1="183.9" x2="373.0" y2="183.9" /><line x1="302.6" y1="187.1" x2="369.0" y2="187.1" />
    </g>
    <text x="342.6" y="209" fill="currentColor" opacity="0.75" text-anchor="middle">16:10 &#183; 13.7 in</text>
    <text x="342.6" y="227" fill="currentColor" opacity="0.75" font-size="12" text-anchor="middle">15.7 cm</text>
    <text x="342.6" y="243" fill="currentColor" opacity="0.75" font-size="12" text-anchor="middle">24 lines</text>
    <rect x="442" y="91.9" width="147.2" height="98.1" fill="none" stroke="#00cdff" stroke-width="2" />
    <rect x="442" y="91.9" width="147.2" height="13.5" fill="currentColor" opacity="0.32" />
    <rect x="448" y="96.4" width="103.2" height="5" rx="2.5" fill="currentColor" opacity="0.45" />
    <rect x="442" y="105.4" width="33.6" height="84.6" fill="currentColor" opacity="0.14" />
    <rect x="555.6" y="105.4" width="33.6" height="84.6" fill="currentColor" opacity="0.14" />
    <g stroke="#00cdff" stroke-width="1.4" opacity="0.9">
      <line x1="475.6" y1="107.4" x2="551.6" y2="107.4" /><line x1="475.6" y1="110.6" x2="546.0" y2="110.6" /><line x1="475.6" y1="113.8" x2="549.2" y2="113.8" /><line x1="475.6" y1="117.0" x2="534.8" y2="117.0" />
      <line x1="475.6" y1="120.2" x2="547.6" y2="120.2" /><line x1="475.6" y1="123.4" x2="543.6" y2="123.4" /><line x1="475.6" y1="126.6" x2="550.0" y2="126.6" /><line x1="475.6" y1="129.8" x2="524.4" y2="129.8" />
      <line x1="475.6" y1="133.0" x2="546.8" y2="133.0" /><line x1="475.6" y1="136.2" x2="550.8" y2="136.2" /><line x1="475.6" y1="139.4" x2="539.6" y2="139.4" /><line x1="475.6" y1="142.6" x2="548.4" y2="142.6" />
      <line x1="475.6" y1="145.8" x2="545.2" y2="145.8" /><line x1="475.6" y1="149.0" x2="530.8" y2="149.0" /><line x1="475.6" y1="152.2" x2="549.2" y2="152.2" /><line x1="475.6" y1="155.4" x2="542.8" y2="155.4" />
      <line x1="475.6" y1="158.6" x2="547.6" y2="158.6" /><line x1="475.6" y1="161.8" x2="537.2" y2="161.8" /><line x1="475.6" y1="165.0" x2="550.0" y2="165.0" /><line x1="475.6" y1="168.2" x2="544.4" y2="168.2" />
      <line x1="475.6" y1="171.4" x2="533.2" y2="171.4" /><line x1="475.6" y1="174.6" x2="548.4" y2="174.6" /><line x1="475.6" y1="177.8" x2="546.0" y2="177.8" /><line x1="475.6" y1="181.0" x2="542.0" y2="181.0" />
      <line x1="475.6" y1="184.2" x2="550.8" y2="184.2" /><line x1="475.6" y1="187.4" x2="538.8" y2="187.4" />
    </g>
    <text x="515.6" y="209" fill="#00cdff" text-anchor="middle">3:2 &#183; 13.9 in</text>
    <text x="515.6" y="227" fill="#00cdff" opacity="0.85" font-size="12" text-anchor="middle">16.9 cm</text>
    <text x="515.6" y="243" fill="#00cdff" opacity="0.85" font-size="12" text-anchor="middle">26 lines</text>
  </g>
</svg>
</div>

The objection is video, and at a fixed width it does not hold: a 16:9 film is exactly as large on the 3:2 panel, with the extra height left over above it. It only shrinks if you compare at equal diagonals - which is the comparison shops make, because for the same glass a wider ratio prints a bigger number. The same panel area sells as 13.3 inches at 16:9 and as 12.8 at 3:2, so half an inch of the diagonal is marketing rather than screen.

Which is why [3:2 and 16:10 coming back](https://www.theverge.com/2021/1/19/22238671/16-9-aspect-ratio-hp-elite-folio-dell-latitude-lenovo-thinkbook-plus-legion-7) is the display trend of the last few years I am happiest about. It is the same argument as the big screen's, arriving from the other end: on a laptop you buy height with the ratio, because you cannot buy it with rotation.

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

## Eye level is a rule about staring, not about height
[OSHA](https://www.osha.gov/etools/computer-workstations/components/monitors) wants two things at once: the centre of the screen 15-20 degrees below eye level, and the top of it at or below eye level. On a tall panel those two halves pull against each other.
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

At 70 cm, both halves hold only up to about 51 cm of panel height - which a 40-inch 16:9 lying down (49.8 cm) just squeaks under, and which nothing standing up can meet. The rule has no answer for a tall screen, so the thing to read is its mechanism.

It is quoted far more often than it is explained. It rests on two measured things: the resting posture of the eyes is [about 15 degrees below horizontal](https://pubmed.ncbi.nlm.nih.gov/2798019/), and looking up opens the lids wider - Tsubota and Nakamori [measured](https://jamanetwork.com/journals/jamaophthalmology/fullarticle/641007) 1.2 cm² of exposed eye in downgaze against 3.0 cm² in upgaze, with tear evaporation about 240% higher. Blinking drops from about 22 a minute to 7 in front of a screen.

<div style="margin: 1.5em 0; text-align: center;">
<svg viewBox="0 0 620 215" width="100%" style="max-width: 620px; height: auto;" role="img" aria-label="Bar chart of exposed eye surface by gaze direction: looking down 1.2 square centimetres, straight ahead 2.2, looking up 3.0.">
  <g font-family="Helvetica, Arial, sans-serif" font-size="13">
    <line x1="190" y1="26" x2="190" y2="164" stroke="currentColor" stroke-width="1" opacity="0.4" />
    <text x="180" y="45" fill="currentColor" text-anchor="end">looking down</text>
    <path d="M 190 32 H 306 Q 310 32 310 36 V 50 Q 310 54 306 54 H 190 Z" fill="#00cdff" />
    <text x="322" y="48" fill="currentColor" opacity="0.85">1.2 cm&#178;</text>
    <text x="180" y="90" fill="currentColor" text-anchor="end">straight ahead</text>
    <path d="M 190 77 H 406 Q 410 77 410 81 V 95 Q 410 99 406 99 H 190 Z" fill="#00cdff" />
    <text x="422" y="93" fill="currentColor" opacity="0.85">2.2 cm&#178;</text>
    <text x="180" y="135" fill="currentColor" text-anchor="end">looking up</text>
    <path d="M 190 122 H 486 Q 490 122 490 126 V 140 Q 490 144 486 144 H 190 Z" fill="#00cdff" />
    <text x="502" y="138" fill="currentColor" opacity="0.85">3.0 cm&#178;</text>
    <text x="310" y="188" fill="currentColor" opacity="0.7" font-size="12" text-anchor="middle">exposed eye surface by gaze direction - tear evaporation</text>
    <text x="310" y="205" fill="currentColor" opacity="0.7" font-size="12" text-anchor="middle">rises by about 240% across the same range</text>
  </g>
</svg>
</div>

Both mechanisms are about **sustained** gaze, not about where the panel ends. Holding your eyes up for an hour dries them; glancing up for two seconds does not. This is a comfort optimum averaged over a working day, not a health limit - and the reported prevalence of dry eye among screen workers, anywhere from 9.5% to 87.5%, says more about questionnaires than about eyes.

The sharper objection is not to the rule but to the people it is aimed at. Hardly anyone spends the day looking up; they spend it looking down, at a laptop on a desk or a phone in their lap. If the common error is a bent neck, a screen that lifts the eyes is a correction rather than a hazard.

Up to a point, and the point is where eyes stop and vertebrae start. Gaze shifts of [20 to 30 degrees are made by the eyes](https://pmc.ncbi.nlm.nih.gov/articles/PMC8378697/), the head joining in mostly to keep them inside a comfortable range - and a head held tilted back is not a cure for a head held forward, only a different fixed posture. The thing being corrected is shakier than it sounds, too: the link between forward head posture and neck pain [holds in adults, vanishes in adolescents and is confounded by age](https://pubmed.ncbi.nlm.nih.gov/31773477/). So what a tall screen offers is not a better angle but the absence of a single one - the eyes travel a range all day instead of being pinned to a spot.

Mine sits with its centre roughly at eye level, which puts nearly half the panel above it and the top strip about 32 degrees up - far enough that reading there earns a small nod, which is rather the point. Seven years, no complaints: one desk's worth of evidence, not a recommendation.

So the height costs nothing, and the movement it provokes may be worth something. The editor lives at eye level; the shelf above it holds a running build, a log, a browser I glance at. Two things to check on your own panel first: a curved screen now bends top to bottom, and a VA panel's viewing angles rotate with it.

The one honest argument for a real second screen is narrower than it looks: on a video call, a single screen means the meeting covers the work you are talking about.

## Fewer screens, fewer invitations
The "42% more productive with multiple monitors" figure is vendor-sponsored, and Coding Horror [picked it apart](https://blog.codinghorror.com/does-more-than-one-monitor-improve-productivity/) years ago. The quieter results are the useful ones:

- [NEC/University of Utah](https://www.sharpnecdisplays.us/about/press-release/increasing-monitor-size-translates-to-higher-worke/316): one 24-inch widescreen beat two 20-inch screens by 6% on text editing - and lost that lead on spreadsheets, exactly along the column-grid line.
- [Colvin et al.](https://link.springer.com/chapter/10.1007/978-3-642-21669-5_11): no significant difference in completion time between one and two monitors.
- [Hutchings et al.](https://dl.acm.org/doi/10.1145/989863.989867): more screen space raises window-management overhead, sometimes to counterproductive levels.
- [A 2021 survey of developers at home](https://arxiv.org/abs/2103.13198): the strongest influence on perceived productivity was not the setup, but interruptions.

Underneath all of them sits a confound worth naming. When these studies ran, a second monitor was the only way to buy more pixels, so "two screens" and "more working area" were the same variable and no result could separate them. That is not the choice anyone faces now. The NEC/Utah setup is the one that pulls the two apart - and it pulls against the dual desk: the pair of 20-inch screens carried 48% more panel and 67% more pixels than the single 24-inch widescreen, and still lost the text-editing task.

<div style="margin: 1.5em 0; text-align: center;">
<svg viewBox="0 0 620 195" width="100%" style="max-width: 620px; height: auto;" role="img" aria-label="The 2008 NEC/Utah test conditions drawn to scale: two 20-inch screens with 48 percent more panel and 67 percent more pixels, which lost the text-editing task to one 24-inch widescreen by 6 percent.">
  <g font-family="Helvetica, Arial, sans-serif" font-size="13">
    <text x="310" y="18" fill="currentColor" opacity="0.6" font-size="12" text-anchor="middle">the two conditions of that study, drawn to scale</text>
    <rect x="30" y="45" width="122" height="91" fill="none" stroke="currentColor" stroke-width="2" opacity="0.6" />
    <rect x="158" y="45" width="122" height="91" fill="none" stroke="currentColor" stroke-width="2" opacity="0.6" />
    <line x1="155" y1="41" x2="155" y2="140" stroke="currentColor" stroke-width="5" opacity="0.6" />
    <text x="155" y="162" fill="currentColor" text-anchor="middle">two 20-inch: 48% more panel, 67% more pixels</text>
    <text x="155" y="182" fill="currentColor" opacity="0.7" font-size="12" text-anchor="middle">and it still lost</text>
    <rect x="400" y="42" width="155" height="97" fill="none" stroke="#00cdff" stroke-width="2" />
    <text x="477" y="162" fill="#00cdff" text-anchor="middle">one 24-inch widescreen</text>
    <text x="477" y="182" fill="#00cdff" opacity="0.85" font-size="12" text-anchor="middle">6% faster at text editing</text>
  </g>
</svg>
</div>
So no percentages from me, just a distinction. A second screen is not extra space, it is a standing invitation: somewhere to park a chat window where it costs nothing. On one surface everything that wants my attention has to take it from what I am working on, which makes it my decision rather than the desk's.

## How it sits on the desk
A VESA arm behind the screen, the original stand gone, the desk underneath it free again.

 Rotating takes a few seconds - pull it towards me, turn it, push it back. Upright for work, landscape for films and for gaming with my daughter, which is still the best argument for a big 16:9 that I know.

None of which is a love letter to my particular monitor. The successor I asked for in 2022 still does not exist, and turning the old screen on its side was only the upgrade I could have had back then. Upright, 4K is enough, not plenty: put a 6K or 8K 16:9 on the shelf, curved, and it goes on the arm the same afternoon. Only the band at eye level has to behave itself - and shelves can always be taller.
