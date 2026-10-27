import fs from 'fs';
const f1 = fs.readFileSync('C:/Users/icyne/projects/timetravel/time.html', 'utf8');
const f2 = fs.readFileSync('C:/Users/icyne/projects/timetravel/meds.html', 'utf8');
console.log('f1 vs f2 length:', f1.length, f2.length);
for (let i = 0; i < Math.min(f1.length, f2.length); i++) {
  if (f1[i] !== f2[i]) {
    console.log(`Diff at ${i}: f1="${f1.slice(i, i + 30)}" vs f2="${f2.slice(i, i + 30)}"`);
    break;
  }
}
