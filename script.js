

const cart = [];

const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

const searchInput = document.getElementById("searchInput");
const products = document.querySelectorAll(".product-card");
const categoryButtons = document.querySelectorAll(".category-btn");

const themeBtn = document.getElementById("themeBtn");

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

let selectedCategory = "all";


/* =========================================
   MOBILE NAVIGATION
========================================= */

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


/* =========================================
   CART OPEN / CLOSE
========================================= */

function openCart() {

    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeCartSidebar() {

    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");

    document.body.style.overflow = "";

}


cartBtn.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartSidebar);

cartOverlay.addEventListener("click", closeCartSidebar);


/* =========================================
   ADD TO CART
========================================= */

document.querySelectorAll(".order-btn").forEach(button => {

    button.addEventListener("click", () => {

        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                id,
                name,
                price,
                quantity: 1
            });

        }

        updateCart();

        showToast(`${name} added to cart!`);

    });

});


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <span>🛒</span>
                <h3>Your cart is empty</h3>
                <p>Add some delicious cakes!</p>
            </div>
        `;

        cartCount.textContent = "0";
        cartTotal.textContent = "₹0";

        return;
    }


    let total = 0;
    let totalQuantity = 0;


    cart.forEach(item => {

        total += item.price * item.quantity;
        totalQuantity += item.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <img
                class="cart-item-image"
                src="${getProductImage(item.id)}"
                alt="${item.name}"
            >

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <strong>₹${item.price}</strong>

                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity('${item.id}', -1)"
                    >
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        onclick="changeQuantity('${item.id}', 1)"
                    >
                        +
                    </button>

                    <button
                        class="remove-item"
                        onclick="removeFromCart('${item.id}')"
                    >
                        Remove
                    </button>

                </div>

            </div>
        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent = totalQuantity;

    cartTotal.textContent = `₹${total}`;

}


/* =========================================
   PRODUCT IMAGE
========================================= */

function getProductImage(id) {

    const images = {

        "1": "pexels-photo-4110007.jpeg",

        "2": "pexels-polina-tankilevitch-4109996.jpg",

        "3": "premium_photo-1690214491960-d447e38d0bd0.jpeg",

        "4": "premium_photo-1670445426823-db5647af73ff.jpeg"

    };

    return images[id];

}


/* =========================================
   CHANGE QUANTITY
========================================= */

function changeQuantity(id, change) {

    const item = cart.find(item => item.id === id);

    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        const index = cart.findIndex(item => item.id === id);

        cart.splice(index, 1);

    }


    updateCart();

}


/* =========================================
   REMOVE FROM CART
========================================= */

function removeFromCart(id) {

    const index = cart.findIndex(item => item.id === id);

    if (index !== -1) {

        const removedItem = cart[index];

        cart.splice(index, 1);

        updateCart();

        showToast(`${removedItem.name} removed from cart`);

    }

}


/* =========================================
   TOAST MESSAGE
========================================= */

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("active");


    setTimeout(() => {

        toast.classList.remove("active");

    }, 2500);

}


/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener("input", filterProducts);


function filterProducts() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    let visibleProducts = 0;


    products.forEach(product => {

        const name =
            product.dataset.name.toLowerCase();

        const category =
            product.dataset.category.toLowerCase();


        const matchesSearch =
            name.includes(searchText);


        const matchesCategory =
            selectedCategory === "all" ||
            category.includes(selectedCategory);


        if (matchesSearch && matchesCategory) {

            product.style.display = "";

            visibleProducts++;

        } else {

            product.style.display = "none";

        }

    });


    const noResults =
        document.getElementById("noResults");


    if (visibleProducts === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


/* =========================================
   CATEGORY FILTER
========================================= */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        selectedCategory =
            button.dataset.category;


        filterProducts();

    });

});


/* =========================================
   FAVORITES
========================================= */

document.querySelectorAll(".favorite-btn").forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("active");


        if (button.classList.contains("active")) {

            button.textContent = "♥";

            showToast("Added to favorites ❤️");

        } else {

            button.textContent = "♡";

            showToast("Removed from favorites");

        }

    });

});


/* =========================================
   DARK MODE
========================================= */

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");


    if (document.body.classList.contains("dark")) {

        themeBtn.textContent = "☀️";

        localStorage.setItem("reestarTheme", "dark");

    } else {

        themeBtn.textContent = "🌙";

        localStorage.setItem("reestarTheme", "light");

    }

});


/* =========================================
   LOAD SAVED THEME
========================================= */

const savedTheme =
    localStorage.getItem("reestarTheme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";

}


/* =========================================
   CONTACT FORM VALIDATION
========================================= */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", event => {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();


    const nameError =
        document.getElementById("nameError");

    const emailError =
        document.getElementById("emailError");

    const messageError =
        document.getElementById("messageError");


    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";


    let valid = true;


    /* NAME */

    if (name === "") {

        nameError.textContent =
            "Please enter your name.";

        valid = false;

    } else if (name.length < 3) {

        nameError.textContent =
            "Name must contain at least 3 characters.";

        valid = false;

    }


    /* EMAIL */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (email === "") {

        emailError.textContent =
            "Please enter your email.";

        valid = false;

    } else if (!emailPattern.test(email)) {

        emailError.textContent =
            "Please enter a valid email.";

        valid = false;

    }


    /* MESSAGE */

    if (message === "") {

        messageError.textContent =
            "Please enter your message.";

        valid = false;

    } else if (message.length < 10) {

        messageError.textContent =
            "Message must contain at least 10 characters.";

        valid = false;

    }


    /* SUCCESS */

    if (valid) {

        showToast("Message sent successfully! 📩");

        contactForm.reset();

    }

});


/* =========================================
   CHECKOUT
========================================= */

const checkoutBtn =
    document.getElementById("checkoutBtn");


checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        showToast("Your cart is empty!");

        return;

    }


    showToast("Order placed successfully! 🎉");


    cart.length = 0;

    updateCart();


    setTimeout(() => {

        closeCartSidebar();

    }, 800);

});


/* =========================================
   INITIAL CART
========================================= */

updateCart();

