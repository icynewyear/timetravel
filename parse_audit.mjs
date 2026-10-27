import fs from 'fs';

const content = fs.readFileSync('C:/Users/icyne/projects/timetravel/time.html', 'utf8');

function decodeHtml(html) {
  return html
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

const passageRegex = /<tw-passagedata\s+pid="(\d+)"\s+name="([^"]+)"\s+tags="([^"]*)"[^>]*>([\s\S]*?)<\/tw-passagedata>/g;
let m;
const passages = [];
const passageNames = new Set();
const passageMap = new Map();

while ((m = passageRegex.exec(content)) !== null) {
  const pid = m[1];
  const name = decodeHtml(m[2]).trim();
  const tags = m[3];
  const rawBody = m[4];
  const decodedBody = decodeHtml(rawBody);
  const entry = { pid, name, tags, rawBody, decodedBody };
  passages.push(entry);
  passageNames.add(name);
  passageMap.set(name, entry);
}

console.log('Total passages found:', passages.length);
console.log('Unique passage names:', passageNames.size);

let totalLinks = 0;
let resolvedLinks = 0;
const unresolved = [];
const incomingLinks = new Map();
passages.forEach(p => incomingLinks.set(p.name, []));

passages.forEach(p => {
  const linkMatches = p.decodedBody.matchAll(/\[\[(.*?)\]\]/g);
  for (const match of linkMatches) {
    totalLinks++;
    const inner = match[1].trim();
    let target = inner;
    let text = inner;

    if (inner.includes('->')) {
      const parts = inner.split('->');
      text = parts[0].trim();
      target = parts[1].trim();
    } else if (inner.includes('<-')) {
      const parts = inner.split('<-');
      target = parts[0].trim();
      text = parts[1].trim();
    } else if (inner.includes('|')) {
      const parts = inner.split('|');
      text = parts[0].trim();
      target = parts[1].trim();
    }

    // Also check trimming and casing
    let matchedTarget = null;
    if (passageNames.has(target)) {
      matchedTarget = target;
    } else {
      // Case-insensitive or trimmed search
      for (const name of passageNames) {
        if (name.toLowerCase() === target.toLowerCase()) {
          matchedTarget = name;
          break;
        }
      }
    }

    if (matchedTarget) {
      resolvedLinks++;
      incomingLinks.get(matchedTarget).push({ from: p.name, text });
    } else {
      unresolved.push({ from: p.name, raw: inner, target, text });
    }
  }
});

console.log('Total links:', totalLinks);
console.log('Resolved links:', resolvedLinks);
console.log('Unresolved count:', unresolved.length);

if (unresolved.length > 0) {
  console.log('Unresolved links:');
  unresolved.forEach(u => console.log(`  From "${u.from}": [[${u.raw}]] -> "${u.target}"`));
}

const noIncoming = passages.filter(p => incomingLinks.get(p.name).length === 0 && p.name !== 'Intro');
console.log('Passages with 0 incoming links (excluding Intro):', noIncoming.length);
noIncoming.forEach(p => console.log(`  - "${p.name}" (tags: ${p.tags})`));
