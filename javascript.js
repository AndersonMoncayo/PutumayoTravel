window.addEventListener('scroll', function() {
    const header = document.querySelector('.header-fixed');
    const logoContainer = document.querySelector('.logo-container');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        logoContainer.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
        logoContainer.classList.remove('scrolled');
    }
});
