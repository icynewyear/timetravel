import fs from 'fs';
import path from 'path';

// Seeded pseudo-random number generator (Mulberry32) for deterministic section shuffling
function mulberry32(a) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
}

const rng = mulberry32(13112026); // seeded with passage 1311 + year 2026

const rawPassages = JSON.parse(fs.readFileSync('C:/Users/icyne/projects/timetravel/book/passages_analyzed.json'));
const pMap = new Map();
rawPassages.forEach(p => pMap.set(p.name, p));

// Apply the branch weaving links
const newLinks = [
  // Cluster 1: The Rust Goddess & Saint Gloria & Chemicals
  ['the rust goddess', 'Pity Saint Gloria', 'Saint Gloria'],
  ['Saint Gloria', 'Search for who she prayed to', 'God'],
  ['Saint Gloria', 'Listen to the gears inside your skull', 'chemicals'],
  ['chemicals', 'Let the chemistry numb the doubt', 'pretentious crap'],
  ['chemicals', 'Count the sins between doses', 'sins'],
  ['pretentious crap', 'Abandon pretension for bees', 'introspective poetry'],
  ['introspective poetry', 'Watch the bees in the garden', 'bees are dying at an alarming rate'],
  ['sins', 'Drive a knife into the headache', 'bullets'],
  ['bullets', 'Charge your hollow chest', 'battery'],
  ['battery', 'Let the angels drain you into war', 'war'],

  // Cluster 2: Existential, Hallucinations & The Cosmic Sky
  ['war', 'Count the extra fingers on your hand', 'how many fingers am I holding up?'],
  ['war', 'Look up at the cherubs in the canopy', 'cherub'],
  ['cherub', 'Preach the untrue gospel', 'heretic'],
  ['heretic', 'Question the survivor\'s guilt', 'God'],
  ['God', 'Wonder if it\'s all just circles', 'rebirth'],
  ['Nibiru', 'Pray to the absent creator', 'God'],
  ['Nibiru', 'Search the radio waves for rain', '1001'],
  ['1001', 'Watch the rain blur the wipers', 'the rain'],
  ['the rain', 'Hunker down with a stone from home', 'a stone from home'],
  ['a stone from home', 'Break down in the cardboard world', 'untitled'],
  ['untitled', 'Look for shelter by the highway', 'long nights in a shitty motel'],
  ['rebellion', 'Spin into the untrue truth', 'revolutions'],
  ['revolutions', 'Catch the feathers falling from the sky', 'wings'],
  ['wings', 'Feel the bones crack and pop', 'crackpop'],
  ['crackpop', 'Look through the eyes of the beast', 'full of eyes'],
  ['full of eyes', 'Step through the blinding threshold', 'threshold'],

  // Cluster 3: Highway, Motels & Somatic Grounding
  ['Staunton', 'Write the room number on your forearm', 'long nights in a shitty motel'],
  ['long nights in a shitty motel', 'Test your senses against the mirror', 'how many fingers am I holding up?'],
  ['how many fingers am I holding up?', 'Turn the ignition and face the asphalt', 'back on the road'],
  ['back on the road', 'Stop where the river meets the asphalt', 'allensville'],
  ['allensville', 'Push the pedal till you pop off', 'burn out'],
  ['burn out', 'Point the headlights toward home', 'homeward bound'],
  ['homeward bound', 'Sit on the porch with Dad\'s beer', 'porch'],
  ['car crashes', 'Gamble on the hurricane', 'risk'],
  ['risk', 'Grip the wheel and hold on', 'take the wheel'],

  // Cluster 4: Intimacy, Love, Humor & Tenderness
  ['mistress', 'Make a deal with the verse', 'deal'],
  ['deal', 'Graze the back of their neck', 'connected'],
  ['connected', 'Breathe in the citrus in the air', 'oranges'],
  ['oranges', 'Speak their name like starlight', 'when I say your name'],
  ['when I say your name', 'Watch the smile dance across their lips', 'threshold'],
  ['him', 'Count the hands holding yours', 'so many'],
  ['so many', 'Twist the left wrist and confess', 'leftwrist twist'],
  ['leftwrist twist', 'Let irony take the driver\'s seat', 'me(bothofus)'],
  ['me(bothofus)', 'Wrap them in the warmth of the quilt', 'warmth'],
  ['warmth', 'Listen to Toby snoring beside the bed', 'toby'],
  ['toby', 'Wake early to greet the sunrise', 'morning'],
  ['boys of Tinder', 'Reread the unanswered notifications', 'texts'],
  ['texts', 'Trace lines of dialogue in the dark', 'lines'],
  ['lines', 'Ask for a napkin for the blood and coffee', 'thank you'],
  ['a love poem to myself', 'Look at the scrapbook photos', 'Scrapbook'],
  ['changeling', 'Run fingers through the drifting hair', 'hair'],
  ['hair', 'Dance through the supermarket aisles', 'dance'],
  ['dance', 'Sing along to the grocery store radio', 'song'],
  ['song', 'Wander into the arms of Abigail', 'Abigail'],
  ['paintings', 'Confront the unspoken splashes of color', 'lies, alright?'],
  ['lies, alright?', 'Admit the unabridged truth', 'an unabridged admission'],

  // Connectings back to endings & narrative loops
  ['bees are dying at an alarming rate', 'Laugh into the mirror and thank the world', 'thank you'],
  ['threshold', 'Reach the bend where the road ends', 'the ending'],
  ['rebirth', 'Awaken at the beginning of the timeline', 'Intro']
];

