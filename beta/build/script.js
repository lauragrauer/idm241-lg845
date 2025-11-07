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

    mainImage.classList.add("fade-out");
    setTimeout(() => {
      mainImage.src = thumb.src;
      mainImage.classList.remove("fade-out");
      mainImage.classList.add("fade-in");
    }, 200);

    setTimeout(() => mainImage.classList.remove("fade-in"), 500);

    dots[index].classList.add("active");
    current = index;
  });
});

/* -------------------------------
   MAIN IMAGE HOVER & CLICK
--------------------------------*/
mainImage.addEventListener("mouseenter", () => {
  mainImage.style.cursor = "pointer";
});

mainImage.addEventListener("click", () => {
  overlay.classList.add("active");
  overlayImg.src = mainImage.src;
});

/* -------------------------------
   CLOSE OVERLAY
--------------------------------*/
function closeOverlay() {
  closeBtn.classList.add("clicked");
  overlayImg.classList.add("zoom-out");

  setTimeout(() => {
    overlay.classList.remove("active");
    overlayImg.classList.remove("zoom-out");
    closeBtn.classList.remove("clicked");
  }, 600);
}

closeBtn.addEventListener("click", closeOverlay);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeOverlay();
});

/* -------------------------------
   ARROW NAVIGATION
--------------------------------*/
rightArrow.addEventListener("click", (e) => {
  e.stopPropagation();
  if (current < thumbs.length - 1) {
    rightArrow.classList.add("clicked");
    current++;
    changeImage();
    setTimeout(() => rightArrow.classList.remove("clicked"), 600);
  }
});

leftArrow.addEventListener("click", (e) => {
  e.stopPropagation();
  if (current > 0) {
    leftArrow.classList.add("clicked");
    current--;
    changeImage();
    setTimeout(() => leftArrow.classList.remove("clicked"), 600);
  }
});

/* -------------------------------
   UPDATE IMAGE FUNCTION
--------------------------------*/
function changeImage() {
  overlayImg.classList.add("fade-out");
  setTimeout(() => {
    overlayImg.src = thumbs[current].src;
    thumbs.forEach(t => t.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));
    thumbs[current].classList.add("active");
    dots[current].classList.add("active");
    overlayImg.classList.remove("fade-out");
    overlayImg.classList.add("fade-in");
  }, 200);

  setTimeout(() => overlayImg.classList.remove("fade-in"), 500);
}
