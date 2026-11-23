/* Ad Detective — app engine. No accounts, no network calls, no trackers. Work is saved only in this browser. */
(function () {
  "use strict";
  const D = window.AD, KEY = "addetective-v1";
  const $ = (s, r) => (r || document).querySelector(s);
  const E = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const words = s => (String(s || "").trim().match(/\S+/g) || []).length;
  const mmss = t => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

  /* ---------- state ---------- */
  const fresh = () => ({ lang: "en", level: "hs", cases: {}, report: { choice: "story", real: "", f: {} }, custom: {} });
  let S, storageOK = true;
  try { S = Object.assign(fresh(), JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) { S = fresh(); storageOK = false; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { storageOK = false; } };
  const C = id => (S.cases[id] = S.cases[id] || { brief: false, watched: false, tags: {}, cmp: {}, why: {}, a: {} });
  const A = (id, k) => (C(id).a[k] = C(id).a[k] || {});
  const T = p => (Array.isArray(p) ? (S.lang === "es" ? p[1] : p[0]) : p);
  const es = () => S.lang === "es";
  const X = s => (es() && window.AD_ES && window.AD_ES[s]) || s; /* Spanish for activity text */

  /* ---------- interface text ---------- */
  const U = {
    skip: ["Skip to main content", "Saltar al contenido principal"],
    cases: ["Cases", "Casos"], notebook: ["Notebook", "Cuaderno"], report: ["Final report", "Informe final"], glossary: ["Vocabulary", "Vocabulario"], teacher: ["Teacher", "Maestro"],
    hs: ["High School", "Preparatoria"], col: ["College challenge", "Reto universitario"], level: ["Level", "Nivel"],
    tagline: ["Look beyond the advertisement. Investigate the message.", "Mira más allá del anuncio. Investiga el mensaje."],
    mission: ["Your mission: investigate the message", "Tu misión: investigar el mensaje"],
    heroP: ["Every advertisement has a strategy. In six cases, you'll collect evidence, name the techniques, spot the flaws, and decide what's fair. Persuasive doesn't always mean truthful, and it doesn't always mean dishonest either.", "Cada anuncio tiene una estrategia. En seis casos, reunirás evidencia, nombrarás las técnicas, detectarás las fallas y decidirás qué es justo. Persuasivo no siempre significa verdadero, pero tampoco siempre significa deshonesto."],
    startCase1: ["Open Case 1", "Abrir el Caso 1"], cont: ["Continue", "Continuar"], replay: ["Replay the example", "Repetir el ejemplo"],
    distinct: ["Four ideas you'll use in every case", "Cuatro ideas que usarás en cada caso"],
    cycle: ["How each case works", "Cómo funciona cada caso"],
    steps: [["Brief", "Resumen"], ["Watch", "Mira"], ["Evidence", "Evidencia"], ["Analyze", "Analiza"], ["Evaluate", "Evalúa"]],
    stepsHelp: [["Read the mission and key words.", "Lee la misión y las palabras clave."], ["Watch the ad or read the transcript.", "Mira el anuncio o lee la transcripción."], ["Tag the persuasive moments.", "Etiqueta los momentos persuasivos."], ["Answer, sort, and explain.", "Responde, clasifica y explica."], ["Judge the reasoning and the ethics.", "Juzga el razonamiento y la ética."]],
    privacy: ["Your work saves only in this browser. Shared or school-managed computers may clear it, so download a backup from your Notebook. Ad Detective never asks for your name or email.", "Tu trabajo se guarda solo en este navegador. Las computadoras compartidas o de la escuela pueden borrarlo, así que descarga una copia desde tu Cuaderno. Ad Detective nunca te pide tu nombre ni tu correo."],
    noStorage: ["This browser isn't saving your work. Copy or download it before you leave.", "Este navegador no está guardando tu trabajo. Cópialo o descárgalo antes de salir."],
    caseN: ["Case", "Caso"], focus: ["Focus", "Enfoque"], target: ["Learning target", "Objetivo de aprendizaje"],
    keyWords: ["Key words", "Palabras clave"], worked: ["Worked example", "Ejemplo resuelto"], begin: ["Start the investigation", "Empezar la investigación"],
    cantPlay: ["This browser can't play the video. Try Chrome or Safari, or use the transcript below; it has everything you need.", "Este navegador no puede reproducir el video. Prueba con Chrome o Safari, o usa la transcripción de abajo; tiene todo lo que necesitas."],
    videoMissing: ["The video for this case hasn't been added yet. Everything you need is in the transcript.", "El video de este caso todavía no se ha añadido. Todo lo que necesitas está en la transcripción."],
    transcript: ["Transcript", "Transcripción"], see: ["See", "Ves"], hear: ["Narrator", "Narrador"], onscreen: ["On screen", "En pantalla"], sound: ["Sound", "Sonido"],
    watched: ["I've watched or read the ad", "Ya vi o leí el anuncio"], watchedDone: ["Watched", "Visto"],
    evidenceP: ["Tag each moment with the techniques you see. A moment can use more than one, and some use none. Then compare with the investigator.", "Etiqueta cada momento con las técnicas que ves. Un momento puede usar más de una, y algunos no usan ninguna. Luego compara con el investigador."],
    whyNote: ["Your explanation (evidence card)", "Tu explicación (tarjeta de evidencia)"], compare: ["Compare with the investigator", "Comparar con el investigador"],
    both: ["You both tagged", "Ambos etiquetaron"], missed: ["The investigator also tagged", "El investigador también etiquetó"], extra: ["Only you tagged", "Solo tú etiquetaste"],
    extraNote: ["Not necessarily wrong. If you can defend it with evidence, explain it in your card.", "No necesariamente está mal. Si puedes defenderlo con evidencia, explícalo en tu tarjeta."],
    seek: ["Jump to", "Ir a"], addOwn: ["Add your own evidence", "Agregar tu propia evidencia"], ownLine: ["Choose a line from the transcript", "Elige una línea de la transcripción"], addCard: ["Add evidence card", "Agregar tarjeta de evidencia"], remove: ["Remove", "Quitar"],
    hint: ["Show a hint", "Mostrar una pista"], tryAgain: ["Not yet. Read the feedback and try again.", "Todavía no. Lee la retroalimentación e inténtalo de nuevo."], showAns: ["Show the answer", "Mostrar la respuesta"],
    check: ["Check my answers", "Revisar mis respuestas"], choose: ["Choose…", "Elige…"],
    compareList: ["Compare with the investigator's list", "Comparar con la lista del investigador"], reveal: ["Reveal the hidden details", "Mostrar los detalles ocultos"], needFirst: ["What would you need to know first?", "¿Qué necesitarías saber primero?"], hidden: ["Hidden details", "Detalles ocultos"], accurate: ["A more accurate version", "Una versión más exacta"],
    model: ["Compare with a model answer", "Comparar con una respuesta modelo"], writeMore: ["Write a little more to unlock the model.", "Escribe un poco más para desbloquear el modelo."],
    evaluate: ["Your judgment", "Tu juicio"], frame: ["Sentence starter", "Inicio de oración"], selfCheck: ["Self-check", "Autoevaluación"], college: ["College challenge", "Reto universitario"], transfer: ["Beyond the classroom", "Fuera del salón"],
    done: ["Case complete", "Caso completo"], nextCase: ["Next case", "Siguiente caso"], prevStep: ["Previous", "Anterior"], nextStep: ["Next", "Siguiente"],
    actEnglish: ["Activities are in English for now; use the Spanish transcript and vocabulary cards for support.", "Por ahora las actividades están en inglés; usa la transcripción en español y las tarjetas de vocabulario como apoyo."],
    nbTitle: ["Detective Notebook", "Cuaderno del detective"], nbP: ["Everything you've tagged and written, in one place. Review it before you submit.", "Todo lo que has etiquetado y escrito, en un solo lugar. Revísalo antes de entregarlo."],
    copy: ["Copy my work", "Copiar mi trabajo"], download: ["Download (.txt)", "Descargar (.txt)"], backup: ["Download a backup", "Descargar una copia de seguridad"], restore: ["Restore a backup", "Restaurar una copia"], clear: ["Delete all my work", "Borrar todo mi trabajo"],
    copied: ["Copied. Paste it into a Google Doc or Canvas.", "Copiado. Pégalo en un documento de Google o en Canvas."], downloaded: ["Downloaded.", "Descargado."],
    submit: ["To turn it in: Copy or Download, paste into a Google Doc, then submit it in Canvas.", "Para entregarlo: copia o descarga, pégalo en un documento de Google y entrégalo en Canvas."],
    empty: ["Nothing here yet. Open a case to start collecting evidence.", "Todavía no hay nada aquí. Abre un caso para empezar a reunir evidencia."],
    rpTitle: ["Advertising Investigation Report", "Informe de investigación publicitaria"], rpP: ["Analyze an ad you haven't studied yet. Your report contains only your own words.", "Analiza un anuncio que todavía no hayas estudiado. Tu informe contiene solo tus propias palabras."],
    rpStory: ["The \u201cOpen Shelf\u201d library storyboard", "El guion gráfico de la biblioteca \u201cEstante abierto\u201d"], rpReal: ["A real ad I've seen", "Un anuncio real que he visto"], rpRealP: ["Describe the ad: where you saw it, what you saw and heard, and any words on screen.", "Describe el anuncio: dónde lo viste, qué viste y oíste, y las palabras en pantalla."],
    rubric: ["Rubric", "Rúbrica"], copyReport: ["Copy my report", "Copiar mi informe"], dlReport: ["Download my report", "Descargar mi informe"],
    restoreOK: ["Backup restored.", "Copia restaurada."], restoreBad: ["That file isn't an Ad Detective backup.", "Ese archivo no es una copia de Ad Detective."],
    confirmClear: ["Delete all your Ad Detective work in this browser? Download a backup first if you want to keep it.", "¿Borrar todo tu trabajo de Ad Detective en este navegador? Descarga una copia primero si quieres conservarlo."],
    fictional: ["All brands, people, products, and statistics in these ads are invented for instruction.", "Todas las marcas, personas, productos y estadísticas de estos anuncios son inventados para la clase."]
  };
  const u = k => T(U[k]);

  /* ---------- progress ---------- */
  const objIdx = c => c.analyze.map((x, i) => i).filter(i => ["mc", "sort", "judge", "option", "inspect", "rewrite"].includes(c.analyze[i].type));
  function solved(c, i) {
    const a = A(c.id, i), it = c.analyze[i];
    if (it.type === "mc") return a.ok === true;
    if (it.type === "sort" || it.type === "judge") return it.items.every((x, j) => a.v && a.v[j] === x[1]);
    if (it.type === "option") return !!a.rev;
    if (it.type === "inspect") return it.items.every((x, j) => a.rev && a.rev[j]);
    if (it.type === "rewrite") return !!a.rev;
    return false;
  }
  function wsSolved(c) { const w = A(c.id, "ws"); return c.moments.every((m, j) => w.v && m.tags.includes(w.v[j])) && words(w.p1) >= 5 && words(w.p2) >= 5 && words(w.rw) >= 20 && words(w.cc) >= 4; }
  function segs(c) {
    const st = C(c.id), tagged = c.moments.filter((m, j) => (st.tags[j] || []).length && st.cmp[j]).length;
    return [st.brief, st.watched, tagged >= Math.min(3, c.moments.length), c.workspace ? wsSolved(c) : objIdx(c).every(i => solved(c, i)), words(A(c.id, "eval").t) >= 15];
  }
  function ring(c, size) {
    const s = segs(c), n = s.length, r = size / 2 - 4, cx = size / 2, gap = 0.08;
    const arc = k => { const a0 = (k / n) * 2 * Math.PI + gap - Math.PI / 2, a1 = ((k + 1) / n) * 2 * Math.PI - gap - Math.PI / 2; return `M ${cx + r * Math.cos(a0)} ${cx + r * Math.sin(a0)} A ${r} ${r} 0 0 1 ${cx + r * Math.cos(a1)} ${cx + r * Math.sin(a1)}`; };
    const doneN = s.filter(Boolean).length;
    return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="${E(`${doneN} / ${n}`)}">${s.map((ok, k) => `<path d="${arc(k)}" class="${ok ? "on" : ""}"/>`).join("")}<text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle">${c.id}</text></svg>`;
  }

  /* ---------- shell ---------- */
  function shell(main) {
    const r = route();
    const nav = [["#/", "cases"], ["#/notebook", "notebook"], ["#/report", "report"], ["#/glossary", "glossary"], ["#/teacher", "teacher"]];
    return `<a class="skip" href="#main" data-skip>${u("skip")}</a>
    <header class="top"><div class="wrap topin">
      <a class="brand" href="#/"><svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true"><circle cx="13" cy="13" r="9" fill="none" stroke="currentColor" stroke-width="3"/><path d="M20 20l8 8" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/><path d="M9 13h8" stroke="var(--evidence)" stroke-width="3" stroke-linecap="round"/></svg><span><b>Ad Detective</b><small>${es() ? "El arte de la persuasión" : "The Art of Persuasion"}</small></span></a>
      <nav aria-label="${es() ? "Principal" : "Main"}"><ul>${nav.map(([h, k]) => `<li><a href="${h}"${(r.name === (h.slice(2) || "home") || (k === "cases" && r.name === "case")) ? ' aria-current="page"' : ""}>${u(k)}</a></li>`).join("")}</ul></nav>
      <div class="switches">
        <div class="seg" role="group" aria-label="Language / Idioma"><button type="button" data-lang="en" aria-pressed="${!es()}">English</button><button type="button" data-lang="es" aria-pressed="${es()}">Español</button></div>
        <div class="seg" role="group" aria-label="${u("level")}"><button type="button" data-level="hs" aria-pressed="${S.level === "hs"}">${u("hs")}</button><button type="button" data-level="col" aria-pressed="${S.level === "col"}">${u("col")}</button></div>
      </div></div></header>
    ${storageOK ? "" : `<p class="warn wrap" role="alert">${u("noStorage")}</p>`}
    <main id="main" tabindex="-1">${main}</main>
    <footer class="foot"><div class="wrap"><p>${u("fictional")}</p><p>${u("privacy")}</p><p>${es() ? "Compañero de" : "A companion to"} <a href="https://stevenbennett-hub.github.io/speaking-lab/">The Speaking Lab</a>.</p></div></footer>`;
  }

  /* ---------- home ---------- */
  function home() {
    return `<section class="hero"><div class="wrap herogrid">
      <div class="herotext"><h1>Ad Detective</h1><p class="sub">${u("tagline")}</p><p class="lede">${u("heroP")}</p>
        <div class="row"><a class="btn primary" href="#/case/${nextCaseId()}">${nextCaseId() === 1 && !C(1).brief ? u("startCase1") : u("cont")}</a></div></div>
      <figure class="specimen" aria-labelledby="spec-cap">
        <div class="frame" aria-hidden="true"><div class="beam"></div><svg class="bottle" viewBox="0 0 60 140"><rect x="22" y="2" width="16" height="16" rx="3"/><path d="M18 22h24l4 14v96a6 6 0 0 1-6 6H20a6 6 0 0 1-6-6V36z"/><rect class="lbl" x="14" y="62" width="32" height="34"/></svg>
          <p class="slogan">Built for Champions.</p><p class="fine">Hydration drink. Not a substitute for training.</p>
          <span class="note n1"><i>${es() ? "Evidencia" : "Evidence"}</i>${es() ? "El producto aparece justo en el punto de giro." : "The product appears right at the turning point."}</span>
          <span class="note n2"><i>${es() ? "Falla" : "Flaw"}</i>${es() ? "Implica que la bebida causó la victoria." : "Implies the drink caused the win."}</span>
          <span class="note n3"><i>${es() ? "Sólido" : "Sound"}</i>${es() ? "La letra pequeña es honesta." : "The fine print is honest."}</span></div>
        <figcaption id="spec-cap">${es() ? "Así se ve una investigación: una escena del Caso 1 con tres notas. Evidencia (ámbar): el producto aparece justo en el punto de giro. Falla (coral): implica que la bebida causó la victoria. Sólido (verde azulado): la letra pequeña es honesta." : "What an investigation looks like: a frame from Case 1 with three notes. Evidence (amber): the product appears right at the turning point. Flaw (coral): it implies the drink caused the win. Sound (teal): the fine print is honest."} <button type="button" class="linkbtn" data-replay>${u("replay")}</button></figcaption>
      </figure></div></section>
    <section class="wrap block"><h2>${u("cases")}</h2><ol class="caselist">${D.CASES.map(c => `<li><a href="#/case/${c.id}" class="caserow">${ring(c, 56)}<span><span class="cname">${E(T(c.title))}</span><span class="cfocus">${E(T(c.focus))}</span></span></a></li>`).join("")}
      <li><a href="#/report" class="caserow final"><span class="ringph" aria-hidden="true">7</span><span><span class="cname">${u("rpTitle")}</span><span class="cfocus">${es() ? "Evaluación final" : "Final assessment"}</span></span></a></li></ol></section>
    <section class="wrap block"><h2>${u("distinct")}</h2><div class="distinct">${D.DISTINCT.map(d => `<div class="dk dk-${d.k}"><h3>${E(T(d.n))}</h3><p>${E(T(d.d))}</p><p class="dq">${E(T(d.q))}</p></div>`).join("")}</div></section>
    <section class="wrap block"><h2>${u("cycle")}</h2><ol class="cycle">${U.steps.map((s, i) => `<li><b>${E(T(s))}</b><span>${E(T(U.stepsHelp[i]))}</span></li>`).join("")}</ol><p class="muted">${u("privacy")}</p></section>`;
  }
  const nextCaseId = () => (D.CASES.find(c => !segs(c).every(Boolean)) || D.CASES[0]).id;

  /* ---------- case ---------- */
  const KIND = { v: "see", n: "hear", x: "onscreen", s: "sound" };
  function video(c) {
    return `<div class="player"><video id="vid" controls preload="metadata" playsinline crossorigin="anonymous" data-case="${c.id}">
      <source src="${D.MEDIA_DIR}${c.file}.mp4" type="video/mp4">
      <track kind="captions" srclang="en" label="English" src="${D.CAPTION_DIR}${c.file}.en.vtt"${es() ? "" : " default"}>
      <track kind="captions" srclang="es" label="Español" src="${D.CAPTION_DIR}${c.file}.es.vtt"${es() ? " default" : ""}>
    </video><div class="placeholder" id="ph" hidden><svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true"><rect x="4" y="10" width="40" height="28" rx="4" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M20 18l10 6-10 6z" fill="currentColor"/></svg><p>${u("videoMissing")}</p></div></div>`;
  }
  function transcript(c) {
    return `<div class="transcript"><h3>${u("transcript")} <span class="muted">(${mmss(c.dur)})</span></h3><ol>${c.transcript.map(r => `<li class="tk-${r[1]}"><button type="button" class="ts" data-seek="${r[0]}" aria-label="${u("seek")} ${mmss(r[0])}">${mmss(r[0])}</button><span class="kind">${u(KIND[r[1]])}</span><span class="tx">${E(es() ? r[3] : r[2])}${es() ? `<span class="orig" lang="en">${E(r[2])}</span>` : ""}</span></li>`).join("")}</ol></div>`;
  }
  function tagChips(c, j, key) {
    const sel = (key ? (A(c.id, "ws").v || {})[j] : null);
    if (key) return `<label class="sr" for="ws-${j}">${u("choose")}</label><select id="ws-${j}" data-ws="${j}"><option value="">${u("choose")}</option>${D.TAGS.map(t => `<option value="${t.id}"${sel === t.id ? " selected" : ""}>${E(T(t.n))}</option>`).join("")}</select>`;
    const mine = C(c.id).tags[j] || [];
    return `<div class="chips" role="group" aria-label="${es() ? "Técnicas" : "Techniques"}">${D.TAGS.map(t => `<button type="button" class="chip t-${t.tone}" data-tag="${t.id}" data-m="${j}" aria-pressed="${mine.includes(t.id)}">${E(T(t.n))}</button>`).join("")}</div>`;
  }
  function evidence(c) {
    const st = C(c.id), own = S.custom[c.id] || [];
    return `<p class="lead">${u("evidenceP")}</p><ol class="cards">${c.moments.map((m, j) => {
      const mine = st.tags[j] || [], cmp = st.cmp[j];
      const both = m.tags.filter(t => mine.includes(t)), missed = m.tags.filter(t => !mine.includes(t)), extra = mine.filter(t => !m.tags.includes(t));
      const nm = id => E(T(D.TAGS.find(t => t.id === id).n));
      return `<li class="card${mine.length ? " tagged" : ""}"><div class="ch"><button type="button" class="ts" data-seek="${m.t}">${mmss(m.t)}</button><span class="mq">${E(X(m.q))}</span></div>${tagChips(c, j)}
        <label class="lbl" for="why-${c.id}-${j}">${u("whyNote")}</label><textarea id="why-${c.id}-${j}" rows="2" data-why="${j}">${E(st.why[j] || "")}</textarea>
        <button type="button" class="btn sm" data-cmp="${j}"${mine.length ? "" : " disabled"}>${u("compare")}</button>
        <div class="cmp" aria-live="polite">${cmp ? `${both.length ? `<p class="ok"><b>${u("both")}:</b> ${both.map(nm).join(", ")}</p>` : ""}${missed.length ? `<p class="miss"><b>${u("missed")}:</b> ${missed.map(nm).join(", ")}</p>` : ""}${extra.length ? `<p class="extra"><b>${u("extra")}:</b> ${extra.map(nm).join(", ")}. ${u("extraNote")}</p>` : ""}<p class="why">${E(X(m.why))}</p>` : ""}</div></li>`; }).join("")}</ol>
      <details class="own"><summary>${u("addOwn")}</summary><div class="ownform">
        <label class="lbl" for="own-line">${u("ownLine")}</label><select id="own-line">${c.transcript.filter(r => r[1] !== "s").map((r, k) => `<option value="${k}">${mmss(r[0])} ${E((es() ? r[3] : r[2]).slice(0, 70))}${(r[2].length > 70) ? "…" : ""}</option>`).join("")}</select>
        <label class="lbl" for="own-why">${u("whyNote")}</label><textarea id="own-why" rows="2"></textarea>
        <button type="button" class="btn sm" data-addown="${c.id}">${u("addCard")}</button></div>
        ${own.length ? `<ul class="ownlist">${own.map((o, k) => `<li><q>${E(o.q)}</q> <span>${E(o.why)}</span> <button type="button" class="linkbtn" data-delown="${k}">${u("remove")}</button></li>`).join("")}</ul>` : ""}</details>`;
  }
  function mcView(c, i, it) {
    const a = A(c.id, i), sel = a.sel;
    const fb = sel != null ? it.o[sel] : null;
    return `<fieldset class="q"><legend>${E(X(it.q))}</legend><div class="opts">${it.o.map((o, k) => `<label class="opt${sel === k ? (o[2] ? " right" : " wrong") : ""}${a.ok && o[2] ? " right" : ""}"><input type="radio" name="q-${c.id}-${i}" value="${k}" data-mc="${i}"${sel === k ? " checked" : ""}${a.ok ? " disabled" : ""}><span>${E(X(o[0]))}</span></label>`).join("")}</div>
      <div class="fb" aria-live="polite">${fb ? `<p class="${fb[2] ? "ok" : "no"}"><b>${fb[2] ? (es() ? "Así es." : "Strong reasoning.") : u("tryAgain")}</b> ${E(X(fb[1]))}</p>` : ""}
      ${!a.ok && (a.tries || 0) >= 1 ? `<p class="hintp"><b>${es() ? "Pista:" : "Hint:"}</b> ${E(X(it.hint))}</p>` : ""}
      ${!a.ok && (a.tries || 0) >= 2 ? `<button type="button" class="linkbtn" data-showans="${i}">${u("showAns")}</button>` : ""}</div></fieldset>`;
  }
  function gridView(c, i, it) {
    const a = A(c.id, i), v = a.v || {}, n = a.n || 0, opts = it.type === "sort" ? it.cats : it.opts;
    const allOk = it.items.every((x, j) => v[j] === x[1]);
    return `<fieldset class="q"><legend>${E(X(it.q))}</legend><ol class="grid">${it.items.map((x, j) => { const chk = n > 0 && v[j], ok = v[j] === x[1];
      return `<li><span class="item">${E(X(x[0]))}</span><label class="sr" for="g-${c.id}-${i}-${j}">${u("choose")}</label><select id="g-${c.id}-${i}-${j}" data-grid="${i}" data-j="${j}"${allOk ? " disabled" : ""}><option value="">${u("choose")}</option>${opts.map(o => `<option value="${o[0]}"${v[j] === o[0] ? " selected" : ""}>${E(X(o[1]))}</option>`).join("")}</select>
        ${chk ? `<p class="${ok ? "ok" : "no"}">${ok ? E(X(x[2])) : (n >= 2 ? `${es() ? "Respuesta:" : "Answer:"} <b>${E(X(opts.find(o => o[0] === x[1])[1]))}</b>. ${E(X(x[2]))}` : (es() ? "Todavía no. Vuelve a mirar esta." : "Not yet. Take another look at this one."))}</p>` : ""}</li>`; }).join("")}</ol>
      ${allOk ? `<p class="ok" aria-live="polite"><b>${es() ? "¡Todas correctas!" : "All correct."}</b></p>` : `<div class="row"><button type="button" class="btn sm" data-gridchk="${i}">${u("check")}</button>${n >= 1 ? `<span class="hintp"><b>${es() ? "Pista:" : "Hint:"}</b> ${E(X(it.hint))}</span>` : ""}</div>`}</fieldset>`;
  }
  function optionView(c, i, it) {
    const a = A(c.id, i), lines = String(a.t || "").split("\n").filter(s => s.trim()).length;
    return `<fieldset class="q"><legend>${E(X(it.q))}</legend><label class="sr" for="opt-${c.id}-${i}">${E(X(it.q))}</label><textarea id="opt-${c.id}-${i}" rows="4" data-text="${i}" placeholder="${es() ? "Una opción por línea" : "One option per line"}">${E(a.t || "")}</textarea>
      ${a.rev ? `<div class="reveal"><h4>${es() ? "Lista del investigador" : "Investigator's list"}</h4><ul>${it.reveal.map(r => `<li>${E(X(r))}</li>`).join("")}</ul></div>` : `<button type="button" class="btn sm" data-rev="${i}"${lines >= 3 ? "" : " disabled"}>${u("compareList")}</button>${lines < 3 ? ` <span class="muted">${es() ? "Escribe al menos tres, una por línea." : "Write at least three, one per line."}</span>` : ""}`}</fieldset>`;
  }
  function inspectView(c, i, it) {
    const a = A(c.id, i); a.need = a.need || {}; a.rev = a.rev || {};
    return `<fieldset class="q"><legend>${E(X(it.q))}</legend><ol class="inspect">${it.items.map((x, j) => `<li><p class="claim">${E(X(x[0]))}</p>
      <label class="lbl" for="need-${c.id}-${j}">${u("needFirst")}</label><textarea id="need-${c.id}-${j}" rows="2" data-need="${i}" data-j="${j}">${E(a.need[j] || "")}</textarea>
      ${a.rev[j] ? `<div class="reveal"><p><b>${u("hidden")}:</b> ${E(X(x[1]))}</p><p><b>${u("accurate")}:</b> ${E(X(x[2]))}</p></div>` : `<button type="button" class="btn sm" data-insp="${i}" data-j="${j}"${words(a.need[j]) >= 3 ? "" : " disabled"}>${u("reveal")}</button>`}</li>`).join("")}</ol></fieldset>`;
  }
  function rewriteView(c, i, it) {
    const a = A(c.id, i); a.chk = a.chk || {};
    return `<fieldset class="q"><legend>${E(X(it.q))}</legend><p class="frame"><b>${u("frame")}:</b> ${E(X(it.frame))}</p><label class="sr" for="rw-${c.id}-${i}">${E(X(it.q))}</label><textarea id="rw-${c.id}-${i}" rows="3" data-text="${i}">${E(a.t || "")}</textarea>
      <div class="checks">${it.check.map((k, j) => `<label><input type="checkbox" data-chk="${i}" data-j="${j}"${a.chk[j] ? " checked" : ""}> ${E(X(k))}</label>`).join("")}</div>
      ${a.rev ? `<div class="reveal"><h4>${es() ? "Un modelo (hay muchas respuestas buenas)" : "One model (many good answers exist)"}</h4><p>${E(X(it.model))}</p></div>` : `<button type="button" class="btn sm" data-rev="${i}"${words(a.t) >= 8 ? "" : " disabled"}>${u("model")}</button>${words(a.t) >= 8 ? "" : ` <span class="muted">${u("writeMore")}</span>`}`}</fieldset>`;
  }
  function writeBox(c, key, cfg, rows) {
    const a = A(c.id, key); a.chk = a.chk || {};
    return `<div class="write"><label class="lbl" for="w-${c.id}-${key}">${E(X(cfg.q))}</label>${cfg.frame ? `<button type="button" class="linkbtn frame" data-frame="${key}" data-f="${E(X(cfg.frame))}">${u("frame")}: ${E(X(cfg.frame))}</button>` : ""}
      <textarea id="w-${c.id}-${key}" rows="${rows || 4}" data-w="${key}">${E(a.t || "")}</textarea><p class="count" id="cnt-${c.id}-${key}">${words(a.t)} ${es() ? "palabras" : "words"}</p>
      ${cfg.check ? `<fieldset class="checks"><legend>${u("selfCheck")}</legend>${cfg.check.map((k, j) => `<label><input type="checkbox" data-wchk="${key}" data-j="${j}"${a.chk[j] ? " checked" : ""}> ${E(X(k))}</label>`).join("")}</fieldset>` : ""}</div>`;
  }
  function workspace(c) {
    const w = A(c.id, "ws"); w.v = w.v || {};
    const n = w.n || 0;
    return `<p class="lead">${es() ? "Eres el consultor. Completa los cinco pasos." : "You're the consultant. Complete all five steps."}</p>
      <fieldset class="q"><legend>1. ${es() ? "Identifica la estrategia principal de cada momento" : "Identify the main strategy in each moment"}</legend><ol class="grid">${c.moments.map((m, j) => { const ok = m.tags.includes(w.v[j]);
        return `<li><span class="item"><button type="button" class="ts" data-seek="${m.t}">${mmss(m.t)}</button> ${E(X(m.q))}</span>${tagChips(c, j, true)}${n > 0 && w.v[j] ? `<p class="${ok ? "ok" : "no"}">${ok ? E(X(m.why)) : (es() ? "Todavía no. ¿Qué hace realmente esta línea?" : "Not yet. What is this line really doing?")}</p>` : ""}</li>`; }).join("")}</ol><button type="button" class="btn sm" data-wschk>${u("check")}</button></fieldset>
      ${["p1", "p2"].map((k, x) => `<div class="write"><label class="lbl" for="ws-${k}">${x + 2}. ${es() ? `Explica el problema ${x + 1} y por qué importa` : `Explain problem ${x + 1} and why it matters`}</label><button type="button" class="linkbtn frame" data-wsframe="${k}" data-f="${es() ? "La línea &quot;___&quot; es un problema porque ___." : "The line &quot;___&quot; is a problem because ___."}">${u("frame")}: ${es() ? "La línea \"___\" es un problema porque ___." : "The line \"___\" is a problem because ___."}</button><textarea id="ws-${k}" rows="3" data-wsw="${k}">${E(w[k] || "")}</textarea></div>`).join("")}
      <div class="write"><label class="lbl" for="ws-rw">4. ${es() ? "Reescribe la narración con persuasión ética" : "Rewrite the narration using ethical persuasion"}</label><textarea id="ws-rw" rows="6" data-wsw="rw">${E(w.rw || "")}</textarea><p class="count" id="cnt-ws-rw">${words(w.rw)} ${es() ? "palabras" : "words"}</p></div>
      <div class="write"><label class="lbl" for="ws-cc">5. ${es() ? "Una afirmación creíble o evidencia matizada que incluiste" : "One credible claim or qualified evidence you included"}</label><textarea id="ws-cc" rows="2" data-wsw="cc">${E(w.cc || "")}</textarea></div>
      ${w.rev ? `<div class="reveal"><h4>${es() ? "Un modelo (hay muchas respuestas buenas)" : "One model (many good answers exist)"}</h4><p>${E(X(c.model))}</p></div>` : `<button type="button" class="btn sm" data-wsrev${words(w.rw) >= 20 ? "" : " disabled"}>${u("model")}</button>${words(w.rw) >= 20 ? "" : ` <span class="muted">${u("writeMore")}</span>`}`}`;
  }
  function caseView(id) {
    const c = D.CASES.find(x => x.id === id); if (!c) return notFound();
    const st = C(id), s = segs(c), step = Math.min(4, Math.max(0, +(st.step || 0)));
    const stepBody = [
      () => `<p class="lead">${E(T(c.mission))}</p><dl class="meta"><dt>${u("focus")}</dt><dd>${E(T(c.focus))}</dd><dt>${u("target")}</dt><dd>${E(T(c.target))}</dd></dl>
        <h3>${u("keyWords")}</h3><div class="vocab">${c.vocab.map(v => vocabCard(D.VOCAB.find(x => x.id === v))).join("")}</div>
        <h3>${u("worked")}</h3><p class="example">${E(X(c.example))}</p>
        ${st.brief ? "" : `<button type="button" class="btn primary" data-begin>${u("begin")}</button>`}`,
      () => `<p class="lead">${E(T(c.ad))}</p>${video(c)}${transcript(c)}<button type="button" class="btn${st.watched ? "" : " primary"}" data-watched aria-pressed="${st.watched}">${st.watched ? "✓ " + u("watchedDone") : u("watched")}</button>`,
      () => `${video(c)}${evidence(c)}`,
      () => c.workspace ? workspace(c) : c.analyze.map((it, i) => ({ mc: mcView, sort: gridView, judge: gridView, option: optionView, inspect: inspectView, rewrite: rewriteView })[it.type](c, i, it)).join(""),
      () => `${writeBox(c, "eval", c.evaluate, 5)}${S.level === "col" ? `<section class="colbox"><h3>${u("college")}</h3>${writeBox(c, "col", c.college, 5)}</section>` : ""}<section class="xfer"><h3>${u("transfer")}</h3>${writeBox(c, "xfer", { q: c.transfer }, 3)}</section>
        ${s.every(Boolean) ? `<p class="done" role="status">✓ ${u("done")}</p>` : ""}${id < 6 ? `<a class="btn primary" href="#/case/${id + 1}">${u("nextCase")}</a>` : `<a class="btn primary" href="#/report">${u("rpTitle")}</a>`}`
    ];
    return `<div class="wrap casehead"><p class="crumb"><a href="#/">${u("cases")}</a> / ${u("caseN")} ${id}</p><div class="ctitle">${ring(c, 64)}<div><h1>${E(T(c.title))}</h1><p class="sub">${E(T(c.ad))}</p></div></div>
      <ol class="steps" role="tablist" aria-label="${es() ? "Pasos de la investigación" : "Investigation steps"}">${U.steps.map((n, k) => `<li role="presentation"><button type="button" role="tab" id="tab-${k}" aria-controls="panel" aria-selected="${k === step}" tabindex="${k === step ? 0 : -1}" data-step="${k}" class="${s[k] ? "complete" : ""}"><span class="sn">${k + 1}</span>${E(T(n))}${s[k] ? '<span class="sr"> ✓</span>' : ""}</button></li>`).join("")}</ol></div>
      <section class="wrap panel" id="panel" role="tabpanel" aria-labelledby="tab-${step}" tabindex="-1"><h2>${E(T(U.steps[step]))}</h2>${stepBody[step]()}
        <nav class="stepnav" aria-label="${es() ? "Navegación de pasos" : "Step navigation"}">${step > 0 ? `<button type="button" class="btn" data-step="${step - 1}">${u("prevStep")}</button>` : "<span></span>"}${step < 4 ? `<button type="button" class="btn primary" data-step="${step + 1}">${u("nextStep")}: ${E(T(U.steps[step + 1]))}</button>` : ""}</nav></section>`;
  }
  const vocabCard = v => v ? `<div class="vc"><p class="vt">${E(v.t[0])}${es() && v.t[1] !== v.t[0] ? ` <span lang="es">(${E(v.t[1])})</span>` : ""}</p><p>${E(T(v.d))}</p><p class="vx">${E(T(v.ex))}</p></div>` : "";

  /* ---------- notebook ---------- */
  function nbText() {
    const out = ["AD DETECTIVE — " + T(U.nbTitle), (S.level === "col" ? "College challenge" : "High School") + " · " + new Date().toLocaleDateString(), ""];
    D.CASES.forEach(c => {
      const st = C(c.id), lines = [];
      c.moments.forEach((m, j) => { const t = st.tags[j] || []; if (t.length || st.why[j]) lines.push(`  [${mmss(m.t)}] "${m.q}"\n     Tags: ${t.map(x => T(D.TAGS.find(y => y.id === x).n)).join(", ") || "—"}\n     Explanation: ${st.why[j] || "—"}`); });
      (S.custom[c.id] || []).forEach(o => lines.push(`  [My evidence] "${o.q}"\n     Explanation: ${o.why}`));
      c.analyze.forEach((it, i) => { const a = A(c.id, i); if (it.type === "option" && a.t) lines.push(`  Hidden options I found:\n     ${a.t.replace(/\n/g, "\n     ")}`); if (it.type === "rewrite" && a.t) lines.push(`  My rewrite: ${a.t}`); if (it.type === "inspect") it.items.forEach((x, j) => { if (a.need && a.need[j]) lines.push(`  ${x[0]} — What I'd need to know: ${a.need[j]}`); }); });
      if (c.workspace) { const w = A(c.id, "ws"); ["p1", "p2", "rw", "cc"].forEach((k, x) => { if (w[k]) lines.push(`  ${["Problem 1", "Problem 2", "My rewrite", "Credible claim"][x]}: ${w[k]}`); }); }
      [["eval", "My judgment"], ["col", "College challenge"], ["xfer", "Beyond the classroom"]].forEach(([k, n]) => { const t = A(c.id, k).t; if (t) lines.push(`  ${n}: ${t}`); });
      if (lines.length) out.push(`CASE ${c.id}: ${T(c.title)}`, ...lines, "");
    });
    return out.join("\n");
  }
  function notebook() {
    const any = D.CASES.some(c => Object.keys(C(c.id).tags).length || Object.keys(C(c.id).a).length);
    return `<div class="wrap block"><h1>${u("nbTitle")}</h1><p class="lead">${u("nbP")}</p>
      ${any ? D.CASES.map(c => { const st = C(c.id), cards = c.moments.map((m, j) => ({ m, j, t: st.tags[j] || [] })).filter(x => x.t.length || st.why[x.j]);
        return `<section class="nbcase"><h2>${ring(c, 40)} ${E(T(c.title))}</h2>${cards.length || (S.custom[c.id] || []).length ? `<ul class="nbcards">${cards.map(x => `<li class="ecard"><span class="ts">${mmss(x.m.t)}</span><span class="mq">${E(X(x.m.q))}</span><p class="etags">${x.t.map(id => `<span class="etag t-${D.TAGS.find(t => t.id === id).tone}">${E(T(D.TAGS.find(t => t.id === id).n))}</span>`).join("")}</p>${st.why[x.j] ? `<p>${E(st.why[x.j])}</p>` : ""}</li>`).join("")}${(S.custom[c.id] || []).map(o => `<li class="ecard own"><q>${E(o.q)}</q><p>${E(o.why)}</p></li>`).join("")}</ul>` : `<p class="muted">${es() ? "Sin tarjetas de evidencia todavía." : "No evidence cards yet."}</p>`}
        ${["eval", "col", "xfer"].map(k => A(c.id, k).t ? `<p class="nbw"><b>${k === "eval" ? u("evaluate") : k === "col" ? u("college") : u("transfer")}:</b> ${E(A(c.id, k).t)}</p>` : "").join("")}
        <a href="#/case/${c.id}" class="linkbtn">${es() ? "Revisar este caso" : "Revise this case"}</a></section>`; }).join("") : `<p class="emptyst">${u("empty")} <a href="#/case/1">${u("startCase1")}</a></p>`}
      <section class="exportbox"><h2>${es() ? "Entregar y guardar" : "Turn in and save"}</h2><p>${u("submit")}</p><div class="row"><button type="button" class="btn primary" data-nbcopy>${u("copy")}</button><button type="button" class="btn" data-nbdl>${u("download")}</button></div><p id="nbmsg" role="status" class="muted"></p>
        <h3>${es() ? "Copia de seguridad" : "Backup"}</h3><div class="row"><button type="button" class="btn" data-backup>${u("backup")}</button><label class="btn filebtn">${u("restore")}<input type="file" accept="application/json,.json" data-restore class="sr"></label><button type="button" class="btn danger" data-clear>${u("clear")}</button></div><p class="muted">${u("privacy")}</p></section></div>`;
  }

  /* ---------- report ---------- */
  function rpText() {
    const r = S.report, out = ["ADVERTISING INVESTIGATION REPORT", (S.level === "col" ? "College challenge" : "High School") + " · " + new Date().toLocaleDateString(), "", "Ad analyzed: " + (r.choice === "real" ? "A real ad — " + (r.real || "(no description)") : T(D.FINAL_AD.title)), ""];
    D.REPORT.forEach(f => out.push(X(f.n), (r.f[f.id] || "(not answered)"), ""));
    return out.join("\n");
  }
  function report() {
    const r = S.report, done = D.REPORT.filter(f => words(r.f[f.id]) >= 3).length;
    return `<div class="wrap block"><h1>${u("rpTitle")}</h1><p class="lead">${u("rpP")}</p>
      <fieldset class="seg big"><legend>${es() ? "¿Qué anuncio vas a analizar?" : "Which ad will you analyze?"}</legend><label><input type="radio" name="rpc" value="story" data-rpc${r.choice !== "real" ? " checked" : ""}> ${u("rpStory")}</label><label><input type="radio" name="rpc" value="real" data-rpc${r.choice === "real" ? " checked" : ""}> ${u("rpReal")}</label></fieldset>
      ${r.choice === "real" ? `<div class="write"><label class="lbl" for="rp-real">${u("rpRealP")}</label><textarea id="rp-real" rows="4" data-rpreal>${E(r.real)}</textarea></div>` : `<section class="storyboard"><h2>${E(T(D.FINAL_AD.title))}</h2><p class="muted">${E(T(D.FINAL_AD.note))}</p><ol>${D.FINAL_AD.rows.map(x => `<li><span class="ts">${x[0]}</span><span>${E(es() ? x[2] : x[1])}${es() ? `<span class="orig" lang="en">${E(X(x[1]))}</span>` : ""}</span></li>`).join("")}</ol></section>`}
      <p class="progressline" aria-live="polite">${done} / ${D.REPORT.length} ${es() ? "secciones" : "sections"}</p>
      ${D.REPORT.map(f => `<div class="write"><label class="lbl" for="rp-${f.id}"><b>${E(X(f.n))}.</b> ${E(X(f.p))}</label><button type="button" class="linkbtn frame" data-rpframe="${f.id}" data-f="${E(X(f.frame))}">${u("frame")}: ${E(X(f.frame))}</button><textarea id="rp-${f.id}" rows="3" data-rpf="${f.id}">${E(r.f[f.id] || "")}</textarea></div>`).join("")}
      <div class="row"><button type="button" class="btn primary" data-rpcopy>${u("copyReport")}</button><button type="button" class="btn" data-rpdl>${u("dlReport")}</button></div><p id="rpmsg" role="status" class="muted"></p><p class="muted">${u("submit")}</p>
      <details class="rubric"><summary>${u("rubric")}</summary>${rubricTable()}</details></div>`;
  }
  const rubricTable = () => `<div class="tablewrap"><table><thead><tr><th scope="col">${es() ? "Criterio" : "Criterion"}</th><th scope="col">4</th><th scope="col">3</th><th scope="col">2</th><th scope="col">1</th></tr></thead><tbody>${D.RUBRIC.map(r => `<tr><th scope="row">${E(X(r[0]))}</th>${r.slice(1).map(x => `<td>${E(X(x))}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;

  /* ---------- glossary ---------- */
  const glossary = () => `<div class="wrap block"><h1>${u("glossary")}</h1><p class="lead">${es() ? "Definiciones sencillas con ejemplos. El término en inglés se muestra para que lo uses en clase." : "Plain definitions with examples. Spanish terms are shown in Spanish mode."}</p><div class="vocab big">${D.VOCAB.map(vocabCard).join("")}</div><h2>${es() ? "Etiquetas de técnicas" : "Technique tags"}</h2><ul class="taglegend">${D.TAGS.map(t => `<li><span class="etag t-${t.tone}">${E(T(t.n))}</span></li>`).join("")}</ul><p class="muted">${es() ? "Ámbar: apelación. Coral: posible falla o afirmación engañosa. Verde azulado: afirmación honesta." : "Amber: an appeal. Coral: a possible flaw or misleading claim. Teal: an honest claim."}</p></div>`;

  /* ---------- teacher ---------- */
  function teacher() {
    const pace = [["1", "Launch: central question and the four ideas (10). Case 1 (30). Case 2 (30). Partner discussion: \u201cIs emotion ever fair?\u201d (15)"], ["2", "Case 3 (30). Case 4 (30). Debrief the popularity test and false-dilemma rewrites (20)"], ["3", "Case 5 (35). Case 6 (40). Share two rewrites (10)"], ["4", "Advertising Investigation Report (60). Peer review with the rubric (20)"]];
    const prompts = ["Case 1: When is an emotional appeal fair? Does the fine print change your answer?", "Case 2: Name a time an expert's opinion should change your mind. What made it trustworthy?", "Case 3: Is it ethical to sell belonging to teenagers? Who could be harmed?", "Case 4: Find a genuine two-option situation in your own life. How do you know it's genuine?", "Case 5: If every number is technically true, can an ad still be dishonest?", "Case 6: Read two classmates' rewrites aloud. Which is more persuasive, and is it still honest?"];
    return `<div class="wrap block teacher"><h1>${es() ? "Recursos para el maestro" : "Teacher resources"}</h1>
      <p class="lead">This page is visible to anyone, so it contains no answer keys. Full answer keys, production scripts, and instructor analysis are in your private planning document, \u201cAd Detective: The Art of Persuasion \u2014 Blueprint and Production Packages.\u201d A static website can't securely hide anything; keep that document shared only with co-teachers.</p>
      <h2>Modules</h2><div class="tablewrap"><table><thead><tr><th scope="col">Case</th><th scope="col">Focus</th><th scope="col">Learning target</th></tr></thead><tbody>${D.CASES.map(c => `<tr><th scope="row">${c.id}. ${E(c.title[0])}</th><td>${E(c.focus[0])}</td><td>${E(c.target[0])}</td></tr>`).join("")}<tr><th scope="row">Final report</th><td>Transfer</td><td>Analyze a new ad: claim, audience, appeals, evidence, fallacies (or none), credibility, and an overall judgment.</td></tr></tbody></table></div>
      <h2>Suggested pacing (90-minute blocks)</h2><ol class="plain">${pace.map(p => `<li><b>Block ${p[0]}:</b> ${E(p[1])}</li>`).join("")}</ol><p>Each case also works alone as a 30-minute warm-up or sub plan.</p>
      <h2>Discussion prompts</h2><ul class="plain">${prompts.map(p => `<li>${E(p)}</li>`).join("")}</ul>
      <h2>Differentiation</h2><ul class="plain"><li>Every case can be completed from the transcript alone; captions are available for every video.</li><li>Sentence starters sit above every written response; vocabulary cards show Spanish terms in Spanish mode.</li><li>No timers. Hints appear after one wrong answer, and the answer can be shown after two.</li><li>College challenge mode adds one deeper written task per case and longer self-checks; switch it on from the top bar.</li><li>Spanish mode translates everything students see: the interface, activities and feedback, transcripts, captions, and vocabulary. Quoted ad lines show the English original beside the Spanish in transcripts.</li></ul>
      <h2>Formative assessment</h2><ul class="plain"><li>Progress rings show which of the five steps each student has completed.</li><li>Ask students to export their Notebook at the end of each block and submit it in Canvas.</li><li>Use \u201cOnly you tagged\u201d results as discussion starters: a defended extra tag can be a strong answer.</li></ul>
      <h2>Final report rubric</h2>${rubricTable()}
      <h2>Extensions</h2><ul class="plain"><li>Students bring a real ad (described in words) and run the full five-step investigation.</li><li>Compare two ads for the same kind of product aimed at different audiences.</li><li>Pair with the Speaking Lab's persuasive speech: apply the ethical-persuasion checklist to students' own calls to action.</li></ul>
      <h2>Adding the videos</h2><p>Export each finished ad as MP4 and add it to <code>assets/videos/</code> with these names. Captions go in <code>assets/captions/</code>; draft caption files are already there and should be retimed to the final edit.</p>
      <div class="tablewrap"><table><thead><tr><th scope="col">Case</th><th scope="col">Video</th><th scope="col">Captions</th></tr></thead><tbody>${D.CASES.map(c => `<tr><td>${c.id}</td><td><code>assets/videos/${c.file}.mp4</code></td><td><code>${c.file}.en.vtt</code>, <code>${c.file}.es.vtt</code></td></tr>`).join("")}</tbody></table></div>
      <p>Until a video is added, its case shows a placeholder and students use the transcript.</p></div>`;
  }
  const notFound = () => `<div class="wrap block"><h1>${es() ? "No encontramos esa página" : "That page doesn't exist"}</h1><p><a href="#/">${es() ? "Volver a los casos" : "Back to the cases"}</a></p></div>`;

  /* ---------- router & render ---------- */
  function route() { const h = location.hash.replace(/^#\/?/, ""); const [a, b] = h.split("/"); if (!a) return { name: "home" }; if (a === "case") return { name: "case", id: +b }; return { name: a }; }
  let lastRoute = "";
  function render(focusSel) {
    const r = route();
    const main = r.name === "home" ? home() : r.name === "case" ? caseView(r.id) : r.name === "notebook" ? notebook() : r.name === "report" ? report() : r.name === "glossary" ? glossary() : r.name === "teacher" ? teacher() : notFound();
    document.documentElement.lang = S.lang;
    document.title = (r.name === "case" ? `${T(D.CASES.find(c => c.id === r.id)?.title || ["", ""])} | ` : "") + "Ad Detective";
    const app = $("#app"); app.innerHTML = shell(main);
    wireVideo();
    const key = location.hash;
    if (focusSel) { const el = $(focusSel); if (el) el.focus(); }
    else if (key !== lastRoute) { const h = $("main h1") || $("#main"); if (lastRoute) { h.setAttribute("tabindex", "-1"); h.focus(); window.scrollTo(0, 0); } }
    lastRoute = key;
    if (r.name === "home") playSpecimen();
  }
  function playSpecimen() {
    const f = $(".specimen"); if (!f) return;
    const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    f.classList.remove("play"); f.classList.toggle("still", reduce); void f.offsetWidth; if (!reduce) f.classList.add("play");
  }
  function wireVideo() {
    const v = $("#vid"); if (!v) return;
    const src = v.querySelector("source"), ph = $("#ph");
    let handled = false;
    const missing = () => {
      if (handled) return; handled = true; v.hidden = true; if (ph) ph.hidden = false;
      // Distinguish "file not added yet" from "file exists but this browser can't play it".
      fetch(src.src, { method: "HEAD" }).then(r => { if (r.ok && ph) ph.querySelector("p").textContent = u("cantPlay"); }).catch(() => {});
    };
    src.addEventListener("error", missing); v.addEventListener("error", missing);
    v.addEventListener("ended", () => { const st = C(+v.dataset.case); if (!st.watched) { st.watched = true; save(); } });
  }
  function seek(t) { const v = $("#vid"); if (v && !v.hidden) { try { v.currentTime = t; v.play().catch(() => {}); v.focus(); } catch (e) {} } }
  const curCase = () => { const r = route(); return r.name === "case" ? D.CASES.find(c => c.id === r.id) : null; };
  function msg(sel, k) { const m = $(sel); if (m) m.textContent = u(k); }
  async function copyText(t, sel) { try { await navigator.clipboard.writeText(t); msg(sel, "copied"); } catch (e) { const ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); msg(sel, "copied"); } catch (e2) {} ta.remove(); } }
  function dl(name, text, type) { const b = new Blob([text], { type: (type || "text/plain") + ";charset=utf-8" }), a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); }

  /* ---------- events ---------- */
  document.addEventListener("click", e => {
    const t = e.target.closest("button, [data-skip]"); if (!t) return; const d = t.dataset, c = curCase();
    if (d.skip !== undefined) { e.preventDefault(); $("#main").focus(); return; }
    if (d.lang) { S.lang = d.lang; save(); return render(`[data-lang="${d.lang}"]`); }
    if (d.level) { S.level = d.level; save(); return render(`[data-level="${d.level}"]`); }
    if (d.replay !== undefined) return playSpecimen();
    if (d.seek) return seek(+d.seek);
    if (!c && !("nbcopy" in d || "nbdl" in d || "backup" in d || "clear" in d || "rpcopy" in d || "rpdl" in d || "rpframe" in d)) return;
    if (d.step) { C(c.id).step = +d.step; save(); return render(`#tab-${d.step}`); }
    if (d.begin !== undefined) { C(c.id).brief = true; C(c.id).step = 1; save(); return render("#tab-1"); }
    if (d.watched !== undefined) { C(c.id).watched = !C(c.id).watched; save(); return render("[data-watched]"); }
    if (d.tag) { const st = C(c.id), j = +d.m, arr = st.tags[j] = st.tags[j] || []; const k = arr.indexOf(d.tag); k >= 0 ? arr.splice(k, 1) : arr.push(d.tag); st.cmp[j] = false; save(); return render(`[data-tag="${d.tag}"][data-m="${j}"]`); }
    if (d.cmp) { C(c.id).cmp[+d.cmp] = true; save(); return render(`[data-cmp="${d.cmp}"]`); }
    if (d.addown) { const sel = $("#own-line"), why = $("#own-why").value.trim(); const rows = c.transcript.filter(r => r[1] !== "s"), row = rows[+sel.value]; if (!why) { $("#own-why").focus(); return; } (S.custom[c.id] = S.custom[c.id] || []).push({ q: `${mmss(row[0])} ${row[2]}`, why }); save(); render(); const det = $("details.own"); if (det) det.open = true; return; }
    if (d.delown) { S.custom[c.id].splice(+d.delown, 1); save(); render(); const det = $("details.own"); if (det) det.open = true; return; }
    if (d.showans) { const i = +d.showans, it = c.analyze[i], a = A(c.id, i); a.sel = it.o.findIndex(o => o[2]); a.ok = true; save(); return render(`input[data-mc="${i}"]`); }
    if (d.gridchk) { const a = A(c.id, +d.gridchk); a.n = (a.n || 0) + 1; save(); return render(`[data-gridchk="${d.gridchk}"], select[data-grid="${d.gridchk}"]`); }
    if (d.rev) { A(c.id, +d.rev).rev = true; save(); return render(); }
    if (d.insp) { const a = A(c.id, +d.insp); a.rev = a.rev || {}; a.rev[+d.j] = true; save(); return render(`#need-${c.id}-${d.j}`); }
    if (d.wschk !== undefined) { const w = A(c.id, "ws"); w.n = (w.n || 0) + 1; save(); return render("[data-wschk]"); }
    if (d.wsrev !== undefined) { A(c.id, "ws").rev = true; save(); return render(); }
    if (d.frame) { const a = A(c.id, d.frame); if (!a.t) { a.t = d.f + " "; save(); } return render(`#w-${c.id}-${d.frame}`); }
    if (d.wsframe) { const w = A(c.id, "ws"); if (!w[d.wsframe]) { w[d.wsframe] = d.f + " "; save(); } return render(`#ws-${d.wsframe}`); }
    if (d.rpframe) { if (!S.report.f[d.rpframe]) { S.report.f[d.rpframe] = d.f + " "; save(); } return render(`#rp-${d.rpframe}`); }
    if ("nbcopy" in d) return copyText(nbText(), "#nbmsg");
    if ("nbdl" in d) { dl("Ad_Detective_Notebook.txt", nbText()); return msg("#nbmsg", "downloaded"); }
    if ("rpcopy" in d) return copyText(rpText(), "#rpmsg");
    if ("rpdl" in d) { dl("Advertising_Investigation_Report.txt", rpText()); return msg("#rpmsg", "downloaded"); }
    if ("backup" in d) { dl("ad-detective-backup.json", JSON.stringify({ app: "ad-detective", v: 1, at: new Date().toISOString(), state: S }, null, 2), "application/json"); return msg("#nbmsg", "downloaded"); }
    if ("clear" in d) { if (confirm(u("confirmClear"))) { const keep = { lang: S.lang, level: S.level }; S = Object.assign(fresh(), keep); save(); render(); } return; }
  });
  document.addEventListener("change", e => {
    const t = e.target, d = t.dataset, c = curCase();
    if (d.restore !== undefined && t.files && t.files[0]) { const fr = new FileReader(); fr.onload = () => { try { const j = JSON.parse(fr.result); if (j.app !== "ad-detective" || !j.state) throw 0; S = Object.assign(fresh(), j.state); save(); render(); msg("#nbmsg", "restoreOK"); } catch (er) { msg("#nbmsg", "restoreBad"); } }; fr.readAsText(t.files[0]); return; }
    if (d.rpc !== undefined) { S.report.choice = t.value; save(); return render(`input[data-rpc][value="${t.value}"]`); }
    if (!c) return;
    if (d.mc) { const i = +d.mc, it = c.analyze[i], a = A(c.id, i), k = +t.value; a.sel = k; if (it.o[k][2]) a.ok = true; else a.tries = (a.tries || 0) + 1; save(); return render(`input[data-mc="${i}"][value="${k}"]`); }
    if (d.grid) { const a = A(c.id, +d.grid); a.v = a.v || {}; a.v[+d.j] = t.value; save(); return; }
    if (d.ws) { const w = A(c.id, "ws"); w.v = w.v || {}; w.v[+d.ws] = t.value; save(); return; }
    if (d.chk) { const a = A(c.id, +d.chk); a.chk = a.chk || {}; a.chk[+d.j] = t.checked; save(); return; }
    if (d.wchk) { const a = A(c.id, d.wchk); a.chk = a.chk || {}; a.chk[+d.j] = t.checked; save(); return; }
  });
  document.addEventListener("input", e => {
    const t = e.target, d = t.dataset, c = curCase();
    if (d.rpf) { S.report.f[d.rpf] = t.value; save(); const p = $(".progressline"); if (p) p.textContent = `${D.REPORT.filter(f => words(S.report.f[f.id]) >= 3).length} / ${D.REPORT.length} ${es() ? "secciones" : "sections"}`; return; }
    if (d.rpreal !== undefined) { S.report.real = t.value; save(); return; }
    if (!c) return;
    if (d.why) { C(c.id).why[+d.why] = t.value; save(); return; }
    if (d.w) { A(c.id, d.w).t = t.value; save(); const n = $(`#cnt-${c.id}-${d.w}`); if (n) n.textContent = `${words(t.value)} ${es() ? "palabras" : "words"}`; return; }
    if (d.text) { const i = +d.text, a = A(c.id, i); a.t = t.value; save(); const it = c.analyze[i]; const btn = $(`[data-rev="${i}"]`); if (btn) btn.disabled = it.type === "option" ? String(t.value).split("\n").filter(s => s.trim()).length < 3 : words(t.value) < 8; return; }
    if (d.need) { const a = A(c.id, +d.need); a.need = a.need || {}; a.need[+d.j] = t.value; save(); const btn = $(`[data-insp="${d.need}"][data-j="${d.j}"]`); if (btn) btn.disabled = words(t.value) < 3; return; }
    if (d.wsw) { const w = A(c.id, "ws"); w[d.wsw] = t.value; save(); if (d.wsw === "rw") { const n = $("#cnt-ws-rw"); if (n) n.textContent = `${words(t.value)} ${es() ? "palabras" : "words"}`; const b = $("[data-wsrev]"); if (b) b.disabled = words(t.value) < 20; } return; }
  });
  document.addEventListener("keydown", e => {
    const t = e.target; if (t.getAttribute("role") !== "tab") return;
    const tabs = [...document.querySelectorAll('[role="tab"]')], i = tabs.indexOf(t); let n = -1;
    if (e.key === "ArrowRight") n = (i + 1) % tabs.length; else if (e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length; else if (e.key === "Home") n = 0; else if (e.key === "End") n = tabs.length - 1;
    if (n >= 0) { e.preventDefault(); tabs[n].click(); }
  });
  window.addEventListener("hashchange", () => render());
  render();
  window.__AD = { state: () => S, segs: id => segs(D.CASES.find(c => c.id === id)), nbText, rpText };
})();
