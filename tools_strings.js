// Lists every English activity string that Spanish mode needs to translate.
global.window = {}; require('./src/data.js'); const D = window.AD, S = new Set();
const add = s => { if (typeof s === 'string' && s.trim()) S.add(s); };
D.CASES.forEach(c => {
  add(c.example); add(c.transfer);
  c.moments.forEach(m => { add(m.q); add(m.why); });
  c.analyze.forEach(it => {
    add(it.q); add(it.hint); add(it.frame); add(it.model);
    (it.o || []).forEach(o => { add(o[0]); add(o[1]); });
    (it.cats || []).forEach(x => add(x[1])); (it.opts || []).forEach(x => add(x[1]));
    (it.items || []).forEach(x => x.forEach((y, i) => { if (!(i === 1 && (it.type === 'sort' || it.type === 'judge'))) add(y); }));
    (it.reveal || []).forEach(add); (it.check || []).forEach(add);
  });
  [c.evaluate, c.college].forEach(e => { if (e) { add(e.q); add(e.frame); (e.check || []).forEach(add); } });
  add(c.model);
});
D.REPORT.forEach(f => { add(f.n); add(f.p); add(f.frame); });
D.RUBRIC.forEach(r => r.forEach(add));
const arr = [...S]; require('fs').writeFileSync('/tmp/es_needed.json', JSON.stringify(arr, null, 0));
console.log(arr.length, 'strings,', arr.join(' ').split(/\s+/).length, 'words');
