document.addEventListener('DOMContentLoaded', () => {
  let cart = []; // Store cart items

  // Load cart from localStorage on page load
  function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
    } else {
      cart = [];
    }
    updateCartCount(); // Ensure cart count is updated on load
  }

  // Save cart to localStorage
  function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Update cart count in the header
  function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = cart.length;
    }
  }

  // Fetch the product data from the JSON file and render product cards
  fetch('products.json')
    .then((response) => response.json())
    .then((products) => {
      const productCardsContainer = document.getElementById('productCards');

      let productHTML = '';
      products.forEach((product) => {
        productHTML += `
        <div class="col-md-6" style="width: 100%;">
          <div class="card mb-3 cardContainer">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${product.image}" class="img-fluid rounded-start" alt="${product.name}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">
                    ${product.description}<br>
                    Available stock: ${product.stock}
                  </p> 
                  <p class="jerseyPrice">€${product.price}</p>
                  <a href="#" class="btn btn-primary add-to-cart m-0" 
                    data-id="${product.id}" 
                    data-name="${product.name}" 
                    data-price="${product.price}" 
                    data-image="${product.image}" 
                    data-stock="${product.stock}" 
                    data-desc="${product.description}">
                    Add To Cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      });

      productCardsContainer.innerHTML = productHTML;

      // Add event listeners to "Add to Cart" buttons
      const addToCartButtons = document.querySelectorAll('.add-to-cart');
      addToCartButtons.forEach((button) => {
        button.addEventListener('click', addToCart);
      });
    })
    .catch((error) => console.error('Error fetching product data:', error));

  // Function to add an item to the cart
  function addToCart(event) {


    const button = event.target; // Get the clicked button
    const productId = button.dataset.id; // Extract product ID

    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.id === productId);

    if (existingProduct) {
      alert('This product is already in the cart!');
      return;
    }

    // Extract product details from the button's dataset
    const productName = button.dataset.name;
    const productPrice = parseFloat(button.dataset.price);
    const productImage = button.dataset.image;
    const productStock = parseInt(button.dataset.stock);
    const productDescription = button.dataset.desc;

    // Add product to the cart
    const cartItem = {
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      stock: productStock,
      description: productDescription,
      quantity: 1, // Start with quantity 1
    };

    cart.push(cartItem);

    // Save to localStorage
    saveCartToLocalStorage();

    // Update cart count
    updateCartCount();

    // Notify user
    alert(`${productName} added to the cart!`);
  }

  // Function to update the cart display in cart.html
  function updateCartUI() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalContainer = document.getElementById('cartTotal');

    if (!cartItemsContainer || !cartTotalContainer) {
      // Exit if the elements are not found
      return;
    }

    // Clear the existing cart display
    cartItemsContainer.innerHTML = '';

    let total = 0;

    // Loop through cart items and create HTML for each item
    cart.forEach((item) => {
      const cartItemHTML = `
      <div class="col-md-4" style="width: 100%;">
        <div class="card mb-3 cardContainer">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">
                  ${item.description}<br>
                  Available stock: ${item.stock}
                </p> 
                <p class="jerseyPrice">€${item.price}</p>
                <button class="btn btn-danger remove-from-cart" data-id="${item.id}">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
      cartItemsContainer.innerHTML += cartItemHTML;
      total += item.price * item.quantity;
    });

    // Display total price
    cartTotalContainer.innerHTML = `<h4 style="margin-left:3.2em; padding:0;">Total: €${total.toFixed(2)}</h4>`;

    // Add event listeners for "Remove" buttons
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach((button) => {
      button.addEventListener('click', removeFromCart);
    });
  }

  // Function to remove an item from the cart
  function removeFromCart(event) {
    const button = event.target;
    const productId = button.dataset.id;

    // Remove the item from the cart array
    cart = cart.filter((item) => item.id !== productId);

    // Save to localStorage
    saveCartToLocalStorage();

    // Update cart count
    updateCartCount();

    // Update the cart display
    updateCartUI();

    alert('Item removed from the cart!');
  }

  // Load cart from localStorage on page load
  loadCartFromLocalStorage();
  updateCartUI(); // Ensure cart UI is updated on load
});
