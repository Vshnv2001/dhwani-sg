// Generates congratulations slides for "Isai Tamizh • Irai Tamizh".
// Composes the real academy photos into a collage using sharp.
//
// Usage:  node scripts/make-collage.mjs
// Output: collage-slides/slide-1-title.png, collage-slides/slide-2-collage.png

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ASSETS = path.join(ROOT, "public/assets");
const OUT = path.join(ROOT, "collage-slides");

// 16:9 slide canvas (matches Google Slides / PowerPoint widescreen).
const W = 1920;
const H = 1080;

// Brand colours (from globals.css).
const NAVY = "#1a237e";
const NAVY_DARK = "#0d1642";
const CYAN = "#00bcd4";
const RED = "#e53935";

// Tamil text is shaped with a Tamil-capable font via Pango (sharp's text input).
const TAMIL_FONT = "/System/Library/Fonts/Supplemental/Tamil Sangam MN.ttc";
const TAMIL_FAMILY = "Tamil Sangam MN";

// Tamil copy for the slides (• and — are kept as literal characters).
const T = {
  event: "இசை தமிழ் • இறை தமிழ்",
  congrats: "வாழ்த்துக்கள்!",
  // Slide 2 ribbon line.
  collageCongrats: "த்வனி இசைக் கலைக்கூடத்தின் மாணவர்களுக்கு மனமார்ந்த வாழ்த்துக்கள்",
  // Slide 1 lines.
  presentedBy: "த்வனி இசைக் கலைக்கூடத்தின் மாணவர்கள் வழங்கும்",
  subtitle:
    "கர்நாடக இசையில் தமிழின் செழுமையைக் கொண்டாடும் ஓர் இசைப் பயணம் — பாரதி முரளி அவர்களின் அனைத்து மாணவர்களுக்கும் அன்புடனும் பெருமையுடனும்.",
  dateVenue: "1 நவம்பர் 2026 • உட்லண்ட்ஸ் நூலக அரங்கம்",
};

// Files to leave out of the collage (logos, posters, deity art, screenshots).
const EXCLUDE = new Set([
  "2D Logo without name.png.png",
  "dhwani_logo.png",
  "dhwani_logo_original.png",
  "dhwani_show.png",
  "dhwani_workshop_poster.jpg",
  "Kamakshi Amman.jpg",
  "kamakshi_amman.jpg",
  "judging_purandara_dasa.png",
]);

// Individual / solo pictures (portraits, solo performances, single-student
// award shots, non-people images). The collage uses GROUP photos only.
const INDIVIDUAL = new Set([
  "2026_singai_vaibhav.jpg",
  "2026_singai_yadhana_2nd.jpg",
  "aarathi_1.jpeg",
  "bm_students_performances_1.jpg", // temple deity statue
  "bm_violin_1.jpg",
  "mrinalini_ramkumar_1stprize_juniorsolo.jpg",
  "papanasamsivan_1stprize_senior_solo.jpg",
  "papanasamsivan_2ndprizejuniorsolo_aparajith.jpg",
  "papanasamsivan_ananya_juniorsolo2nd.jpg",
  "papanasamsivan_anu_1stprize.jpg",
  "papanasamsivan_manasa_sivakumar_subsenior2_2ndprize.jpg",
  "papanasamsivan_sravya_1stsubseniorsolo.jpg",
  "praharshita_vocal_subsenior_first.jpg",
  "sahanamanoj_1stjuniorgroup_papanasam.jpg",
  "sioc_trainer_1.jpg",
  "soundarya_1.jpeg",
  "sravani_1.jpg",
  "anu.png",
  "gayathri_karthik.png",
  "radhika_aunty.png",
  "shanthi_aunty.png",
  "smitha_aunty.png",
  "sowmya_aunty.png",
  "sundari_aunty.png",
  "vaibhav_kannadasan.png",
  "aparajith_avvayar_vizha.png",
  "mrinalini_classical_bhakti_idol.png",
  "aarathi_1st_seniorvocal.png",
  "rijupt_papanasam_sivan.png",
]);

function collectImages(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...collectImages(full));
      continue;
    }
    if (!/\.(jpe?g|png)$/i.test(entry.name)) continue;
    if (EXCLUDE.has(entry.name) || INDIVIDUAL.has(entry.name)) continue;
    if (/logo/i.test(entry.name)) continue;
    out.push(full);
  }
  return out;
}

