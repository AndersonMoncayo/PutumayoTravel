// Código del Carrito de Compras
let cart = [];
let cartCount = document.getElementById('cart-count');
let cartItems = document.getElementById('cart-items');
let cartSidebar = document.getElementById('cart-sidebar');
let overlay = document.getElementById('overlay');
let discount = 0; // Variable para almacenar el descuento aplicado

// Manejo del evento de añadir al carrito
document.querySelectorAll('#add-to-cart-button').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        let productCard = event.target.closest('.product-card');
        let productName = productCard.getAttribute('data-product');
        let productPrice = parseFloat(productCard.getAttribute('data-price'));
        let productImage = productCard.getAttribute('data-image');

        addToCart(productName, productPrice, productImage);
    });
});

// Función para añadir productos al carrito
function addToCart(productName, productPrice, productImage) {
    let existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({name: productName, price: productPrice, image: productImage, quantity: 1});
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

// Función para aplicar un cupón de descuento
function applyCoupon() {
    const couponCode = document.getElementById('coupon-code').value.trim();

    // Ejemplo de cupones disponibles
    const coupons = {
        'DESCUENTO10': 10, // 10% de descuento
        'DESCUENTO20': 20, // 20% de descuento
        'DESCUENTO50': 50  // 50% de descuento
    };

    if (coupons[couponCode]) {
        discount = coupons[couponCode];
        alert(`Cupón aplicado: ${discount}% de descuento`);
        updateCart(); // Llama a updateCart para actualizar el total con el descuento
    } else {
        alert('Cupón no válido');
        discount = 0; // Restablecer el descuento si el cupón es inválido
    }
}

// Función para actualizar el carrito
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
    cart = []; // Vaciamos el array del carrito
    updateCart(); // Actualizamos la vista del carrito
    toggleCart(); // Cerramos la barra lateral del carrito (opcional)
}

// Función para proceder al checkout
function checkout() {
    let total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Aplicar descuento si existe
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

    const whatsappLink = `https://wa.me/573227737273?text=${encodeURIComponent(message)}`;
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
document.addEventListener('DOMContentLoaded', function() {
    updateCart(); // Verifica el estado del carrito al cargar la página
});

// Integración del botón animado "button-bird"
document.addEventListener("DOMContentLoaded", function() {
    const carouselItems = document.querySelectorAll('.carousel-open');
    const indicators = document.querySelectorAll('.carousel-bullet');
    let currentIndex = 0;

    function updateIndicators() {
        indicators.forEach((bullet, index) => {
            if (index === currentIndex) {
                bullet.style.color = "black"; // Activo
            } else {
                bullet.style.color = "rgb(231, 231, 231)"; // Inactivo
            }
        });
    }

    function showNextSlide() {
        carouselItems[currentIndex].checked = false; // Desactivar la diapositiva actual
        currentIndex = (currentIndex + 1) % carouselItems.length; // Incrementar índice
        carouselItems[currentIndex].checked = true; // Activar la nueva diapositiva
        updateIndicators(); // Actualizar los indicadores
    }

    setInterval(showNextSlide, 5000); // Cambia de diapositiva cada 5 segundos

    updateIndicators(); // Inicializa los indicadores
});

// Código de los Filtros
function toggleFilters(event) {
    event.preventDefault();
    const filterDropdown = document.getElementById('filter-dropdown');
    filterDropdown.classList.toggle('hidden');
}

function filterProductsByCategory(category) {
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        if (category === 'all' || product.getAttribute('data-category') === category) {
            product.style.display = 'flex'; // Mostrar el producto
        } else {
            product.style.display = 'none'; // Ocultar el producto
        }
    });

    // Ocultar el menú desplegable después de seleccionar una categoría
    toggleFilters();
}

// Función para alternar la barra de búsqueda y el menú de filtros
function toggleSearch() {
    const searchInput = document.getElementById('search-input');
    const filterDropdown = document.getElementById('filter-dropdown');
    const filterButton = document.querySelector('button[onclick="toggleFilters(event)"]');
    
    if (searchInput.classList.contains('hidden')) {
        // Mostrar la barra de búsqueda y ocultar el botón de filtro
        searchInput.classList.remove('hidden');
        filterDropdown.classList.add('hidden');
        filterButton.classList.add('hidden');
        searchInput.focus(); // Colocar el foco en el campo de búsqueda
    } else {
        // Ocultar la barra de búsqueda y mostrar el botón de filtro
        searchInput.classList.add('hidden');
        filterButton.classList.remove('hidden');
    }
}

// Función para manejar el evento de presionar una tecla en el campo de búsqueda
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        searchFunction(); // Ejecutar la búsqueda cuando se presiona "Enter"
    }
}

// Función para buscar productos en la página
function searchFunction() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const productName = product.querySelector('p').textContent.toLowerCase();

        if (productName.includes(searchTerm)) {
            product.style.display = 'flex'; // Mostrar el producto si coincide con el término de búsqueda
        } else {
            product.style.display = 'none'; // Ocultar el producto si no coincide
        }
    });
}

function showCheckmark(button) {
    const checkmark = button.querySelector('.checkmark');
    const buttonText = button.querySelector('span.relative.z-10');

    // Ocultar el texto del botón y mostrar el checkmark
    buttonText.style.opacity = '0';
    checkmark.style.opacity = '1';

    // Realizar la acción de checkout
    checkout();

    // Restablecer el botón después de 2 segundos
    setTimeout(() => {
        checkmark.style.opacity = '0';
        buttonText.style.opacity = '1';
    }, 2000);
}

let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-open');
const totalSlides = slides.length;

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    slides[currentIndex].checked = true;
}

setInterval(nextSlide, 5000);
