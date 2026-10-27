import fs from 'fs';

const passages = JSON.parse(fs.readFileSync('C:/Users/icyne/projects/timetravel/book/passages_analyzed.json'));

// Find which passages have incoming links
const incoming = new Map();
passages.forEach(p => incoming.set(p.name, []));

passages.forEach(p => {
  p.links.forEach(l => {
    let target = l.target;
    for (const p2 of passages) {
      if (p2.name.toLowerCase() === target.toLowerCase()) {
        incoming.get(p2.name).push({ from: p.name, text: l.text });
        break;
      }
    }
  });
});

const unlinked = passages.filter(p => incoming.get(p.name).length === 0 && p.name !== 'Intro');
console.log(`Unlinked passages count: ${unlinked.length}`);

unlinked.forEach((u, i) => {
  console.log(`\n--- [${i + 1}] "${u.name}" (tags: "${u.tags}", outgoing: ${u.links.length}, images: ${u.images.length}) ---`);
  console.log(`Sample Text: ${u.cleanText.slice(0, 150).replace(/\r?\n/g, ' / ')}...`);
  if (u.links.length > 0) {
    console.log(`  Outgoing: ${u.links.map(l => `[[${l.text} -> ${l.target}]]`).join(', ')}`);
  }
});
