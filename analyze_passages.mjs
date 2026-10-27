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

while ((m = passageRegex.exec(content)) !== null) {
  const pid = m[1];
  const name = decodeHtml(m[2]).trim();
  const tags = m[3];
  const rawBody = m[4];
  const decodedBody = decodeHtml(rawBody);

  // Extract dropbox images if any
  const images = [];
  const imgMatches = decodedBody.matchAll(/https:\/\/www\.dropbox\.com\/[^"\s\)]+/g);
  for (const img of imgMatches) {
    const url = img[0];
    const filename = url.split('/').pop().split('?')[0];
    images.push(filename);
  }

  // Extract links
  const links = [];
  const linkMatches = decodedBody.matchAll(/\[\[(.*?)\]\]/g);
  for (const link of linkMatches) {
    const inner = link[1].trim();
    let text = inner;
    let target = inner;
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
    links.push({ raw: inner, text, target });
  }

  // Clean body to get poem text without link macros or Twine header tags
  let cleanText = decodedBody
    .replace(/<img[^>]*>/gi, '')
    .replace(/https:\/\/www\.dropbox\.com\/[^\s\)]+/g, '')
    .replace(/\[\[.*?\]\]/g, '')
    .replace(/\(text-style:[^)]*\)\[(.*?)\]/g, '$1')
    .replace(/\(text-colour:[^)]*\)\[(.*?)\]/g, '$1')
    .replace(/\(link-reveal:[^)]*\)\[(.*?)\]/g, '$1')
    .replace(/\(link-goto:[^)]*\)\[(.*?)\]/g, '$1')
    .replace(/\(click:[^)]*\)\[(.*?)\]/g, '$1')
    .replace(/=\|=\s*\[ADD\+\s*GLITCH\s*ART\]\s*\|==\|/gi, '')
    .replace(/=\|=/g, '')
    .replace(/\|==\|/g, '')
    .replace(/==\|/g, '')
    .replace(/^#([^\r\n]+)/m, '') // strip '#Title'
    .replace(/^\s*---\s*$/gm, '')
    .trim();

  passages.push({
    pid,
    name,
    tags,
    cleanText,
    images,
    links,
    isLeaf: links.length === 0
  });
}

console.log(`Analyzed ${passages.length} passages.`);
const leafCount = passages.filter(p => p.isLeaf).length;
console.log(`Leaf passages (no outgoing links): ${leafCount}`);

// Save to a clean passages JSON
fs.writeFileSync('C:/Users/icyne/projects/timetravel/book/passages_analyzed.json', JSON.stringify(passages, null, 2));
console.log('Saved passages_analyzed.json');
