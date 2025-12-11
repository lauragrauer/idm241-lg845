/* ===============================
   LIGHTBOX GALLERY SCRIPT
=================================*/

// selects all thumbnail images in the .thumbs container
const thumbs = document.querySelectorAll(".thumbs img");

// selects the large main display image
const mainImage = document.querySelector("#mainImage img");

// selects the popup overlay background
const overlay = document.querySelector("#overlay");

// selects the image inside the overlay popup
const overlayImg = document.querySelector("#overlayImg");

// selects the close X button in the overlay
const closeBtn = document.querySelector("#closeBtn");

// selects the right paw button
const rightArrow = document.querySelector("#rightArrow");

// selects the left paw button
const leftArrow = document.querySelector("#leftArrow");

// selects all the bottom navigation dots
const dots = document.querySelectorAll(".dot");

// selects the small arrow to scroll thumbnails down or right
const thumbLeft = document.getElementById("thumbLeft");

// selects the small arrow to scroll thumbnails up or left
const thumbRight = document.getElementById("thumbRight");

// stores the index of the currently selected image
let current = 0;


/* ===============================
   MAIN IMAGE — POINTER CURSOR
=================================*/

// visually shows user the image is clickable
mainImage.style.cursor = "pointer";


/* ===============================
   THUMBNAIL CLICK
=================================*/
thumbs.forEach((thumb, index) => {
  // add click behavior to each thumbnail
  thumb.addEventListener("click", () => {

    // highlight selected thumbnail & matching dot
    updateActiveState(index);

    // update which image index we are on
    current = index;

    // make sure we're not mid fade-in
    mainImage.classList.remove("fade-in");

    // start fade-out animation for main image
    mainImage.classList.add("fade-out");

    // wait so fade-out animation is noticeable, then swap image
    setTimeout(() => {

      // replace the main image source with clicked thumbnail source
      mainImage.src = thumb.src;

      // switch to fade-in
      mainImage.classList.remove("fade-out");
      mainImage.classList.add("fade-in");

      // remove fade-in class after animation ends
      setTimeout(() => {
        mainImage.classList.remove("fade-in");
      }, 950); // a bit longer than 0.9s transition

    }, 200);
  });
});


/* ===============================
   MAIN IMAGE CLICK (Open Lightbox)
=================================*/
mainImage.addEventListener("click", () => {

  // adds bounce animation on click
  mainImage.classList.add("clicked");

  // remove bounce class after animation finishes
  setTimeout(() => mainImage.classList.remove("clicked"), 550);

  // show overlay popup
  overlay.classList.add("active");

  // show currently selected image in lightbox
  overlayImg.src = thumbs[current].src;

  // fade in the lightbox image
  overlayImg.classList.remove("fade-out");
  overlayImg.classList.add("fade-in");

  // stop fade after it finishes
  setTimeout(() => overlayImg.classList.remove("fade-in"), 950);

  // make correct navigation dot active
  syncDotsToCurrent();
});


/* ===============================
   CLOSE LIGHTBOX
=================================*/
function closeOverlay() {

  // animate X button (bounce)
  closeBtn.classList.add("clicked");

  // fade popup out, allow time for X bounce
  setTimeout(() => overlay.classList.add("fade-out"), 500);

  // after fade completes, remove overlay from screen
  setTimeout(() => {

    // stop showing overlay
    overlay.classList.remove("active", "fade-out");

    // stop bounce animation on X
    closeBtn.classList.remove("clicked");

    // fade-out main image so transition looks smooth returning
    mainImage.classList.remove("fade-in");
    mainImage.classList.add("fade-out");

    // wait for fade-out to start
    setTimeout(() => {

      // update the main image with selected thumbnail
      mainImage.src = thumbs[current].src;

      // fade-in to give smooth UI return
      mainImage.classList.remove("fade-out");
      mainImage.classList.add("fade-in");

      // remove fade-in class after animation runs
      setTimeout(() => mainImage.classList.remove("fade-in"), 950);

    }, 200);

  }, 1000);
}

