document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', function () {
        navLinks.classList.toggle('nav-active');
    });

    // Código para la funcionalidad de ampliación de imágenes en la sección "Tecnología"
    const zoomableImages = document.querySelectorAll('.card-container .card img');

    zoomableImages.forEach(img => {
        img.addEventListener('click', () => {
            img.classList.add('zoomed');
        });

        img.addEventListener('mouseleave', () => {
            img.classList.remove('zoomed');
        });
    });
});

function exploreNow() {
    document.getElementById('hero-text').style.display = 'none';
}
