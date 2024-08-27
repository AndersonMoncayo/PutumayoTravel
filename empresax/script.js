// Navbar Toggle
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    navbar.classList.remove('active');
};

// Dark Mode Toggle
let darkmode = document.querySelector('#darkmode');

darkmode.onclick = () => {
    if (darkmode.classList.contains('bx-moon')) {
        darkmode.classList.replace('bx-moon', 'bx-sun');
        document.body.classList.add('active');
    } else {
        darkmode.classList.replace('bx-sun', 'bx-moon');
        document.body.classList.remove('active');
    }
};

// Scroll Reveal Configuration
const sr = ScrollReveal({
    origin: 'top',
    distance: '40px',
    duration: 2000,
    reset: true
});

sr.reveal(`.home-text, .home-img, .about-img, .about-text, .box, .s-box, .btn, .connect-text, .contact-box`, {
    interval: 200
});

// Código del Carrito de Compras
let cart = [];
let cartCount = document.getElementById('cart-count');
let cartItems = document.getElementById('cart-items');
let cartSidebar = document.getElementById('cart-sidebar');
let overlay = document.getElementById('overlay');
let discount = 0; // Variable para almacenar el descuento aplicado

// Ajuste: Cambiar a '.add-to-cart-button' selector
document.querySelectorAll('.add-to-cart-button').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        // Encuentra la tarjeta del producto
        let productCard = event.target.closest('.product-card');

        // Verifica si la tarjeta de producto se encontró correctamente
        if (!productCard) return;

        // Obtiene el nombre base del producto
        let productName = productCard.getAttribute('data-product');

        // Verifica si hay un selector de variantes
        let variantSelect = productCard.querySelector('select');
        let productVariantName = variantSelect ? variantSelect.options[variantSelect.selectedIndex].getAttribute('data-name') : '';

        // Combina el nombre del producto con la variante seleccionada
        let fullProductName = productVariantName ? `${productName} - ${productVariantName}` : productName;

        // Obtiene el precio del producto
        let productPrice = parseFloat(productCard.getAttribute('data-price'));

        // Obtiene la imagen del producto
        let productImage = productCard.getAttribute('data-image');

        // Llama a la función para agregar al carrito
        addToCart(fullProductName, productPrice, productImage);
    });
});

// Función para añadir productos al carrito
function addToCart(productName, productPrice, productImage) {
    let existingProduct = cart.find(item => item.name === productName && item.image === productImage);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
    }

    updateCart();
}

// Función para actualizar la cantidad de un producto manualmente
function updateQuantity(productName, newQuantity) {
    let product = cart.find(item => item.name === productName);
    if (product) {
        const quantity = parseInt(newQuantity);
        if (!isNaN(quantity) && quantity > 0) {
            product.quantity = quantity;
            updateCart();
        }
    }
}

// Función para actualizar el carrito en la interfaz de usuario
function updateCart() {
    let total = 0;
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        document.getElementById('cart-content').classList.add('hidden');
    } else {
        document.getElementById('cart-content').classList.remove('hidden');
        cart.forEach(item => {
            total += item.price * item.quantity;
            let li = document.createElement('li');
            li.innerHTML = `
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.name}" class="product-image">
                    <div class="item-details">
                        <div class="product-name">${item.name}</div>
                        <div class="product-info">
                            <span class="product-price">$${item.price.toLocaleString()}</span> 
                            <span>x</span>
                            <input type="number" value="${item.quantity}" min="1" class="quantity-input" 
                                   onchange="updateQuantity('${item.name}', this.value)">
                            <button class="delete-btn" onclick="removeFromCart('${item.name}')">
                                <img src="images/trash.svg" alt="Eliminar" class="delete-icon">
                            </button>
                        </div>
                    </div>
                </div>`;
            cartItems.appendChild(li);
        });

        if (discount > 0) {
            total = total - (total * (discount / 100));
        }

        document.getElementById('cart-total').textContent = total.toLocaleString();
    }
}

// Función para eliminar un producto del carrito
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCart();
}

// Función para vaciar el carrito
function clearCart() {
    cart = [];
    updateCart();
    toggleCart(); // Cierra el carrito si está abierto
}

// Función para aplicar un cupón de descuento
function applyCoupon() {
    const couponCode = document.getElementById('coupon-code').value.trim();
    const coupons = {
        'DESCUENTO10': 10,
        'DESCUENTO20': 20,
        'DESCUENTO50': 50
    };

    if (coupons[couponCode]) {
        discount = coupons[couponCode];
        alert(`Cupón aplicado: ${discount}% de descuento`);
    } else {
        alert('Cupón no válido');
        discount = 0;
    }
    updateCart();
}