// clicking X closes overlay
closeBtn.addEventListener("click", closeOverlay);


// pressing ESC closes overlay
document.addEventListener("keydown", (e) => {
  // only close if overlay is visible
  if (e.key === "Escape" && overlay.classList.contains("active")) {
    closeOverlay();
  }
});


/* ===============================
   PAW ARROW NAVIGATION
=================================*/
rightArrow.addEventListener("click", (e) => {

  // prevent clicking background accidentally
  e.stopPropagation();

  // bounce arrow animation
  rightArrow.classList.add("clicked");
  setTimeout(() => rightArrow.classList.remove("clicked"), 600);

  // advance current index to next image
  current = (current + 1) % thumbs.length;

  // load image in overlay & sync main image if needed
  changeImage();
});


leftArrow.addEventListener("click", (e) => {

  // prevent click bubbling
  e.stopPropagation();

  // bounce animation
  leftArrow.classList.add("clicked");
  setTimeout(() => leftArrow.classList.remove("clicked"), 600);

  // move current index backwards circularly
  current = (current - 1 + thumbs.length) % thumbs.length;

  // update displayed image
  changeImage();
});


/* ===============================
   UPDATE LIGHTBOX IMAGE
=================================*/
function changeImage() {

  // fade out image currently shown in overlay
  overlayImg.classList.remove("fade-in");
  overlayImg.classList.add("fade-out");

  // wait so animation shows
  setTimeout(() => {

    // replace with new image
    overlayImg.src = thumbs[current].src;

    // update selected thumbnail & dot
    updateActiveState(current);

    // fade new image in
    overlayImg.classList.remove("fade-out");
    overlayImg.classList.add("fade-in");

    // remove fade-in after animation ends
    setTimeout(() => overlayImg.classList.remove("fade-in"), 950);

  }, 200);
}


/* ===============================
   UPDATE ACTIVE THUMB + DOT
=================================*/
function updateActiveState(index) {

  // remove active styling on all thumbnails
  thumbs.forEach(t => t.classList.remove("active"));

  // remove active styling on all dots
  dots.forEach(d => d.classList.remove("active"));

  // highlight only matching thumbnail
  thumbs[index].classList.add("active");

  // highlight matching dot
  dots[index].classList.add("active");
}


// keeps dots synced when coming from main image or lightbox
function syncDotsToCurrent() {
  dots.forEach(d => d.classList.remove("active"));
  dots[current].classList.add("active");
}


/* ===============================
   THUMBNAIL SCROLL ARROWS
=================================*/
thumbRight.addEventListener("click", () => {

  // go forward
  current = (current + 1) % thumbs.length;

  updateThumbnailFromArrows();
});


thumbLeft.addEventListener("click", () => {

  // go backwards
  current = (current - 1 + thumbs.length) % thumbs.length;

  updateThumbnailFromArrows();
});


function updateThumbnailFromArrows() {

  // fade out main displayed image
  mainImage.classList.remove("fade-in");
  mainImage.classList.add("fade-out");

  setTimeout(() => {

    // update it to match current index
    mainImage.src = thumbs[current].src;

    // fade it back in
    mainImage.classList.remove("fade-out");
    mainImage.classList.add("fade-in");

    setTimeout(() => mainImage.classList.remove("fade-in"), 950);

  }, 200);

  // visually mark correct thumbnail & dot
  updateActiveState(current);

  // If overlay is open, update that image too
  if (overlay.classList.contains("active")) {
    changeImage();
  }
}


/* ===============================
   INITIAL MAIN IMAGE FADE-IN
=================================*/

// start hidden then fade in first image
mainImage.classList.add("fade-out");

setTimeout(() => {

  mainImage.src = thumbs[current].src;

  mainImage.classList.remove("fade-out");
  mainImage.classList.add("fade-in");

  setTimeout(() => mainImage.classList.remove("fade-in"), 950);

}, 200);
