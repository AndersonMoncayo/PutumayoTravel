window.addEventListener('scroll', function() {
    const logoContainer = document.querySelector('.logo-container');
    if (window.scrollY > 50) {
        logoContainer.classList.add('scrolled');
    } else {
        logoContainer.classList.remove('scrolled');
    }
});
