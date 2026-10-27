# TIMETRAVEL: Interactive Choose-Your-Own-Adventure Poetry Book
### Publication Package & Print-on-Demand Production Dossier
**Author**: Icy Sheets  
**Publisher**: Requiem Spire Press (Salem, Oregon)  
**Publication Date**: October 2026  
**Format**: Physical Trade Paperback ($6.0" \times 9.0"$) & Interactive Digital Gamebook  

---

## 📦 Master Production Deliverables

| Deliverable | File Path | Format / Size | Description |
| :--- | :--- | :--- | :--- |
| **Interior Book Proof** | [`timetravel_interior_proof.pdf`](file:///C:/Users/icyne/projects/timetravel/book/timetravel_interior_proof.pdf) | PDF • 183 pages • 34.6 MB | 6" × 9" Trade Paperback Interior, 100 sections, 32 archival plates, front/back matter |
| **Full Cover Wrap** | [`timetravel_cover_spread.pdf`](file:///C:/Users/icyne/projects/timetravel/book/timetravel_cover_spread.pdf) | PDF • 12.67" × 9.25" • 2.9 MB | Print-ready Front, Spine (0.414"), and Back Cover spread with 0.125" bleed |
| **Book Engine Source** | [`compile_gamebook.mjs`](file:///C:/Users/icyne/projects/timetravel/compile_gamebook.mjs) | Node.js (ESM) | Deterministic section shuffler, graph weaver, and HTML generator |
| **Cover Engine Source** | [`compile_cover.mjs`](file:///C:/Users/icyne/projects/timetravel/compile_cover.mjs) | Node.js (ESM) | Mathematical cover spread compiler based on exact page-count spine width |
| **Archival Plates** | [`assets/images/`](file:///C:/Users/icyne/projects/timetravel/assets/images/) | 32 JPG images (~109 MB) | High-res notebook scans, paintings, and drawings from 2014–2022 archive |
| **Interior Web Preview**| [`timetravel_interior.html`](file:///C:/Users/icyne/projects/timetravel/book/timetravel_interior.html) | HTML5 / CSS Paged Media | Responsive digital preview and print layout source |

---

## 🖨️ Print-on-Demand Specifications (IngramSpark & Amazon KDP)

### 1. Interior Sizing
- **Trim Size**: $6.0" \times 9.0"$ ($152.4\text{ mm} \times 228.6\text{ mm}$)
- **Page Count**: 183 pages (Rounds to 184 pages / 46 signatures for commercial press)
- **Paper Stock**: 50# White Paper (Standard trade paper)
- **Interior Color**: Black & White / Grayscale (32 archival photographic plates formatted with $115\%$ contrast monochrome curves)
- **Binding**: Perfect Bound Paperback (Matte or Gloss laminated cover)

### 2. Spine & Bleed Math
- **Spine Width**:
  $$\text{Spine} = 184 \times 0.002252" = 0.4144" \approx 0.414"$$
- **Cover Spread Dimensions**:
  $$\text{Width} = 0.125" \text{ (bleed)} + 6.0" \text{ (back)} + 0.414" \text{ (spine)} + 6.0" \text{ (front)} + 0.125" \text{ (bleed)} = 12.664"$$
  $$\text{Height} = 0.125" \text{ (bleed)} + 9.0" \text{ (trim)} + 0.125" \text{ (bleed)} = 9.250"$$

---

## 🧭 Narrative Topology & Gamebook Statistics

- **Total Passages**: 100
- **Total Sections**: 100 (Numbered $\S 1 \dots \S 100$, with Section 1 fixed as *Intro*)
- **Total Directional Branch Links**: 137
- **Reachable from Section 1**: **100% (100 / 100 nodes)** — *Zero unreachable islands, zero dead-end traps*
- **Terminal Endings**: 4 Canonical Resting Points:
  1. **Section 47 (*morning*)**: *[ENDING: SUNRISE SURVIVAL]* — Celebrating making it through another day.
  2. **Section 66 (*the ending*)**: *[ENDING: THE FINAL THRESHOLD]* — Where the road bends and stillness is reclaimed.
  3. **Section 83 (*thank you*)**: *[ENDING: GRACE IN THE CHAOS]* — Dark comedic gratitude in the hospital cafeteria.
  4. **Section 79 (*Scrapbook*)**: *[ENDING: ARCHIVE COMPLETE]* — Archival photography and memory gallery.
- **Transcendent Loop**: **Section 20 (*rebirth*)**: Cycles back into Section 1 (*"or is it all just circles?"*).

---

## 🚀 1-Click Upload & Proofing Instructions

1. **Amazon KDP Paperback**:
   - Go to [kdp.amazon.com](https://kdp.amazon.com) $\rightarrow$ *Create* $\rightarrow$ *Paperback*.
   - Title: `Timetravel: An Interactive Choose-Your-Own-Adventure Poetry Book`
   - Author: `Icy Sheets`
   - Interior & Paper: `Black & white interior with white paper`, Trim size: `6 x 9 in`, Bleed: `No Bleed` for interior.
   - Upload Interior: Select [`timetravel_interior_proof.pdf`](file:///C:/Users/icyne/projects/timetravel/book/timetravel_interior_proof.pdf).
   - Upload Cover: Select *Upload a cover you already have (print-ready PDF)* $\rightarrow$ choose [`timetravel_cover_spread.pdf`](file:///C:/Users/icyne/projects/timetravel/book/timetravel_cover_spread.pdf).
   - Launch KDP Previewer to inspect margins and order an Author Proof copy!

2. **IngramSpark (Global Bookstore & Library Distribution)**:
   - Go to [ingramspark.com](https://www.ingramspark.com) $\rightarrow$ *Add Title* $\rightarrow$ *Print Only*.
   - Select Trim: $6 \times 9$ in, Binding: Perfect Bound, Paper: 50 lb White, Finish: Matte.
   - Upload interior PDF and full cover spread PDF.
