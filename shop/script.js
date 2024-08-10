// Código del Carrito de Compras
let cart = [];
let cartCount = document.getElementById('cart-count');
let cartItems = document.getElementById('cart-items');
let cartSidebar = document.getElementById('cart-sidebar');
let overlay = document.getElementById('overlay');

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

// Función para actualizar el carrito
function updateCart() {
    let total = 0;
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartItems.innerHTML = '';
    cart.forEach(item => {
        total += item.price * item.quantity;
        let li = document.createElement('li');
        li.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <span>${item.name} - COP ${item.price.toLocaleString()} x </span>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" 
                           onchange="updateQuantity('${item.name}', this.value)">
                </div>
                <button class="delete-btn" onclick="removeFromCart('${item.name}')">
                    <img src="images/trash.svg" alt="Eliminar" style="width: 24px; height: 24px;">
                </button>
            </div>`;
        cartItems.appendChild(li);
    });

    let totalDisplay = document.createElement('li');
    totalDisplay.innerHTML = `<strong>Total: COP ${total.toLocaleString()}</strong>`;
    cartItems.appendChild(totalDisplay);
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
    let message = "Hola, me gustaría hacer un pedido:\n";
    cart.forEach(item => {
        message += `${item.name} - COP ${item.price.toLocaleString()} x ${item.quantity}\n`;
    });
    message += `Total: COP ${total.toLocaleString()}\n`;
    const whatsappLink = `https://wa.me/573227737273?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
}

// Función para alternar la visibilidad del carrito
function toggleCart() {
    cartSidebar.classList.toggle('show');
    overlay.classList.toggle('show');
}

// Event listener para el icono del carrito
document.getElementById('cart-icon').addEventListener('click', toggleCart);

// Integración del botón animado "button-bird"
document.addEventListener("DOMContentLoaded", function(){
    var el = document.querySelector(".button-bird");
    var text = document.querySelector(".button-bird__text");
    el.addEventListener('click', function() {
        el.classList.toggle('active');

        if(el.classList.contains('active')){
            text.innerHTML = 'DONE';
            checkout(); // Llama a la función de checkout cuando se hace clic en el botón
        } else {
            text.innerHTML = 'SEND';
        }
    });
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