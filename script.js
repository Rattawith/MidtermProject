let slideIndex = 0;

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block"; // ถ้า slideIndex มีค่ามากกว่าจำนวนสไลด์ (slides.length), จะรีเซ็ตค่า slideIndex กลับเป็น 1 เพื่อเริ่มต้นที่สไลด์แรกใหม่.
    setTimeout(showSlides, 3500); // ทำการเปลี่ยนรูปทุกๆ 3.5 วินาที
}
document.addEventListener('DOMContentLoaded', showSlides);


function searchProducts() {
    let input = document.getElementById('srcbar').value.toLowerCase(); // ดึงค่าที่ผู้ใช้งานกรอกในช่องค้นหาและทำการแปลงข้อความให้เป็นตัวอักษรเล็กทั้งหมด
    let items = document.querySelectorAll('.item, .item--sell');

    items.forEach(item => {
        let itemName = item.querySelector('h4').innerText.toLowerCase(); // ทำการเลือกข้อความในส่วนของ h4 และแปลงข้อความเป็นตัวอักษรเล็กทั้งหมด
        if (itemName.includes(input)) {
            item.style.display = '';  // หากข้อความที่กรอกลงไปเป็นจริงจะทำการโชว์สินค้านั้นๆ
        } else {
            item.style.display = 'none';  // หากข้อความที่กรอกลงไปเป็นเท็จจะทำการซ่อนสินค้านั้นๆ
        }
    });
}


