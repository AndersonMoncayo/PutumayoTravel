<script>
// Inicialización de variables
let cart = []; // Array para almacenar los productos del carrito
let cartCount = document.getElementById('cart-count'); // Elemento para mostrar el número de artículos en el carrito
let cartItems = document.getElementById('cart-items'); // Elemento para mostrar los artículos en el carrito
let cartSidebar = document.getElementById('cart-sidebar'); // Elemento para la barra lateral del carrito
let overlay = document.getElementById('overlay'); // Elemento para el overlay

// Función para añadir productos al carrito
function addToCart(productName, productPrice, productImage) {
    let existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: parseFloat(productPrice), // Usamos parseFloat para manejar precios decimales
            image: productImage,
            quantity: 1
        });
    }
    updateCart(); // Actualizamos la vista del carrito
}

// Función para actualizar la vista del carrito
function updateCart() {
    let total = 0;
    if (cartCount) cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    if (cartItems) {
        cartItems.innerHTML = ''; // Limpiamos el contenido del carrito
        cart.forEach(item => {
            total += item.price * item.quantity;
            let li = document.createElement('li');
            li.innerHTML = `
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto;">
                    <div class="item-details">
                        <span>${item.name} - COP ${item.price.toLocaleString()} x </span>
                        <div class="quantity-controls">
                            <button onclick="decreaseQuantity('${item.name}')">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="increaseQuantity('${item.name}')">+</button>
                        </div>
                    </div>
                </div>`;
            let removeButton = document.createElement('button');
            removeButton.textContent = 'Eliminar';
            removeButton.addEventListener('click', () => removeFromCart(item.name));
            li.appendChild(removeButton);
            cartItems.appendChild(li);
        });

        let totalDisplay = document.createElement('li');
        totalDisplay.innerHTML = `<strong>Total: COP ${total.toLocaleString()}</strong>`;
        cartItems.appendChild(totalDisplay);
    }
}

// Funciones adicionales
function increaseQuantity(productName) {
    let product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += 1;
        updateCart();
    }
}

function decreaseQuantity(productName) {
    let product = cart.find(item => item.name === productName);
    if (product) {
        if (product.quantity > 1) {
            product.quantity -= 1;
        } else {
            removeFromCart(productName);
        }
        updateCart();
    }
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
    toggleCart();
}

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

function toggleCart() {
    if (cartSidebar) cartSidebar.classList.toggle('show');
    if (overlay) overlay.classList.toggle('show');
}

// Event listener para el botón de añadir al carrito
document.querySelectorAll('.add-to-cart-button').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        let productCard = event.target.closest('.product-card');
        if (productCard) {
            let productName = productCard.getAttribute('data-product');
            let productPrice = productCard.getAttribute('data-price');
            let productImage = productCard.getAttribute('data-image');
            addToCart(productName, productPrice, productImage);
        }
    });
});

// Event listener para mostrar el carrito al hacer clic en el icono
let cartIcon = document.getElementById('cart-icon');
if (cartIcon) {
    cartIcon.addEventListener('click', toggleCart);
}
</script>
