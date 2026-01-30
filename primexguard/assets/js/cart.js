// ================= CART UTILS =================
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ================= ADD TO CART =================
function addToCart(product) {
  let cart = getCart();

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
  updateCartCount();
  alert("Added to cart!");
}

// ================= UPDATE COUNT (HEADER) =================
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  const badge = document.querySelector(".header-cart span");
  if (badge) badge.textContent = count;
}

// ================= RENDER CART PAGE =================
function renderCartPage() {
  const cart = getCart();
  const container = document.getElementById("cart-items-container");
  const subtotalEl = document.getElementById("cart-subtotal");
  const totalEl = document.getElementById("cart-total");

  if (!container) return;

  container.innerHTML = "";
  let subtotal = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    subtotalEl.textContent = "₹0";
    totalEl.textContent = "₹50";
    return;
  }

  cart.forEach((item, index) => {
    subtotal += item.price * item.qty;

    container.innerHTML += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          ₹${item.price} × 
          <input type="number" min="1" value="${item.qty}" 
            onchange="updateQty(${index}, this.value)">
        </div>
        <button onclick="removeItem(${index})">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    `;
  });

  subtotalEl.textContent = "₹" + subtotal;
  totalEl.textContent = "₹" + (subtotal + 50);
}

// ================= UPDATE QTY =================
function updateQty(index, qty) {
  let cart = getCart();
  cart[index].qty = parseInt(qty);
  saveCart(cart);
  renderCartPage();
  updateCartCount();
}

// ================= REMOVE ITEM =================
function removeItem(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCartPage();
  updateCartCount();
}

// ================= LOAD ON PAGE =================
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCartPage();
});
