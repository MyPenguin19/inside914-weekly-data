# Home Risk Report

### How the Weekly System Works (Do Not Modify Without Reading)

## What This Is

The **Home Risk Report** is a weekly, season-aware homeowner intelligence card.
It highlights real, recurring home risks seen in Westchester homes — before they become expensive.

This is **not** a blog, newsletter, or marketing post.
It is a **risk signal**, designed to be calm, credible, and timely.

---

## Source of Truth (Critical)

**GitHub is the brain. WordPress is a dumb renderer.**

All logic lives in GitHub.
WordPress only fetches and displays one file: `current.json`.

---

## Weekly Automation (Push Model)

Every week, GitHub automatically:

1. **Detects the current season**

   * Spring / Summer / Fall / Winter (date-based)

2. **Enforces content cadence**

   * 3 weeks → `$5,000 Homeowner Mistake`
   * 1 week → `What Pros Are Seeing`
   * Exact 3:1 ratio, enforced automatically

3. **Prevents repetition**

   * Tracks all previously published files in `used.json`
   * A file is never reused, ever

4. **Publishes one file**

   * Writes the selected entry to `current.json`
   * This is the only file the website reads

5. **Fails safely**

   * If anything breaks, nothing updates
   * The site continues showing the last valid report

---

## Repository Structure

```
weekly-data/
├── spring/
├── summer/
├── fall/
├── winter/
├── used.json        ← automatic history (do not edit)
└── current.json     ← live weekly report
```

Each seasonal folder contains 13 prewritten entries:

* ~75% `type: risk`
* ~25% `type: pros`

---

## WordPress Responsibilities (Intentionally Minimal)

WordPress does **not**:

* Pick seasons
* Rotate content
* Track weeks
* Enforce cadence
* Prevent repeats

WordPress only:

* Fetches `current.json`
* Renders the card
* Optionally replaces `{season}` in copy
* Displays nothing if the fetch fails

---

## What Not to Touch (Very Important)

Do **not**:

* Manually edit `current.json`
* Reset or edit `used.json`
* Rename JSON files mid-year
* Add seasonal or cadence logic to WordPress
* “Optimize” the GitHub script unless you fully understand it

Doing any of the above breaks the guarantees.

---

## Why This System Exists

This design ensures:

* Seasonal accuracy
* Non-repetitive content
* Predictable cadence
* Zero weekly effort
* High homeowner trust
* No mental overhead

If the system feels boring, that’s intentional.
Boring systems are reliable systems.

---

## In One Sentence

**GitHub decides what shows up. WordPress just shows it.**

If that changes, this document must be updated.
