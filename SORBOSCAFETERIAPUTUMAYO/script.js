let cart = [];
let cartCount = document.getElementById('cart-count');
let cartItems = document.getElementById('cart-items');
let cartSidebar = document.getElementById('cart-sidebar');
let overlay = document.getElementById('overlay');
let productGrid = document.querySelector('.product-grid');
let categoryFilter = document.getElementById('category-filter');
let priceFilter = document.getElementById('price-filter');

let modal = document.getElementById('productModal');
let modalImage = document.getElementById('modalImage');
let modalTitle = document.getElementById('modalTitle');
let modalDescription = document.getElementById('modalDescription');

function toggleLocationField() {
    const deliveryOption = document.querySelector('input[name="delivery"]:checked').value;
    const locationField = document.getElementById('locationField');
    if (deliveryOption === 'domicilio') {
        locationField.style.display = 'block';
    } else {
        locationField.style.display = 'none';
    }
}

document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
        let productName = card.getAttribute('data-product');
        let productImage = card.getAttribute('data-image');
        let productDescription = card.querySelector('p').textContent;

        modalImage.src = productImage;
        modalTitle.textContent = productName;
        modalDescription.textContent = productDescription;

        modal.style.display = 'block';
    });
});

function closeModal() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

document.querySelectorAll('.product-card button').forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation(); // Evita que el click en el botón cierre el modal
        let productCard = event.target.closest('.product-card');
        let productName = productCard.getAttribute('data-product');
        let productPrice = productCard.getAttribute('data-price');
        let productImage = productCard.getAttribute('data-image');

        // Check for dropdown selection
        let flavorDropdown = productCard.querySelector('.flavor-dropdown');
        if (flavorDropdown) {
            let selectedFlavor = flavorDropdown.value;
            productName += ` (${selectedFlavor})`; // Append selected flavor to product name
        }

        addToCart(productName, productPrice, productImage);
    });
});

categoryFilter.addEventListener('change', filterProducts);
priceFilter.addEventListener('change', sortProducts);

function addToCart(productName, productPrice, productImage) {
    let existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({name: productName, price: parseInt(productPrice), image: productImage, quantity: 1});
    }
    updateCart();
}

function updateCart() {
    let total = 0; // Initialize total
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartItems.innerHTML = '';
    cart.forEach(item => {
        total += item.price * item.quantity; // Calculate total
        let li = document.createElement('li');
        li.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}">
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

    // Display total price
    let totalDisplay = document.createElement('li');
    totalDisplay.innerHTML = `<strong>Total: COP ${total.toLocaleString()}</strong>`;
    cartItems.appendChild(totalDisplay);
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
    let total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0); // Calculate total
    let deliveryOption = document.querySelector('input[name="delivery"]:checked').value;
    let location = document.getElementById('location').value;
    let message = "Hola, me gustaría hacer un pedido, por favor. 😊🍽️:\n";
    cart.forEach(item => {
        message += `${item.name} - COP ${item.price.toLocaleString()} x ${item.quantity}\n`;
    });
    message += `Total: COP ${total.toLocaleString()}\n`; // Add total to message
    message += `Método de entrega: ${deliveryOption === 'local' ? 'Recoger en Local' : 'Domicilio'}\n`;
    if (deliveryOption === 'domicilio') {
        message += `Ubicación: ${location}\n`;
    }
    const whatsappLink = `https://wa.me/573227737273?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
}

function toggleCart() {
    cartSidebar.classList.toggle('show');
    overlay.classList.toggle('show');
}

function filterProducts() {
    const category = categoryFilter.value;
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // Reset sorting when filtering
    priceFilter.value = 'default';
}

function sortProducts() {
    const order = priceFilter.value;
    const products = Array.from(document.querySelectorAll('.product-card')).filter(card => card.style.display !== 'none');

    products.sort((a, b) => {
        const priceA = parseInt(a.getAttribute('data-price'));
        const priceB = parseInt(b.getAttribute('data-price'));

        return order === 'asc' ? priceA - priceB : priceB - priceA;
    });

    // Append sorted products to grid
    products.forEach(product => productGrid.appendChild(product));
}

// Create dropdown lists for flavors and specialties where applicable
function createDropdownMenu(productName, options) {
    let dropdown = document.createElement('select');
    dropdown.className = 'flavor-dropdown';
    options.forEach(option => {
        let opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        dropdown.appendChild(opt);
    });
    return dropdown;
}

// Add dropdown menus for products with multiple options
document.querySelectorAll('.product-card').forEach(card => {
    let productName = card.getAttribute('data-product');
    if (productName === 'Jugo en agua' || productName === 'Jugo en leche') {
        let options = ['Tomate de árbol', 'Guanábana', 'Maracuyá', 'Maracumango'];
        let dropdown = createDropdownMenu(productName, options);
        card.insertBefore(dropdown, card.querySelector('button'));
    }
});
