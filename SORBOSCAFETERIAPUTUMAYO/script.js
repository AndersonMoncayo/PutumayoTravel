// Maneja la búsqueda de productos
document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita que se recargue la página
        filterProducts();
    }
});

function filterProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const products = document.querySelectorAll('.card-product');
    
    products.forEach((product) => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        
        if (productName.includes(query)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });

    if (query === '') {
        products.forEach((product) => {
            product.style.display = 'block';
        });
    }
}

// Maneja la funcionalidad del menú
document.getElementById('menu-toggle').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
});

// Maneja el carrito de compras con animación y opciones
document.addEventListener('DOMContentLoaded', () => {
    const cartCountElement = document.querySelector('.content-shopping-cart .number');
    const cartIcon = document.querySelector('.container-user i.fa-basket-shopping');
    let cartCount = 0;

    const addToCartButtons = document.querySelectorAll('.add-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.card-product');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace(/[$,]/g, ''));
            const productImageSrc = productCard.querySelector('.container-img img').src;

            // Verificar si el producto tiene una opción seleccionada
            const selectedOptionElement = productCard.querySelector('.styled-select');
            let selectedOption = "";
            if (selectedOptionElement) {
                selectedOption = selectedOptionElement.options[selectedOptionElement.selectedIndex].text;
            }

            // Si hay una opción seleccionada, añadirla al nombre del producto
            const productFullName = selectedOption ? `${productName} (${selectedOption})` : productName;

            addProductToCart(productFullName, productPrice, productImageSrc);

            cartCount++;
            cartCountElement.textContent = `(${cartCount})`;

            // Añade la clase de animación
            cartIcon.classList.add('cart-animate');

            // Elimina la clase de animación después de que termine
            setTimeout(() => {
                cartIcon.classList.remove('cart-animate');
            }, 500); // La duración debe coincidir con la duración de la animación en el CSS
        });
    });
});

// Función para añadir el producto al carrito
function addProductToCart(name, price, imageSrc) {
    const cartItemsContainer = document.querySelector('.cart-sidebar ul');
    let existingCartItem = null;

    // Verificar si el producto ya está en el carrito
    document.querySelectorAll('.cart-sidebar ul li').forEach((cartItem) => {
        const itemName = cartItem.querySelector('.item-details span:first-child').textContent;
        if (itemName === name) {
            existingCartItem = cartItem;
        }
    });

    if (existingCartItem) {
        // Si el producto ya existe en el carrito, incrementa la cantidad
        const quantityElement = existingCartItem.querySelector('.quantity-controls input');
        quantityElement.value = parseInt(quantityElement.value) + 1;
    } else {
        // Si el producto no existe, lo agrega al carrito
        const cartItemHTML = `
            <li>
                <div class="cart-item-info">
                    <img src="${imageSrc}" alt="${name}">
                    <div class="item-details">
                        <span>${name}</span>
                        <span class="cart-item-price">${price.toFixed(2)}</span>
                    </div>
                </div>
                <div class="quantity-controls">
                    <button class="decrease">-</button>
                    <input type="number" value="1" min="1" class="quantity-input" onchange="updateCartTotal()">
                    <button class="increase">+</button>
                </div>
                <button class="remove-item">Eliminar</button>
            </li>
        `;

        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);

        updateCartFunctionality();
        updateCartTotal();
    }
}

// Función para manejar el aumento/disminución de cantidad y eliminación de productos en el carrito
function updateCartFunctionality() {
    const removeButtons = document.querySelectorAll('.remove-item');
    const increaseButtons = document.querySelectorAll('.increase');
    const decreaseButtons = document.querySelectorAll('.decrease');

    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const cartItem = e.target.closest('li');
            cartItem.remove();
            updateCartTotal();
            updateCartCount(-1);
        });
    });

    increaseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const quantityInput = e.target.previousElementSibling;
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updateCartTotal();
        });
    });

    decreaseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const quantityInput = e.target.nextElementSibling;
            if (quantityInput.value > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
                updateCartTotal();
            }
        });
    });
}

// Función para actualizar el total del carrito
function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-sidebar ul li');
    let total = 0;

    cartItems.forEach(item => {
        const price = parseFloat(item.querySelector('.cart-item-price').textContent.replace(/[$,]/g, ''));
        const quantity = parseInt(item.querySelector('.quantity-input').value);
        total += price * quantity;
    });

    document.getElementById('cartTotalAmount').textContent = `$${total.toFixed(2)}`;
}

// Función para actualizar el conteo del carrito
function updateCartCount(change) {
    const cartCountElement = document.querySelector('.content-shopping-cart .number');
    let currentCount = parseInt(cartCountElement.textContent.replace(/\D/g, ''));
    currentCount += change;
    cartCountElement.textContent = `(${currentCount})`;
}

// Oculta la barra de navegación al hacer scroll y deja fija la barra blanca
let lastScrollTop = 0;
const navbar = document.querySelector('.container-navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // Desplazamiento hacia abajo - Ocultar la barra café
        navbar.classList.add('navbar-hidden');
    } else {
        // Desplazamiento hacia arriba - Mostrar la barra café
        navbar.classList.remove('navbar-hidden');
    }
    lastScrollTop = scrollTop;
});

function toggleCartSidebar() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('show');
}

// Cierra el carrito si se hace clic fuera de él
document.addEventListener('click', function(event) {
    const cartSidebar = document.getElementById('cartSidebar');
    const containerUser = document.querySelector('.container-user');

    if (!cartSidebar.contains(event.target) && !containerUser.contains(event.target)) {
        cartSidebar.classList.remove('show');
    }
});

