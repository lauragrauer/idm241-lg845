const thumbs = document.querySelectorAll(".thumbs img");
const mainImage = document.querySelector("#mainImage img");
const overlay = document.querySelector("#overlay");
const overlayImg = document.querySelector("#overlayImg");
const closeBtn = document.querySelector("#closeBtn");
const leftArrow = document.querySelector("#leftArrow");
const rightArrow = document.querySelector("#rightArrow");
const dots = document.querySelectorAll(".dot");

let current = 0;

// Thumbnail click
thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    thumbs.forEach(t => t.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));
    thumb.classList.add("active");
    mainImage.src = thumb.src;
    dots[index].classList.add("active");
    current = index;
  });
});

// Hover on main image
mainImage.addEventListener("mouseenter", () => {
  mainImage.style.cursor = "pointer";
});

// Open overlay
mainImage.addEventListener("click", () => {
  overlay.classList.add("active");
  overlayImg.src = mainImage.src;
  overlayImg.classList.remove("zoom-out");
});

// Close overlay
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

// Arrow click + bounce animation
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

// Change image function
function changeImage() {
  overlayImg.style.opacity = 0;
  setTimeout(() => {
    overlayImg.src = thumbs[current].src;
    thumbs.forEach(t => t.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));
    thumbs[current].classList.add("active");
    dots[current].classList.add("active");
    overlayImg.style.opacity = 1;
  }, 300);
}