document.addEventListener('DOMContentLoaded', function () {
    // เริ่มต้นเมื่อ DOM ถูกโหลดอย่างสมบูรณ์

    const cartIcon = document.getElementById('cart-icon'); // อ้างอิงไปยังไอคอนของตะกร้าสินค้า
    const cartSidebar = document.getElementById('cart-sidebar'); // อ้างอิงไปยังแถบด้านข้างของตะกร้าสินค้า
    const closeBtn = document.getElementById('close-btn'); // อ้างอิงไปยังปุ่มปิดแถบด้านข้าง
    const overlay = document.getElementById('overlay'); // อ้างอิงไปยังชั้นโปร่งแสงที่อยู่ด้านหลังแถบด้านข้าง
    const cartItemsContainer = document.getElementById("cart-items"); // อ้างอิงไปยังพื้นที่แสดงรายการสินค้าในตะกร้า
    const cartTotalPrice = document.getElementById("cart-total-price"); // อ้างอิงไปยังพื้นที่แสดงราคารวมของสินค้าในตะกร้า
    const checkoutBtn = document.getElementById("checkout-btn"); // อ้างอิงไปยังปุ่ม checkout
    const cartCount = document.getElementById("cart-count"); // อ้างอิงไปยังตัวนับจำนวนสินค้าในตะกร้า

    const cart = []; // สร้าง array เพื่อเก็บรายการสินค้าในตะกร้า

    function showCart() {
        // ฟังก์ชันแสดงแถบด้านข้างของตะกร้าสินค้า
        cartSidebar.classList.add('open');
        overlay.classList.add('open');
    }

    function hideCart() {
        // ฟังก์ชันซ่อนแถบด้านข้างของตะกร้าสินค้า
        cartSidebar.classList.remove('open');
        overlay.classList.remove('open');
    }

    cartIcon.addEventListener('click', showCart); // เพิ่ม event listener เพื่อแสดงแถบด้านข้างเมื่อคลิกไอคอนตะกร้า
    closeBtn.addEventListener('click', hideCart); // เพิ่ม event listener เพื่อซ่อนแถบด้านข้างเมื่อคลิกปุ่มปิด
    overlay.addEventListener('click', hideCart); // เพิ่ม event listener เพื่อซ่อนแถบด้านข้างเมื่อคลิกที่ overlay

    document.querySelectorAll(".item button, .item--sell button").forEach((button, i) => {
        // เพิ่ม event listener ให้กับปุ่ม "Add to Cart" ของแต่ละสินค้า

        button.addEventListener("click", () => {
            // เมื่อคลิกปุ่ม "Add to Cart" 

            const item = document.querySelectorAll(".item, .item--sell")[i]; // ค้นหาองค์ประกอบสินค้าด้วยคลาส .item หรือ .item--sell ที่ตรงกับลำดับ (i) ของปุ่มที่คลิก
            const itemName = button.getAttribute("data-item-name"); // ดึงชื่อสินค้าจาก attribute
            const itemPrice = parseFloat(button.getAttribute("data-sell-price")) || parseFloat(button.getAttribute("data-item-price"));
            // ดึงราคาสินค้า โดยเลือก sell-price ก่อน item-price และแปลงค่าเป็นตัวเลขทศนิยมสำหรับการคำนวณราคา
            const itemQuantity = parseInt(item.querySelector("input[type='number']").value); // ดึงจำนวนสินค้าจาก input ที่ผู้ใช้กรอกเข้ามา และแปลงค่าเป็นตัวเลขจำนวนเต็ม
            const itemImageUrl = button.getAttribute("data-image-url"); // ดึง URL ของรูปภาพสินค้าจาก attribute

            if (itemQuantity > 0) {
                // หากจำนวนสินค้ามากกว่า 0 ให้เพิ่มสินค้าไปยังตะกร้า
                addToCart(itemName, itemPrice, itemQuantity, itemImageUrl);
                updateCartDisplay(); // อัปเดตการแสดงผลของตะกร้าสินค้า
            } else {
                // หากจำนวนสินค้าน้อยกว่า 0 ให้แสดง alert
                Swal.fire({
                    title: "Please enter a valid quantity",
                    icon: "question",
                    confirmButtonText: 'Close',
                    confirmButtonColor: '#06b4e3',
                });
            }
        });
    });

    function addToCart(name, price, quantity, imageUrl) {
        // ฟังก์ชันเพิ่มสินค้าไปยังตะกร้า
        const existingItem = cart.find(item => item.name === name); // ตรวจสอบว่าสินค้านี้มีอยู่ในตะกร้าแล้วหรือไม่
        if (existingItem) {
            existingItem.quantity += quantity; // ถ้ามีอยู่แล้ว ให้เพิ่มจำนวนสินค้า
        } else {
            cart.push({ name, price, quantity, imageUrl }); // ถ้าไม่มี ให้เพิ่มสินค้าลงในตะกร้า
        }
        updateCartCount(); // อัปเดตตัวนับจำนวนสินค้าในตะกร้า
    }

    function updateCartDisplay() {
        // ฟังก์ชันอัปเดตการแสดงผลของตะกร้าสินค้า
        cartItemsContainer.innerHTML = ""; // ล้างเนื้อหาปัจจุบันของตะกร้า
        if (cart.length === 0) {
            // ถ้าตะกร้าว่าง ให้แสดงข้อความ No items in the cart
            cartItemsContainer.innerHTML = "<p>No items in the cart.</p>";
        } else {
            let total = 0; // สร้างตัวแปรเก็บราคารวม
            cart.forEach(item => {
                // วนลูปเพื่อแสดงสินค้าทั้งหมดในตะกร้า
                const itemElement = document.createElement("div"); // สร้าง div สำหรับสินค้าแต่ละชิ้น
                itemElement.classList.add("cart-item");
                itemElement.innerHTML = `
                    <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image" style="width: 50px; height: 50px;"/>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>฿${item.price.toFixed(2)}</p>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                    <button class="remove-item">Remove</button>
                `; // เพิ่มปุ่ม "Remove" สำหรับลบสินค้าออกจากตะกร้า.
                cartItemsContainer.appendChild(itemElement); // เพิ่มสินค้าในตะกร้าลงใน container
                itemElement.querySelector('.remove-item').addEventListener('click', () => {
                    removeFromCart(item.name); // เพิ่ม event listener ให้ปุ่มลบสินค้า
                });

                total += item.price * item.quantity; // ในการวนลูป cart จะคำนวณราคารวมโดยการคูณราคาสินค้ากับจำนวนสินค้า แล้วบวกเข้าไปในตัวแปร total
            });
            cartTotalPrice.innerText = `฿${total.toFixed(2)}`; // แสดงราคารวมของสินค้า
        }
    }

    function removeFromCart(name) {
        // ฟังก์ชันลบสินค้าจากตะกร้า
        const itemIndex = cart.findIndex(item => item.name === name); // ค้นหาสินค้าที่ต้องการลบ
        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1); // ลบสินค้าออกจากตะกร้า
            updateCartDisplay(); // อัปเดตการแสดงผลของตะกร้า
            updateCartCount(); // อัปเดตตัวนับจำนวนสินค้าในตะกร้า
        }
        if (cart.length === 0) {
            cartTotalPrice.innerText = "฿0"; // หากตะกร้าว่าง ให้ราคารวมเป็น 0
        }
    }

    function updateCartCount() {
        // ฟังก์ชันอัปเดตตัวนับจำนวนสินค้าในตะกร้า
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); // คำนวณจำนวนสินค้าทั้งหมดในตะกร้า
        cartCount.innerText = totalItems; // อัปเดตตัวนับในหน้าจอ
    }

    checkoutBtn.addEventListener("click", () => {
        // ฟังก์ชันการทำงานเมื่อกดปุ่ม checkout
        if (cart.length === 0) {
            // ถ้าตะกร้าว่าง ให้แสดง alert
            Swal.fire({
                title: "Your cart is empty.",
                icon: "error",
                confirmButtonText: 'Close',
                confirmButtonColor: '#f94622',
            });
        } else {
            // ถ้ามีสินค้าในตะกร้า ให้แสดงข้อความขอบคุณ และล้างตะกร้า
            Swal.fire({
                title: "Thank You For Purchase",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            });
            cart.length = 0; // ล้างรายการในตะกร้า
            updateCartDisplay(); // อัปเดตการแสดงผล
            cartTotalPrice.innerText = "฿0"; // ตั้งราคารวมเป็น 0
            hideCart(); // ซ่อนแถบด้านข้าง
            updateCartCount(); // อัปเดตตัวนับจำนวนสินค้าในตะกร้า
        }
    });
});

