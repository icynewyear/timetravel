import fs from 'fs';

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function decodeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

// 1. Read existing time.html to harvest story metadata, styles, scripts, tags, positions
const timeHtml = fs.readFileSync('C:/Users/icyne/projects/timetravel/time.html', 'utf8');
const tree = JSON.parse(fs.readFileSync('C:/Users/icyne/projects/timetravel/book/story_tree.json', 'utf8'));

// Extract position/size/tag metadata from time.html
const passageRegex = /<tw-passagedata\s+pid="(\d+)"\s+name="([^"]+)"\s+tags="([^"]*)"\s+position="([^"]*)"\s+size="([^"]*)">([\s\S]*?)<\/tw-passagedata>/g;
let m;
const origMeta = new Map();

while ((m = passageRegex.exec(timeHtml)) !== null) {
  const decodedName = decodeHtml(m[2]).trim();
  origMeta.set(decodedName, {
    pid: parseInt(m[1], 10),
    origNameAttr: m[2],
    tags: m[3],
    position: m[4],
    size: m[5],
    rawBody: m[6]
  });
}

console.log(`Indexed metadata for ${origMeta.size} original passages.`);

// Extract story header up to the first <tw-passagedata>
const storyStartIdx = timeHtml.indexOf('<tw-passagedata');
const header = timeHtml.substring(0, storyStartIdx);

// Extract footer after the last </tw-passagedata>
const storyEndIdx = timeHtml.lastIndexOf('</tw-passagedata>') + '</tw-passagedata>'.length;
const footer = timeHtml.substring(storyEndIdx);

// Build new tw-passagedata elements from story_tree.json
const passageBlocks = [];
let nextPid = 1;
let gridX = 100;
let gridY = 100;

for (let i = 0; i < tree.length; i++) {
  const node = tree[i];
  const name = node.passageName.trim();
  const meta = origMeta.get(name) || origMeta.get(node.passageName);

  const pid = meta ? meta.pid : nextPid++;
  const tags = meta ? meta.tags : '';
  let position = meta ? meta.position : `${gridX},${gridY}`;
  if (!meta) {
    gridX += 150;
    if (gridX > 1500) {
      gridX = 100;
      gridY += 150;
    }
  }
  const size = meta ? meta.size : '100,100';

  // Construct passage text with Twine links
  let body = node.text ? node.text.trim() : '';

  // Append images if present and not already embedded in body
  if (node.images && node.images.length > 0) {
    node.images.forEach(img => {
      if (!body.includes(img)) {
        // Embed image plate note or markdown
        body = `[img[assets/images/${img}]]\n\n` + body;
      }
    });
  }

  // Append choices as Twine syntax [[Prompt->Target]]
  if (node.choices && node.choices.length > 0) {
    body += '\n\n';
    node.choices.forEach(c => {
      const prompt = c.prompt ? c.prompt.trim() : `Turn to ${c.targetName}`;
      const target = c.targetName ? c.targetName.trim() : '';
      if (prompt === target) {
        body += `[[${target}]]\n`;
      } else {
        body += `[[${prompt}->${target}]]\n`;
      }
    });
  }

  // Encode for XML attribute and passage content
  const escapedName = escapeHtml(node.passageName);
  const escapedTags = escapeHtml(tags);
  const escapedContent = body
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  passageBlocks.push(
    `<tw-passagedata pid="${pid}" name="${escapedName}" tags="${escapedTags}" position="${position}" size="${size}">${escapedContent}</tw-passagedata>`
  );
}

const fullExport = header + passageBlocks.join('\n') + footer;
fs.writeFileSync('C:/Users/icyne/projects/timetravel/how_to_time_travel_twine.html', fullExport, 'utf8');
console.log('Successfully generated C:/Users/icyne/projects/timetravel/how_to_time_travel_twine.html');
console.log(`Total passages exported: ${passageBlocks.length}`);
