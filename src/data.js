/* Ad Detective: The Art of Persuasion — all course content.
   Edit this file to change text. Pairs are [English, Español].
   Every brand, person, product, and statistic in the ads is invented for instruction.
   Answer keys are NOT kept here beyond the feedback students see; the full instructor analysis lives in the teacher's private planning document. */
window.AD = (function () {
  const D = {};

  /* ---------- Video manifest: add the exported MP4s and captions at these paths. Missing files show a placeholder. ---------- */
  D.MEDIA_DIR = "assets/videos/";
  D.CAPTION_DIR = "assets/captions/";

  /* ---------- Technique tags students apply to evidence ---------- */
  D.TAGS = [
    { id: "pathos", n: ["Pathos (emotion)", "Pathos (emoción)"], tone: "appeal" },
    { id: "ethos", n: ["Ethos (credibility)", "Ethos (credibilidad)"], tone: "appeal" },
    { id: "logos", n: ["Logos (logic, numbers)", "Logos (lógica, números)"], tone: "appeal" },
    { id: "bandwagon", n: ["Bandwagon", "Efecto de arrastre (bandwagon)"], tone: "flaw" },
    { id: "dilemma", n: ["False dilemma", "Falso dilema"], tone: "flaw" },
    { id: "authority", n: ["Questionable authority", "Autoridad cuestionable"], tone: "flaw" },
    { id: "stats", n: ["Statistics problem", "Problema estadístico"], tone: "flaw" },
    { id: "misleading", n: ["Misleading claim or implication", "Afirmación o implicación engañosa"], tone: "flaw" },
    { id: "fear", n: ["Fear appeal", "Apelación al miedo"], tone: "appeal" },
    { id: "honest", n: ["Honest, checkable claim", "Afirmación honesta y verificable"], tone: "sound" }
  ];

  /* ---------- Vocabulary (plain definition, example, optional academic note) ---------- */
  D.VOCAB = [
    { id: "appeal", t: ["Persuasive appeal", "Apelación persuasiva"], d: ["A strategy used to influence an audience.", "Una estrategia para influir en un público."], ex: ["Showing a comeback story to make you feel inspired.", "Mostrar una historia de superación para que te sientas inspirado."] },
    { id: "pathos", t: ["Pathos", "Pathos"], d: ["Persuasion through emotion: hope, fear, pride, belonging.", "Persuasión por medio de la emoción: esperanza, miedo, orgullo, pertenencia."], ex: ["Music swells as the runner wins.", "La música crece cuando la corredora gana."] },
    { id: "ethos", t: ["Ethos", "Ethos"], d: ["Persuasion through the speaker's credibility or character.", "Persuasión por medio de la credibilidad o el carácter del orador."], ex: ["A spokesperson in a lab coat.", "Un vocero con bata de laboratorio."] },
    { id: "logos", t: ["Logos", "Logos"], d: ["Persuasion through logic, facts, and numbers.", "Persuasión por medio de la lógica, los hechos y los números."], ex: ["\"Nine out of ten students…\"", "\"Nueve de cada diez estudiantes…\""] },
    { id: "fallacy", t: ["Logical fallacy", "Falacia lógica"], d: ["An error in reasoning that makes an argument weaker than it looks.", "Un error de razonamiento que hace un argumento más débil de lo que parece."], ex: ["\"Either you upgrade, or you fall behind.\"", "\"O te actualizas, o te quedas atrás.\""] },
    { id: "misleading", t: ["Misleading claim", "Afirmación engañosa"], d: ["A statement that may be technically true but leaves a false impression.", "Una afirmación que puede ser técnicamente cierta pero deja una impresión falsa."], ex: ["\"Up to three times faster\" (in one best case).", "\"Hasta tres veces más rápido\" (en un solo caso)."] },
    { id: "ethical", t: ["Ethical persuasion", "Persuasión ética"], d: ["Persuasion that respects the audience and supports its claims honestly.", "Persuasión que respeta al público y apoya sus afirmaciones con honestidad."], ex: ["Naming a real feature you can check, like how long a bottle keeps drinks cold.", "Mencionar una característica real que se puede comprobar, como cuánto tiempo mantiene fría una bebida."] },
    { id: "bandwagon", t: ["Bandwagon", "Efecto de arrastre"], d: ["Claiming something is good or right because many people do it.", "Decir que algo es bueno o correcto porque mucha gente lo hace."], ex: ["\"Everybody's switching.\"", "\"Todos se están cambiando.\""] },
    { id: "dilemma", t: ["False dilemma", "Falso dilema"], d: ["Presenting only two choices when more exist.", "Presentar solo dos opciones cuando existen más."], ex: ["\"Upgrade or fall behind.\"", "\"Actualízate o quédate atrás.\""] },
    { id: "authority", t: ["Questionable appeal to authority", "Apelación cuestionable a la autoridad"], d: ["Using someone's title or fame in place of evidence, especially when their expertise doesn't match the claim.", "Usar el título o la fama de alguien en lugar de evidencia, sobre todo cuando su experiencia no corresponde a la afirmación."], ex: ["A business PhD endorsing a focus product.", "Un doctorado en negocios que respalda un producto para la concentración."] },
    { id: "correlation", t: ["Correlation vs. causation", "Correlación vs. causalidad"], d: ["Two things happening together doesn't prove one causes the other.", "Que dos cosas ocurran juntas no prueba que una cause la otra."], ex: ["App users get better grades, but motivated students may choose study apps.", "Quienes usan la app sacan mejores notas, pero los estudiantes motivados quizá eligen apps de estudio."] },
    { id: "credibility", t: ["Credibility", "Credibilidad"], d: ["How much a source deserves to be trusted, based on expertise, independence, and evidence.", "Cuánto merece una fuente que se le crea, según su experiencia, independencia y evidencia."], ex: ["An independent lab test is more credible than a company's own survey.", "Una prueba de un laboratorio independiente es más creíble que la encuesta de la propia empresa."] },
    { id: "fear", t: ["Fear appeal", "Apelación al miedo"], d: ["Persuasion that works by making the audience worried about a threat.", "Persuasión que funciona haciendo que el público se preocupe por una amenaza."], ex: ["\"Dehydration could be silently ruining your day.\"", "\"La deshidratación podría estar arruinando tu día en silencio.\""] }
  ];

  /* ---------- The four distinctions ---------- */
  D.DISTINCT = [
    { k: "appeal", n: ["Persuasive appeal", "Apelación persuasiva"], d: ["A strategy used to influence an audience.", "Una estrategia para influir en un público."], q: ["What is this trying to make me trust, feel, or believe?", "¿Qué intenta hacerme confiar, sentir o creer?"] },
    { k: "fallacy", n: ["Logical fallacy", "Falacia lógica"], d: ["An error in reasoning that weakens an argument.", "Un error de razonamiento que debilita un argumento."], q: ["Does the conclusion actually follow from the reason?", "¿La conclusión realmente se deriva de la razón?"] },
    { k: "misleading", n: ["Misleading claim", "Afirmación engañosa"], d: ["May be technically true but creates a false impression.", "Puede ser técnicamente cierta pero crea una impresión falsa."], q: ["What would I believe after this, and is that accurate?", "¿Qué creería después de esto, y es exacto?"] },
    { k: "ethical", n: ["Ethical persuasion", "Persuasión ética"], d: ["Respects the audience and supports its claims.", "Respeta al público y apoya sus afirmaciones."], q: ["Would this still work if the audience knew everything?", "¿Funcionaría si el público lo supiera todo?"] }
  ];

  const L = (en, es) => [en, es];
  /* transcript row: [seconds, kind, en, es]; kind: v = what you see, n = narration, x = on-screen text, s = sound */
  D.CASES = [
    {
      id: 1, slug: "emotional-hook", file: "emotional-hook", dur: 42,
      title: L("The Emotional Hook", "El gancho emocional"), ad: L("\u201cRise Again\u201d for Vimbright Rise hydration drink", "\u201cLevántate otra vez\u201d de la bebida hidratante Vimbright Rise"),
      focus: L("Pathos and emotional appeals", "Pathos y apelaciones emocionales"),
      target: L("I can explain how music, imagery, and story create an emotional appeal, and judge whether that appeal is supported or fair.", "Puedo explicar cómo la música, las imágenes y la historia crean una apelación emocional, y juzgar si esa apelación está respaldada o es justa."),
      mission: L("A sports drink ad that barely talks about the drink. Find out how it persuades anyway.", "Un anuncio de una bebida deportiva que casi no habla de la bebida. Descubre cómo persuade de todos modos."),
      vocab: ["pathos", "misleading", "ethical"],
      example: "In a car ad, a family laughs on a road trip while soft guitar plays. Nothing is said about safety ratings. The appeal is pathos: the ad links the car with family happiness, not with evidence about the car.",
      transcript: [
        [0, "s", "[Soft stadium ambience. No music yet.]", "[Ambiente suave de estadio. Todavía no hay música.]"],
        [0, "v", "Pre-dawn. A young Black woman runner laces her shoes on an empty track under floodlights.", "Antes del amanecer. Una joven corredora negra se ata los tenis en una pista vacía bajo los reflectores."],
        [0.5, "n", "Nobody sees the five a.m. alarms.", "Nadie ve las alarmas de las cinco de la mañana."],
        [6, "v", "She runs stadium stairs in heavy rain.", "Sube corriendo las gradas del estadio bajo una lluvia fuerte."],
        [6.5, "n", "Nobody sees the rain. The doubt.", "Nadie ve la lluvia. La duda."],
        [12, "v", "Race day, final lap. She clips another runner's heel and falls in slow motion.", "Día de la carrera, última vuelta. Choca con el talón de otra corredora y cae en cámara lenta."],
        [12.6, "n", "The voice that says… quit.", "La voz que dice… ríndete."],
        [15.4, "n", "They only see what you do next.", "Solo ven lo que haces después."],
        [18, "v", "Her hand grabs a white squeeze bottle of Vimbright Rise with a blue sport cap. She drinks.", "Su mano toma una botella blanca de Vimbright Rise con tapa deportiva azul. Ella bebe."],
        [18, "s", "[Inspirational music begins and builds.]", "[Comienza una música inspiradora que va creciendo.]"],
        [18.6, "n", "Vimbright Rise. Fuel for the comeback.", "Vimbright Rise. Energía para el regreso."],
        [24, "v", "She sprints, passes two runners, and crosses the finish line. Teammates rush to hug her.", "Corre a toda velocidad, rebasa a dos corredoras y cruza la meta. Sus compañeras corren a abrazarla."],
        [24, "s", "[The music swells to a triumphant peak.]", "[La música crece hasta un punto triunfal.]"],
        [25, "n", "[Whispered] Rise again.", "[Susurrado] Levántate otra vez."],
        [30, "x", "VIMBRIGHT RISE. Built for Champions.", "VIMBRIGHT RISE. Hecha para campeones."],
        [30, "x", "Small text: Hydration drink. Not a substitute for training.", "Letra pequeña: Bebida hidratante. No sustituye el entrenamiento."],
        [30, "s", "[The music resolves and fades out.]", "[La música se resuelve y se desvanece.]"],
        [36, "x", "This is a fictional advertisement created for classroom instruction. Vimbright is not a real company.", "Este es un anuncio ficticio creado para la clase. Vimbright no es una empresa real."]
      ],
      moments: [
        {"t": 12.6, "q": "The fall: “The voice that says… quit.”", "tags": ["pathos"], "why": "The darkest line lands on the lowest moment, so the comeback and the product that follows feel bigger."},
        {"t": 18.6, "q": "The drink appears at the turning point: “Fuel for the comeback”", "tags": ["pathos", "misleading"], "why": "Placing the product right before the comeback invites viewers to credit the drink for the win, without the ad ever saying so."},
        {"t": 24, "q": "The swell and the victory", "tags": ["pathos"], "why": "Triumphant music attaches pride and relief to the moment right after the product shot."},
        {"t": 30, "q": "“Built for Champions”", "tags": ["pathos"], "why": "A slogan about identity: buying it makes you feel like a champion. It isn't a claim anyone could test."},
        {"t": 30, "q": "Fine print: “Not a substitute for training”", "tags": ["honest"], "why": "An honest, checkable disclaimer, though it's on screen for only a moment."}
      ],
      analyze: [
        { type: "mc", q: "What is the ad's primary appeal?", hint: "Think about what the ad makes you feel, and what it tells you about the drink itself.", o: [
          ["Logos: it explains how the drink improves performance", "Look again: the ad never gives a fact about the drink's ingredients or effects."],
          ["Pathos: a comeback story links the drink with perseverance and triumph", "Yes. The persuasion lives in the story, the music, and the timing, not in information about the drink.", 1],
          ["Ethos: a famous athlete vouches for the drink", "No athlete endorses it. The runner is a character in a story, not a spokesperson."]] },
        { type: "mc", q: "Why does the music start exactly when the drink appears?", hint: "Notice what you hear before the drink appears, and what you hear after.", o: [
          ["To save money on music licensing", "Production cost isn't the reason; the timing is a deliberate creative choice."],
          ["To link the drink with the emotional lift of the comeback", "Yes. Before the drink there's only quiet doubt; the music arrives with the product and builds to the victory, so the good feeling gets attached to the drink.", 1],
          ["To show that the race is over", "The race isn't over; she gets up and wins. The music is about emotion, not plot."]] },
        { type: "mc", q: "Sound swap: if the fall played over cheerful pop music, what would most likely change?", hint: "Music tells viewers how to interpret what they see.", o: [
          ["Nothing, because music doesn't affect meaning", "Music strongly shapes how we interpret images; that's why ads score them so carefully."],
          ["The fall would feel less serious, so the comeback would feel less powerful", "Yes. The emotional meaning comes partly from the score. Same images, different feeling.", 1],
          ["The drink would seem healthier", "The music would change the mood of the story, not any claim about health."]] },
        { type: "sort", q: "Sort each element of the ad.", hint: "Ask: does this make me feel something, or does it tell me something I could check?", cats: [["emotion", "Emotional appeal"], ["fact", "Information you could check"]], items: [
          ["\u201cFuel for the comeback\u201d", "emotion", "A slogan. It sounds meaningful, but there's nothing to check."],
          ["The slow-motion fall and “the voice that says quit”", "emotion", "Slow motion and the timing of that line create a low point to rise from."],
          ["\u201cHydration drink. Not a substitute for training.\u201d", "fact", "This is a factual statement about what the product is and isn't."],
          ["\u201cBuilt for Champions\u201d", "emotion", "An identity slogan, not a testable claim."],
          ["Teammates rushing to hug her", "emotion", "Belonging and pride."]] },
        { type: "mc", q: "Does the ad commit a logical fallacy?", hint: "A fallacy is an error in a stated argument. Does the ad actually state that the drink caused the win?", o: [
          ["Yes: it states that the drink caused her win", "The ad never states that. Listen again to the narration."],
          ["Not exactly: it implies the drink helped by placing it at the turning point, which is a misleading implication rather than a stated argument", "Yes. The persuasion works through suggestion. If you argued \u201cit implies false cause,\u201d that's a strong answer when you explain that it's implied, not stated.", 1],
          ["No: the ad contains no persuasion at all", "Every element of the ad is persuasive; it just isn't making a stated argument."]] }
      ],
      evaluate: { q: "Is this emotional appeal ethically appropriate? Inspiring stories are legitimate, so weigh that against what the ad implies.", frame: "Although the ad is ___, it ___ because ___.", check: ["I named a specific moment from the ad.", "I said what the ad does well or fairly.", "I said what could mislead viewers, if anything.", "I made a clear judgment and gave a reason."] },
      college: { q: "Who is the target audience, and how does the ad define what a \u201cchampion\u201d is? Is aspirational storytelling aimed at young athletes fair?", frame: "The ad targets ___, as shown by ___. It defines a champion as ___, which ___." },
      transfer: "Think of an ad you've seen recently that sells a feeling more than a product. Describe it in two sentences and name the emotion it uses."
    },
    {
      id: 2, slug: "expert-endorsement", file: "expert-endorsement", dur: 36,
      title: L("Trust Me, I'm an Expert", "Confía en mí, soy experto"), ad: L("\u201cAsk the Expert\u201d for Brainmoor Focus Pro headphones", "\u201cPregúntale al experto\u201d de los audífonos Brainmoor Focus Pro"),
      focus: L("Ethos, credibility, and questionable authority", "Ethos, credibilidad y autoridad cuestionable"),
      target: L("I can evaluate whether a spokesperson's expertise is relevant and independent, and explain when an appeal to expertise becomes questionable.", "Puedo evaluar si la experiencia de un vocero es pertinente e independiente, y explicar cuándo una apelación a la experiencia se vuelve cuestionable."),
      mission: L("A doctor in a lab coat recommends headphones. Check his credentials before you trust him.", "Un doctor con bata de laboratorio recomienda unos audífonos. Revisa sus credenciales antes de confiar en él."),
      vocab: ["ethos", "authority", "credibility"],
      example: "A toothpaste ad features a dentist who explains a study published by an independent university. That's a relevant expert with checkable evidence, a legitimate appeal to expertise. If the same ad used a famous chef instead, the expertise wouldn't match the claim.",
      transcript: [
        [0, "v", "A white man in his fifties in a white lab coat stands in a sleek lab. Screens behind him show brain scans.", "Un hombre blanco de unos cincuenta años, con bata blanca, está en un laboratorio moderno. Detrás de él, unas pantallas muestran escáneres cerebrales."],
        [0, "s", "[A soft electronic pulse plays throughout.]", "[Un suave pulso electrónico suena todo el tiempo.]"],
        [0.5, "n", "I'm Dr. Marcus Vey. I've spent fifteen years studying what helps people perform at their best.", "Soy el Dr. Marcus Vey. He pasado quince años estudiando lo que ayuda a las personas a rendir al máximo."],
        [6, "v", "A young South Asian woman student sits in a noisy café, overwhelmed, her phone buzzing.", "Una joven estudiante del sur de Asia está en un café ruidoso, abrumada, con su teléfono vibrando."],
        [6.5, "n", "Distraction is everywhere. That's why I recommend Brainmoor Focus Pro.", "Las distracciones están en todas partes. Por eso recomiendo Brainmoor Focus Pro."],
        [12, "v", "She puts on the headphones. The café noise fades away and she smiles.", "Se pone los audífonos. El ruido del café desaparece y ella sonríe."],
        [12.4, "n", "Its patented NeuroCalm sound technology filters out the noise, so your brain can do what it does best.", "Su tecnología de sonido patentada NeuroCalm filtra el ruido para que tu cerebro haga lo que mejor sabe hacer."],
        [18, "x", "A lab display: 9 out of 10 students felt more focused*", "Una pantalla de laboratorio: 9 de cada 10 estudiantes se sintieron más concentrados*"],
        [18.5, "n", "In our testing, nine out of ten students said they felt more focused.", "En nuestras pruebas, nueve de cada diez estudiantes dijeron que se sintieron más concentrados."],
        [24, "x", "BRAINMOOR FOCUS PRO • NeuroCalm™ Technology • Patented • Recommended by Dr. Marcus Vey, PhD, Focus Expert", "BRAINMOOR FOCUS PRO • Tecnología NeuroCalm™ • Patentada • Recomendado por el Dr. Marcus Vey, doctorado, experto en concentración"],
        [24, "x", "*Fine print: Dr. Vey holds a PhD in business administration and is a paid Brainmoor spokesperson. Testing conducted by Brainmoor with 10 participants.", "*Letra pequeña: El Dr. Vey tiene un doctorado en administración de empresas y es un vocero pagado por Brainmoor. Pruebas realizadas por Brainmoor con 10 participantes."],
        [24.8, "n", "Trust the science. Trust Brainmoor.", "Confía en la ciencia. Confía en Brainmoor."],
        [30, "x", "This is a fictional advertisement created for classroom instruction. Brainmoor is not a real company.", "Este es un anuncio ficticio creado para la clase. Brainmoor no es una empresa real."]
      ],
      moments: [
        {"t": 0, "q": "The lab coat and brain-scan screens", "tags": ["ethos", "authority"], "why": "Costume and set signal science, though no evidence has been shown."},
        {"t": 12.4, "q": "“Patented NeuroCalm sound technology”", "tags": ["logos", "misleading"], "why": "A patent shows an idea is new, not that it works. The phrase sounds scientific without proving anything."},
        {"t": 18.5, "q": "“Nine out of ten students said they felt more focused”", "tags": ["logos", "stats"], "why": "Ten people, in the company's own test, reporting a feeling."},
        {"t": 24, "q": "“Recommended by Dr. Marcus Vey, PhD, Focus Expert”", "tags": ["ethos", "authority"], "why": "“Focus Expert” is a title Brainmoor created for the ad, presented as if it were a credential."},
        {"t": 24, "q": "The fine print about his PhD and paid role", "tags": ["honest"], "why": "An honest disclosure, but it's tiny and brief, and it undercuts everything the ad implied."},
        {"t": 24.8, "q": "“Trust the science. Trust Brainmoor.”", "tags": ["ethos", "authority"], "why": "Asks for trust in place of showing any science."}
      ],
      analyze: [
        { type: "judge", q: "Credential check: is each credential relevant to the claim \u201cthese headphones improve focus\u201d?", hint: "Ask whether the expertise matches the claim, and whether the evidence is independent.", opts: [["yes", "Relevant"], ["partly", "Partly"], ["no", "Not relevant"]], items: [
          ["\u201cDr.\u201d and \u201cPhD\u201d (the fine print says business administration)", "no", "A business PhD isn't training in neuroscience, psychology, or hearing."],
          ["The title \u201cFocus Expert\u201d", "no", "Brainmoor made up the title for the ad; it isn't a recognized credential."],
          ["\u201cFifteen years studying what helps people perform\u201d", "partly", "Workplace productivity experience is related, but it isn't research on headphones or attention."],
          ["The lab coat and brain-scan screens", "no", "Costume and set design are visual signals of science, not evidence."],
          ["\u201cPatented\u201d", "no", "A patent shows an idea is new, not that it works."],
          ["\u201cIn our testing\u201d (Brainmoor, 10 participants)", "partly", "It is evidence, but weak: tiny, run by the company, and measuring feelings rather than focus."]] },
        { type: "mc", q: "When does an appeal to expertise become a questionable appeal to authority?", hint: "Experts are often worth listening to. What makes this case different?", o: [
          ["Whenever an ad uses an expert", "Not every expert endorsement is fallacious. Relevant, independent experts with evidence are legitimate."],
          ["When the expertise doesn't match the claim, or the endorsement replaces evidence", "Yes. The question is relevance and evidence, not whether someone has a title.", 1],
          ["When the expert is paid", "Being paid creates a conflict of interest worth noting, but a paid expert can still be relevant and honest. Payment alone isn't the test."]] },
        { type: "mc", q: "Which endorsement would be a legitimate appeal to expertise for noise-cancelling headphones?", hint: "Look for relevant expertise plus evidence someone outside the company could check.", o: [
          ["A famous basketball player who wears them", "Fame isn't expertise in hearing or sound."],
          ["An independent audiologist explaining a published outside lab test of how much noise they block", "Yes. The expert's field matches the claim, and the evidence is independent and checkable.", 1],
          ["The company's own scientist, in a lab coat, saying they're the best", "Relevant field, maybe, but no evidence and a conflict of interest."]] },
        { type: "mc", q: "What is the weakest part of \u201cnine out of ten students felt more focused\u201d?", hint: "Read the fine print. Who ran the test, how many people, and what did they measure?", o: [
          ["Nine out of ten is a high number", "A high number isn't the problem; the problem is what's behind it."],
          ["The test was run by the company, with ten people, measuring how they felt", "Yes. Small, not independent, and self-reported. You'll investigate numbers like this in Case 5.", 1],
          ["Students were the participants", "Students are the right audience to test. The method is the weak part."]] }
      ],
      evaluate: { q: "Is it ethical to put a business PhD in a lab coat to sell a focus product? Consider what the fine print reveals.", frame: "The ad builds ethos by ___, but ___. A more honest version would ___.", check: ["I explained what creates credibility in the ad.", "I explained whether that credibility is relevant.", "I mentioned the fine print or conflict of interest.", "I made a clear judgment with a reason."] },
      college: { q: "What would independent evidence for \u201cimproves focus\u201d look like? Who should run the test, with how many people, measuring what?", frame: "To trust this claim, I would need ___, run by ___, measuring ___." },
      transfer: "Think of an ad that uses a doctor, scientist, celebrity, or influencer. Is their expertise relevant to the product? Explain in two or three sentences."
    },
    {
      id: 3, slug: "bandwagon-sneakers", file: "bandwagon-sneakers", dur: 42,
      title: L("Everybody's Buying It", "Todos lo están comprando"), ad: L("\u201cDon't Get Left Behind\u201d for Strideborne Drift sneakers", "\u201cNo te quedes atrás\u201d de los tenis Strideborne Drift"),
      focus: L("Bandwagon, belonging, and fear of missing out", "Efecto de arrastre, pertenencia y miedo a perderse algo"),
      target: L("I can identify bandwagon pressure, fear of missing out, and identity appeals, and explain when popularity is relevant evidence and when it isn't.", "Puedo identificar la presión de grupo, el miedo a perderse algo y las apelaciones a la identidad, y explicar cuándo la popularidad es evidencia pertinente y cuándo no."),
      mission: L("A sneaker ad that never says the shoes are good. Find out what it's really selling.", "Un anuncio de tenis que nunca dice que sean buenos. Descubre qué vende en realidad."),
      vocab: ["bandwagon", "pathos", "misleading"],
      example: "A phone ad shows hundreds of people lining up and says \u201cthe phone everyone's talking about.\u201d That shows popularity, not quality. If the ad said \u201crated highest for battery life by an independent testing lab,\u201d that would be evidence about the phone itself.",
      transcript: [
        [0, "s", "[A hip-hop beat plays.]", "[Suena un ritmo de hip-hop.]"],
        [0, "v", "A diverse crew of young adults, including a wheelchair user, crosses a city basketball court, all in the same white-and-teal sneakers.", "Un grupo diverso de jóvenes, incluido un usuario de silla de ruedas, cruza una cancha de básquetbol, todos con los mismos tenis blanco y verde azulado."],
        [0.6, "n", "Look around.", "Mira a tu alrededor."],
        [6, "v", "A phone feed fills with photos of the same sneakers.", "Una pantalla de teléfono se llena de fotos de los mismos tenis."],
        [6, "x", "#DriftNation", "#DriftNation"],
        [6.5, "n", "Everybody's switching to Strideborne Drift.", "Todos se están cambiando a Strideborne Drift."],
        [12, "v", "A young Latino man in worn sneakers sits alone on a bench. The image turns gray as a laughing group walks past without noticing him.", "Un joven latino con tenis gastados está solo en una banca. La imagen se vuelve gris mientras un grupo pasa riéndose sin notarlo."],
        [12.4, "s", "[Record scratch. The music stops dead.]", "[Rayón de disco. La música se detiene en seco.]"],
        [13.4, "n", "Still wearing last year's look?", "¿Todavía con el estilo del año pasado?"],
        [18, "x", "1,000,000+ PAIRS SOLD*", "MÁS DE 1,000,000 DE PARES VENDIDOS*"],
        [18, "s", "[The beat builds back up.]", "[El ritmo vuelve a crecer.]"],
        [18.6, "n", "Over one million pairs sold.", "Más de un millón de pares vendidos."],
        [24, "v", "He puts on the sneakers. Color floods back. The group waves him over and someone fist-bumps him.", "Se pone los tenis. El color regresa. El grupo lo llama y alguien choca el puño con él."],
        [24, "s", "[Bass drop.]", "[Cae el bajo.]"],
        [24.6, "n", "Don't get left behind.", "No te quedes atrás."],
        [30, "x", "STRIDEBORNE DRIFT. Find Your Crew. Small text: *Worldwide since launch.", "STRIDEBORNE DRIFT. Encuentra a tu grupo. Letra pequeña: *En todo el mundo desde su lanzamiento."],
        [30.6, "n", "Strideborne Drift. Find your crew.", "Strideborne Drift. Encuentra a tu grupo."],
        [36, "x", "This is a fictional advertisement created for classroom instruction. Strideborne is not a real company.", "Este es un anuncio ficticio creado para la clase. Strideborne no es una empresa real."]
      ],
      moments: [
        {"t": 6.5, "q": "“Everybody's switching to Strideborne Drift”", "tags": ["bandwagon"], "why": "An unsupported popularity claim; the montage makes it feel true."},
        {"t": 12.4, "q": "The record scratch: the music stops dead", "tags": ["pathos", "fear"], "why": "The scratch turns not owning the shoes into an embarrassing social fail, even before the line lands."},
        {"t": 13.4, "q": "The lonely, gray bench shot and “Still wearing last year's look?”", "tags": ["pathos", "fear"], "why": "Exclusion and embarrassment: not owning the shoe is framed as being left out."},
        {"t": 18.6, "q": "“Over one million pairs sold” (worldwide since launch)", "tags": ["logos", "misleading"], "why": "Even if true, sales show popularity, not quality, and the time span is unknown."},
        {"t": 24.6, "q": "“Don't get left behind”", "tags": ["bandwagon", "fear"], "why": "Fear of missing out turns buying into a way to avoid being left out."},
        {"t": 24, "q": "Color floods back; “Find your crew”", "tags": ["pathos"], "why": "The ad sells belonging, not a shoe."}
      ],
      analyze: [
        { type: "judge", q: "Popularity test: is popularity relevant evidence in each situation?", hint: "Popularity can prove something is popular. Does it prove the thing being claimed?", opts: [["yes", "Relevant"], ["partly", "Partly"], ["no", "Not relevant"]], items: [
          ["A restaurant with 2,000 recent reviews averaging 4.7 stars", "partly", "Many independent diners is real evidence about typical experiences, though reviews can be faked or skewed."],
          ["\u201cEveryone at school is wearing them,\u201d as a reason they're good shoes", "no", "That shows a trend, not comfort or durability."],
          ["A song with 50 million streams, as proof it's popular", "yes", "Popularity is the claim, so popularity proves it. It doesn't prove you'll like the song."],
          ["\u201cThe most-downloaded study app,\u201d as proof it helps you learn", "no", "Downloads don't show that anyone learned more."],
          ["Thousands of verified buyers saying a shoe runs half a size small", "yes", "Many independent reports about a specific, checkable fact are useful evidence."]] },
        { type: "sort", q: "Sort each line or moment by the strategy it mainly uses.", hint: "Bandwagon is about \u201ceveryone.\u201d FOMO is about being left out. Belonging is about joining a group.", cats: [["bandwagon", "Bandwagon"], ["fomo", "Fear of missing out"], ["belong", "Belonging and identity"]], items: [
          ["\u201cEverybody's switching to Strideborne Drift.\u201d", "bandwagon", "\u201cEverybody\u201d is the bandwagon signal."],
          ["\u201cStill wearing last year's look?\u201d", "fomo", "It makes not having the shoe feel embarrassing and outdated."],
          ["\u201cDon't get left behind.\u201d", "fomo", "A direct warning about being left out. It also works as bandwagon."],
          ["\u201cFind your crew.\u201d", "belong", "Buying the shoe is framed as joining a group."],
          ["#DriftNation", "belong", "A hashtag that turns customers into a \u201cnation\u201d you can belong to."]] },
        { type: "mc", q: "What does the ad never tell you about the sneakers?", hint: "List everything you'd want to know before buying shoes.", o: [
          ["That they're popular", "That's almost all it tells you."],
          ["Whether they're comfortable, durable, well made, or worth the price", "Yes. The ad sells belonging and leaves out everything about the shoe itself.", 1],
          ["What color they are", "The ad shows the color clearly."]] }
      ],
      evaluate: { q: "Targeting young people's need to belong is effective. Is it fair? Consider who might be affected.", frame: "This ad is effective because ___. However, it could affect ___ because ___.", check: ["I explained why the appeal works.", "I named who might be affected.", "I avoided saying all fashion advertising is unethical.", "I made a clear judgment with a reason."] },
      college: { q: "How does the ad define who belongs? Who is absent from the \u201ccrew,\u201d and what does that suggest about the target audience?", frame: "The ad defines belonging as ___. It leaves out ___, which suggests ___." },
      transfer: "Think of an ad or social-media trend that says \u201ceveryone\u201d has or does something. Is popularity relevant evidence in that case? Why or why not?"
    },
    {
      id: 4, slug: "false-choice", file: "false-choice", dur: 36,
      title: L("The False Choice", "La falsa elección"), ad: L("\u201cChoose Your Future\u201d for Quillon Slate tablet", "\u201cElige tu futuro\u201d de la tableta Quillon Slate"),
      focus: L("False dilemma", "Falso dilema"),
      target: L("I can identify a false dilemma, name the options it hides, rewrite the claim so it's logically defensible, and tell a false dilemma from a genuine two-option situation.", "Puedo identificar un falso dilema, nombrar las opciones que oculta, reescribir la afirmación para que sea lógicamente defendible y distinguir un falso dilema de una situación con dos opciones reales."),
      mission: L("A tablet ad says there are only two kinds of students. Find the options it's hiding.", "Un anuncio de una tableta dice que solo hay dos tipos de estudiantes. Encuentra las opciones que oculta."),
      vocab: ["dilemma", "fallacy", "pathos"],
      example: "\u201cEither you join the debate team, or you'll never be a good speaker.\u201d That's a false dilemma: you could take a speech class, practice at home, or join a different club. Compare: \u201cThe bus leaves at 7:10. Either you're on it, or you'll need another ride.\u201d That one is a genuine two-option situation.",
      transcript: [
        [0, "v", "Split screen. Left: a young East Asian woman student buried in papers under a flickering lamp, in gray tones. Right: the same student calmly writing on a sleek tablet in a bright room.", "Pantalla dividida. Izquierda: una joven estudiante del este de Asia rodeada de papeles bajo una lámpara parpadeante, en tonos grises. Derecha: la misma estudiante escribe tranquila en una tableta en un cuarto luminoso."],
        [0, "s", "[A tense ticking clock.]", "[Un reloj tenso.]"],
        [0.6, "n", "There are two kinds of students.", "Hay dos tipos de estudiantes."],
        [6, "v", "The stressed student, buried in papers in a dim, gray room.", "La estudiante estresada, rodeada de papeles en un cuarto gris y oscuro."],
        [6.6, "n", "The ones still drowning in paper…", "Los que siguen ahogándose en papel…"],
        [12, "v", "The same student, calm and smiling with her tablet in a bright, sunlit room.", "La misma estudiante, tranquila y sonriente con su tableta en un cuarto luminoso."],
        [12, "s", "[The music turns bright and airy.]", "[La música se vuelve luminosa y ligera.]"],
        [12.5, "n", "…and the ones who've already chosen the future.", "…y los que ya eligieron el futuro."],
        [18, "v", "A tablet screen glows with a big letter A.", "La pantalla de una tableta brilla con una gran letra A."],
        [18, "s", "[A driving beat kicks in.]", "[Entra un ritmo enérgico.]"],
        [18.6, "n", "Quillon Slate. Either you upgrade, or you fall behind.", "Quillon Slate. O te actualizas, o te quedas atrás."],
        [24, "x", "Either you upgrade, or you fall behind. QUILLON SLATE · Choose Your Future", "O te actualizas, o te quedas atrás. QUILLON SLATE · Elige tu futuro"],
        [25.2, "n", "The choice is yours.", "Tú decides."],
        [30, "x", "This is a fictional advertisement created for classroom instruction. Quillon is not a real company.", "Este es un anuncio ficticio creado para la clase. Quillon no es una empresa real."]
      ],
      moments: [
        {"t": 0.6, "q": "“There are two kinds of students”", "tags": ["dilemma"], "why": "Sets up only two categories when students vary in countless ways."},
        {"t": 0, "q": "The split screen: gray chaos vs. bright calm", "tags": ["pathos", "dilemma"], "why": "The visual makes the false choice feel natural: stress on one side, success on the other."},
        {"t": 18, "q": "The glowing A on the tablet", "tags": ["misleading"], "why": "Implies the tablet produces better grades, with no evidence."},
        {"t": 18.6, "q": "“Either you upgrade, or you fall behind”", "tags": ["dilemma", "fear"], "why": "The core false dilemma, with a fear of falling behind attached."},
        {"t": 25.2, "q": "“The choice is yours” over the slogan slate", "tags": ["dilemma"], "why": "It offers “choice” right after insisting there are only two options."}
      ],
      analyze: [
        { type: "option", q: "Option finder: list at least three options the ad hides. Then compare with the investigator's list.", hint: "Think about other devices, other study methods, and what actually helps students succeed.", reveal: ["Other tablets, laptops, or the school-issued device", "Paper notebooks and planners that work fine for many students", "Free apps on a device you already have", "Study habits, sleep, and support from teachers, which matter more than any device", "Keeping your current device: not upgrading doesn't mean falling behind"] },
        { type: "judge", q: "Genuine or false? Two of these are genuine two-option situations.", hint: "A genuine two-option situation has a rule or fact that truly allows only two outcomes.", opts: [["false", "False dilemma"], ["genuine", "Genuine two options"]], items: [
          ["\u201cEither you upgrade to Quillon Slate, or you fall behind.\u201d", "false", "Many other paths exist."],
          ["\u201cThe early-registration deadline is Friday at 5 p.m. Either you register by then, or you pay the regular price.\u201d", "genuine", "The rule truly creates only two outcomes."],
          ["\u201cEither you support the new schedule, or you don't care about students.\u201d", "false", "People can care about students and still disagree about the schedule."],
          ["\u201cThe file either finished uploading or it didn't.\u201d", "genuine", "A completed upload is a yes-or-no fact."],
          ["\u201cYou're either a math person or you're not.\u201d", "false", "Skills develop with practice; most people are somewhere in between."]] },
        { type: "rewrite", q: "Rewrite \u201cEither you upgrade, or you fall behind\u201d so it's logically defensible but still persuasive.", frame: "If you ___, Quillon Slate can help you ___.", model: "\u201cIf you take lots of handwritten notes and want them organized and searchable, Quillon Slate is one option worth comparing.\u201d", check: ["My rewrite names a specific benefit.", "It names who it's for.", "It leaves room for other choices.", "It's still persuasive."] }
      ],
      evaluate: { q: "Is it fair for an ad aimed at students to frame not buying as \u201cfalling behind\u201d? Explain.", frame: "This framing is ___ because ___. Students might ___.", check: ["I explained how the false dilemma works.", "I considered the effect on students.", "I made a clear judgment with a reason."] },
      college: { q: "Compare this ad with Case 3. Both frame not buying as a loss. How does a false choice combine with bandwagon pressure, and which is more persuasive for teens?", frame: "Both ads ___. However, Case 3 relies on ___, while Case 4 relies on ___." },
      transfer: "Think of an ad, announcement, or argument that offered only two options. Were there really only two? Name one option it left out."
    },
    {
      id: 5, slug: "misleading-statistics", file: "misleading-statistics", dur: 48,
      title: L("Numbers Don't Lie\u2014or Do They?", "Los números no mienten\u2026 ¿o sí?"), ad: L("\u201cThe Numbers Speak\u201d for Cramlytic study app", "\u201cLos números hablan\u201d de la app de estudio Cramlytic"),
      focus: L("Logos, statistics, and misleading claims", "Logos, estadísticas y afirmaciones engañosas"),
      target: L("I can identify statistics that lack context, sources, or fair comparisons, explain correlation vs. causation, and name the evidence I'd need to evaluate a numerical claim.", "Puedo identificar estadísticas sin contexto, sin fuentes o sin comparaciones justas, explicar la diferencia entre correlación y causalidad, y nombrar la evidencia que necesitaría para evaluar una afirmación numérica."),
      mission: L("Every number in this ad sounds convincing. Inspect what's behind each one. (All statistics are invented for instruction.)", "Cada número en este anuncio suena convincente. Inspecciona lo que hay detrás de cada uno. (Todas las estadísticas son inventadas para la clase.)"),
      vocab: ["logos", "correlation", "misleading"],
      example: "\u201cOur juice has 50% less sugar!\u201d Less than what? If the comparison is to a soda, the juice could still be very sugary. Good investigators ask: compared to what, measured how, and according to whom?",
      transcript: [
        [0, "v", "Glowing data points swirl into a sphere of light on a dark navy background.", "Puntos de datos brillantes giran hasta formar una esfera de luz sobre un fondo azul marino."],
        [0, "s", "[A crisp electronic beat builds throughout.]", "[Un ritmo electrónico nítido crece todo el tiempo.]"],
        [0.5, "n", "Some apps make promises. Cramlytic shows you the numbers.", "Algunas apps hacen promesas. Cramlytic te muestra los números."],
        [6, "v", "A bar chart: a short gray “Non-users” bar and a towering teal “Cramlytic users” bar. The vertical axis starts at 45, not zero.", "Una gráfica de barras: una barra gris corta de “No usuarios” y una barra verde azulado altísima de “Usuarios de Cramlytic”. El eje vertical empieza en 45, no en cero."],
        [6, "x", "+40% HIGHER SCORES", "+40 % MEJORES CALIFICACIONES"],
        [6.5, "n", "Cramlytic users score forty percent higher on tests.", "Los usuarios de Cramlytic sacan un cuarenta por ciento más en los exámenes."],
        [12, "v", "A glowing globe with arcs of light between cities.", "Un globo brillante con arcos de luz entre ciudades."],
        [12, "x", "2,000,000+ DOWNLOADS", "MÁS DE 2,000,000 DE DESCARGAS"],
        [12.5, "n", "Over two million downloads.", "Más de dos millones de descargas."],
        [18, "v", "Ten silhouettes; nine glow teal.", "Diez siluetas; nueve brillan en verde azulado."],
        [18, "x", "9 OUT OF 10 RECOMMEND", "9 DE CADA 10 LO RECOMIENDAN"],
        [18.5, "n", "Nine out of ten students recommend Cramlytic.", "Nueve de cada diez estudiantes recomiendan Cramlytic."],
        [24, "v", "A young Latina woman smiles and holds up a report card full of A's.", "Una joven latina sonríe y muestra una boleta llena de A."],
        [24, "x", "20 MIN/DAY = BETTER GRADES", "20 MIN AL DÍA = MEJORES CALIFICACIONES"],
        [24.3, "n", "Students who study with Cramlytic twenty minutes a day get better grades. Cramlytic makes you smarter.", "Los estudiantes que estudian con Cramlytic veinte minutos al día sacan mejores calificaciones. Cramlytic te hace más inteligente."],
        [30, "x", "UP TO 3× FASTER LEARNING", "APRENDE HASTA 3 VECES MÁS RÁPIDO"],
        [30.6, "n", "Learn up to three times faster.", "Aprende hasta tres veces más rápido."],
        [36, "x", "CRAMLYTIC. The Numbers Speak. Tiny fine print: Based on internal data.", "CRAMLYTIC. Los números hablan. Letra muy pequeña: Basado en datos internos."],
        [36.6, "n", "Cramlytic. The numbers speak.", "Cramlytic. Los números hablan."],
        [42, "x", "This is a fictional advertisement created for classroom instruction. Cramlytic is not a real company. All statistics in this ad are invented.", "Este es un anuncio ficticio creado para la clase. Cramlytic no es una empresa real. Todas las estadísticas de este anuncio son inventadas."]
      ],
      moments: [
        {"t": 6.5, "q": "“Forty percent higher” and the bar chart", "tags": ["logos", "stats"], "why": "A percentage without base numbers, on a chart whose axis starts at 45 to exaggerate the gap."},
        {"t": 12.5, "q": "“Over two million downloads”", "tags": ["bandwagon", "stats"], "why": "Downloads measure popularity, not learning, and not even how many people use it."},
        {"t": 18.5, "q": "“Nine out of ten students recommend”", "tags": ["stats"], "why": "Who was asked, and how many? (The data inspector reveals it.)"},
        {"t": 24.3, "q": "“Makes you smarter”", "tags": ["misleading"], "why": "Correlation presented as causation, then exaggerated."},
        {"t": 30.6, "q": "“Up to three times faster”", "tags": ["misleading"], "why": "“Up to” describes a single best case."},
        {"t": 36, "q": "“Based on internal data”", "tags": ["stats"], "why": "No independent source, shown for under two seconds."}
      ],
      analyze: [
        { type: "inspect", q: "Data inspector: for each claim, write what you'd need to know first. Then reveal the hidden details. (All details are invented.)", items: [
          ["\u201cUsers score 40% higher on tests.\u201d", "Compared app quizzes: active users averaged 70; students who signed up but never used the app averaged 50. The chart's axis starts at 45.", "\u201cOn in-app practice quizzes, active users averaged 70 and inactive sign-ups averaged 50. This doesn't show the app caused the difference.\u201d"],
          ["\u201cOver two million downloads.\u201d", "About 180,000 people use it in a typical month.", "\u201cDownloaded over two million times; about 180,000 monthly active users.\u201d"],
          ["\u201cNine out of ten recommend.\u201d", "A pop-up shown only to users on a 30-day streak; 50 answered.", "\u201cOf 50 users with 30-day streaks who answered an in-app survey, 45 said they'd recommend it.\u201d"],
          ["\u201c20 minutes a day = better grades. Makes you smarter.\u201d", "Students who used it daily had higher grades on average; no experiment was done.", "\u201cStudents who used it daily tended to have higher grades. We haven't tested whether the app caused this.\u201d"],
          ["\u201cUp to 3\u00d7 faster learning.\u201d", "One user, on one vocabulary quiz, finished three times faster on a second attempt.", "Remove the claim, or report the typical result."]] },
        { type: "judge", q: "Match each claim with its main problem.", hint: "Each claim has one main weakness. Use the data inspector's details.", opts: [["base", "Percent without base numbers"], ["pop", "Popularity, not outcomes"], ["sample", "Tiny, self-selected sample"], ["cause", "Correlation as causation"], ["best", "Best-case \u201cup to\u201d"]], items: [
          ["\u201c40% higher on tests\u201d", "base", "Forty percent of what? 50 to 70 is 40%, and the chart exaggerates it."],
          ["\u201c2 million downloads\u201d", "pop", "Downloads aren't learning."],
          ["\u201c9 out of 10 recommend\u201d", "sample", "Only 50 of the most enthusiastic users answered."],
          ["\u201cMakes you smarter\u201d", "cause", "Higher grades among daily users doesn't show the app caused them."],
          ["\u201cUp to 3\u00d7 faster\u201d", "best", "One user, one quiz."]] },
        { type: "mc", q: "Students who use Cramlytic daily have higher grades. What's the best alternative explanation?", hint: "Who chooses to use a study app every day?", o: [
          ["The app must be working", "That's the conclusion the ad wants, but other explanations fit the same data."],
          ["Students who already study hard are more likely to use a study app daily", "Yes. Motivated students may choose the app and get better grades for the same reason: they study.", 1],
          ["Grades are random", "Grades aren't random; the issue is what causes the difference."]] },
        { type: "mc", q: "What kind of test could show whether the app causes better grades?", hint: "Think about a fair comparison.", o: [
          ["Ask users if they like the app", "That measures opinion, not learning."],
          ["Randomly assign similar students to use or not use the app, then compare their grades", "Yes. Random assignment makes the two groups similar except for the app.", 1],
          ["Count how many people downloaded it", "Downloads don't measure learning."]] }
      ],
      evaluate: { q: "Every number in the ad might be technically true. Is the ad still dishonest? Explain using one specific claim.", frame: "Even if \u201c___\u201d is technically true, it leaves the impression that ___, which is misleading because ___.", check: ["I quoted a specific claim.", "I explained the impression it creates.", "I explained what information is missing.", "I made a clear judgment."] },
      college: { q: "Write the evidence standard a claim like \u201cmakes you smarter\u201d would have to meet before you'd accept it.", frame: "Before accepting this claim, I'd need ___, collected by ___, with ___ participants, measuring ___." },
      transfer: "Find a number in an ad you've seen (\u201c4 out of 5,\u201d \u201c50% more,\u201d \u201c#1\u201d). What would you need to know to trust it?"
    },
    {
      id: 6, slug: "ethical-advertising", file: "ethical-advertising", dur: 48,
      title: L("Become the Advertiser", "Conviértete en publicista"), ad: L("\u201cThe Last Bottle You'll Ever Need\u201d for Sipwarden smart water bottle", "\u201cLa última botella que necesitarás\u201d de la botella inteligente Sipwarden"),
      focus: L("Ethical persuasion and synthesis", "Persuasión ética y síntesis"),
      target: L("I can diagnose the strategies and reasoning problems in an ad, then rewrite it so it's both persuasive and responsible.", "Puedo diagnosticar las estrategias y los problemas de razonamiento de un anuncio, y luego reescribirlo para que sea persuasivo y responsable."),
      mission: L("You're the advertising consultant. This ad stacks every trick you've studied. Diagnose it, then fix it.", "Eres el consultor de publicidad. Este anuncio acumula todos los trucos que has estudiado. Diagnostícalo y luego corrígelo."),
      vocab: ["ethical", "fear", "authority"],
      example: "An ethical gym ad might say: \u201cFirst month free. Classes for every fitness level, with certified trainers.\u201d It still persuades (a free offer, a welcoming tone), but every claim is checkable and nothing scares or pressures you.",
      transcript: [
        [0, "v", "A young Middle Eastern man slumps at his desk in a dim, blue-tinted office.", "Un joven de Medio Oriente está desplomado en su escritorio en una oficina oscura y azulada."],
        [0, "s", "[Low, ominous drone.]", "[Un zumbido grave y amenazante.]"],
        [0.4, "n", "Feeling tired? Foggy? Dehydration could be silently ruining your day.", "¿Te sientes cansado? ¿Nublado? La deshidratación podría estar arruinando tu día en silencio."],
        [6, "v", "A water bottle's cap ring glows green beside a phone showing a filling water goal.", "El anillo de la tapa de una botella brilla en verde junto a un teléfono que muestra una meta de agua que se llena."],
        [6, "s", "[The music flips to an upbeat pop track.]", "[La música cambia a un tema pop alegre.]"],
        [6.4, "n", "Meet Sipwarden, the smart bottle that tracks every sip.", "Conoce Sipwarden, la botella inteligente que registra cada trago."],
        [12, "v", "A fitness influencer films herself with a ring light, holding up the bottle.", "Una influencer de fitness se graba con un aro de luz y muestra la botella."],
        [12, "x", "Trainer-approved • 2M followers", "Aprobada por entrenadora • 2 millones de seguidores"],
        [12.5, "n", "Trainer-approved by Jade Kessler.", "Aprobada por la entrenadora Jade Kessler."],
        [18, "x", "+37% MORE ENERGY", "+37 % MÁS ENERGÍA"],
        [18.5, "n", "Sipwarden users report thirty-seven percent more energy.", "Los usuarios de Sipwarden reportan treinta y siete por ciento más energía."],
        [24, "v", "People of many ages and backgrounds walk toward the camera, each holding up the same bottle.", "Personas de muchas edades y orígenes caminan hacia la cámara, cada una con la misma botella en alto."],
        [24, "x", "5 MILLION SWITCHED", "5 MILLONES YA SE CAMBIARON"],
        [24.3, "n", "Join five million people who've already made the switch.", "Únete a cinco millones de personas que ya se cambiaron."],
        [27.6, "n", "Either you track your water, or you're guessing with your health.", "O registras tu agua, o estás adivinando con tu salud."],
        [30, "x", "24 oz • Cold for 12 hours", "24 oz • Fría por 12 horas"],
        [31.8, "n", "It holds twenty-four ounces and keeps drinks cold for twelve hours.", "Tiene capacidad de veinticuatro onzas y mantiene las bebidas frías por doce horas."],
        [36, "x", "SIPWARDEN. The last bottle you'll ever need.", "SIPWARDEN. La última botella que necesitarás."],
        [36.5, "n", "Sipwarden. The last bottle you'll ever need.", "Sipwarden. La última botella que necesitarás."],
        [42, "x", "This is a fictional advertisement created for classroom instruction. Sipwarden is not a real company. All claims and statistics are invented.", "Este es un anuncio ficticio creado para la clase. Sipwarden no es una empresa real. Todas las afirmaciones y estadísticas son inventadas."]
      ],
      moments: [
        {"t": 0.4, "q": "“Dehydration could be silently ruining your day”", "tags": ["fear", "pathos"], "why": "Inflates a common feeling into a hidden threat."},
        {"t": 12.5, "q": "“Trainer-approved by Jade Kessler” and “2M followers”", "tags": ["authority", "ethos"], "why": "A follower count isn't expertise, and “approved” doesn't say what was tested or whether she was paid."},
        {"t": 18.5, "q": "“37% more energy”", "tags": ["stats", "logos"], "why": "No source, no sample, no definition of “energy,” and it's self-reported."},
        {"t": 24.3, "q": "“Join five million people”", "tags": ["bandwagon"], "why": "Unverified and irrelevant to whether the bottle helps."},
        {"t": 27.6, "q": "“Either you track your water, or you're guessing with your health”", "tags": ["dilemma", "fear"], "why": "People drink enough water without tracking every sip."},
        {"t": 31.8, "q": "“Holds 24 ounces, cold for 12 hours”", "tags": ["honest"], "why": "Specific, testable product facts. Keep these in your rewrite!"},
        {"t": 36.5, "q": "“The last bottle you'll ever need”", "tags": ["misleading"], "why": "An exaggeration no product could support."}
      ],
      analyze: [],
      workspace: true,
      model: "\u201cBusy days make it easy to forget to drink water. Sipwarden's cap glows when it's been a while since your last sip, and the app shows your progress if you like keeping track. It holds 24 ounces and keeps drinks cold for 12 hours. If reminders help you, Sipwarden makes them easy.\u201d",
      evaluate: { q: "Final reflection: How is your rewrite both persuasive and responsible? What did you keep, cut, and add?", frame: "I kept ___ because ___. I cut ___ because ___. My version still persuades by ___.", check: ["My claims are supported or clearly qualified.", "My emotional appeal fits the facts.", "I didn't use a false choice.", "Any endorser is relevant and disclosed.", "The audience can make an informed decision."] },
      college: { q: "Write a short creative brief for one specific audience (for example, student athletes or office workers). How does your strategy change for that audience without becoming manipulative?", frame: "For ___, I would emphasize ___ because ___, while avoiding ___." },
      transfer: "Think of a product you actually like. Write one honest, persuasive sentence an ad could use for it."
    }
  ];

  /* ---------- Final report: the honest seventh ad (storyboard only; no video needed) ---------- */
  D.FINAL_AD = {
    title: L("\u201cOpen Shelf\u201d for the Maple Street Library", "\u201cEstante abierto\u201d de la Biblioteca Maple Street"),
    note: L("A storyboard for a fictional public library ad. Read it like you'd watch it. Some ads contain no fallacy at all; decide for yourself.", "Un guion gráfico de un anuncio ficticio para una biblioteca pública. Léelo como si lo vieras. Algunos anuncios no contienen ninguna falacia; decide tú."),
    rows: [
      ["0:00", "A grandmother and her grandson read a picture book together on a library beanbag. Soft acoustic guitar.", "Una abuela y su nieto leen un libro ilustrado en un puf de la biblioteca. Suena una guitarra acústica suave."],
      ["0:04", "Narrator: \u201cSome of the best things in our city are free.\u201d", "Narrador: \u201cAlgunas de las mejores cosas de nuestra ciudad son gratis.\u201d"],
      ["0:08", "A teenager checks out a laptop at the front desk. A librarian smiles.", "Un adolescente pide prestada una laptop en el mostrador. Una bibliotecaria sonríe."],
      ["0:10", "Narrator: \u201cWith a free Maple Street Library card, you can borrow books, laptops, and Wi-Fi hotspots, and get homework help on weeknights.\u201d", "Narrador: \u201cCon una tarjeta gratuita de la Biblioteca Maple Street, puedes pedir prestados libros, laptops y puntos de acceso a Wi-Fi, y recibir ayuda con la tarea entre semana.\u201d"],
      ["0:18", "On screen: Free for city residents. Bring a photo ID or a piece of mail with your address.", "En pantalla: Gratis para residentes de la ciudad. Trae una identificación con foto o una carta con tu dirección."],
      ["0:22", "Narrator: \u201cLast year, our branch lent out more than forty thousand items.\u201d On screen: Source: Maple Street Library annual report.", "Narrador: \u201cEl año pasado, nuestra sucursal prestó más de cuarenta mil artículos.\u201d En pantalla: Fuente: informe anual de la Biblioteca Maple Street."],
      ["0:27", "Narrator: \u201cCome find something you love.\u201d On screen: Open seven days a week. Hours at the front desk.", "Narrador: \u201cVen a encontrar algo que te encante.\u201d En pantalla: Abierta los siete días de la semana. Horarios en el mostrador."],
      ["0:30", "End card: This is a fictional advertisement created for classroom instruction. The library and its statistics are invented.", "Tarjeta final: Este es un anuncio ficticio creado para la clase. La biblioteca y sus estadísticas son inventadas."]
    ]
  };
  D.REPORT = [
    { id: "claim", n: "1. Central claim", p: "What is the ad's main message or claim?", frame: "The ad's central claim is that ___." },
    { id: "audience", n: "2. Intended audience", p: "Who is the ad for? What evidence in the ad tells you?", frame: "The ad targets ___, as shown by ___." },
    { id: "appeals", n: "3. Rhetorical appeals", p: "Identify at least two appeals, each with a specific moment.", frame: "The ad uses ___ when it ___. It also uses ___ when ___." },
    { id: "evidence", n: "4. Evidence", p: "Give a specific example of the evidence the ad uses, or explain that it offers none.", frame: "The ad supports its claim with ___. / The ad offers no evidence for ___." },
    { id: "fallacy", n: "5. Fallacies or misleading reasoning", p: "Identify any fallacy or misleading reasoning that is actually present. If there is none, write \u201cNone found\u201d and explain why.", frame: "The ad uses ___ because ___. / None found: ___." },
    { id: "credibility", n: "6. Credibility", p: "How credible is the ad? Consider sources, expertise, and independence.", frame: "The ad is ___ credible because ___." },
    { id: "judgment", n: "7. Overall judgment", p: "How effective is the ad, and how ethical? Judge both, separately.", frame: "The ad is effective because ___. Ethically, it is ___ because ___." }
  ];
  D.RUBRIC = [
    ["Identification of persuasive strategies", "Names two or more appeals accurately and explains how they work together", "Names two appeals accurately", "Names one appeal accurately, or two with an error", "Names appeals inaccurately or not at all"],
    ["Quality of evidence", "Cites precise moments (words, images, sounds) for every claim", "Cites specific moments for most claims", "Cites general or vague evidence", "Gives no evidence from the ad"],
    ["Depth and accuracy of reasoning", "Explains why each technique works and correctly judges whether reasoning is valid, including when no fallacy is present", "Explains most techniques and judges reasoning accurately", "Identifies techniques but explains little; some reasoning errors", "Lists labels without reasoning"],
    ["Ethical evaluation", "Weighs effectiveness against honesty and respect for the audience, with a defended judgment", "Makes a clear ethical judgment with a reason", "Makes an ethical judgment without support", "No ethical evaluation"],
    ["Clarity of written communication", "Organized and precise, with academic vocabulary; easy to follow", "Clear, with mostly accurate vocabulary", "Understandable but disorganized or imprecise", "Hard to follow"]
  ];
  return D;
})();
