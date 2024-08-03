let slideIndex = 0;

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 3500); // Change image every 3.5 seconds
}

document.addEventListener('DOMContentLoaded', showSlides);


// JavaScript for search functionality
function searchProducts() {
    let input = document.getElementById('srcbar').value.toLowerCase();
    let items = document.querySelectorAll('.item, .item--sell');

    items.forEach(item => {
        let itemName = item.querySelector('h4').innerText.toLowerCase();
        if (itemName.includes(input)) {
            item.style.display = '';  // แสดงผลิตภัณฑ์
        } else {
            item.style.display = 'none';  // ซ่อนผลิตภัณฑ์
        }
    });
}


document.addEventListener('DOMContentLoaded', function () {
    const cartIcon = document.getElementById('cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeBtn = document.getElementById('close-btn');
    const overlay = document.getElementById('overlay');
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalPrice = document.getElementById("cart-total-price");
    const checkoutBtn = document.getElementById("checkout-btn");
    const cartCount = document.getElementById("cart-count");

    const cart = [];

    function showCart() {
        cartSidebar.classList.add('open');
        overlay.classList.add('open');
    }

    function hideCart() {
        cartSidebar.classList.remove('open');
        overlay.classList.remove('open');
    }

    cartIcon.addEventListener('click', showCart);
    closeBtn.addEventListener('click', hideCart);
    overlay.addEventListener('click', hideCart);


    document.querySelectorAll(".item button, .item--sell button").forEach((button, i) => {
        button.addEventListener("click", () => {
            const item = document.querySelectorAll(".item, .item--sell")[i];
            const itemName = button.getAttribute("data-item-name");
            const itemPrice = parseFloat(button.getAttribute("data-sell-price")) || parseFloat(button.getAttribute("data-item-price")); 
            const itemQuantity = parseInt(item.querySelector("input[type='number']").value);
            const itemImageUrl = button.getAttribute("data-image-url");

            if (itemQuantity > 0) {
                addToCart(itemName, itemPrice, itemQuantity, itemImageUrl);
                updateCartDisplay();
            } else {
                Swal.fire({
                    title: "Please enter a valid quantity",
                    icon: "question",
                    confirmButtonText: 'Close'
                });
            }
        });
    });

    function addToCart(name, price, quantity, imageUrl) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, quantity, imageUrl });
        }
        updateCartCount();
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>No items in the cart.</p>";
        } else {
            let total = 0;
            cart.forEach(item => {
                const itemElement = document.createElement("div");
                itemElement.classList.add("cart-item");
                itemElement.innerHTML = `
                    <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image" style="width: 50px; height: 50px;"/>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>฿${item.price.toFixed(2)}</p>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                    <button class="remove-item">Remove</button>
                `;
                cartItemsContainer.appendChild(itemElement);
                itemElement.querySelector('.remove-item').addEventListener('click', () => {
                    removeFromCart(item.name);
                });

                total += item.price * item.quantity;
            });
            cartTotalPrice.innerText = `฿${total.toFixed(2)}`;
        }
    }

    function removeFromCart(name) {
        const itemIndex = cart.findIndex(item => item.name === name);
        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);
            updateCartDisplay();
            updateCartCount();
        }
        if (cart.length === 0) {
            cartTotalPrice.innerText = "฿0";
        }
    }

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.innerText = totalItems;
    }

    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            Swal.fire({
                title: "Your cart is empty.",
                icon: "error",
                confirmButtonText: 'Close'
            });
        } else {
            Swal.fire({
                title: "Thank You For Purchase",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            })
            cart.length = 0;
            updateCartDisplay();
            cartTotalPrice.innerText = "฿0";
            hideCart();
            updateCartCount();
        }
    });
});
