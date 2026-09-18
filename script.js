
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

const form = document.getElementById('demo-form');
const note = document.getElementById('form-note');
if (form && note) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nombre = (data.get('nombre') || '').toString().trim();
    const tipo = (data.get('tipo') || 'proyecto').toString().trim();
    const mensaje = (data.get('mensaje') || '').toString().trim();
    const texto = [
      'Hola RADMARTE, quisiera solicitar información.',
      `Nombre o empresa: ${nombre}`,
      `Tipo de proyecto: ${tipo}`,
      `Consulta: ${mensaje}`
    ].join('\n');
    const url = `https://wa.me/51971811833?text=${encodeURIComponent(texto)}`;
    note.textContent = 'Abriendo WhatsApp para enviar tu solicitud a RADMARTE…';
    note.style.color = '#1f252b';
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
