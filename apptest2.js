document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartSidebar = document.getElementById("cart-sidebar");
    const overlay = document.getElementById("overlay");
    const cartIcon = document.getElementById("cart-icon");
    const closeBtn = document.getElementById("close-btn");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalPrice = document.getElementById("cart-total-price");
    const checkoutBtn = document.getElementById("checkout-btn");

    cartIcon.addEventListener("click", () => {
        cartSidebar.classList.add("open");
        overlay.classList.add("open");
    });

    closeBtn.addEventListener("click", () => {
        cartSidebar.classList.remove("open");
        overlay.classList.remove("open");
    });

    overlay.addEventListener("click", () => {
        cartSidebar.classList.remove("open");
        overlay.classList.remove("open");
    });

    document.querySelectorAll(".item button").forEach((button, index) => {
        button.addEventListener("click", () => {
            const item = document.querySelectorAll(".item")[index];
            const itemName = button.getAttribute("data-item-name");
            const itemPrice = parseFloat(button.getAttribute("data-item-price"));
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
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let total = 0; // Initialize total to 0

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>No items in the cart.</p>";
        } else {
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

                // Add event listener for remove button
                itemElement.querySelector('.remove-item').addEventListener('click', () => {
                    removeFromCart(item.name);
                });

                total += item.price * item.quantity; // Update total
            });
            cartTotalPrice.innerText = `฿${total.toFixed(2)}`;
        }
    }

    function removeFromCart(name) {
        const itemIndex = cart.findIndex(item => item.name === name);
        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);
            updateCartDisplay(); // Update cart display after removal
        }
        if (cart.length === 0) {
            cartTotalPrice.innerText = "฿0";
        }
    }

    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            Swal.fire({
                title: "Your cart is empty.",
                icon: "error",
                confirmButtonText: 'Close'
            });
        } else {
            alert("Thank you for your purchase!");
            cart.length = 0; // Clear cart
            updateCartDisplay(); // Update cart display
            cartTotalPrice.innerText = "฿0";
            cartSidebar.classList.remove("open");
            overlay.classList.remove("open");
        }
    });
});


