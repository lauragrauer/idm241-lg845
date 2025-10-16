const thumbs = document.querySelectorAll('.thumb');
const rail = document.querySelector('.thumb-rail');

thumbs.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.thumb.active')?.classList.remove('active');
    btn.classList.add('active');

    const railRect = rail.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const offset = (btnRect.top + btnRect.height / 2) - (railRect.top + railRect.height / 2);
    const extraOffset = 55; // slightly past center
    const targetScroll = rail.scrollTop + offset + extraOffset;

    smoothScrollTo(rail, targetScroll, 400);
  });
});

function smoothScrollTo(element, target, duration) {
  const start = element.scrollTop;
  const distance = target - start;
  const startTime = performance.now();

  function easeInOutQuad(t) {
    return t < 0.5
      ? 2 * t * t
      : -1 + (4 - 2 * t) * t;
  }

  function animate(time) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutQuad(progress);
    element.scrollTop = start + distance * ease;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}