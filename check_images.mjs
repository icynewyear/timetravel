import fs from 'fs';

const passages = JSON.parse(fs.readFileSync('C:/Users/icyne/projects/timetravel/book/passages_analyzed.json'));

const withImgs = passages.filter(p => p.images.length > 0);
console.log(`Passages with linked images in Twine: ${withImgs.length}`);
withImgs.forEach(p => console.log(`  "${p.name}": [${p.images.join(', ')}]`));

// Check available images in assets/images
const availableImgs = fs.readdirSync('C:/Users/icyne/projects/timetravel/assets/images');
console.log(`\nAvailable images in assets/images: ${availableImgs.length}`);

// Which images are not yet linked to any passage?
const linkedImgs = new Set(withImgs.flatMap(p => p.images));
const unlinkedImgs = availableImgs.filter(img => !linkedImgs.has(img));
console.log(`Unlinked image plates: ${unlinkedImgs.length}`);
unlinkedImgs.forEach(img => console.log(`  - ${img}`));
