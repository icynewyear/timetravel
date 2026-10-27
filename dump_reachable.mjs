import fs from 'fs';

const passages = JSON.parse(fs.readFileSync('C:/Users/icyne/projects/timetravel/book/passages_analyzed.json'));

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

console.log('--- Reachable 55 Nodes Summary ---');
passages.filter(p => reachable.has(p.name)).forEach(p => {
  const outgoing = p.links.map(l => `[[${l.text} -> ${l.target}]]`).join(', ');
  console.log(`[${p.name}] (links: ${p.links.length}) => ${outgoing || '(LEAF / END)'}`);
});
