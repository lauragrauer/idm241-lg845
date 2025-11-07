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
    thumbs.forEach(t => t.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));
    thumb.classList.add("active");
    dots[index].classList.add("active");

    // Smooth fade transition for main image
    mainImage.classList.add("fade-out");
    setTimeout(() => {
      mainImage.src = thumb.src;
      mainImage.classList.remove("fade-out");
      mainImage.classList.add("fade-in");
    }, 200);
    setTimeout(() => mainImage.classList.remove("fade-in"), 500);

    current = index;
  });
});

/* -------------------------------
   MAIN IMAGE CLICK (OPEN OVERLAY)
--------------------------------*/
mainImage.addEventListener("click", () => {
  overlay.classList.add("active");
  overlayImg.src = thumbs[current].src;
});

/* -------------------------------
   CLOSE OVERLAY → reset to first image
--------------------------------*/
function closeOverlay() {
  closeBtn.classList.add("clicked");
  overlay.classList.add("fade-out");

  setTimeout(() => {
    overlay.classList.remove("active", "fade-out");
    overlayImg.classList.remove("zoom-out");
    closeBtn.classList.remove("clicked");

    // Reset to first image
    current = 0;
    mainImage.src = thumbs[0].src;

    thumbs.forEach(t => t.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));
    thumbs[0].classList.add("active");
    dots[0].classList.add("active");
  }, 600);
}

closeBtn.addEventListener("click", closeOverlay);
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && overlay.classList.contains("active")) closeOverlay();
});

/* -------------------------------
   ARROW NAVIGATION INSIDE OVERLAY
--------------------------------*/
function changeImage(step) {
  current += step;

  // ✅ LOOPING BEHAVIOR
  if (current < 0) current = thumbs.length - 1;
  if (current >= thumbs.length) current = 0;

  overlayImg.classList.add("fade-out");
  setTimeout(() => {
    overlayImg.src = thumbs[current].src;
    overlayImg.classList.remove("fade-out");
  }, 200);

  thumbs.forEach(t => t.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));
  thumbs[current].classList.add("active");
  dots[current].classList.add("active");
}

rightArrow.addEventListener("click", e => {
  e.stopPropagation();
  changeImage(1);
});

leftArrow.addEventListener("click", e => {
  e.stopPropagation();
  changeImage(-1);
});