newLinks.forEach(([from, text, target]) => {
  const pFrom = pMap.get(from);
  pFrom.links.push({ raw: text, text, target, isWoven: true });
});

// Image pairings for previously unlinked art plates
const unlinkedPairings = {
  'Saint Gloria': 'PXL_20220211_203450843.jpg',
  'chemicals': 'PXL_20220215_045824044.jpg',
  'battery': 'PXL_20220319_202012303.jpg',
  'long nights in a shitty motel': 'PXL_20220319_202053812.jpg',
  'homeward bound': 'PXL_20220319_202249397.jpg',
  'toby': 'PXL_20220319_202957180.jpg',
  'morning': 'PXL_20220319_203009275.jpg',
  'the ending': 'PXL_20220319_203352934.jpg',
  'a stone from home': 'PXL_20220319_203511452.jpg',
  'God': 'PXL_20220319_204057937.jpg',
  'rebirth': 'PXL_20220319_204240244.jpg'
};

for (const [pName, imgFile] of Object.entries(unlinkedPairings)) {
  const p = pMap.get(pName);
  if (p && p.images.length === 0) {
    p.images.push(imgFile);
  }
}

// Section Shuffling:
// Section 1 is ALWAYS 'Intro'.
// The remaining 99 passages are shuffled into Section numbers 2..100.
const nonIntro = rawPassages.filter(p => p.name !== 'Intro');

// Fisher-Yates shuffle with seeded rng
for (let i = nonIntro.length - 1; i > 0; i--) {
  const j = Math.floor(rng() * (i + 1));
  [nonIntro[i], nonIntro[j]] = [nonIntro[j], nonIntro[i]];
}

const sectionMap = new Map(); // passageName -> sectionNumber
const passageBySection = new Map(); // sectionNumber -> passage

// Assign Intro -> 1
sectionMap.set('Intro', 1);
passageBySection.set(1, pMap.get('Intro'));

nonIntro.forEach((p, idx) => {
  const secNum = idx + 2;
  sectionMap.set(p.name, secNum);
  passageBySection.set(secNum, p);
});

console.log(`Mapped 100 passages to 100 sections.`);
console.log(`Intro is Section ${sectionMap.get('Intro')}`);
console.log(`the rust goddess is Section ${sectionMap.get('the rust goddess')}`);
console.log(`crossroads is Section ${sectionMap.get('crossroads')}`);
console.log(`morning is Section ${sectionMap.get('morning')}`);
console.log(`rebirth is Section ${sectionMap.get('rebirth')}`);

