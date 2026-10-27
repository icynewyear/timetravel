import fs from 'fs';

for (const file of ['time.html', 'meds.html', 'sample.html']) {
  const content = fs.readFileSync(`C:/Users/icyne/projects/timetravel/${file}`, 'utf8');
  const nameMatch = content.match(/<tw-storydata[^>]*name="([^"]*)"/);
  const passageMatches = content.match(/<tw-passagedata/g) || [];
  console.log(`${file}: storyName="${nameMatch ? nameMatch[1] : 'none'}", passages=${passageMatches.length}, bytes=${content.length}`);
}
