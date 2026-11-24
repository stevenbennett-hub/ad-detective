# Ad Detective: The Art of Persuasion

An investigation lab where students analyze six fictional advertisements for persuasive appeals, logical fallacies, misleading claims, and ethical persuasion. A companion to [The Speaking Lab](https://stevenbennett-hub.github.io/speaking-lab/).

No accounts, no trackers, no external AI, and no outside services: the fonts are bundled in `assets/fonts/` (SIL Open Font License), so district filters can't block them. Student work saves only in each browser, with copy, download, and backup options.

## Publish on GitHub Pages

1. Create a new repository (for example `ad-detective`) and upload everything in this folder: `index.html`, `assets/` (videos, captions, and fonts), `src/`, `build.py`, the `tools_*.js` files, and this README.
2. In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/ (root)**. Save.
3. After a minute or two the site is live at `https://<your-username>.github.io/ad-detective/`.

Link it from the Speaking Lab (Unit 6 and Practice Labs) when you're ready.

## Add the videos

Export each finished ad from ElevenLabs Studio as **MP4 (H.264)**, ideally under 20 MB (GitHub rejects files over 100 MB), and upload it to `assets/videos/` with exactly these names:

| Case | Video file | Caption files (already included) |
|---|---|---|
| 1 | `emotional-hook.mp4` | `emotional-hook.en.vtt`, `emotional-hook.es.vtt` |
| 2 | `expert-endorsement.mp4` | `expert-endorsement.en.vtt`, `.es.vtt` |
| 3 | `bandwagon-sneakers.mp4` | `bandwagon-sneakers.en.vtt`, `.es.vtt` |
| 4 | `false-choice.mp4` | `false-choice.en.vtt`, `.es.vtt` |
| 5 | `misleading-statistics.mp4` | `misleading-statistics.en.vtt`, `.es.vtt` |
| 6 | `ethical-advertising.mp4` | `ethical-advertising.en.vtt`, `.es.vtt` |

No code changes are needed: the site finds each file by name. Until a video is added, its case shows a placeholder and students use the transcript. If a file exists but a browser can't play it, the site says so instead.

**Captions:** the `.vtt` files in `assets/captions/` are generated from the final ElevenLabs cuts: every narration line and sound cue starts at the exact second it was placed in the composition. Cue end times are estimated, so if one lingers a little long or short, open the `.vtt` file in any text editor and adjust it (each cue is `start --> end` followed by the text).

**Transcripts and timestamps:** each transcript row and evidence moment has a time in `src/data.js`, matched to the final ElevenLabs cuts. If you ever re-edit an ad, update those numbers so the "jump to" buttons land correctly.

**Uploading through the GitHub website:** the browser upload accepts files up to 25 MB each. If an exported ad is larger, compress it first (or ask for help).

## Edit content

All text lives in `src/data.js`; Spanish for activity text lives in `src/es.js` (cases, transcripts, evidence moments, activities, vocabulary, the final-report ad, and the rubric). Interface labels are in `src/app.js` (the `U` object). Styles are in `src/styles.css`.

After editing, rebuild the single-file site:

```
python3 build.py
```

This rewrites `index.html` and regenerates the draft captions from the transcripts. **Careful:** if you've already retimed the captions, back them up first, or edit `index.html`'s caption files by hand instead of rebuilding. Requires Python 3 and Node.js.

## What's included

- Six cases, each with five steps (Brief, Watch, Evidence, Analyze, Evaluate), progress rings, and a "beyond the classroom" transfer question.
- Evidence tagging: students tag moments with techniques, write an explanation for each evidence card, compare with the investigator, and add their own evidence from the transcript.
- Activity types: multiple choice (feedback, a hint after one miss, "show the answer" after two), sorting and matching, an option finder, a data inspector, a rewrite workshop with a model, and Case 6's consultant workspace.
- A Detective Notebook that collects everything, with copy, download, backup, and restore.
- The Advertising Investigation Report: an honest storyboard ad ("Open Shelf," with no fallacy) or a real ad the student describes. Seven structured fields, a four-level rubric, and an export containing only the student's own words.
- Fully bilingual: English and Spanish interface, activities and feedback, transcripts, captions, and vocabulary. College challenge mode adds a deeper written task per case.
- Teacher page with modules, pacing, discussion prompts, differentiation, formative assessment, the rubric, and video instructions. **No answer keys are on the site**; they're in the private planning document.

## Known limitations

- **Spanish wording** was translated by Claude and should be reviewed by a native speaker before launch. If you edit English activity text in `src/data.js`, its Spanish falls back to English until you add the new wording to `src/es.js` (`node tools_strings.js` lists every string that needs Spanish).
- **Draft captions** need retiming to the final videos (see above).
- Tested in Chromium (desktop and phone widths). Test Safari and VoiceOver on a district MacBook before launch.