// Format clean text with poetic line breaks
function formatPoemHtml(text) {
  if (!text) return '<p class="prose-empty"><em>(The page is filled with deliberate, ringing silence.)</em></p>';
  
  // Split into stanzas by double newline
  const stanzas = text.split(/\r?\n\s*\r?\n/);
  return stanzas.map(stanza => {
    const lines = stanza.split(/\r?\n/).map(line => {
      // Escape HTML
      const escaped = line
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
      // Preserve leading whitespace for indentation
      const leadingSpaces = escaped.match(/^\s*/)[0].length;
      if (leadingSpaces > 0) {
        return `<span style="padding-left: ${leadingSpaces * 0.7}em">${escaped.trim()}</span>`;
      }
      return escaped;
    });
    return `<div class="stanza">\n  ${lines.join('<br>\n  ')}\n</div>`;
  }).join('\n\n');
}

// Clean choice text for CYOA prose
function cleanPrompt(text, targetName) {
  let clean = text
    .replace(/^Turn to page\s*->\s*/i, '')
    .replace(/^Turn the page\s*->\s*/i, '')
    .replace(/^Turn to page\s*-\s*&gt;\s*/i, '')
    .replace(/^Turn to page\s*-\s*>\s*/i, '')
    .replace(/^Turn the page\s*-\s*&gt;\s*/i, '')
    .replace(/^Turn to page\s*/i, '')
    .trim();
  
  if (!clean || clean.toLowerCase() === targetName.toLowerCase()) {
    clean = `Follow the path toward ${targetName}`;
  }
  return clean;
}

// Build the Sections HTML
const sectionsHtml = [];

for (let secNum = 1; secNum <= 100; secNum++) {
  const p = passageBySection.get(secNum);
  const poemHtml = formatPoemHtml(p.cleanText);
  
  // Archival Art Plate if present
  let artHtml = '';
  if (p.images && p.images.length > 0) {
    const imgFilename = p.images[0];
    const imagePath = `../assets/images/${imgFilename}`;
    artHtml = `
      <div class="art-plate">
        <img src="${imagePath}" alt="Archival Plate: ${p.name}" class="plate-image">
        <div class="plate-caption">PLATE § ${secNum} — ARCHIVAL ARTIFACT: <em>${p.name.toUpperCase()}</em> (${imgFilename.split('_')[0]})</div>
      </div>
    `;
  }

  // Choices / Endings Block
  let choicesHtml = '';
  if (p.links.length === 0) {
    let endingTitle = 'THE ROAD BENDS';
    if (p.name === 'morning') endingTitle = 'SUNRISE SURVIVAL';
    if (p.name === 'the ending') endingTitle = 'THE FINAL THRESHOLD';
    if (p.name === 'thank you') endingTitle = 'GRACE IN THE CHAOS';
    if (p.name === 'Scrapbook') endingTitle = 'ARCHIVE COMPLETE';

    choicesHtml = `
      <div class="ending-block">
        <div class="ending-badge">[ ENDING: ${endingTitle} ]</div>
        <p class="ending-desc">You have traveled across the boundary and arrived at the far shore of this memory.</p>
        <div class="ending-prompt">To re-enter the timeline from the beginning, turn to <strong><a href="#section-1">Section 1</a></strong>.</div>
      </div>
    `;
  } else {
    const choiceItems = p.links.map(l => {
      // Find target passage
      let targetPassage = null;
      for (const p2 of rawPassages) {
        if (p2.name.toLowerCase() === l.target.toLowerCase()) {
          targetPassage = p2;
          break;
        }
      }
      if (!targetPassage) throw new Error(`Missing target: ${l.target} from ${p.name}`);
      const targetSecNum = sectionMap.get(targetPassage.name);
      const prompt = cleanPrompt(l.text, targetPassage.name);

      return `
        <li class="choice-item">
          <span class="choice-text">• If you choose to <em>${prompt}</em>:</span>
          <span class="choice-dest">turn to <strong><a href="#section-${targetSecNum}">Section ${targetSecNum}</a></strong>.</span>
        </li>
      `;
    }).join('\n');

    choicesHtml = `
      <div class="choices-container">
        <div class="choices-header">WHAT DO YOU DO?</div>
        <ul class="choices-list">
          ${choiceItems}
        </ul>
      </div>
    `;
  }

  sectionsHtml.push(`
    <section class="gamebook-section" id="section-${secNum}">
      <div class="section-header">
        <div class="section-numeral">SECTION ${secNum}</div>
        <div class="section-title">${p.name.toUpperCase()}</div>
      </div>
      <div class="section-divider">✦ &nbsp; ✦ &nbsp; ✦</div>
      
      <div class="section-content">
        ${poemHtml}
      </div>

      ${artHtml}

      ${choicesHtml}
    </section>
  `);
}