// Deterministic shuffle so the collage mixes categories but is stable.
function shuffle(arr, seed = 7) {
  const a = [...arr];
  let s = seed;
  const rand = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function esc(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Render a line/paragraph of Tamil text to an RGBA PNG buffer via Pango.
// `size` is the point size; `width` (optional) wraps long paragraphs.
async function renderText(
  text,
  { size, color, bold = false, italic = false, width, dpi = 150 },
) {
  const span =
    `<span font="${TAMIL_FAMILY} ${size}" foreground="${color}"` +
    `${bold ? ' weight="bold"' : ""}${italic ? ' style="italic"' : ""}>` +
    `${esc(text)}</span>`;
  const opts = { text: span, fontfile: TAMIL_FONT, rgba: true, dpi, align: "center" };
  if (width) opts.width = width;
  const buf = await sharp({ text: opts }).png().toBuffer();
  const meta = await sharp(buf).metadata();
  return { buf, w: meta.width, h: meta.height };
}

// Composite a rendered text block horizontally centered at vertical `top`.
function placeCentered({ buf, w }, top) {
  return { input: buf, left: Math.round((W - w) / 2), top: Math.round(top) };
}

// Build a gap-separated mosaic that fills W x areaH (defaults to full canvas).
// The final (partial) row is centered so there are no trailing holes.
async function buildMosaic(files, { cols, gap, background, areaH = H }) {
  const rows = Math.ceil(files.length / cols);
  const tileW = Math.floor((W - gap * (cols + 1)) / cols);
  const tileH = Math.floor((areaH - gap * (rows + 1)) / rows);

  const composites = [];
  for (let i = 0; i < files.length; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const itemsInRow = Math.min(cols, files.length - row * cols);
    const rowWidth = itemsInRow * tileW + (itemsInRow - 1) * gap;
    const rowLeft = Math.round((W - rowWidth) / 2); // center every row
    const left = rowLeft + col * (tileW + gap);
    const top = gap + row * (tileH + gap);
    try {
      const buf = await sharp(files[i])
        .rotate() // respect EXIF orientation
        .resize(tileW, tileH, { fit: "cover", position: "attention" })
        .toBuffer();
      composites.push({ input: buf, left, top });
    } catch (err) {
      console.warn(`skipping ${path.basename(files[i])}: ${err.message}`);
    }
  }

  return sharp({
    create: { width: W, height: H, channels: 3, background },
  })
    .composite(composites)
    .png();
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  // Only rebuild slide 2 when invoked as `node scripts/make-collage.mjs 2`.
  const only = process.argv[2];
  const files = shuffle(collectImages(ASSETS));
  console.log(`Using ${files.length} group photos.`);

  // ---- Slide 2: group-photo collage ----
  // Reserve a solid title band at the bottom so no photo is hidden behind it.
  const bandH = 168;
  const cols = 8;
  const mosaic = await buildMosaic(files, {
    cols,
    gap: 8,
    background: NAVY_DARK,
    areaH: H - bandH,
  });
  const mosaicBuf = await mosaic.toBuffer();

  const bandTop = H - bandH;
  const band = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="${bandTop}" width="${W}" height="${bandH}" fill="${NAVY_DARK}"/>
      <rect x="0" y="${bandTop}" width="${W}" height="4" fill="${CYAN}"/>
      <circle cx="${W / 2}" cy="${bandTop}" r="9" fill="${RED}"/>
    </svg>`);

  const s2Title = await renderText(T.event, { size: 30, color: "#ffffff", bold: true });
  const s2Sub = await renderText(T.collageCongrats, { size: 15, color: CYAN });

  await sharp(mosaicBuf)
    .composite([
      { input: band, left: 0, top: 0 },
      placeCentered(s2Title, bandTop + 26),
      placeCentered(s2Sub, bandTop + 104),
    ])
    .png()
    .toFile(path.join(OUT, "slide-2-collage.png"));
  console.log("Wrote slide-2-collage.png");

  if (only === "2") {
    console.log(`\nDone (slide 2 only). Slides are in: ${OUT}`);
    return;
  }

  // ---- Slide 1: congratulations title slide ----
  // Faint collage background + deep navy wash + centered text.
  const faint = await sharp(mosaicBuf)
    .composite([
      {
        input: Buffer.from(
          `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
             <rect width="${W}" height="${H}" fill="${NAVY_DARK}" opacity="0.82"/>
           </svg>`,
        ),
        left: 0,
        top: 0,
      },
    ])
    .toBuffer();

  const cx = W / 2;
  const divider = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <line x1="${cx - 230}" y1="470" x2="${cx - 30}" y2="470" stroke="${CYAN}" stroke-width="2"/>
      <circle cx="${cx}" cy="470" r="7" fill="${RED}"/>
      <line x1="${cx + 30}" y1="470" x2="${cx + 230}" y2="470" stroke="${CYAN}" stroke-width="2"/>
    </svg>`);

  const s1Present = await renderText(T.presentedBy, { size: 17, color: CYAN });
  const s1Congrats = await renderText(T.congrats, { size: 54, color: "#ffffff", bold: true });
  const s1Event = await renderText(T.event, { size: 40, color: CYAN, bold: true });
  const s1Sub = await renderText(T.subtitle, {
    size: 16,
    color: "#e8eaf6",
    italic: true,
    width: 1480,
  });
  const s1Date = await renderText(T.dateVenue, { size: 18, color: "#ffffff" });

  await sharp(faint)
    .composite([
      placeCentered(s1Present, 215),
      placeCentered(s1Congrats, 285),
      { input: divider, left: 0, top: 0 },
      placeCentered(s1Event, 505),
      placeCentered(s1Sub, 650),
      placeCentered(s1Date, 820),
    ])
    .png()
    .toFile(path.join(OUT, "slide-1-title.png"));
  console.log("Wrote slide-1-title.png");

  console.log(`\nDone. Slides are in: ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
