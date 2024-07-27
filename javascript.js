window.addEventListener('scroll', function() {
    const logo = document.querySelector('.logo');
    if (window.scrollY > 50) {
        logo.classList.add('scrolled');
    } else {
        logo.classList.remove('scrolled');
    }
});
