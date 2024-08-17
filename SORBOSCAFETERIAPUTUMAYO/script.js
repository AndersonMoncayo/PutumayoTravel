// Maneja la búsqueda de productos en tiempo real mientras se escribe
document.getElementById('search-input').addEventListener('input', filterProducts);

function filterProducts() {
    const query = document.getElementById('search-input').value.toLowerCase().trim();
    const allProductsContainer = document.getElementById('all-products-container');

    // Limpia la sección de "Todos los productos"
    allProductsContainer.innerHTML = '';

    const categories = ['coffee', 'panpa', 'waffles', 'tresrecetas', 'jugos', 'armatuplato'];
    let anyProductVisible = false;

    categories.forEach(category => {
        const categoryProducts = document.querySelectorAll(`#${category} .card-product`);
        categoryProducts.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(query)) {
                const clonedProduct = product.cloneNode(true); // Clona el producto
                allProductsContainer.appendChild(clonedProduct); // Lo añade a "Todos los productos"
                anyProductVisible = true;
            }
        });
    });

    // Si no hay coincidencias, mostrar un mensaje
    if (!anyProductVisible) {
        allProductsContainer.innerHTML = '<p>No se encontraron productos.</p>';
    }

    // Mostrar la sección "Todos los productos"
    const allProductsSection = document.getElementById('todosproductos');
    allProductsSection.style.display = 'block';

    // Añadir funcionalidad de "Añadir al carrito" a los productos clonados
    addCartFunctionalityToClonedProducts();
}

// Maneja la funcionalidad del menú
document.getElementById('menu-toggle').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
});
document.addEventListener('DOMContentLoaded', function () {
    const allProductsLink = document.querySelector('a[href="#todosproductos"]');
    const searchInput = document.getElementById('search-input');
    const searchResultsSection = document.getElementById('resultados-busqueda'); // Selecciona la nueva sección de resultados
    const allProductsContainer = document.getElementById('all-products-container'); // Contenedor de productos

    function handleAllProductsDisplay(query = '') {
        const categories = ['mejoresproductos', 'coffee', 'panpa', 'waffles', 'tresrecetas', 'jugos', 'armatuplato'];

        allProductsContainer.innerHTML = ''; // Limpia la sección de productos

        let anyProductVisible = false;

        categories.forEach(category => {
            const categoryProducts = document.querySelectorAll(`#${category} .card-product`);
            categoryProducts.forEach(product => {
                const productName = product.querySelector('h3').textContent.toLowerCase();
                if (productName.includes(query.toLowerCase())) {
                    const clonedProduct = product.cloneNode(true);
                    allProductsContainer.appendChild(clonedProduct);
                    anyProductVisible = true;
                }
            });
        });

        if (!anyProductVisible) {
            allProductsContainer.innerHTML = '<p>No se encontraron productos.</p>';
        }

        // Mostrar la sección de resultados de búsqueda
        searchResultsSection.style.display = 'block';

        // Añadir funcionalidad de "Añadir al carrito" a los productos clonados
        addCartFunctionalityToClonedProducts();

        // Desplazar a la sección de "Resultados de la Búsqueda"
        searchResultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    allProductsLink.addEventListener('click', function (event) {
        event.preventDefault();
        handleAllProductsDisplay();
    });

    searchInput.addEventListener('input', function () {
        const query = searchInput.value.trim();
        handleAllProductsDisplay(query);
    });

    // Funcionalidad para agregar productos al carrito desde todas las categorías
    const categories = ['mejoresproductos', 'coffee', 'panpa', 'waffles', 'tresrecetas', 'jugos', 'armatuplato'];

    categories.forEach(category => {
        const categoryProducts = document.querySelectorAll(`#${category} .card-product .add-cart`);
        
        categoryProducts.forEach(button => {
            button.addEventListener('click', () => {
                const productCard = button.closest('.card-product');
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace(/[$,]/g, ''));
                const productImageSrc = productCard.querySelector('.container-img img').src;

                const selectedOptionElement = productCard.querySelector('.styled-select');
                let selectedOption = "";
                if (selectedOptionElement) {
                    selectedOption = selectedOptionElement.options[selectedOptionElement.selectedIndex].text;
                }

                const productFullName = selectedOption ? `${productName} (${selectedOption})` : productName;

                addProductToCart(productFullName, productPrice, productImageSrc);
            });
        });
    });
});

