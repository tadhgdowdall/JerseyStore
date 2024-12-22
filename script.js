

// // Following code is used to change price of jerseys by just changing jerseyPrice once, rather than repeatedly changing each jersey manually
// let jerseyPrice = "€100";
// function changeJerseyPrice () { 
//     const jerseyPriceElements = document.querySelectorAll(".jerseyPrice");

//     jerseyPriceElements.forEach(element => {
//         element.textContent = jerseyPrice;

        
//     });


// }

// changeJerseyPrice();



// the following code is testing how to use json and implement it into the store

// fetching data from json
// Fetch the product data from the JSON file
fetch('products.json')
  .then(response => response.json())
  .then(products => {
    const productCardsContainer = document.getElementById('productCards');

    let productHTML = '';
    products.forEach(product => {
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
    addToCartButtons.forEach(button => {
      button.addEventListener('click', addToCart);
    });
  })
  .catch(error => console.error('Error fetching product data:', error));



  // Working on updating cart items 

  const cartCountElement = document.getElementById("cart-count");
  let cartCount = 0;
  
  const addToCartBtn = document.querySelectorAll(".add-to-cart")
  
  function IncreaseCart (){
      cartCount++;
      cartCountElement.textContent = cartCount;
  }
  
  addToCartBtn.forEach((button) => {
      button.addEventListener("click", IncreaseCart);
  });
  




let cart = []; // Store cart items


// Function to add an item to the cart
function addToCart(event) {
  event.preventDefault(); // Prevent default link behavior

  const button = event.target; // Get the clicked button
  const productId = button.dataset.id; // Extract product ID

  // Check if the product is already in the cart
  const existingProduct = cart.find(item => item.id === productId);

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

  // Update cart count
  const cartCountElement = document.getElementById('cart-count');
  cartCountElement.textContent = cart.length;

  // Notify user and update the UI
  alert(`${productName} added to the cart!`);
  updateCartUI(); // Update the cart display
}


// Function to update the cart display in cart.html
function updateCartUI() {
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotalContainer = document.getElementById('cartTotal');

  // Clear the existing cart display
  cartItemsContainer.innerHTML = '';

  let total = 0;

  // Loop through cart items and create HTML for each item
  cart.forEach(item => {
    const cartItemHTML = `
      <div class="cart-item d-flex align-items-center mb-3">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3" style="width: 100px;">
        <div class="cart-item-details flex-grow-1">
          <h5>${item.name}</h5>
          <p>${item.description}</p>
          <p>Price: €${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
        </div>
        <button class="btn btn-danger remove-from-cart" data-id="${item.id}">Remove</button>
      </div>
    `;
    cartItemsContainer.innerHTML += cartItemHTML;
    total += item.price * item.quantity;
  });

  // Display total price
  cartTotalContainer.innerHTML = `<h4>Total: €${total.toFixed(2)}</h4>`;

  // Add event listeners for "Remove" buttons
  const removeButtons = document.querySelectorAll('.remove-from-cart');
  removeButtons.forEach(button => {
    button.addEventListener('click', removeFromCart);
  });
}

// Function to remove an item from the cart
function removeFromCart(event) {
  const button = event.target;
  const productId = button.dataset.id;

  // Remove the item from the cart array
  cart = cart.filter(item => item.id !== productId);

  // Update cart count
  const cartCountElement = document.getElementById('cart-count');
  cartCountElement.textContent = cart.length;

  // Update the cart display
  updateCartUI();

  alert('Item removed from the cart!');
}

const cartCardHTML = ` ${product.id}
<div class="container">
<div class="card mb-3 cardContainer" style="width: 100%;">
<div class="row g-0">
    <div class="col-md-4">
    <img src="${product.image}" class="img-fluid rounded-start" alt="Jersey">
    </div>
    <div class="col-md-8">
    <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.desc}</p>
        <p class="jerseyPrice">${product.price}</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>

       
    </div>
    </div>
</div>
</div>
</div>
`;

