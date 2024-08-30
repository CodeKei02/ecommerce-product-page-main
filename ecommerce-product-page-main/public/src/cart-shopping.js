const cartBtn = document.querySelector(".cart-btn");
const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const cartContainer = document.querySelector(".cart-content");
const numberOfItems = document.querySelector(".numberOfItems");
const amount = document.querySelector(".amount");
const addToCartButton = document.querySelector(".addToCart");
const purchaseAlert = document.querySelector(".nav-alert");

const priceCart = 125.00;
let count = 0;
let cartTotal;


function onClick(selector, handler) {
  return selector.addEventListener("click", handler);
}

function updateCartDisplay(){
    amount.textContent = count;
}

function addToCart() {
  count++;
  updateCartDisplay();
}

function removeFromCart() {
  count = Math.max(0, count - 1);
  updateCartDisplay();
}

function showCartEmpty() {
  cartContainer.classList.toggle("disabled");
  
  if (count === 0) {
    cartContainer.innerHTML = `
        <p class="cart-title">Cart</p>
        <div class="cart-message">
            <p class="cart-empty-message">Your cart is empty.</p>
        </div>`;
  }
}

function showCart() {
  if (count > 0) {
    cartTotal = parseFloat(priceCart*count).toFixed(2);
    numberOfItems.textContent = count;
    purchaseAlertMessage(purchaseAlert, `${count} added to cart`);
    cartContainer.innerHTML = ` 
        <p class="cart-title">Cart</p>
        <div class="cart-row">
            <img src="../images/image-product-1-thumbnail.jpg" alt="image">
            <div class="cart-article-selected">
                <div class="cart-article-name">
                <p>Fall Limited Edition Sneakers</p>
                <div class="cart-price">$${priceCart.toFixed(2)} x ${count} <span class="cart-total">$${cartTotal}</span></div>
            </div>
            <button class="cart-btn-delete">
                <img src="../images/icon-delete.svg" alt="">
            </button>
            </div>
        </div>
        <button class="cart-btn-checkout">Checkout</button>`;

        let deleteBtn = document.querySelector('.cart-btn-delete');
        let checkoutBtn = document.querySelector('.cart-btn-checkout');
        
        onClick(deleteBtn, deleteCart);
        onClick(checkoutBtn, checkout);
  
    }else{
        purchaseAlertMessage(purchaseAlert, 'You must add something to cart');
  }

}

function deleteCart(){
    count = 0;
    numberOfItems.textContent = "";
    updateCartDisplay();
    purchaseAlertMessage(purchaseAlert, "Items remove from to cart")
    showCartEmpty();
}

function purchaseAlertMessage(purchase, message){
    purchase.innerHTML = message;
    purchase.style.transform = "translateY(100px)";

    const alertTimeout = setInterval(() => {
        purchase.style.transform = "translateY(-100px)";
        clearInterval(alertTimeout);
    }, 2000);
}

function checkout(){
    count = 0;
    numberOfItems.textContent = "";
    purchaseAlertMessage(purchaseAlert, "Thank you for your purchase!");
    updateCartDisplay();
    showCartEmpty();
}

//onClick(cartBtn, emptyCart);
onClick(plus, addToCart);
onClick(minus, removeFromCart);
onClick(addToCartButton, showCart);
onClick(cartBtn, showCartEmpty);
