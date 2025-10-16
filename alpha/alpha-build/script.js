const thumbs = document.querySelectorAll('.thumb');
const rail = document.querySelector('.thumb-rail');

thumbs.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.thumb.active')?.classList.remove('active');
    btn.classList.add('active');
    btn.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  });
});