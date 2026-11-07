import fs from 'fs';

const tree = JSON.parse(fs.readFileSync('C:/Users/icyne/projects/timetravel/book/story_tree.json', 'utf8'));
const origHtml = fs.readFileSync('C:/Users/icyne/projects/timetravel/time.html', 'utf8');

console.log('Tree nodes count:', tree.length);

const passageRegex = /<tw-passagedata\s+pid="(\d+)"\s+name="([^"]+)"/g;
let m;
const origNames = new Set();
while ((m = passageRegex.exec(origHtml)) !== null) {
  origNames.add(m[2]);
}
console.log('Original time.html unique passages:', origNames.size);

const missingInOrig = tree.filter(n => !origNames.has(n.passageName));
console.log('Tree nodes missing in time.html:', missingInOrig.length);
if (missingInOrig.length > 0) {
  console.log('Missing names:', missingInOrig.map(n => n.passageName));
}
