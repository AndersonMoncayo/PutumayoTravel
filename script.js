@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700&display=swap&font-display=swap");
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;700&display=swap&font-display=swap");
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap&font-display=swap');

:root {
  --primary-color: #007BFF;
  --secondary-color: #0056b3;
  --bg-color: #f5f5f5;
  --text-color: #333;
  --font-family-main: 'Poppins', sans-serif; /* Fuente para el texto general */
  --font-family-secondary: 'Rubik', sans-serif; /* Fuente para los títulos */
  --title-color-main: #FFFFFF; /* Color principal de los títulos */
  --title-color-secondary: #000000; /* Color secundario de los títulos */
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html,
body {
    font-family: var(--font-family-main);
    font-size: 12px;
    background-color: var(--bg-color);
    color: var(--text-color);
    overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-family-secondary);
  font-weight: 700;
  text-transform: uppercase;
  color: var(--title-color-secondary); /* Color negro por defecto */
  line-height: 1.2; /* Mejora la legibilidad */
  margin-bottom: 0.5em;
}

h1 {
  font-size: 3em;
  margin-bottom: 0.5em;
  color: var(--title-color-main); /* H1 en blanco */
  line-height: 1.1; /* Mantén una ligera separación */
}

h2 {
  font-size: 2.5em; /* Incrementa un poco el tamaño para visibilidad */
  margin-bottom: 0.5em;
  color: var(--title-color-secondary); /* H2 en negro */
  line-height: 1.1;
}

/* Resto del texto */
p, a, button {
  font-family: var(--font-family-main);
  font-weight: 300; /* Texto delgado */
  font-size: 12px;
  line-height: 1.6; /* Mejorar legibilidad */
}

/* Ajustes específicos para h1 y h2 */
h1 {
  font-size: 22px; /* Tamaño reducido para mantener coherencia */
  font-weight: 700; /* Asegura que el texto sea lo suficientemente grueso */
  line-height: 1.2;
  margin-bottom: 0.5em; /* Añadir margen inferior */
}

a.cta-button {
  font-size: 1em; /* Tamaño de fuente ajustado */
  text-decoration: none;
  color: #ffffff; /* Letras blancas */
  background-color: #007BFF; /* Fondo azul */
  padding: 10px 20px;
  border-radius: 35px; /* Bordes redondeados */
  border: 2px solid #0056b3; /* Borde más oscuro */
  transition: background-color 0.3s ease, color 0.3s ease;
  display: inline-block;
  margin-top: 5px; /* Espacio entre el texto y el botón */
}

a.cta-button:hover {
  color: #ffffff; /* Letras blancas al pasar el ratón */
  background-color: #0056b3; /* Fondo más oscuro al pasar el ratón */
}

a:focus {
  outline: 2px dashed var(--primary-color);
  outline-offset: 4px;
}

/* Animación inicial para la hero_section */
.hero_section {
  background-image: url(images/developer.png);
  min-height: 100vh;
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;
  transition: background-position 0.5s ease-out, opacity 0.5s ease-out;
  opacity: 0;
  will-change: opacity, transform;
}

.hero_section.animate {
  opacity: 1;
  background-position: center center;
  animation: initialMove 3s ease-out forwards; /* Cambié de 2s a 3s para una animación más lenta */
}

@keyframes initialMove {
  0% {
      background-position: center top;
      transform: scale(1);
  }
  100% {
      background-position: center center;
      transform: scale(1.1); /* Agrega un ligero zoom */
  }
}

/* Animación para el contenedor (.card) */
.card {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.5s ease-in-out;
    will-change: opacity, transform;
}

.card.animate {
    opacity: 1;
    transform: translateY(0);
}

/* Animación para la imagen dentro del contenedor */
.image_container img {
    opacity: 0;
    transform: scale(0.9);
    transition: all 0.5s ease-in-out 0.2s;
    will-change: opacity, transform;
}

.card.animate .image_container img {
    opacity: 1;
    transform: scale(1);
}

