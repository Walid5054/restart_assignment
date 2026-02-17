
    const menuBtn = document.getElementById('menu-btn');
    const mobMenu = document.getElementById('mobile-menu');
    menuBtn.addEventListener('click', () => {
      mobMenu.classList.toggle('hidden');
    });
