import fs from 'fs';

const unlinkedImages = [
  'PXL_20220211_203450843.jpg',
  'PXL_20220215_045824044.jpg',
  'PXL_20220319_202012303.jpg',
  'PXL_20220319_202053812.jpg',
  'PXL_20220319_202249397.jpg',
  'PXL_20220319_202957180.jpg',
  'PXL_20220319_203009275.jpg',
  'PXL_20220319_203352934.jpg',
  'PXL_20220319_203511452.jpg',
  'PXL_20220319_204057937.jpg',
  'PXL_20220319_204240244.jpg'
];

// Pair them to thematic passages that currently lack images
const unlinkedPairings = {
  'Saint Gloria': 'PXL_20220211_203450843.jpg',
  'chemicals': 'PXL_20220215_045824044.jpg',
  'battery': 'PXL_20220319_202012303.jpg',
  'long nights in a shitty motel': 'PXL_20220319_202053812.jpg',
  'homeward bound': 'PXL_20220319_202249397.jpg',
  'toby': 'PXL_20220319_202957180.jpg',
  'morning': 'PXL_20220319_203009275.jpg',
  'the ending': 'PXL_20220319_203352934.jpg',
  'a stone from home': 'PXL_20220319_203511452.jpg',
  'God': 'PXL_20220319_204057937.jpg',
  'rebirth': 'PXL_20220319_204240244.jpg'
};

console.log('Paired 11 archival plates:');
for (const [passage, img] of Object.entries(unlinkedPairings)) {
  console.log(`  "${passage}" => ${img}`);
}