.text_container {
  color: #FFFFFF;
  background-color: #33333300; /* Mejora la visibilidad del texto */
  max-width: 900px;
  margin: 0 auto;
  padding-top: 64px;
  padding-left: 16px;
  font-size: 12px;
  letter-spacing: 3px;
}

.lg_text {
  font-size: 20px; /* Reducido de 72px a 48px */
  font-weight: 400;
  line-height: 1.2; /* Aumenta el espacio entre líneas para mejorar la legibilidad */
  margin-bottom: 0.5em; /* Añadir un poco de margen inferior */
}

.black_box {
    background-color: #000;
    padding: 20px;
}

.black_box h2 {
  font-size: 48px; /* Ajustado el tamaño de la fuente */
  color: white;
  text-align: center;
  font-weight: 300;
  margin-bottom: 0.5em;
  padding-bottom: 10px; /* Espacio entre el texto y la línea */
  border-bottom: 5px solid black; /* Línea negra más gruesa */
  display: inline-block; /* Para que la línea esté justo debajo del texto */
}

.black_box h2 span {
    font-weight: 400;
    font-size: 96px;
}

.work {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    max-width: 1100px;
    margin: 50px auto;
}

.grid_item {
    display: flex;
    justify-content: center;
    align-items: center;
}

.card {
    max-width: 320px;
    height: 400px;
    border-radius: 10px;
    box-shadow: 3px 5px 5px rgba(1, 1, 1, 0.2);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.card:hover {
    transform: scale(1.04);
    box-shadow: 5px 10px 15px rgba(0, 0, 0, 0.3);
    background-color: #f0f0f0;
}

.card_content {
    padding: 20px;
    text-align: center;
}

.card_image {
    width: calc(100% + 0.4cm); /* Aumenta el tamaño de la imagen */
    height: auto; /* Mantiene la proporción de la imagen */
    border-radius: 10px; /* Bordes redondeados */
    margin-bottom: 20px; /* Espacio debajo de la imagen */
    display: inline-block;
    margin-left: -0.2cm; /* Ajusta el margen para centrar la imagen */
    margin-right: -0.2cm; /* Ajusta el margen para centrar la imagen */
}


.card_content h3 {
    margin-bottom: 10px;
}

.bottom_section {
    display: flex;
    padding: 40px 20px;
}

footer {
    text-align: center;
    padding: 20px;
    background-color: #333;
    color: #fff;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 1px;
}

@media (max-width: 786px) {
  .hero_section {
      min-height: 50vh;
  }
  .text_container {
      padding: 10px 0;
      text-align: center;
  }
  .lg_text {
      font-size: 32px;
  }
  .black_box h2 {
      font-size: 24px;
  }
  .black_box h2 span {
      font-weight: 400;
      font-size: 32px;
  }
  .bottom_section {
      flex-direction: column;
  }
  h1 {
      font-size: 32px;
  }
  .about h2,
  .contact h2 {
      font-size: 32px;
  }
}

@media (max-width: 786px) {
    .hero_section {
        min-height: 50vh;
        display: flex;
    }
    .text_container {
        padding: 30px 0; /* Añade más espacio en la parte superior e inferior */
        text-align: left; /* Justifica el texto */
        margin-left: 35px; /* Ajusta el margen izquierdo */
        margin-right: 35px; /* Añade margen derecho para equilibrar */
    }
    .lg_text {
        font-size: 10px; /* Reducir tamaño del texto principal */
        margin-bottom: 5px; /* Reduce el espacio entre el texto y otros elementos */
        transform: translateY(-0.3cm); /* Mueve el texto hacia arriba 0.5 cm */
    }
    h1 {
        font-size: 8px; /* Reducir tamaño del h1 */
        margin-bottom: 5px; /* Reducir el espacio entre el h1 y el botón */
    }


/* Ajustes para el título de "Empresas que confían en nosotros" */
.swiper-section > h2 {
  font-size: 24px; /* Tamaño del título */
  text-align: center; /* Centrar el título */
  margin: 0; /* Sin margen para que ocupe todo el ancho */
  padding: 10px 0; /* Espacio interno en la parte superior e inferior */
  color: white; /* Letra blanca */
  background-color: black; /* Fondo negro */
  width: 100%; /* Asegurar que ocupe todo el ancho de la pantalla */
  box-sizing: border-box; /* Incluir padding y border en el ancho total */
  opacity: 0; /* Inicia invisible */
  transform: translateY(-20px); /* Empieza ligeramente desplazado hacia arriba */
  transition: opacity 2s ease-in-out, transform 2s ease-in-out; /* Transición suave */
}

.swiper-section > h2.animate {
  opacity: 1; /* Termina visible */
  transform: translateY(0); /* Termina en su posición normal */
}

.contact-section {
    flex-direction: column; /* Cambiar a columna en pantallas pequeñas */
    align-items: center; /* Centramos los recuadros horizontalmente */
}
  
.contact, .about {
    width: 90%; /* Hacemos los recuadros más pequeños y centrados */
    max-width: 600px; /* Opcional: Limitar el ancho máximo */
    margin-bottom: 20px; /* Añadir margen inferior para separar las secciones */
}
}

@media (max-width: 480px) {
    .lg_text {
        font-size: 16px; /* Reducir aún más el tamaño del texto */
    }

    h1 {
        font-size: 18px; /* Reducir aún más el tamaño del h1 */
    }

    a.cta-button {
        font-size: 0.6em; /* Reducir tamaño de fuente en pantallas muy pequeñas */
        padding: 4px 8px; /* Reducir más el padding */
        border-radius: 10px; /* Ajustar más el radio de borde */
    }
}

/* Swiper Section */
.carousel_section {
    padding: 40px 0;
    background-color: var(--bg-color);
}

.swiper {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
}

.swiper-slide {
    width: 300px;
    height: 400px;
    box-shadow: 0 15px 50px rgba(255, 255, 255, 0.032);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    transition: transform 0.3s ease, filter 0.3s ease;
    background-size: cover;
    background-position: center;
}

.swiper-slide-active {
    transform: scale(1.2);
    filter: blur(0px);
}

.swiper-slide-next,
.swiper-slide-prev {
    filter: blur(3px);
}

.swiper-pagination-bullet,
.swiper-pagination-bullet-active {
    background: #ffffff;
}

.swiper-pagination-bullet:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 4px;
}

