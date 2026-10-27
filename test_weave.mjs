import fs from 'fs';

const passages = JSON.parse(fs.readFileSync('C:/Users/icyne/projects/timetravel/book/passages_analyzed.json'));

// Map of passage name to passage object
const pMap = new Map();
passages.forEach(p => pMap.set(p.name, p));

// Weaving additions: [fromPassage, promptText, toPassage]
const newLinks = [
  // Cluster 1: The Rust Goddess & Saint Gloria & Chemicals
  ['the rust goddess', 'Pity Saint Gloria', 'Saint Gloria'],
  ['Saint Gloria', 'Search for who she prayed to', 'God'],
  ['Saint Gloria', 'Listen to the gears inside your skull', 'chemicals'],
  ['chemicals', 'Let the chemistry numb the doubt', 'pretentious crap'],
  ['chemicals', 'Count the sins between doses', 'sins'],
  ['pretentious crap', 'Abandon pretension for bees', 'introspective poetry'],
  ['introspective poetry', 'Watch the bees in the garden', 'bees are dying at an alarming rate'],
  ['sins', 'Drive a knife into the headache', 'bullets'],
  ['bullets', 'Charge your hollow chest', 'battery'],
  ['battery', 'Let the angels drain you into war', 'war'],

  // Cluster 2: Existential, Hallucinations & The Cosmic Sky
  ['war', 'Count the extra fingers on your hand', 'how many fingers am I holding up?'],
  ['war', 'Look up at the cherubs in the canopy', 'cherub'],
  ['cherub', 'Preach the untrue gospel', 'heretic'],
  ['heretic', 'Question the survivor\'s guilt', 'God'],
  ['God', 'Wonder if it\'s all just circles', 'rebirth'],
  ['Nibiru', 'Pray to the absent creator', 'God'],
  ['Nibiru', 'Search the radio waves for rain', '1001'],
  ['1001', 'Watch the rain blur the wipers', 'the rain'],
  ['the rain', 'Hunker down with a stone from home', 'a stone from home'],
  ['a stone from home', 'Break down in the cardboard world', 'untitled'],
  ['untitled', 'Look for shelter by the highway', 'long nights in a shitty motel'],
  ['rebellion', 'Spin into the untrue truth', 'revolutions'],
  ['revolutions', 'Catch the feathers falling from the sky', 'wings'],
  ['wings', 'Feel the bones crack and pop', 'crackpop'],
  ['crackpop', 'Look through the eyes of the beast', 'full of eyes'],
  ['full of eyes', 'Step through the blinding threshold', 'threshold'],

  // Cluster 3: Highway, Motels & Somatic Grounding
  ['Staunton', 'Write the room number on your forearm', 'long nights in a shitty motel'],
  ['long nights in a shitty motel', 'Test your senses against the mirror', 'how many fingers am I holding up?'],
  ['how many fingers am I holding up?', 'Turn the ignition and face the asphalt', 'back on the road'],
  ['back on the road', 'Stop where the river meets the asphalt', 'allensville'],
  ['allensville', 'Push the pedal till you pop off', 'burn out'],
  ['burn out', 'Point the headlights toward home', 'homeward bound'],
  ['homeward bound', 'Sit on the porch with Dad\'s beer', 'porch'],
  ['car crashes', 'Gamble on the hurricane', 'risk'],
  ['risk', 'Grip the wheel and hold on', 'take the wheel'],

  // Cluster 4: Intimacy, Love, Humor & Tenderness
  ['mistress', 'Make a deal with the verse', 'deal'],
  ['deal', 'Graze the back of their neck', 'connected'],
  ['connected', 'Breathe in the citrus in the air', 'oranges'],
  ['oranges', 'Speak their name like starlight', 'when I say your name'],
  ['when I say your name', 'Watch the smile dance across their lips', 'threshold'],
  ['him', 'Count the hands holding yours', 'so many'],
  ['so many', 'Twist the left wrist and confess', 'leftwrist twist'],
  ['leftwrist twist', 'Let irony take the driver\'s seat', 'me(bothofus)'],
  ['me(bothofus)', 'Wrap them in the warmth of the quilt', 'warmth'],
  ['warmth', 'Listen to Toby snoring beside the bed', 'toby'],
  ['toby', 'Wake early to greet the sunrise', 'morning'],
  ['boys of Tinder', 'Reread the unanswered notifications', 'texts'],
  ['texts', 'Trace lines of dialogue in the dark', 'lines'],
  ['lines', 'Ask for a napkin for the blood and coffee', 'thank you'],
  ['a love poem to myself', 'Look at the scrapbook photos', 'Scrapbook'],
  ['changeling', 'Run fingers through the drifting hair', 'hair'],
  ['hair', 'Dance through the supermarket aisles', 'dance'],
  ['dance', 'Sing along to the grocery store radio', 'song'],
  ['song', 'Wander into the arms of Abigail', 'Abigail'],
  ['paintings', 'Confront the unspoken splashes of color', 'lies, alright?'],
  ['lies, alright?', 'Admit the unabridged truth', 'an unabridged admission'],

  // Connectings back to endings & narrative loops
  ['bees are dying at an alarming rate', 'Laugh into the mirror and thank the world', 'thank you'],
  ['threshold', 'Reach the bend where the road ends', 'the ending'],
  ['rebirth', 'Awaken at the beginning of the timeline', 'Intro']
];

// Apply new links
newLinks.forEach(([from, text, target]) => {
  const pFrom = pMap.get(from);
  if (!pFrom) throw new Error(`Missing from passage: "${from}"`);
  const pTarget = pMap.get(target);
  if (!pTarget) throw new Error(`Missing target passage: "${target}"`);
  pFrom.links.push({
    raw: `${text} -> ${target}`,
    text,
    target,
    isWoven: true
  });
});

// Verify Reachability from 'Intro'
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

console.log(`Reachable passages after weaving: ${reachable.size} / ${passages.length}`);
if (reachable.size !== passages.length) {
  const unreachable = passages.filter(p => !reachable.has(p.name));
  console.log('Unreachable passages:', unreachable.map(p => p.name));
} else {
  console.log('SUCCESS! 100% of passages are fully reachable from Section 1 (Intro)!');
}

// Check which passages are designated Endings (terminal nodes)
const endings = passages.filter(p => p.links.length === 0);
console.log(`Terminal Ending Passages (${endings.length}):`);
endings.forEach(e => console.log(`  - "${e.name}"`));
