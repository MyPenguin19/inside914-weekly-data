const fs = require("fs");
const path = require("path");

/* =========================
   SEASON DETECTION
========================= */
function currentSeason() {
  const m = new Date().getMonth() + 1;
  if (m >= 3 && m <= 5) return "spring";
  if (m >= 6 && m <= 8) return "summer";
  if (m >= 9 && m <= 11) return "fall";
  return "winter";
}

/* =========================
   3:1 CADENCE (EVERY 4TH WEEK = PROS)
========================= */
function isProsWeek() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const week =
    Math.floor(((now - start) / 86400000 + start.getDay()) / 7) + 1;
  return week % 4 === 0;
}

/* =========================
   LOAD USED FILES
========================= */
const usedPath = "used.json";
let used = fs.existsSync(usedPath)
  ? JSON.parse(fs.readFileSync(usedPath))
  : [];

/* =========================
   LOAD SEASON FILES
========================= */
const season = currentSeason();
const wantPros = isProsWeek();
const seasonDir = path.join(__dirname, "..", "..", season);

const files = fs.readdirSync(seasonDir).filter(f => f.endsWith(".json"));

/* =========================
   FILTER UNUSED + TYPE
========================= */
const candidates = files.filter(file => {
  const fullPath = path.join(seasonDir, file);
  const data = JSON.parse(fs.readFileSync(fullPath));
  const key = `${season}/${file}`;

  if (used.includes(key)) return false;
  if (wantPros && data.type !== "pros") return false;
  if (!wantPros && data.type !== "risk") return false;

  return true;
});

if (candidates.length === 0) {
  console.error("No unused files available for this season/type");
  process.exit(1);
}

/* =========================
   SELECT NEXT FILE (DETERMINISTIC)
========================= */
const selected = candidates.sort()[0];
const selectedPath = path.join(seasonDir, selected);
const content = JSON.parse(fs.readFileSync(selectedPath));

/* =========================
   WRITE current.json
========================= */
fs.writeFileSync(
  "current.json",
  JSON.stringify(content, null, 2)
);

/* =========================
   MARK AS USED
========================= */
used.push(`${season}/${selected}`);
fs.writeFileSync(usedPath, JSON.stringify(used, null, 2));

console.log(`Published ${season}/${selected}`);
