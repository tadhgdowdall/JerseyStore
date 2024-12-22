

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
    
    products.forEach(product => {

      console.log(`ID: ${product.id}`);
      console.log(`Name: ${product.name}`);
      console.log(`Price: $${product.price}`);
      console.log(`Image: ${product.image}`);
      console.log(`Stock: ${product.stock}`);
      // Create the card for each product
      const cardHTML = ` ${product.id}
        <div class="col-md-6" style="width: 100%;">
          <div class="card mb-3 cardContainer">
            <div class="row g-0">
              <!-- Left Column with Image -->
              <div class="col-md-4">
                <img src="${product.image}" class="img-fluid rounded-start" alt="${product.name}">
              </div>
              <!-- Right Column with Card Content -->
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">
                    Available stock: ${product.stock}
                  </p>
                  <p class="jerseyPrice">€${product.price}</p>
                  <a href="#" id="addToCartButton" class="btn btn-primary d-flex justify-content-center add-to-cart m-0">Add To Cart</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      // Append the card to the container
      productCardsContainer.innerHTML += cardHTML;
    });
  })
  .catch(error => console.error('Error fetching the product data:', error));


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

