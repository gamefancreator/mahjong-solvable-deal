const { MBEngine: E } = require('./engine.js');

const N = 400;
let failed = false;
const rows = [];

for (const id of Object.keys(E.LAYOUTS)) {
  const pos = E.expand(E.LAYOUTS[id]);
  const idx = E.buildIndex(pos);
  const n = pos.length;
  const problems = [];
  if (idx.size !== n) problems.push('duplicate positions');
  if (n % 2) problems.push('odd tile count ' + n);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const a = pos[i], b = pos[j];
      if (a.z === b.z && Math.abs(a.x - b.x) < 2 && Math.abs(a.y - b.y) < 2) problems.push('overlap ' + JSON.stringify(a) + ' ' + JSON.stringify(b));
    }
  }
  for (const p of pos) {
    if (!p.z) continue;
    let support = 0;
    for (const q of pos) if (q.z === p.z - 1 && Math.abs(q.x - p.x) < 2 && Math.abs(q.y - p.y) < 2) support += (2 - Math.abs(q.x - p.x)) * (2 - Math.abs(q.y - p.y));
    if (support < 4) problems.push('unsupported ' + JSON.stringify(p));
  }
  let mz = 0;
  for (const p of pos) mz = Math.max(mz, p.z);
  const present = pos.map(() => 1);
  const free0 = E.freeList(pos, idx, present).length;
  let stuck = 0, open0 = 0;
  for (let t = 0; t < N; t++) {
    const faces = E.newDeal(id);
    if (faces.length !== n) problems.push('faces length ' + faces.length);
    const count = {};
    for (const f of faces) count[E.matchKey(f)] = (count[E.matchKey(f)] || 0) + 1;
    for (const k in count) if (count[k] % 2) problems.push('odd group ' + k);
    open0 += E.openPairs(pos, idx, present, faces).length;
    const pr = present.slice();
    let left = n;
    for (;;) {
      const op = E.openPairs(pos, idx, pr, faces);
      if (!op.length) break;
      const m = op[Math.floor(Math.random() * op.length)];
      pr[m[0]] = 0; pr[m[1]] = 0; left -= 2;
    }
    if (left) stuck++;
  }
  if (problems.length) failed = true;
  rows.push([id, n, mz + 1, free0, (open0 / N).toFixed(1), Math.round(100 * stuck / N) + '%', problems.length ? problems.slice(0, 3).join('; ') : 'ok']);
}

const w = [12, 6, 7, 14, 26, 20];
console.log(['layout', 'tiles', 'layers', 'free at start', 'pairs open at start (avg)', 'lost by random play'].map((h, i) => h.padEnd(w[i])).join(' ') + ' check');
for (const r of rows) console.log(r.slice(0, 6).map((c, i) => String(c).padEnd(w[i])).join(' ') + ' ' + r[6]);
process.exit(failed ? 1 : 0);
