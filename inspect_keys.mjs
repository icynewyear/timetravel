import fs from 'fs';

const origHtml = fs.readFileSync('C:/Users/icyne/projects/timetravel/time.html', 'utf8');
const pMap = new Map();
const passageRegex = /<tw-passagedata\s+pid="(\d+)"\s+name="([^"]+)"\s+tags="([^"]*)"\s+position="([^"]*)"\s+size="([^"]*)">([\s\S]*?)<\/tw-passagedata>/g;

let m;
while ((m = passageRegex.exec(origHtml)) !== null) {
  pMap.set(m[2], {
    pid: m[1],
    name: m[2],
    tags: m[3],
    position: m[4],
    size: m[5],
    body: m[6]
  });
}

console.log('Original map size:', pMap.size);
for (const [k, v] of pMap.entries()) {
  if (k.toLowerCase().includes('beer') || k.toLowerCase().includes('humira')) {
    console.log('Matched key in time.html:', JSON.stringify(k));
  }
}
