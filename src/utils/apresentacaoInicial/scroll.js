export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const headerH = document.querySelector('.site-header')?.offsetHeight || 0;
  const offsetTop = el.getBoundingClientRect().top + window.pageYOffset;
  const targetTop = Math.max(offsetTop - headerH - 8, 0);
  window.scrollTo({ top: targetTop, behavior: 'smooth' });
}