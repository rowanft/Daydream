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
    "https://rowanft.github.io/Daydream/fence.html"
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
  if (group && group.length > 0) {
    const randomPage = group[Math.floor(Math.random() * group.length)];
    window.location.href = randomPage;
  }
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