// Maneja la visibilidad del campo de ubicación según la opción de entrega seleccionada
document.querySelectorAll('input[name="delivery"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const locationInput = document.getElementById('location');
        if (this.value === 'domicilio') {
            locationInput.style.display = 'block';
        } else {
            locationInput.style.display = 'none';
        }
    });
});

// Función para vaciar el carrito
function clearCart() {
    const cartItemsContainer = document.querySelector('.cart-sidebar ul');
    cartItemsContainer.innerHTML = ''; // Elimina todos los productos del carrito
    updateCartTotal(); // Actualiza el total
    const cartCountElement = document.querySelector('.content-shopping-cart .number');
    cartCount = 0; // Restablece la variable del contador
    cartCountElement.textContent = `(0)`; // Resetea el conteo del carrito a cero en la interfaz
}

// Función para finalizar la compra y enviar el mensaje por WhatsApp
function checkout() {
    let total = 0;
    const cartItems = [];

    document.querySelectorAll('.cart-sidebar ul li').forEach(item => {
        const name = item.querySelector('.item-details span:first-child').textContent;
        const price = parseFloat(item.querySelector('.cart-item-price').textContent.replace(/[$,]/g, ''));
        const quantity = parseInt(item.querySelector('.quantity-input').value);
        total += price * quantity;
        cartItems.push({ name, price, quantity });
    });

    let deliveryOption = document.querySelector('input[name="delivery"]:checked').value;
    let location = document.getElementById('location').value;
    let message = "Hola, me gustaría hacer un pedido, por favor. 😊🍽️:\n";

    cartItems.forEach(item => {
        message += `${item.name} - COP ${item.price.toLocaleString()} x ${item.quantity}\n`;
    });
    
    message += `Total: COP ${total.toLocaleString()}\n`; // Añade el total al mensaje
    message += `Método de entrega: ${deliveryOption === 'local' ? 'Recoger en Local' : 'Domicilio'}\n`;

    if (deliveryOption === 'domicilio') {
        message += `Ubicación: ${location}\n`;
    }

    const whatsappLink = `https://wa.me/573227737273?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
}

document.addEventListener('DOMContentLoaded', function () {
    // Obtén el enlace "Todos los productos"
    const allProductsLink = document.querySelector('a[href="#todosproductos"]');

    // Agrega un evento de clic al enlace
    allProductsLink.addEventListener('click', function (event) {
        event.preventDefault(); // Evita el comportamiento predeterminado del enlace

        // Selecciona la sección "Todos los productos" y muestra la sección
        const allProductsSection = document.getElementById('todosproductos');
        allProductsSection.style.display = 'block';

        // Clona los productos si no se han clonado aún
        if (document.getElementById('all-products-container').children.length === 0) {
            const allProductsContainer = document.getElementById('all-products-container');
            const categories = ['coffee', 'panpa', 'waffles', 'tresrecetas', 'jugos', 'armatuplato'];
            
            categories.forEach(category => {
                const categoryProducts = document.querySelectorAll(`#${category} .card-product`);
                categoryProducts.forEach(product => {
                    const clonedProduct = product.cloneNode(true); // Clona el producto
                    allProductsContainer.appendChild(clonedProduct); // Lo añade a "Todos los productos"
                });
            });
        }

        // Desplaza la página hasta la sección "Todos los productos"
        allProductsSection.scrollIntoView({ behavior: 'smooth' });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const categories = document.querySelectorAll('.category-container');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    categories.forEach(category => {
        observer.observe(category);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const fadeInElements = document.querySelectorAll('.fade-in, .gallery img');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeInElements.forEach(element => {
        observer.observe(element);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const galleryImages = document.querySelectorAll('.gallery img');

    galleryImages.forEach((img, index) => {
        if (index % 2 === 0) {
            img.classList.add('slide-in-left');
        } else {
            img.classList.add('slide-in-right');
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    galleryImages.forEach(img => {
        observer.observe(img);
    });
});

// Maneja la navegación y visualización de secciones
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Evita la acción predeterminada del enlace

        const targetSectionId = this.getAttribute('href').substring(1); // Obtiene el id de la sección destino
        const targetSection = document.getElementById(targetSectionId);

        // Oculta todas las secciones que no sean la seleccionada
        document.querySelectorAll('.banner, .top-products, .category-container').forEach(section => {
            section.style.display = 'none';
        });

        // Muestra la sección seleccionada
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.scrollIntoView({ behavior: 'smooth' }); // Desplaza suavemente a la sección
        }

        // Cierra el menú después de la selección en móviles
        const menu = document.getElementById('menu');
        menu.classList.remove('active');
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const allProductsContainer = document.getElementById('all-products-container');
    const filterButtons = document.querySelectorAll('.product-filters span');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remueve la clase 'active' de todos los botones y añade a la seleccionada
            document.querySelector('.product-filters span.active')?.classList.remove('active');
            this.classList.add('active');

            // Filtra los productos según el botón seleccionado
            const products = Array.from(allProductsContainer.children);
            const filterType = this.textContent.trim();

            let sortedProducts = [];
            if (filterType === 'Menor precio') {
                sortedProducts = products.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector('.price').textContent.replace(/[$,]/g, ''));
                    const priceB = parseFloat(b.querySelector('.price').textContent.replace(/[$,]/g, ''));
                    return priceA - priceB;
                });
            } else if (filterType === 'Mayor precio') {
                sortedProducts = products.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector('.price').textContent.replace(/[$,]/g, ''));
                    const priceB = parseFloat(b.querySelector('.price').textContent.replace(/[$,]/g, ''));
                    return priceB - priceA;
                });
            }

            // Limpia el contenedor y vuelve a agregar los productos ordenados
            allProductsContainer.innerHTML = '';
            sortedProducts.forEach(product => {
                allProductsContainer.appendChild(product);
            });
        });
    });
});
