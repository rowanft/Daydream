// hotspots.js
// Shared code for random page tags & hotspot scaling

// 1) Define random page links by tag
const pages = {
    face: [
    "https://rowanft.github.io/Daydream/Will.html",
    "https://rowanft.github.io/Daydream/faces.html",
  ],
  tree: [
    "tree1.html",
    "tree2.html"
  ],
  person: [
    "personA.html",
    "personB.html"
  ],
  animal: [
    "https://rowanft.github.io/Daydream/",
    "https://rowanft.github.io/Daydream/fence.html",
    "https://rowanft.github.io/Daydream/dog.html"
  ],
  mystery: [
    "mystery1.html"
  ],
  building: [
    "building1.html"
  ],
  sky: [
    "sky1.html"
  ],
  mirror: [
    "mirror1.html"
  ],
  hand: [
    "https://rowanft.github.io/Daydream/Will.html",
    "https://rowanft.github.io/Daydream/"
  ]
};

// 2) goToRandom(tag): pick a random page from pages[tag]
function goToRandom(tag) {
  const group = pages[tag];
  if (!group || group.length === 0) return; // no pages at all

  // Get the current page filename, e.g. "Will.html"
  const currentPage = window.location.pathname.split("/").pop();

  // Filter out the current page
  const filtered = group.filter(page => {
    // We compare just the end of the URL – the filename.
    // E.g., if page is "https://rowanft.github.io/Daydream/Will.html"
    // and currentPage is "Will.html", we exclude it.
    return !page.endsWith(currentPage);
  });

  // If filtering removed everything, fallback to the original group
  const finalGroup = (filtered.length > 0) ? filtered : group;

  // Pick a random page from finalGroup
  const randomPage = finalGroup[Math.floor(Math.random() * finalGroup.length)];
  window.location.href = randomPage;
}

// 3) setupHotspots(options)
function setupHotspots({ originalWidth, originalHeight, imageId, hotspotSelector }) {
  const img = document.getElementById(imageId);

  // Our actual scaling function
  function doScale() {
    const actualWidth = img.clientWidth;
    const actualHeight = img.clientHeight;

    const scaleX = actualWidth / originalWidth;
    const scaleY = actualHeight / originalHeight;

    const hotspots = document.querySelectorAll(hotspotSelector);
    hotspots.forEach(hotspot => {
      const x1 = parseFloat(hotspot.dataset.x1);
      const y1 = parseFloat(hotspot.dataset.y1);
      const x2 = parseFloat(hotspot.dataset.x2);
      const y2 = parseFloat(hotspot.dataset.y2);

      hotspot.style.left = (x1 * scaleX) + "px";
      hotspot.style.top = (y1 * scaleY) + "px";
      hotspot.style.width = ((x2 - x1) * scaleX) + "px";
      hotspot.style.height = ((y2 - y1) * scaleY) + "px";
    });
  }

  // If the image is cached (already loaded), run immediately
  if (img.complete) {
    doScale();
  } else {
    // Otherwise, wait for 'load'
    img.addEventListener("load", doScale);
  }
}