// Master Concordance (Alphabetical index of all poems -> section number)
const alphabeticalPassages = [...rawPassages].sort((a, b) => a.name.localeCompare(b.name));
const concordanceRows = alphabeticalPassages.map(p => {
  const sec = sectionMap.get(p.name);
  const hasArt = p.images && p.images.length > 0 ? '✦ Plate' : '—';
  const type = p.links.length === 0 ? 'Ending' : 'Branch';
  return `
    <tr>
      <td class="concord-title"><a href="#section-${sec}">${p.name}</a></td>
      <td class="concord-sec"><strong>§ ${sec}</strong></td>
      <td class="concord-type">${type}</td>
      <td class="concord-art">${hasArt}</td>
    </tr>
  `;
}).join('\n');

// Complete HTML Document
const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>TIMETRAVEL — An Interactive CYOA Poetry Book by Icy Sheets</title>
  <style>
    @page {
      size: 6in 9in;
      margin: 0.75in 0.65in 0.85in 0.65in;
      @bottom-center {
        content: counter(page);
        font-family: 'Courier Prime', Courier, monospace;
        font-size: 8.5pt;
        color: #555;
      }
    }

    @page :left {
      margin-left: 0.85in;
      margin-right: 0.65in;
    }

    @page :right {
      margin-left: 0.65in;
      margin-right: 0.85in;
    }

    *, *:before, *:after {
      box-sizing: border-box;
    }

    body {
      font-family: 'EB Garamond', 'Georgia', serif;
      font-size: 10.5pt;
      line-height: 1.6;
      color: #111;
      background-color: #fff;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    /* FRONT MATTER STYLES */
    .page-break {
      page-break-after: always;
      break-after: page;
    }

    .half-title-page {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 7.2in;
      text-align: center;
    }

    .half-title {
      font-size: 28pt;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      font-family: 'Courier Prime', 'Consolas', monospace;
      font-weight: normal;
      margin-bottom: 0.5em;
    }

    .half-subtitle {
      font-size: 10pt;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #666;
    }

    .title-page {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 7.2in;
      text-align: center;
      padding: 0.5in 0;
    }

    .title-main {
      font-size: 34pt;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      font-family: 'Courier Prime', monospace;
      margin: 0;
      font-weight: bold;
    }

    .title-sub {
      font-size: 12pt;
      font-style: italic;
      margin-top: 0.5in;
      letter-spacing: 0.05em;
      color: #333;
    }

    .title-author {
      font-size: 15pt;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-top: 1in;
      font-family: 'EB Garamond', Georgia, serif;
    }

    .title-press {
      font-size: 9pt;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #555;
    }

    .colophon-page {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      height: 7.2in;
      font-size: 8.5pt;
      line-height: 1.7;
      color: #444;
    }

    .colophon-block {
      border-top: 1px solid #ccc;
      padding-top: 0.25in;
    }

    .dedication-page {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 7.2in;
      text-align: center;
      font-style: italic;
      font-size: 11pt;
      line-height: 2;
    }

    /* ESSAY & RETROSPECTIVE */
    .prose-section {
      padding: 0.2in 0;
    }

    .prose-title {
      font-family: 'Courier Prime', monospace;
      font-size: 16pt;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      text-align: center;
      margin-bottom: 0.1in;
    }

    .prose-subtitle {
      font-size: 10pt;
      font-style: italic;
      text-align: center;
      color: #555;
      margin-bottom: 0.35in;
    }

    .prose-body p {
      text-indent: 1.5em;
      margin: 0;
      margin-bottom: 0.5em;
      text-align: justify;
    }

    .prose-body p:first-of-type {
      text-indent: 0;
    }

    .prose-body p:first-of-type:first-letter {
      float: left;
      font-size: 38pt;
      line-height: 0.8;
      padding-right: 0.1em;
      font-family: 'Courier Prime', monospace;
      font-weight: bold;
    }

    /* GAMEBOOK SECTION STYLING */
    .gamebook-section {
      page-break-after: always;
      break-after: page;
      padding-top: 0.2in;
      min-height: 6.8in;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .section-header {
      text-align: center;
      margin-bottom: 0.15in;
    }

    .section-numeral {
      font-family: 'Courier Prime', 'Consolas', monospace;
      font-size: 15pt;
      font-weight: bold;
      letter-spacing: 0.15em;
      color: #111;
      border-bottom: 1.5px solid #111;
      display: inline-block;
      padding-bottom: 0.04in;
      margin-bottom: 0.05in;
    }

    .section-title {
      font-size: 8.5pt;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #666;
      margin-top: 0.04in;
    }

    .section-divider {
      text-align: center;
      font-size: 7.5pt;
      letter-spacing: 0.3em;
      color: #999;
      margin-bottom: 0.2in;
    }

    .section-content {
      flex-grow: 1;
      font-size: 11pt;
      line-height: 1.65;
      margin-bottom: 0.2in;
    }

    .stanza {
      margin-bottom: 1.1em;
    }

    /* ART PLATES */
    .art-plate {
      margin: 0.2in 0;
      text-align: center;
      page-break-inside: avoid;
    }

    .plate-image {
      max-width: 90%;
      max-height: 3.2in;
      object-fit: contain;
      filter: grayscale(100%) contrast(115%);
      border: 1px solid #ddd;
      padding: 3px;
    }

    .plate-caption {
      font-family: 'Courier Prime', monospace;
      font-size: 6.5pt;
      letter-spacing: 0.12em;
      color: #666;
      margin-top: 0.06in;
    }

    /* CHOICES CONTAINER */
    .choices-container {
      margin-top: 0.25in;
      padding-top: 0.12in;
      border-top: 1px solid #111;
      page-break-inside: avoid;
    }

    .choices-header {
      font-family: 'Courier Prime', monospace;
      font-size: 8.5pt;
      font-weight: bold;
      letter-spacing: 0.18em;
      margin-bottom: 0.08in;
      color: #222;
    }

    .choices-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .choice-item {
      font-size: 9.5pt;
      line-height: 1.45;
      margin-bottom: 0.08in;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    .choice-text {
      flex-grow: 1;
      padding-right: 0.2in;
    }

    .choice-dest {
      font-family: 'Courier Prime', monospace;
      white-space: nowrap;
      font-size: 9pt;
      border-bottom: 1px dotted #333;
    }

    /* ENDING BLOCK */
    .ending-block {
      margin-top: 0.3in;
      padding: 0.2in;
      border: 1.5px solid #111;
      background: #fbfbfb;
      text-align: center;
      page-break-inside: avoid;
    }

    .ending-badge {
      font-family: 'Courier Prime', monospace;
      font-size: 9.5pt;
      font-weight: bold;
      letter-spacing: 0.2em;
      margin-bottom: 0.08in;
      text-transform: uppercase;
    }

    .ending-desc {
      font-size: 9.5pt;
      font-style: italic;
      color: #444;
      margin: 0 0 0.1in 0;
    }

    .ending-prompt {
      font-family: 'Courier Prime', monospace;
      font-size: 8.5pt;
      letter-spacing: 0.08em;
      margin: 0;
      border-top: 1px dashed #ccc;
      padding-top: 0.08in;
    }

    /* CONCORDANCE TABLE */
    .concordance-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.5pt;
      margin-top: 0.2in;
    }

    .concordance-table th {
      font-family: 'Courier Prime', monospace;
      letter-spacing: 0.1em;
      font-size: 8pt;
      text-align: left;
      border-bottom: 1.5px solid #111;
      padding: 0.06in 0;
    }

    .concordance-table td {
      padding: 0.04in 0;
      border-bottom: 1px dotted #e0e0e0;
    }

    .concord-sec {
      font-family: 'Courier Prime', monospace;
      text-align: right;
    }

    .concord-type {
      color: #666;
      font-style: italic;
      padding-left: 0.15in;
    }

    .concord-art {
      color: #888;
      text-align: center;
    }
  </style>
</head>
<body>

  <!-- 1. HALF TITLE -->
  <div class="half-title-page page-break">
    <div class="half-title">TIMETRAVEL</div>
    <div class="half-subtitle">AN INTERACTIVE GAMEBOOK OF SURVIVAL AND VERSE</div>
  </div>

  <!-- 2. FRONTISPIECE -->
  <div class="page-break" style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:7.2in;">
    <div class="art-plate">
      <img src="../assets/images/PXL_20220215_040013515.jpg" alt="Frontispiece Plate" class="plate-image" style="max-height: 4.8in;">
      <div class="plate-caption">FRONTISPIECE — THE TIMELINE CROSSROADS (2022 ARCHIVE)</div>
    </div>
  </div>

  <!-- 3. TITLE PAGE -->
  <div class="title-page page-break">
    <div>
      <div class="title-main">TIMETRAVEL</div>
      <div class="title-sub">An Interactive Choose-Your-Own-Adventure Poetry Book</div>
    </div>
    
    <div>
      <div class="title-author">ICY SHEETS</div>
    </div>

    <div class="title-press">
      REQUIEM SPIRE PRESS • SALEM, OREGON
    </div>
  </div>

  <!-- 4. COLOPHON & COPYRIGHT -->
  <div class="colophon-page page-break">
    <div class="colophon-block">
      <p><strong>TIMETRAVEL: An Interactive Choose-Your-Own-Adventure Poetry Book</strong><br>
      Copyright © 2026 by Icy Sheets. All rights reserved.</p>

      <p>Original hyper-poetic passages composed in Twine 2 (Harlowe) between 2014 and 2022.<br>
      Compiled, topologically woven, and typeset into physical gamebook form in Salem, Oregon, 2026.</p>

      <p>Interior typography set in <em>EB Garamond</em> and <em>Courier Prime</em>.<br>
      Archival visual plates photographed and preserved from original notebooks, canvases, and motel desk journals.</p>

      <p>No part of this book may be reproduced in any form without written permission from the author, except for brief quotations embodied in critical reviews or scholarly analysis.</p>

      <p>First Physical Edition: October 2026<br>
      Standard 6" × 9" Trade Paperback Specification<br>
      ISBN: 979-8-89240-000-0 (IngramSpark / KDP Ready)</p>
    </div>
  </div>

  <!-- 5. DEDICATION -->
  <div class="dedication-page page-break">
    <p>
      For Cosmo & Winter,<br>
      who anchor the present,<br><br>
      and for the younger self<br>
      hunkered down in those shitty motel rooms<br>
      writing on her forearm with a ballpoint pen:<br><br>
      <em>You made it through the night.</em>
    </p>
  </div>

  <!-- 6. OPERATIONAL GUIDE: HOW TO READ THIS BOOK -->
  <div class="prose-section page-break">
    <div class="prose-title">OPERATIONAL GUIDE</div>
    <div class="prose-subtitle">HOW TO NAVIGATE TIME TRAVEL</div>
    
    <div class="prose-body">
      <p>This is not a linear book of poetry. You do not turn from page to page in chronological sequence. Instead, <em>Timetravel</em> is an interactive labyrinth structured across one hundred distinct sections. At the conclusion of almost every passage, you will be presented with a fork in the road—a visceral decision reflecting bodily states, chemical interventions, hallucinated mythologies, motel corridors, and relational risks.</p>

      <p>To begin, turn to <strong>Section 1</strong> on page 1. Read the verse, feel the weight of its cadence, and examine the choices printed at the bottom of the section. When you decide which path to take, turn directly to the indicated Section number. Do not read the intervening pages. In physical gamebooks, turning the page is an intentional act of propulsion; you leap across the volume just as memory leaps across trauma and time.</p>

      <p>Some paths will circle back on themselves, echoing the perseverative loops of psychiatric instability and insomnia. Other paths will terminate at one of four canonical endings—transcendent resting points where the storm recedes and survival is realized. If you encounter an <em>[ENDING]</em> marker, you have completed one timeline. Bookmark it, rest your eyes, and when you are ready, turn back to Section 1 to enter a different branch of the architecture.</p>

      <p>Every single poem in this book is reachable. In the back of this volume, an Alphabetical Concordance is provided so that after you have wandered the labyrinth, you may locate any specific poem or archival plate directly.</p>
    </div>
  </div>

  <!-- 7. AUTHOR'S RETROSPECTIVE: I AM I -->
  <div class="prose-section page-break">
    <div class="prose-title">I AM I</div>
    <div class="prose-subtitle">A POST-EQUILIBRIUM RETROSPECTIVE</div>

    <div class="prose-body">
      <p>Between 2014 and 2022, I lived inside the storm. These passages were not drafted as polished literary exercises for a salon; they were emergency telemetry. When you are moving through severe bipolar cycles, manic flights where angels whisper behind your skull, sensory overloads, medication titrations that leave you either shaking or numb, and long nights staring at motel ceiling tiles, writing is not a hobby—it is an anchor dropped into a fathomless ocean.</p>

      <p>I originally built <em>Timetravel</em> inside Twine because linear form could not hold the multiplicity of those states. In a traditional book, a poem sits quietly on the page, pretending that grief and clarity follow a straight line. But madness is branched. Chemistry is branched. Every morning and every evening presents a fork: <em>Do I take the pills? Do I smash the plate? Do I look at the bees? Do I get in the car and drive seventy miles per hour down highway seventy-six?</em></p>

      <p>To hold this physical book today in 2026—bound in ink, paper, and hard-won somatic peace—is proof that equilibrium is possible. The rust goddess does not own me. The angels have laid down their swords. The dog snores beside the bed, the morning sun breaks over the Oregon ridge, and the timeline holds. I am I.</p>
    </div>
  </div>

  <!-- 8. THE 100 GAMEBOOK SECTIONS -->
  ${sectionsHtml.join('\n\n')}

  <!-- 9. MASTER CONCORDANCE / INDEX -->
  <div class="prose-section page-break">
    <div class="prose-title">MASTER CONCORDANCE</div>
    <div class="prose-subtitle">ALPHABETICAL INDEX OF POEMS & SECTIONS</div>

    <table class="concordance-table">
      <thead>
        <tr>
          <th>POEM TITLE</th>
          <th style="text-align: right;">SECTION</th>
          <th style="padding-left: 0.15in;">ROLE</th>
          <th style="text-align: center;">ART PLATE</th>
        </tr>
      </thead>
      <tbody>
        ${concordanceRows}
      </tbody>
    </table>
  </div>

  <!-- 10. CLOSING COLOPHON -->
  <div class="colophon-page" style="text-align: center; justify-content: center;">
    <p style="font-family: 'Courier Prime', monospace; font-size: 11pt; letter-spacing: 0.2em; text-transform: uppercase;">
      TIMETRAVEL IS COMPLETE.<br>
      ✦ &nbsp; ✦ &nbsp; ✦<br>
      SALEM, OREGON • 2026
    </p>
  </div>

</body>
</html>
`;

fs.writeFileSync('C:/Users/icyne/projects/timetravel/book/timetravel_interior.html', fullHtml);
console.log('Saved timetravel_interior.html successfully!');
console.log(`File size: ${Math.round(fullHtml.length / 1024)} KB`);
