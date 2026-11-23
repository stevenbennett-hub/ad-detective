"""Build Ad Detective: inline src/ into one index.html and generate draft captions from the transcripts.
Run: python3 build.py   (needs Node.js only to read data.js for captions)"""
import json, subprocess, pathlib
root = pathlib.Path(__file__).parent
css = (root / "src/styles.css").read_text(encoding="utf-8")
data = (root / "src/data.js").read_text(encoding="utf-8") + "\n" + (root / "src/es.js").read_text(encoding="utf-8")
app = (root / "src/app.js").read_text(encoding="utf-8")
html = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ad Detective: The Art of Persuasion</title>
<meta name="description" content="Investigate the persuasion behind six fictional advertisements: appeals, fallacies, misleading claims, and ethical persuasion.">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%230F1626'/%3E%3Ccircle cx='13' cy='13' r='8' fill='none' stroke='%23EEF2F8' stroke-width='3'/%3E%3Cpath d='M19 19l8 8' stroke='%23EEF2F8' stroke-width='3.4' stroke-linecap='round'/%3E%3Cpath d='M9 13h8' stroke='%23F5B83D' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E">
<style>
@font-face {{ font-family: "Atkinson Hyperlegible Next"; font-style: normal; font-weight: 400; font-display: swap; src: url(assets/fonts/atkinson-hyperlegible-next-latin-400-normal.woff2) format("woff2"); }}
@font-face {{ font-family: "Atkinson Hyperlegible Next"; font-style: normal; font-weight: 700; font-display: swap; src: url(assets/fonts/atkinson-hyperlegible-next-latin-700-normal.woff2) format("woff2"); }}
@font-face {{ font-family: "Bricolage Grotesque"; font-style: normal; font-weight: 200 800; font-display: swap; src: url(assets/fonts/bricolage-grotesque-latin-wght-normal.woff2) format("woff2-variations"); }}
{css}
</style>
</head>
<body>
<div id="app"><p style="padding:2rem">Ad Detective needs JavaScript to run.</p></div>
<script>
{data}
</script>
<script>
{app}
</script>
</body>
</html>
"""
(root / "index.html").write_text(html, encoding="utf-8")

# Draft captions (narration + sound cues), to be retimed against the final edit.
cases = json.loads(subprocess.check_output(["node", "-e", "global.window={};require('./src/data.js');process.stdout.write(JSON.stringify(window.AD.CASES))"], cwd=root))
def ts(s): return f"00:{int(s)//60:02d}:{int(s)%60:02d}.000"
for c in cases:
    rows = [r for r in c["transcript"] if r[1] in ("n", "s")]
    for li, lang in ((2, "en"), (3, "es")):
        out = ["WEBVTT", "", f"NOTE Draft captions for {c['file']}.mp4 generated from the transcript. Retime them to the final edit.", ""]
        for k, r in enumerate(rows):
            start = r[0]
            nxt = [x[0] for x in rows[k + 1:] if x[0] > start]
            end = min(nxt[0] if nxt else c["dur"] - 3, start + 6)
            if end <= start: end = start + 3
            out += [f"{ts(start)} --> {ts(end)}", r[li], ""]
        (root / f"assets/captions/{c['file']}.{lang}.vtt").write_text("\n".join(out), encoding="utf-8")
print("built index.html", len(html), "bytes; captions:", len(list((root / "assets/captions").glob("*.vtt"))))