.swiper-slide span {
    text-transform: uppercase;
    color: #fff;
    background: #ff0000;
    padding: 7px 18px 7px 25px;
    display: inline-block;
    border-radius: 0 20px 20px 0px;
    letter-spacing: 0px; /* Ajusta el espaciado entre letras si es necesario */
    font-size: 0.8rem;
    font-family: var(--font-family-secondary);
}

.swiper-slide--one span {
    background: #62667f;
}

.swiper-slide--two span {
    background: #087ac4;
}

.swiper-slide--three span {
    background: #b45205;
}

.swiper-slide--four span {
    background: #087ac4;
}

/* Ajustes para el texto en .swiper-slide */
.swiper-section {
  background-color: #000000; /* Fondo negro */
  padding: 20px; /* Opcional: Añadir padding alrededor del carrusel */
  box-sizing: border-box; /* Asegura que el padding se incluya dentro del ancho del contenedor */
}

.swiper-slide h2 {
  color: #fff;
  font-family: 'Poppins', sans-serif; /* Cambiado a Poppins */
  font-weight: 300; /* Poppins delgada para quitar la negrita */
  font-size: 1rem;
  line-height: 1.2;
  margin-bottom: 15px;
  padding: 25px 45px 0 25px;
  transform: translateY(-0.1cm); /* Mueve el texto 0.5 cm hacia arriba */
  text-align: justify; /* Justifica el texto */
}

.swiper-slide p {
  color: #fff;
  font-family: 'Poppins', sans-serif; /* Cambiado a Poppins */
  font-weight: 300; /* Poppins delgada para quitar la negrita */
  display: flex;
  align-items: center;
  padding: 0 25px 35px 25px;
}

.swiper-slide svg {
    color: #fff;
    width: 22px;
    height: 22px;
    margin-right: 7px;
}

