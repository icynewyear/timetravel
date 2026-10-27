import fs from 'fs';

const passages = JSON.parse(fs.readFileSync('C:/Users/icyne/projects/timetravel/book/passages_analyzed.json'));

// Build reachable set from 'Intro'
const reachable = new Set(['Intro']);
let added = true;
while (added) {
  added = false;
  passages.forEach(p => {
    if (reachable.has(p.name)) {
      p.links.forEach(l => {
        for (const p2 of passages) {
          if (p2.name.toLowerCase() === l.target.toLowerCase()) {
            if (!reachable.has(p2.name)) {
              reachable.add(p2.name);
              added = true;
            }
          }
        }
      });
    }
  });
}

console.log('Reachable passages from Intro:', reachable.size);

const reachablePassages = passages.filter(p => reachable.has(p.name));
const reachableLeaves = reachablePassages.filter(p => p.links.length === 0);
console.log('Reachable leaf nodes (currently dead-end endings in active tree):', reachableLeaves.length);
reachableLeaves.forEach(l => {
  console.log(`  - "${l.name}" (tags: "${l.tags}"): ${l.cleanText.slice(0, 80).replace(/\r?\n/g, ' ')}...`);
});

const reachableOneChoice = reachablePassages.filter(p => p.links.length === 1);
console.log('Reachable nodes with only 1 outgoing choice:', reachableOneChoice.length);
reachableOneChoice.forEach(o => {
  console.log(`  - "${o.name}" -> [[${o.links[0].text} -> ${o.links[0].target}]]`);
});