function addCartFunctionalityToClonedProducts() {
    const cartCountElement = document.querySelector('.content-shopping-cart .number');
    const cartIcon = document.querySelector('.container-user i.fa-basket-shopping');
    let cartCount = parseInt(cartCountElement.textContent.replace(/\D/g, '')) || 0;

    const addToCartButtons = document.querySelectorAll('#all-products-container .add-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.card-product');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace(/[$,]/g, ''));
            const productImageSrc = productCard.querySelector('.container-img img').src;

            const selectedOptionElement = productCard.querySelector('.styled-select');
            let selectedOption = "";
            if (selectedOptionElement) {
                selectedOption = selectedOptionElement.options[selectedOptionElement.selectedIndex].text;
            }

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
}

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
function updateCartFunctionality() {
    const removeButtons = document.querySelectorAll('.remove-item');
    const increaseButtons = document.querySelectorAll('.increase');
    const decreaseButtons = document.querySelectorAll('.decrease');

    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const cartItem = e.target.closest('li');
            const quantityInput = cartItem.querySelector('.quantity-input');
            const quantity = parseInt(quantityInput.value);

            cartItem.remove();
            updateCartTotal();
            updateCartCount(-quantity);
        });
    });

    increaseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const quantityInput = e.target.previousElementSibling;
            let currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
            updateCartTotal();
            updateCartCount(1); // Incrementa el contador del carrito en 1
        });
    });

    decreaseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const quantityInput = e.target.nextElementSibling;
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
                updateCartTotal();
                updateCartCount(-1); // Decrementa el contador del carrito en 1
            }
        });
    });

    // También actualizar el total cuando el usuario cambia manualmente el número en la casilla
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', () => {
            updateCartTotal();
            updateCartCount();
        });
    });
}

function updateCartCount() {
    const cartItems = document.querySelectorAll('.cart-sidebar ul li');
    const cartCountElement = document.querySelector('.content-shopping-cart .number');
    let totalQuantity = 0;

    cartItems.forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity-input').value);
        totalQuantity += quantity;
    });

    cartCountElement.textContent = `(${totalQuantity})`;

    // Actualizar el icono del carrito en la barra de navegación
    const cartIconCountElement = document.querySelector('.container-user .number');
    if (cartIconCountElement) {
        cartIconCountElement.textContent = `(${totalQuantity})`;
    }
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
    const allProductsLink = document.querySelector('a[href="#todosproductos"]');
    const searchInput = document.getElementById('search-input');

    function handleAllProductsDisplay(query = '') {
        const allProductsContainer = document.getElementById('all-products-container');
        const categories = ['coffee', 'panpa', 'waffles', 'tresrecetas', 'jugos', 'armatuplato'];

        allProductsContainer.innerHTML = '';

        let anyProductVisible = false;

        categories.forEach(category => {
            const categoryProducts = document.querySelectorAll(`#${category} .card-product`);
            categoryProducts.forEach(product => {
                const productName = product.querySelector('h3').textContent.toLowerCase();
                if (productName.includes(query.toLowerCase())) {
                    const clonedProduct = product.cloneNode(true); 
                    allProductsContainer.appendChild(clonedProduct);
                    anyProductVisible = true;
                }
            });
        });

        if (!anyProductVisible) {
            allProductsContainer.innerHTML = '<p>No se encontraron productos.</p>';
        }

        addCartFunctionalityToClonedProducts();

        const allProductsSection = document.getElementById('todosproductos');
        allProductsSection.style.display = 'block';
        allProductsSection.scrollIntoView({ behavior: 'smooth' });
    }

    allProductsLink.addEventListener('click', function (event) {
        event.preventDefault();
        handleAllProductsDisplay();
    });

    searchInput.addEventListener('input', function () {
        const query = searchInput.value.trim();
        handleAllProductsDisplay(query);
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

            // Añade los event listeners a los botones de "Añadir al carrito" en los productos clonados
            const addToCartButtons = document.querySelectorAll('#all-products-container .add-cart');
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
                });
            });
        }

        // Desplaza la página hasta la sección "Todos los productos"
        allProductsSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Maneja la búsqueda de productos en tiempo real mientras se escribe
document.getElementById('search-input').addEventListener('input', filterProducts);

function filterProducts() {
    const query = document.getElementById('search-input').value.toLowerCase().trim();
    const allProductsContainer = document.getElementById('all-products-container');

    // Limpia la sección de "Todos los productos"
    allProductsContainer.innerHTML = '';

    const categories = ['coffee', 'panpa', 'waffles', 'tresrecetas', 'jugos', 'armatuplato'];
    let anyProductVisible = false;

    categories.forEach(category => {
        const categoryProducts = document.querySelectorAll(`#${category} .card-product`);
        categoryProducts.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(query)) {
                const clonedProduct = product.cloneNode(true); // Clona el producto
                allProductsContainer.appendChild(clonedProduct); // Lo añade a "Todos los productos"
                anyProductVisible = true;
            }
        });
    });

    // Si no hay coincidencias, mostrar un mensaje
    if (!anyProductVisible) {
        allProductsContainer.innerHTML = '<p>No se encontraron productos.</p>';
    }

    // Mostrar la sección "Todos los productos"
    const allProductsSection = document.getElementById('todosproductos');
    allProductsSection.style.display = 'block';

    // Añadir funcionalidad de "Añadir al carrito" a los productos clonados
    addCartFunctionalityToClonedProducts();
}

