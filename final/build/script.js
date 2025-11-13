/* ===============================
   LIGHTBOX GALLERY SCRIPT
   Handles thumbnails, overlay, and navigation
=================================*/

// Select elements
const thumbs = document.querySelectorAll(".thumbs img");
const mainImage = document.querySelector("#mainImage img");
const overlay = document.querySelector("#overlay");
const overlayImg = document.querySelector("#overlayImg");
const closeBtn = document.querySelector("#closeBtn");
const leftArrow = document.querySelector("#leftArrow");
const rightArrow = document.querySelector("#rightArrow");
const dots = document.querySelectorAll(".dot");

let current = 0;

/* -------------------------------
   THUMBNAIL INTERACTION
--------------------------------*/
thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {

    // Update active classes
    updateActiveState(index);

    // Smooth fade transition for main image
    mainImage.classList.add("fade-out");

    setTimeout(() => {
      mainImage.src = thumb.src;     // ⭐ MAIN FIX — thumbnail updates main image
      mainImage.classList.remove("fade-out");
      mainImage.classList.add("fade-in");
    }, 200);

    setTimeout(() => mainImage.classList.remove("fade-in"), 500);

    current = index;
  });
});

/* -------------------------------
   MAIN IMAGE HOVER & CLICK
--------------------------------*/
mainImage.addEventListener("mouseenter", () => {
  mainImage.style.cursor = "pointer";
});

// CLICK = OPEN LIGHTBOX + BOUNCE
mainImage.addEventListener("click", () => {
  mainImage.classList.add("clicked");   // BOUNCE ANIMATION
  setTimeout(() => mainImage.classList.remove("clicked"), 550);

  overlay.classList.add("active");
  overlayImg.src = thumbs[current].src;
  overlayImg.classList.remove("fade-out");
  overlayImg.classList.add("fade-in");
  syncDotsToCurrent();
});

/* -------------------------------
   CLOSE OVERLAY
--------------------------------*/
function closeOverlay() {
  closeBtn.classList.add("clicked");
  overlayImg.classList.add("zoom-out");

  // Wait for X bounce animation (~0.9s)
  setTimeout(() => overlay.classList.add("fade-out"), 500);

  // Fully close after fade-out
  setTimeout(() => {
    overlay.classList.remove("active", "fade-out");
    overlayImg.classList.remove("zoom-out");
    closeBtn.classList.remove("clicked");

    /* ⭐ Smooth main image fade when returning */
    mainImage.classList.add("fade-out");
    setTimeout(() => {
      mainImage.src = thumbs[current].src;   // Keep the main image synced
      mainImage.classList.remove("fade-out");
      mainImage.classList.add("fade-in");
      setTimeout(() => mainImage.classList.remove("fade-in"), 400);
    }, 200);

    updateActiveState(current);
  }, 1000);
}

closeBtn.addEventListener("click", closeOverlay);

// ESC close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("active")) {
    closeOverlay();
  }
});

/* -------------------------------
   ARROW NAVIGATION
--------------------------------*/
rightArrow.addEventListener("click", (e) => {
  e.stopPropagation();

  rightArrow.classList.add("clicked");   // BOUNCE
  setTimeout(() => rightArrow.classList.remove("clicked"), 600);

  current = (current + 1) % thumbs.length;
  changeImage();
});

leftArrow.addEventListener("click", (e) => {
  e.stopPropagation();

  leftArrow.classList.add("clicked");    // BOUNCE
  setTimeout(() => leftArrow.classList.remove("clicked"), 600);

  current = (current - 1 + thumbs.length) % thumbs.length;
  changeImage();
});

/* -------------------------------
   UPDATE IMAGE FUNCTION
--------------------------------*/
function changeImage() {
  overlayImg.classList.add("fade-out");
  setTimeout(() => {
    overlayImg.src = thumbs[current].src;
    updateActiveState(current);
    overlayImg.classList.remove("fade-out");
    overlayImg.classList.add("fade-in");
    setTimeout(() => overlayImg.classList.remove("fade-in"), 500);
  }, 200);
}

/* -------------------------------
   HELPERS
--------------------------------*/
function updateActiveState(index) {
  thumbs.forEach(t => t.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));

  thumbs[index].classList.add("active");
  dots[index].classList.add("active");
}

function syncDotsToCurrent() {
  dots.forEach(d => d.classList.remove("active"));
  dots[current].classList.add("active");
}
