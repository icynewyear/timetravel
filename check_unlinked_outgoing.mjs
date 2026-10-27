import fs from 'fs';
const passages = JSON.parse(fs.readFileSync('C:/Users/icyne/projects/timetravel/book/passages_analyzed.json'));
const unlinked = passages.filter(p => !p.links.some(l => false)); // we want to see unlinked with outgoing
// Find unlinked
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
const unlinkedPassages = passages.filter(p => !reachable.has(p.name));
console.log('Unlinked with outgoing links:');
unlinkedPassages.filter(p => p.links.length > 0).forEach(p => {
  console.log(`  "${p.name}" has ${p.links.length} outgoing links:`, p.links.map(l => `${l.text} -> ${l.target}`));
});
console.log('Unlinked with 0 outgoing links (standalone):', unlinkedPassages.filter(p => p.links.length === 0).length);
