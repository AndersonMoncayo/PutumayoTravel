let cart = [];
let cartCount = document.getElementById('cart-count');
let cartItems = document.getElementById('cart-items');
let cartSidebar = document.getElementById('cart-sidebar');
let overlay = document.getElementById('overlay');

document.querySelectorAll('.product-card button').forEach(button => {
    button.addEventListener('click', (event) => {
        let productCard = event.target.closest('.product-card');
        let productName = productCard.getAttribute('data-product');
        let productPrice = productCard.getAttribute('data-price');
        let productImage = productCard.getAttribute('data-image');
        let productIndicator = productCard.getAttribute('data-indicator');
        
        addToCart(productName, productPrice, productImage, productIndicator);
    });
});

function addToCart(productName, productPrice, productImage, productIndicator) {
    let existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({name: productName, price: productPrice, image: productImage, indicator: productIndicator, quantity: 1});
    }
    updateCart();
}

function updateCart() {
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartItems.innerHTML = '';
    cart.forEach(item => {
        let li = document.createElement('li');
        li.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <span>${item.name} - ₹${item.price} x </span>
                    <div class="quantity-controls">
                        <button onclick="decreaseQuantity('${item.name}')">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseQuantity('${item.name}')">+</button>
                    </div>
                </div>
            </div>`;
        let removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeFromCart(item.name));
        li.appendChild(removeButton);
        cartItems.appendChild(li);
    });
}

function increaseQuantity(productName) {
    let product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += 1;
        updateCart();
    }
}

function decreaseQuantity(productName) {
    let product = cart.find(item => item.name === productName);
    if (product && product.quantity > 1) {
        product.quantity -= 1;
    } else {
        cart = cart.filter(item => item.name !== productName);
    }
    updateCart();
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
    let message = "Order details:\n";
    cart.forEach(item => {
        message += `${item.name} (ID: ${item.indicator}) - ₹${item.price} x ${item.quantity}\n`;
    });
    const whatsappLink = `https://wa.me/573227737273?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
}

function toggleCart() {
    cartSidebar.classList.toggle('show');
    overlay.classList.toggle('show');
}