// Función para proceder al checkout
function checkout() {
    let total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    if (discount > 0) {
        total = total - (total * (discount / 100));
    }

    let message = "Hola, me gustaría hacer un pedido:\n";
    cart.forEach(item => {
        message += `${item.name} - COP ${item.price.toLocaleString()} x ${item.quantity}\n`;
    });
    message += `Total: COP ${total.toLocaleString()}\n`;

    const deliveryMethod = document.getElementById('delivery-method').value;
    if (deliveryMethod === 'delivery') {
        const address = document.getElementById('address').value;
        message += `Método de Entrega: Domicilio\nDirección: ${address}\n`;
    } else {
        message += "Método de Entrega: Recoger en Local\n";
    }

    const whatsappLink = `https://wa.me/573227736533?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
}

// Función para alternar la visibilidad del carrito
function toggleCart() {
    cartSidebar.classList.toggle('show');
    overlay.classList.toggle('show');
}

// Función para mostrar u ocultar el campo de dirección
function toggleAddressInput() {
    const deliveryMethod = document.getElementById('delivery-method').value;
    const addressInput = document.getElementById('delivery-address');

    if (deliveryMethod === 'delivery') {
        addressInput.classList.remove('hidden');
    } else {
        addressInput.classList.add('hidden');
    }
}

// Event listener para el icono del carrito
document.getElementById('cart-icon').addEventListener('click', toggleCart);

// Event listener para la carga inicial del carrito
document.addEventListener('DOMContentLoaded', function () {
    updateCart(); // Verifica el estado del carrito al cargar la página
});

// Carrusel Automático
let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-open');
const totalSlides = slides.length;

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    slides[currentIndex].checked = true;
}

setInterval(nextSlide, 5000);

// Actualización de variantes de productos
function updateVariant() {
    const variantSelect = document.getElementById('variant-select');
    const selectedOption = variantSelect.options[variantSelect.selectedIndex];
    const newImage = selectedOption.getAttribute('data-image');
    const newPrice = selectedOption.getAttribute('data-price');
    const newDescription = selectedOption.getAttribute('data-description');

    document.getElementById('product-image').src = newImage;
    document.getElementById('product-price').textContent = `$${parseFloat(newPrice).toLocaleString('es-CO')} COP`;
    document.getElementById('product-description').textContent = newDescription;

    const productCard = variantSelect.closest('.product-card');
    productCard.setAttribute('data-price', newPrice);
    productCard.setAttribute('data-image', newImage);
}

function updateRolonVariant() {
    const variantSelect = document.getElementById('rolon-variant-select');
    const selectedOption = variantSelect.options[variantSelect.selectedIndex];
    const newImage = selectedOption.getAttribute('data-image');
    const newPrice = selectedOption.getAttribute('data-price');
    const newDescription = selectedOption.getAttribute('data-description');

    document.getElementById('rolon-product-image').src = newImage;
    document.getElementById('rolon-product-price').textContent = `$${parseFloat(newPrice).toLocaleString('es-CO')} COP`;
    document.getElementById('rolon-product-description').textContent = newDescription;

    const productCard = variantSelect.closest('.product-card');
    productCard.setAttribute('data-price', newPrice);
    productCard.setAttribute('data-image', newImage);
}

// Filtros de productos
function toggleFilters(event) {
    if (event) {
        event.preventDefault();
    }
    const filterDropdown = document.getElementById('filter-dropdown');
    filterDropdown.classList.toggle('hidden');
}

function filterProductsByCategory(category) {
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        if (category === 'all' || product.getAttribute('data-category') === category) {
            product.style.display = 'flex';
        } else {
            product.style.display = 'none';
        }
    });

    const filterDropdown = document.getElementById('filter-dropdown');
    filterDropdown.classList.add('hidden');
}

// Manejador de eventos para filtros y búsqueda
document.addEventListener('click', function (event) {
    const filterDropdown = document.getElementById('filter-dropdown');
    const filterToggle = document.getElementById('filter-toggle');

    if (!filterDropdown.contains(event.target) && !filterToggle.contains(event.target)) {
        filterDropdown.classList.add('hidden');
    }
});

function toggleSearch() {
    const searchInput = document.getElementById('search-input');
    const filterButton = document.querySelector('button[onclick="toggleFilters(event)"]');

    if (searchInput.classList.contains('hidden')) {
        searchInput.classList.remove('hidden');
        filterButton.classList.add('hidden');
        searchInput.focus();
    } else {
        searchInput.classList.add('hidden');
        filterButton.classList.remove('hidden');
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        searchFunction();
    }
}

function searchFunction() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const productName = product.querySelector('p').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = 'flex';
        } else {
            product.style.display = 'none';
        }
    });
}

function showCheckmark(button) {
    const checkmark = button.querySelector('.checkmark');
    const buttonText = button.querySelector('span.relative.z-10');

    buttonText.style.opacity = '0';
    checkmark.style.opacity = '1';

    checkout();

    setTimeout(() => {
        checkmark.style.opacity = '0';
        buttonText.style.opacity = '1';
    }, 2000);
}

document.addEventListener('DOMContentLoaded', function () {
    const catalogMessage = document.getElementById('catalog-message');

    function moveMessage() {
        catalogMessage.classList.remove('show');

        setTimeout(function () {
            catalogMessage.classList.add('hide');

            setTimeout(function () {
                const products = document.querySelectorAll('.product-card');
                const randomIndex = Math.floor(Math.random() * products.length);
                const randomProduct = products[randomIndex];
                randomProduct.parentNode.insertBefore(catalogMessage, randomProduct.nextSibling);

                catalogMessage.classList.remove('hide');
                catalogMessage.classList.add('show');
            }, 300);
        }, 1000);
    }

    setInterval(moveMessage, 60000);
    setTimeout(moveMessage, 10000);
});

document.addEventListener('DOMContentLoaded', function () {
    updateVariant();
});
document.querySelectorAll('.product-card a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto del enlace

        // Aquí puedes manejar lo que ocurre al hacer clic en el producto
        // Por ejemplo, mostrar detalles del producto o agregar al carrito
        const productCard = event.target.closest('.product-card');
        const productName = productCard.getAttribute('data-product');
        const productPrice = productCard.getAttribute('data-price');
        const productImage = productCard.getAttribute('data-image');

        // Tu lógica adicional para manejar el clic en el producto
        console.log(`Producto: ${productName}, Precio: ${productPrice}, Imagen: ${productImage}`);
    });
});
