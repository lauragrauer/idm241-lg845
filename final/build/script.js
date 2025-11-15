/* ===============================
   LIGHTBOX GALLERY SCRIPT
=================================*/

// Element refs
const thumbs = document.querySelectorAll(".thumbs img");
const mainImage = document.querySelector("#mainImage img");
const overlay = document.querySelector("#overlay");
const overlayImg = document.querySelector("#overlayImg");
const closeBtn = document.querySelector("#closeBtn");
const leftArrow = document.querySelector("#leftArrow");
const rightArrow = document.querySelector("#rightArrow");
const dots = document.querySelectorAll(".dot");

const thumbLeft = document.getElementById("thumbLeft");
const thumbRight = document.getElementById("thumbRight");

let current = 0;

/* ===============================
   MAIN IMAGE — POINTER CURSOR
=================================*/
mainImage.style.cursor = "pointer";

/* ===============================
   THUMBNAIL CLICK
=================================*/
thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    updateActiveState(index);
    current = index;

    mainImage.classList.add("fade-out");
    setTimeout(() => {
      mainImage.src = thumb.src;
      mainImage.classList.remove("fade-out");
      mainImage.classList.add("fade-in");
    }, 200);
    setTimeout(() => mainImage.classList.remove("fade-in"), 500);
  });
});

/* ===============================
   MAIN IMAGE CLICK (Open Lightbox)
=================================*/
mainImage.addEventListener("click", () => {

  // Click bounce only (no hover animations)
  mainImage.classList.add("clicked");
  setTimeout(() => mainImage.classList.remove("clicked"), 550);

  overlay.classList.add("active");
  overlayImg.src = thumbs[current].src;

  overlayImg.classList.add("fade-in");
  setTimeout(() => overlayImg.classList.remove("fade-in"), 400);

  syncDotsToCurrent();
});

/* ===============================
   CLOSE LIGHTBOX
=================================*/
function closeOverlay() {
  closeBtn.classList.add("clicked");

  setTimeout(() => overlay.classList.add("fade-out"), 500);

  setTimeout(() => {
    overlay.classList.remove("active", "fade-out");
    closeBtn.classList.remove("clicked");

    mainImage.classList.add("fade-out");
    setTimeout(() => {
      mainImage.src = thumbs[current].src;
      mainImage.classList.remove("fade-out");
      mainImage.classList.add("fade-in");
      setTimeout(() => mainImage.classList.remove("fade-in"), 400);
    }, 200);

  }, 1000);
}

closeBtn.addEventListener("click", closeOverlay);

// ESC key closes overlay
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("active")) {
    closeOverlay();
  }
});

/* ===============================
   PAW ARROW NAVIGATION
=================================*/
rightArrow.addEventListener("click", (e) => {
  e.stopPropagation();
  rightArrow.classList.add("clicked");
  setTimeout(() => rightArrow.classList.remove("clicked"), 600);

  current = (current + 1) % thumbs.length;
  changeImage();
});

leftArrow.addEventListener("click", (e) => {
  e.stopPropagation();
  leftArrow.classList.add("clicked");
  setTimeout(() => leftArrow.classList.remove("clicked"), 600);

  current = (current - 1 + thumbs.length) % thumbs.length;
  changeImage();
});

/* ===============================
   UPDATE LIGHTBOX IMAGE
=================================*/
function changeImage() {
  overlayImg.classList.add("fade-out");

  setTimeout(() => {
    overlayImg.src = thumbs[current].src;

    updateActiveState(current);

    overlayImg.classList.remove("fade-out");
    overlayImg.classList.add("fade-in");

    setTimeout(() => overlayImg.classList.remove("fade-in"), 400);
  }, 200);
}

/* ===============================
   UPDATE ACTIVE THUMB + DOT
=================================*/
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

/* ===============================
   THUMBNAIL SCROLL ARROWS
=================================*/
thumbRight.addEventListener("click", () => {
  current = (current + 1) % thumbs.length;
  updateThumbnailFromArrows();
});

thumbLeft.addEventListener("click", () => {
  current = (current - 1 + thumbs.length) % thumbs.length;
  updateThumbnailFromArrows();
});

function updateThumbnailFromArrows() {
  mainImage.classList.add("fade-out");

  setTimeout(() => {
    mainImage.src = thumbs[current].src;
    mainImage.classList.remove("fade-out");
    mainImage.classList.add("fade-in");
  }, 200);

  setTimeout(() => mainImage.classList.remove("fade-in"), 500);

  updateActiveState(current);

  if (overlay.classList.contains("active")) {
    changeImage();
  }
}

mainImage.classList.add("fade-out");
setTimeout(() => {
  mainImage.src = thumbs[current].src;
  mainImage.classList.remove("fade-out");
  mainImage.classList.add("fade-in");
  setTimeout(() => mainImage.classList.remove("fade-in"), 400);
}, 200);
