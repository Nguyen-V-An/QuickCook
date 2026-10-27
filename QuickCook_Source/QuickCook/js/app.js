/* QuickCook Shared Application Logic & Auth Helpers */

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.cart)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const el = document.getElementById("cartCount");
  if (el) el.textContent = getCart().reduce((n, i) => n + i.qty, 0);
}

function showToast(message, type = "info") {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.className = `toast show ${type}`;
  clearTimeout(window.quickCookToast);
  window.quickCookToast = setTimeout(() => el.classList.remove("show"), 3000);
}

function addToCart(id, qty = 1) {
  const products = loadProducts();
  const p = products.find(x => x.id === id);
  if (!p) {
    showToast("Không tìm thấy sản phẩm.", "error");
    return;
  }
  const cart = getCart();
  const item = cart.find(x => x.id === id);
  if (item) {
    item.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  saveCart(cart);
  showToast(`Đã thêm ${qty} phần "${p.name}" vào giỏ hàng!`);
}

function renderProductCards(targetId, items) {
  const target = document.getElementById(targetId);
  if (!target) return;
  target.innerHTML = items.map(p => `
    <article class="product-card" data-id="${escapeHtml(p.id)}">
      <a class="product-image" href="product.html?id=${encodeURIComponent(p.id)}">
        <img loading="lazy" src="${escapeHtml(p.image || "")}" alt="${escapeHtml(p.name)}" onerror="this.src='https://placehold.co/600x500/e9eee2/236b4b?text=QuickCook'">
        ${p.tag ? `<span class="product-tag">${escapeHtml(p.tag)}</span>` : ""}
      </a>
      <div class="product-info">
        <div class="product-category">${escapeHtml(CATEGORY_NAMES[p.category] || "Combo thực phẩm")}</div>
        <h3><a href="product.html?id=${encodeURIComponent(p.id)}">${escapeHtml(p.name)}</a></h3>
        <p class="product-desc">${escapeHtml(p.description || "Nguyên liệu sơ chế tiện lợi cho bữa cơm nhà.")}</p>
        
        <div class="product-ingredients-preview">
          ${p.ingredients && p.ingredients.length > 0 ? `
            <span class="ingredients-badge" title="${p.ingredients.length} nguyên liệu có chứng nhận an toàn">
              🥗 ${p.ingredients.length} nguyên liệu sạch VietGAP
            </span>
          ` : ""}
        </div>

        <div class="product-bottom">
          <div>
            <span class="price">${money(p.price)}</span>
            ${p.oldPrice ? `<span class="old-price">${money(p.oldPrice)}</span>` : ""}
          </div>
          <button class="add-btn" onclick="addToCart('${escapeJs(p.id)}')" aria-label="Thêm ${escapeHtml(p.name)} vào giỏ" title="Thêm vào giỏ hàng">+</button>
        </div>
      </div>
    </article>
  `).join("");
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}

function escapeJs(s) {
  return String(s ?? "").replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

// Xử lý thanh điều hướng và hiển thị đăng nhập / phân quyền trên Header
function syncAuthUI() {
  const user = getCurrentUser();
  const authNavContainers = document.querySelectorAll(".header-actions");

  authNavContainers.forEach(container => {
    // Tìm hoặc tạo vùng auth
    let authArea = container.querySelector(".user-auth-area");
    if (!authArea) {
      authArea = document.createElement("div");
      authArea.className = "user-auth-area";
      // Chèn vào đầu header-actions (trước giỏ hàng)
      container.insertBefore(authArea, container.firstChild);
    }

    // Xóa link cũ nếu có
    const oldAccountLink = container.querySelector('a[href="login.html"]');
    if (oldAccountLink) oldAccountLink.remove();

    if (user) {
      const isAdmin = user.role === "admin";
      authArea.innerHTML = `
        <div class="user-menu-wrap">
          <button class="user-menu-btn" id="userMenuToggle" type="button">
            <span class="user-avatar">${isAdmin ? "👑" : "👤"}</span>
            <div class="user-btn-text">
              <span class="user-name">${escapeHtml(user.name.split(" ").slice(-2).join(" "))}</span>
              <span class="user-role-badge ${isAdmin ? "badge-admin" : "badge-customer"}">${isAdmin ? "Admin" : "Khách"}</span>
            </div>
            <span class="menu-arrow">▾</span>
          </button>
          <div class="user-dropdown-menu" id="userDropdown">
            <div class="dropdown-header">
              <b>${escapeHtml(user.name)}</b>
              <small>${escapeHtml(user.email)}</small>
            </div>
            <hr>
            ${isAdmin ? `
              <a href="admin.html" class="dropdown-item highlighted">
                <span class="icon">📊</span>
                <span><b>Dashboard Quản trị</b></span>
              </a>
            ` : ""}
            <a href="my-orders.html" class="dropdown-item">
              <span class="icon">📦</span>
              <span>Đơn hàng của tôi</span>
            </a>
            <a href="products.html" class="dropdown-item">
              <span class="icon">🥗</span>
              <span>Khám phá món ăn</span>
            </a>
            <hr>
            <button class="dropdown-item logout-btn" onclick="logout()" type="button">
              <span class="icon">🚪</span>
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      `;

      // Bật tắt dropdown
      const btn = authArea.querySelector("#userMenuToggle");
      const dropdown = authArea.querySelector("#userDropdown");
      if (btn && dropdown) {
        btn.onclick = (e) => {
          e.stopPropagation();
          dropdown.classList.toggle("open");
        };
      }
    } else {
      authArea.innerHTML = `
        <a href="login.html" class="btn-auth-link">
          <span class="icon">👤</span>
          <span>Đăng nhập / Đăng ký</span>
        </a>
      `;
    }
  });

  // Đóng dropdown khi click ra ngoài
  document.addEventListener("click", () => {
    document.querySelectorAll(".user-dropdown-menu.open").forEach(el => el.classList.remove("open"));
  });
}

function logout() {
  setCurrentUser(null);
  showToast("Đã đăng xuất thành công!");
  setTimeout(() => {
    location.href = "index.html";
  }, 500);
}

// Kiểm tra quyền truy cập trang
function requireAuth(allowedRoles = ["admin", "customer"]) {
  const user = getCurrentUser();
  if (!user) {
    showToast("Vui lòng đăng nhập để tiếp tục.", "error");
    const currentPath = location.pathname.split("/").pop() + location.search;
    location.href = `login.html?redirect=${encodeURIComponent(currentPath)}`;
    return null;
  }
  if (!allowedRoles.includes(user.role)) {
    return false;
  }
  return user;
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  syncAuthUI();

  // Xử lý thanh tìm kiếm
  const form = document.getElementById("searchForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const q = document.getElementById("searchInput").value.trim();
      location.href = "products.html" + (q ? "?q=" + encodeURIComponent(q) : "");
    });
  }

  const input = document.getElementById("searchInput");
  if (input) {
    const q = new URLSearchParams(location.search).get("q");
    if (q) input.value = q;
  }
});
