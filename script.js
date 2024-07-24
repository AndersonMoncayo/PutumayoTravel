document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', function () {
        navLinks.classList.toggle('nav-active');
    });
});

function exploreNow() {
    document.getElementById('hero-text').style.display = 'none';
}