.swiper-slide--one {
    background: linear-gradient(to top, #0f2027, #203a4300, #2c536400),
    url('images/111.webp') no-repeat 50% 50% / cover;
}

.swiper-slide--two {
    background: linear-gradient(to top, #0f2027, #203a4300, #2c536400),
    url('images/coffe.png') no-repeat 50% 50% / cover;
}

.swiper-slide--three {
    background: linear-gradient(to top, #0f2027, #203a4300, #2c536400),
    url("https://images.unsplash.com/photo-1549144511-f099e773c147?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80")
    no-repeat 50% 50% / cover;
}

.swiper-slide--four {
    background: linear-gradient(to top, #0f2027, #203a4300, #2c536400),
    url("https://images.unsplash.com/photo-1650367310179-e1b5b8e453c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")
    no-repeat 50% 50% / cover;
}

.swiper-slide--five {
    background: linear-gradient(to top, #0f2027, #203a4300, #2c536400),
    url("https://images.unsplash.com/photo-1596521864207-13d46b1a0c78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80")
    no-repeat 50% 50% / cover;
}

.swiper-3d .swiper-slide-shadow-left,
.swiper-3d .swiper-slide-shadow-right {
    background-image: none;
}

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .card {
        box-shadow: 4px 8px 12px rgba(0, 0, 0, 0.15);
    }
}

.swiper-section > h2 {
  font-size: 24px; /* Tamaño del título para pantallas pequeñas y medianas */
  padding: 10px 0; /* Padding ajustado para pantallas más pequeñas */
  background-color: black; /* Fondo negro */
  color: white; /* Texto blanco */
  text-align: center; /* Centrar el título */
  margin: 0; /* Sin margen */
  width: 100%; /* Asegurar que ocupe todo el ancho de la pantalla */
  box-sizing: border-box; /* Incluir padding en el ancho */
  opacity: 0; /* Inicia invisible */
  transform: translateY(1cm); /* Mueve el título hacia abajo 1 cm */
  transition: opacity 1s ease-in-out, transform 1s ease-in-out; /* Transición suave */
}

.swiper-section > h2.animate {
  opacity: 1; /* Hacer visible */
  transform: translateY(0.5cm); /* Mantiene el título 1 cm hacia abajo */
}

/* Sección de contacto y sobre nosotros */
.contact-section {
    display: flex;
    flex-direction: row; /* Para pantallas grandes, organiza en filas */
    justify-content: space-between;
    gap: 0.5cm; /* Espacio entre las dos secciones (0.5 cm) */
    padding: 40px 20px; /* Espacio interno alrededor de la sección */
    background-color: #f5f5f5; /* Fondo suave */
    border-radius: 10px; /* Bordes redondeados */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra ligera */
}
  
/* Estilo para cada bloque (contacto y sobre nosotros) */
.contact, .about {
    flex: 1;
    padding: 19px; /* Reducción de padding en 0.5 cm */
    background-color: #ffffff; /* Fondo blanco para los bloques */
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Sombra ligera */
    margin: 0.5cm; /* Añadir margen externo para separación uniforme */
    box-sizing: border-box; /* Asegura que el padding se incluya en el tamaño total */
}

.contact h2, .about h2 {
    font-size: 28px;
    font-weight: 700;
    color: #333; /* Color del texto del título */
    margin-bottom: 15px; /* Espacio inferior para separar del texto */
    border-bottom: 2px solid #000000; /* Línea azul debajo del título */
    padding-bottom: 10px; /* Espacio interno debajo del título */
}
  
.contact p, .about p {
    font-size: 16px;
    line-height: 1.6;
    color: #666; /* Color del texto */
    margin-bottom: 15px; /* Espacio inferior entre los párrafos */
}
  
.contact p strong {
    color: #007BFF; /* Color destacado para la palabra "Email" */
}
  
.contact a {
    color: #007BFF; /* Enlace de correo electrónico en azul */
    text-decoration: none; /* Sin subrayado */
}
  
.contact a:hover {
    text-decoration: underline; /* Subrayado al pasar el ratón */
}
