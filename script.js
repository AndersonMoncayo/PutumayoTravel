document.addEventListener("DOMContentLoaded", function() {
  const heroSection = document.querySelector('.hero_section');
  const cards = document.querySelectorAll('.card');

  // Función para manejar la animación en el scroll
  function animateOnScroll() {
      // Para la hero_section
      const heroRect = heroSection.getBoundingClientRect();
      if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
          heroSection.classList.add('animate');
      } else {
          heroSection.classList.remove('animate');
      }

      // Para las cards
      cards.forEach(card => {
          const rect = card.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
              card.classList.add('animate');
          } else {
              card.classList.remove('animate');
          }
      });
  }

  // Escuchar el evento de scroll
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Ejecutar al cargar la página para animar los elementos visibles
});

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: true
  },
  spaceBetween: 60,
  loop: true,
  pagination: {
      el: ".swiper-pagination",
      clickable: true
  }
});

// Vincular el evento click a todas las diapositivas del Swiper
document.querySelectorAll('.swiper-slide').forEach(function(slide) {
  slide.addEventListener('click', function() {
      var url = slide.getAttribute('data-url');
      if (url) {
          window.location.href = url;
      }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const title = document.querySelector('.swiper-section > h2');

  function checkVisibility() {
      const rect = title.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
          title.classList.add('animate');
      } else {
          title.classList.remove('animate'); // Elimina la clase para que se pueda reiniciar
      }
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility(); // Ejecutar al cargar la página por primera vez
});
