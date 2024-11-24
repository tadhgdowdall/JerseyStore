

// Add to cart buttons and updating number of items in cart 
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



// Following code is used to change price of jerseys by just changing jerseyPrice once, rather than repeatedly changing each jersey manually
let jerseyPrice = "€100";
function changeJerseyPrice () { 
    const jerseyPriceElements = document.querySelectorAll(".jerseyPrice");

    jerseyPriceElements.forEach(element => {
        element.textContent = jerseyPrice;

        
    });


}

changeJerseyPrice();


// fetching data from json

fetch('products.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(product => {
      // Add product to the page dynamically
      console.log(product.name, product.price);
    });
  })
  .catch(error => console.error('Error loading JSON:', error));
