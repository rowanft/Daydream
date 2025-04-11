/********************************************
 * hotspots.js
 *
 * Shared code for:
 *  - Linking to random pages by tag
 *  - Scaling and positioning hotspots
 ********************************************/

/* 1) Define random page links by tag */
const pages = {
  hand: [
    "hand1.html",
    "hand2.html"
  ],
  animal: [
    "animal1.html",
    "animal2.html"
  ],
  // Add more tags: face, tree, person, mystery, etc.
};

/* 2) goToRandom(tag): pick a random page from `pages[tag]` */
function goToRandom(tag) {
  const group = pages[tag];
  if (group && group.length > 0) {
    const randomPage = group[Math.floor(Math.random() * group.length)];
    window.location.href = randomPage;
  }
}

/* 3) setupHotspots(options):
 *    - { originalWidth, originalHeight, imageId, hotspotSelector }
 *
 *    Reads data-x1,y1,x2,y2 from each hotspot,
 *    waits for image to load, calculates scale, positions hotspots.
 */
/********************************************
