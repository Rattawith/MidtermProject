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
            const itemName = item.querySelector("h4").innerText;
            const itemPrice = parseFloat(item.querySelector("p").innerText.replace("฿", ""));
            const itemQuantity = parseInt(item.querySelector("input[type='number']").value);

            if (itemQuantity > 0) {
                addToCart(itemName, itemPrice, itemQuantity);
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

    function addToCart(name, price, quantity) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }
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
                    <img src="${item.imageUrl }" alt="${item.name}" class="cart-item-image"/>
                    <h4>${item.name}</h4>
                    <p>฿${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                `;
                cartItemsContainer.appendChild(itemElement);
                total += item.price * item.quantity;
            });
            cartTotalPrice.innerText = `฿${total.toFixed(2)}`;
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
            cart.length = 0;
            updateCartDisplay();
            cartTotalPrice.innerText = "฿0";
            cartSidebar.classList.remove("open");
            overlay.classList.remove("open");
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('srcbar');
    const items = document.querySelectorAll('.item');

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        items.forEach(item => {
            const itemName = item.querySelector('h4').textContent.toLowerCase();
            if (itemName.includes(query)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});