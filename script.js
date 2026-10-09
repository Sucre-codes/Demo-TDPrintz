// Footer year
document.getElementById('yr').textContent = new Date().getFullYear();

// Hide broken images so the placeholder pattern shows until you add real pictures
document.querySelectorAll('.ph img').forEach(img => {
  img.addEventListener('error', () => { img.style.display = 'none'; });
});

// Mobile menu
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  }
});

// Testimonial slider
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dots button');
let current = 0, timer;
function show(i) {
  current = i;
  slides.forEach((s, n) => s.classList.toggle('on', n === i));
  dots.forEach((d, n) => d.classList.toggle('on', n === i));
}
function auto() {
  clearInterval(timer);
  timer = setInterval(() => show((current + 1) % slides.length), 6000);
}
dots.forEach((d, i) => d.addEventListener('click', () => { show(i); auto(); }));
auto();

// Count-up numbers when the stats scroll into view
const nums = document.querySelectorAll('[data-n]');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target, end = +el.dataset.n;
    io.unobserve(el);
    if (reduce) { el.textContent = end + '+'; return; }
    const start = performance.now();
    (function tick(t) {
      const p = Math.min((t - start) / 1400, 1);
      el.textContent = Math.round(end * p) + (p === 1 ? '+' : '');
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  });
}, { threshold: .6 });
nums.forEach(n => io.observe(n));

// Quote form (front-end only: connect to your backend or a form service later)
const form = document.getElementById('quote');
form.addEventListener('submit', e => {
  e.preventDefault();
  const note = form.querySelector('.note');
  if (!form.checkValidity()) {
    note.textContent = 'Please fill in your name, a valid email and your request.';
    return;
  }
  note.textContent = 'Thanks. We have received your request and will reply soon.';
  form.reset();
});
