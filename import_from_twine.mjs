import fs from 'fs';

function decodeHtml(html) {
  if (!html) return '';
  return html
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

export function parseTwineHtml(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const passageRegex = /<tw-passagedata\s+pid="(\d+)"\s+name="([^"]+)"\s+tags="([^"]*)"[^>]*>([\s\S]*?)<\/tw-passagedata>/g;
  let m;
  const passages = [];

  while ((m = passageRegex.exec(content)) !== null) {
    const pid = parseInt(m[1], 10);
    const name = decodeHtml(m[2]).trim();
    const tags = m[3] ? m[3].split(' ').filter(Boolean) : [];
    const decodedBody = decodeHtml(m[4]);

    // Extract images
    const images = [];
    const imgTagMatches = decodedBody.matchAll(/\[img\[(?:assets\/images\/)?([^\]]+)\]\]/g);
    for (const match of imgTagMatches) {
      images.push(match[1]);
    }
    const dropboxMatches = decodedBody.matchAll(/https:\/\/www\.dropbox\.com\/[^"\s\)]+/g);
    for (const match of dropboxMatches) {
      const filename = match[0].split('/').pop().split('?')[0];
      if (!images.includes(filename)) images.push(filename);
    }

    // Extract links
    const choices = [];
    const linkMatches = decodedBody.matchAll(/\[\[(.*?)\]\]/g);
    for (const link of linkMatches) {
      const inner = link[1].trim();
      let prompt = inner;
      let target = inner;

      if (inner.includes('->')) {
        const parts = inner.split('->');
        prompt = parts[0].trim();
        target = parts[1].trim();
      } else if (inner.includes('<-')) {
        const parts = inner.split('<-');
        target = parts[0].trim();
        prompt = parts[1].trim();
      } else if (inner.includes('|')) {
        const parts = inner.split('|');
        prompt = parts[0].trim();
        target = parts[1].trim();
      }

      choices.push({
        prompt,
        targetName: target,
        isWoven: false
      });
    }

    // Strip links and image tags to leave raw poem text
    let cleanText = decodedBody
      .replace(/\[img\[.*?\]\]/g, '')
      .replace(/\[\[.*?\]\]/g, '')
      .replace(/https:\/\/www\.dropbox\.com\/[^\s\)]+/g, '')
      .trim();

    passages.push({
      pid,
      passageName: name,
      text: cleanText,
      images,
      tags,
      choices,
      isEnding: choices.length === 0,
      endingTitle: choices.length === 0 ? name : null
    });
  }

  return passages;
}

if (process.argv[1] && process.argv[1].endsWith('import_from_twine.mjs')) {
  const inputFile = process.argv[2] || 'C:/Users/icyne/projects/timetravel/how_to_time_travel_twine.html';
  const parsed = parseTwineHtml(inputFile);
  console.log(`Parsed ${parsed.length} passages from ${inputFile}`);
  console.log(`Sample: ${parsed[0].passageName} with ${parsed[0].choices.length} choices`);
}
