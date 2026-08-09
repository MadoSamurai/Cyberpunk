document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const header = document.querySelector('.header');

  // Условие выполнится, только если мы НЕ на главной и хедер точно найден в HTML
  if (!currentPath.includes('index.html') && currentPath !== '/' && header) {
    header.style.position = 'static';
  }
});