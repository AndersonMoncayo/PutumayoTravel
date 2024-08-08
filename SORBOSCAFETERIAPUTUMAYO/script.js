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

document.querySelectorAll('.card').forEach(card => {
    card.querySelector('.view-product img').addEventListener('click', (event) => {
        event.stopPropagation();
        let productName = card.querySelector('.title strong').textContent;
        let productImage = card.querySelector('.img img').src;
        let productDescription = card.querySelector('.card-footer').textContent;

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

document.querySelectorAll('.card .add-to-cart img').forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        let productCard = event.target.closest('.card');
        let productName = productCard.querySelector('.title strong').textContent;
        let productPrice = productCard.dataset.price; // Obtener el precio del dataset
        let productImage = productCard.querySelector('.img img').src;
        let productFlavor = productCard.querySelector('.flavor-dropdown') ? productCard.querySelector('.flavor-dropdown').value : '';

        // Aplica el efecto de rebote al botón
        button.classList.add('bounce');
        setTimeout(() => {
            button.classList.remove('bounce');
            addToCart(productName, productPrice, productImage, productFlavor);
        }, 500); // Duración del efecto de rebote
    });
});

categoryFilter.addEventListener('change', filterProducts);
priceFilter.addEventListener('change', sortProducts);

function addToCart(productName, productPrice, productImage, productFlavor) {
    let existingProduct = cart.find(item => item.name === productName && item.flavor === productFlavor);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({name: productName, price: parseInt(productPrice), image: productImage, flavor: productFlavor, quantity: 1});
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
                    <span>${item.name} ${item.flavor ? '- ' + item.flavor : ''} - COP ${item.price.toLocaleString()} x </span>
                    <div class="quantity-controls">
                        <button onclick="decreaseQuantity('${item.name}', '${item.flavor}')">-</button>
                        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', '${item.flavor}', this.value)">
                        <button onclick="increaseQuantity('${item.name}', '${item.flavor}')">+</button>
                    </div>
                </div>
            </div>`;
        let removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.addEventListener('click', () => removeFromCart(item.name, item.flavor));
        li.appendChild(removeButton);
        cartItems.appendChild(li);
    });

    // Display total price
    let totalDisplay = document.createElement('li');
    totalDisplay.innerHTML = `<strong>Total: COP ${total.toLocaleString()}</strong>`;
    cartItems.appendChild(totalDisplay);
}

function increaseQuantity(productName, productFlavor) {
    let product = cart.find(item => item.name === productName && item.flavor === productFlavor);
    if (product) {
        product.quantity += 1;
        updateCart();
    }
}

function decreaseQuantity(productName, productFlavor) {
    let product = cart.find(item => item.name === productName && item.flavor === productFlavor);
    if (product && product.quantity > 1) {
        product.quantity -= 1;
    } else {
        cart = cart.filter(item => !(item.name === productName && item.flavor === productFlavor));
    }
    updateCart();
}

function updateQuantity(productName, productFlavor, newQuantity) {
    let product = cart.find(item => item.name === productName && item.flavor === productFlavor);
    if (product) {
        product.quantity = parseInt(newQuantity);
        updateCart();
    }
}

function removeFromCart(productName, productFlavor) {
    cart = cart.filter(item => !(item.name === productName && item.flavor === productFlavor));
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
        message += `${item.name} ${item.flavor ? '- ' + item.flavor : ''} - COP ${item.price.toLocaleString()} x ${item.quantity}\n`;
    });
    message += `Total: COP ${total.toLocaleString()}\n`; // Add total to message
    message += `Método de entrega: ${deliveryOption === 'local' ? 'Recoger en Local' : 'Domicilio'}\n`;
    if (deliveryOption === 'domicilio') {
        message += `Ubicación: ${location}\n`;
    }
    const whatsappLink = `https://wa.me/573227736533?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
}

function toggleCart() {
    cartSidebar.classList.toggle('show');
    overlay.classList.toggle('show');
}

// Event listener for the cart icon with bounce effect
document.querySelector('.cart').addEventListener('click', function() {
    toggleCart();
    this.classList.add('bounce');
    setTimeout(() => this.classList.remove('bounce'), 500); // Duración del efecto de rebote
});

function filterProducts() {
    const category = categoryFilter.value;
    const productCards = document.querySelectorAll('.card');

    productCards.forEach(card => {
        if (category === 'all' || card.querySelector('.badge').textContent.toLowerCase() === category) {
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
    const products = Array.from(document.querySelectorAll('.card')).filter(card => card.style.display !== 'none');

    products.sort((a, b) => {
        const priceA = parseInt(a.dataset.price);
        const priceB = parseInt(b.dataset.price);

        return order === 'asc' ? priceA - priceB : priceB - priceA;
    });

    // Append sorted products to grid
    products.forEach(product => productGrid.appendChild(product));
}

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

function showAddToCartButton(selectElement) {
    const addToCartButton = selectElement.nextElementSibling;
    if (selectElement.value) {
        addToCartButton.style.display = 'flex';
        addToCartButton.onclick = function() {
            const productName = selectElement.closest('.card').querySelector('.title strong').textContent;
            const productPrice = selectElement.closest('.card').dataset.price;
            const productImage = selectElement.closest('.card').querySelector('.img img').src;
            addToCart(productName, productPrice, productImage, selectElement.value);
        };
    } else {
        addToCartButton.style.display = 'none';
    }
}

document.querySelectorAll('.card').forEach(card => {
    let productName = card.querySelector('.title strong').textContent;
    if ((productName === 'Jugo en agua' || productName === 'Jugo en leche') && !card.querySelector('.flavor-dropdown')) {
        let options = ['Tomate de árbol', 'Guanábana', 'Maracuyá', 'Maracumango'];
        let dropdown = createDropdownMenu(productName, options);
        let dropdownContainer = card.querySelector('.back-content');
        dropdownContainer.insertBefore(dropdown, dropdownContainer.firstChild);
        dropdown.addEventListener('change', function() {
            showAddToCartButton(this);
        });
    }

    // Añadir el evento de clic en toda la tarjeta para abrir el dropdown
    card.addEventListener('click', function(event) {
        if (!event.target.classList.contains('flavor-dropdown') && !event.target.closest('.add-to-cart')) {
            let dropdown = card.querySelector('.flavor-dropdown');
            if (dropdown) {
                dropdown.focus(); // Enfocar en el dropdown para abrirlo
            }
        }
    });

    // Prevenir que el evento se propague cuando se haga clic en el dropdown
    card.querySelectorAll('.flavor-dropdown, .add-to-cart').forEach(element => {
        element.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    });
});