// Función para añadir la funcionalidad de "Añadir al carrito" a los productos clonados
function addCartFunctionalityToClonedProducts() {
    const addToCartButtons = document.querySelectorAll('#all-products-container .add-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.card-product');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace(/[$,]/g, ''));
            const productImageSrc = productCard.querySelector('.container-img img').src;

            const selectedOptionElement = productCard.querySelector('.styled-select');
            let selectedOption = "";
            if (selectedOptionElement) {
                selectedOption = selectedOptionElement.options[selectedOptionElement.selectedIndex].text;
            }

            const productFullName = selectedOption ? `${productName} (${selectedOption})` : productName;

            addProductToCart(productFullName, productPrice, productImageSrc);
        });
    });
}
function addProductToCart(name, price, imageSrc) {
    const cartItemsContainer = document.querySelector('.cart-sidebar ul');
    const cartCountElement = document.querySelector('.content-shopping-cart .number');
    const cartIcon = document.querySelector('.container-user i.fa-basket-shopping');
    let cartCount = parseInt(cartCountElement.textContent.replace(/\D/g, '')) || 0;
    let existingCartItem = null;

    document.querySelectorAll('.cart-sidebar ul li').forEach((cartItem) => {
        const itemName = cartItem.querySelector('.item-details span:first-child').textContent;
        if (itemName === name) {
            existingCartItem = cartItem;
        }
    });

    if (existingCartItem) {
        const quantityElement = existingCartItem.querySelector('.quantity-input');
        quantityElement.value = parseInt(quantityElement.value) + 1;
        updateCartCount(1);
    } else {
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
                    <input type="number" value="1" min="1" class="quantity-input">
                    <button class="increase">+</button>
                </div>
                <button class="remove-item">Eliminar</button>
            </li>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
        updateCartCount(1);
    }

    cartIcon.classList.add('cart-animate');
    setTimeout(() => {
        cartIcon.classList.remove('cart-animate');
    }, 500);

    // En lugar de llamar updateCartFunctionality aquí, solo agregar un listener si no existe
    applyCartEventListeners();
    updateCartTotal();
}

function applyCartEventListeners() {
    const cartItemsContainer = document.querySelector('.cart-sidebar ul');

    cartItemsContainer.removeEventListener('click', cartEventListener);
    cartItemsContainer.addEventListener('click', cartEventListener);

    // También aseguramos que los inputs manuales tengan un listener correcto
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.removeEventListener('input', handleQuantityInputChange);
        input.addEventListener('input', handleQuantityInputChange);
    });
}

function cartEventListener(e) {
    if (e.target.classList.contains('increase')) {
        const quantityInput = e.target.previousElementSibling;
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
        updateCartCount(1);
        updateCartTotal();
    }

    if (e.target.classList.contains('decrease')) {
        const quantityInput = e.target.nextElementSibling;
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
            updateCartCount(-1);
            updateCartTotal();
        }
    }

    if (e.target.classList.contains('remove-item')) {
        const cartItem = e.target.closest('li');
        const quantityInput = cartItem.querySelector('.quantity-input');
        const quantity = parseInt(quantityInput.value);
        cartItem.remove();
        updateCartCount(-quantity);
        updateCartTotal();
    }
}

function handleQuantityInputChange(e) {
    const quantityInput = e.target;
    const oldQuantity = parseInt(quantityInput.getAttribute('data-old-value') || 1);
    const newQuantity = parseInt(quantityInput.value);

    if (newQuantity > oldQuantity) {
        updateCartCount(newQuantity - oldQuantity);
    } else if (newQuantity < oldQuantity) {
        updateCartCount(-(oldQuantity - newQuantity));
    }

    quantityInput.setAttribute('data-old-value', newQuantity);
    updateCartTotal();
}

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

function updateCartCount(change) {
    const cartCountElement = document.querySelector('.content-shopping-cart .number');
    let currentCount = parseInt(cartCountElement.textContent.replace(/\D/g, '')) || 0;
    currentCount += change;
    cartCountElement.textContent = `(${currentCount})`;
}
