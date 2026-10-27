/* QuickCook Admin Dashboard Operations & Role Control */

let currentOrderFilter = "all";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Kiểm tra phân quyền truy cập
  const user = getCurrentUser();
  const deniedScreen = document.getElementById("adminAccessDenied");
  const adminApp = document.getElementById("adminApp");

  if (!user || user.role !== "admin") {
    if (deniedScreen) deniedScreen.classList.remove("hidden");
    if (adminApp) adminApp.classList.add("hidden");

    const deniedMsg = document.getElementById("deniedMessage");
    if (deniedMsg) {
      if (!user) {
        deniedMsg.innerHTML = "Bạn chưa đăng nhập. Vui lòng đăng nhập bằng tài khoản <b>Quản trị viên (Admin)</b> để truy cập trang này.";
      } else {
        deniedMsg.innerHTML = `Bạn đang đăng nhập với tài khoản <b>${escapeHtml(user.name)}</b> (Vai trò: <i>${user.role}</i>). Tài khoản của bạn không có thẩm quyền truy cập Dashboard Quản trị.`;
      }
    }

    // Nút chuyển nhanh sang Admin
    const switchBtn = document.getElementById("btnSwitchToAdmin");
    if (switchBtn) {
      switchBtn.onclick = () => {
        // Đăng nhập nhanh admin
        const adminAccount = loadUsers().find(u => u.role === "admin") || {
          id: "USR-001",
          name: "Quản trị viên QuickCook",
          email: "admin@quickcook.vn",
          role: "admin"
        };
        setCurrentUser(adminAccount);
        showToast("Đã chuyển sang tài khoản Admin thành công!");
        setTimeout(() => location.reload(), 500);
      };
    }
    return;
  }

  // Đã là Admin -> Hiển thị Dashboard
  if (deniedScreen) deniedScreen.classList.add("hidden");
  if (adminApp) adminApp.classList.remove("hidden");

  const adminUserName = document.getElementById("adminUserName");
  const adminUserEmail = document.getElementById("adminUserEmail");
  if (adminUserName) adminUserName.textContent = user.name;
  if (adminUserEmail) adminUserEmail.textContent = user.email;

  // Render toàn bộ Dashboard
  renderAdminAll();

  // Tab navigation
  document.querySelectorAll("[data-panel]").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll("[data-panel]").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".admin-panel").forEach(p => p.classList.add("hidden"));
      btn.classList.add("active");
      const targetPanel = document.getElementById(btn.dataset.panel);
      if (targetPanel) targetPanel.classList.remove("hidden");
    };
  });

  // Bộ lọc đơn hàng
  document.querySelectorAll("#orderFilterButtons .pill-filter").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll("#orderFilterButtons .pill-filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentOrderFilter = btn.dataset.filter;
      renderAdminOrders();
    };
  });

  // Xử lý thêm sản phẩm mới
  const productForm = document.getElementById("productForm");
  const addBtn = document.getElementById("addProduct");
  const cancelBtn = document.getElementById("cancelProduct");
  const closeBtn = document.getElementById("closeFormBtn");

  if (addBtn && productForm) {
    addBtn.onclick = () => {
      productForm.reset();
      productForm.elements.id.value = "";
      document.getElementById("productFormTitle").textContent = "Thêm món ăn mới vào thực đơn";
      productForm.classList.remove("hidden");
      productForm.scrollIntoView({ behavior: "smooth" });
    };
  }

  if (cancelBtn) cancelBtn.onclick = () => productForm.classList.add("hidden");
  if (closeBtn) closeBtn.onclick = () => productForm.classList.add("hidden");

  // Lưu sản phẩm
  if (productForm) {
    productForm.addEventListener("submit", e => {
      e.preventDefault();
      const fd = new FormData(productForm);
      const items = loadProducts();
      const id = fd.get("id") || "QC" + Date.now().toString().slice(-6);

      const newProduct = {
        id,
        name: fd.get("name").trim(),
        category: fd.get("category"),
        price: Number(fd.get("price")),
        oldPrice: fd.get("oldPrice") ? Number(fd.get("oldPrice")) : null,
        stock: Number(fd.get("stock")),
        tag: fd.get("tag").trim() || "Mới",
        weight: fd.get("weight").trim() || "2 người ăn",
        time: fd.get("time").trim() || "20-25 phút",
        difficulty: "Dễ",
        calories: "450 kcal",
        image: fd.get("image").trim() || "https://placehold.co/600x500/e9eee2/236b4b?text=QuickCook",
        description: fd.get("description").trim(),
        ingredients: [
          { id: "thit-ba-roi-cp", amount: "350g nguyên liệu sạch" },
          { id: "rau-thuy-canh-dalat", amount: "250g rau củ VietGAP" }
        ]
      };

      const existingIdx = items.findIndex(x => x.id === id);
      if (existingIdx >= 0) {
        items[existingIdx] = { ...items[existingIdx], ...newProduct };
      } else {
        items.unshift(newProduct);
      }

      saveProducts(items);
      productForm.classList.add("hidden");
      renderAdminAll();
      showToast(`Đã lưu món ăn "${newProduct.name}" thành công!`);
    });
  }

  // Khôi phục dữ liệu gốc
  const resetBtn = document.getElementById("resetData");
  if (resetBtn) {
    resetBtn.onclick = () => {
      if (confirm("Khôi phục toàn bộ 16 món ăn và dữ liệu đơn hàng mẫu? Dữ liệu bạn vừa tự thêm sẽ được đưa về chuẩn ban đầu.")) {
        saveProducts(SEED_PRODUCTS);
        saveOrders(SEED_ORDERS);
        localStorage.setItem(STORAGE_KEYS.ingredients, JSON.stringify(INGREDIENTS_DATA));
        renderAdminAll();
        showToast("Đã khôi phục toàn bộ 16 món ăn và dữ liệu mẫu!");
      }
    };
  }
});

// Render tổng thể
function renderAdminAll() {
  renderAdminKPIs();
  renderAdminCharts();
  renderAdminOrders();
  renderAdminProducts();
  renderAdminIngredients();
  renderAdminUsers();
}

// 1. KPI Cards
function renderAdminKPIs() {
  const products = loadProducts();
  const orders = loadOrders();
  const users = loadUsers();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== "Đã hủy" ? o.total : 0), 0);
  const lowStockCount = products.filter(p => p.stock < 15).length;
  const qrPaidOrders = orders.filter(o => o.payment === "VIETQR" && o.paymentStatus.includes("Đã")).length;

  const container = document.getElementById("adminStatsGrid");
  if (!container) return;

  container.innerHTML = `
    <div class="stat-card stat-primary">
      <div class="stat-icon-wrap">💰</div>
      <div class="stat-meta">
        <small>Doanh thu ghi nhận</small>
        <b>${money(totalRevenue)}</b>
        <span class="stat-growth text-success">▲ +18.4% tăng trưởng</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon-wrap">📦</div>
      <div class="stat-meta">
        <small>Tổng đơn hàng</small>
        <b>${orders.length} đơn</b>
        <span class="stat-growth text-blue">${qrPaidOrders} đơn thanh toán VietQR</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon-wrap">🍲</div>
      <div class="stat-meta">
        <small>Món ăn đang phục vụ</small>
        <b>${products.length} món</b>
        <span class="stat-growth ${lowStockCount > 0 ? 'text-orange' : 'text-success'}">
          ${lowStockCount > 0 ? `⚠️ ${lowStockCount} món sắp hết hàng` : "Tồn kho an toàn"}
        </span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon-wrap">👥</div>
      <div class="stat-meta">
        <small>Khách hàng thành viên</small>
        <b>${users.length} tài khoản</b>
        <span class="stat-growth text-green">100% dữ liệu đồng bộ</span>
      </div>
    </div>
  `;

  // Cập nhật số lượng trên tabs
  const tabO = document.getElementById("tabOrderCount");
  const tabP = document.getElementById("tabProductCount");
  if (tabO) tabO.textContent = orders.length;
  if (tabP) tabP.textContent = products.length;
}

// 2. Charts (Biểu đồ doanh thu & tỷ trọng danh mục)
function renderAdminCharts() {
  const chartContainer = document.getElementById("revenueBarChart");
  if (chartContainer) {
    const days = [
      { day: "Thứ 2", rev: 1850000 },
      { day: "Thứ 3", rev: 2240000 },
      { day: "Thứ 4", rev: 1980000 },
      { day: "Thứ 5", rev: 2890000 },
      { day: "Thứ 6", rev: 3450000 },
      { day: "Thứ 7", rev: 4120000 },
      { day: "Hôm nay", rev: 3780000 }
    ];
    const maxRev = Math.max(...days.map(d => d.rev));

    chartContainer.innerHTML = days.map(d => {
      const heightPercent = Math.round((d.rev / maxRev) * 100);
      return `
        <div class="bar-col">
          <div class="bar-fill" style="height: ${heightPercent}%" title="${d.day}: ${money(d.rev)}">
            <span class="bar-tooltip">${money(d.rev)}</span>
          </div>
          <span class="bar-label">${d.day}</span>
        </div>
      `;
    }).join("");
  }

  const catContainer = document.getElementById("categoryDistribution");
  if (catContainer) {
    catContainer.innerHTML = `
      <div class="cat-bar-item">
        <div class="cat-bar-label">
          <span>🍱 Combo bữa cơm gia đình</span>
          <b>45% (284 set)</b>
        </div>
        <div class="bar-track"><div class="bar-segment" style="width: 45%; background: #236b4b;"></div></div>
      </div>
      <div class="cat-bar-item">
        <div class="cat-bar-label">
          <span>🍗 Thịt cá & Món mặn</span>
          <b>30% (192 set)</b>
        </div>
        <div class="bar-track"><div class="bar-segment" style="width: 30%; background: #f1a65b;"></div></div>
      </div>
      <div class="cat-bar-item">
        <div class="cat-bar-label">
          <span>🥦 Rau củ sơ chế & Salad</span>
          <b>15% (95 set)</b>
        </div>
        <div class="bar-track"><div class="bar-segment" style="width: 15%; background: #6fa071;"></div></div>
      </div>
      <div class="cat-bar-item">
        <div class="cat-bar-label">
          <span>🍲 Canh & Lẩu thanh đạm</span>
          <b>10% (64 set)</b>
        </div>
        <div class="bar-track"><div class="bar-segment" style="width: 10%; background: #8860a5;"></div></div>
      </div>
    `;
  }
}

// 3. Quản lý Đơn hàng
function renderAdminOrders() {
  const allOrders = loadOrders();
  let orders = allOrders;

  if (currentOrderFilter !== "all") {
    orders = allOrders.filter(o => o.status === currentOrderFilter);
  }

  const tbody = document.getElementById("adminOrderRows");
  if (!tbody) return;

  if (!orders.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center muted" style="padding:40px;">Không có đơn hàng nào trong mục này.</td></tr>`;
    return;
  }

  tbody.innerHTML = orders.map(o => `
    <tr>
      <td>
        <b class="order-code-badge">${escapeHtml(o.id)}</b>
        <div class="small muted">${new Date(o.createdAt).toLocaleDateString("vi-VN")}</div>
      </td>
      <td>
        <b>${escapeHtml(o.name)}</b>
        <div class="small muted">📞 ${escapeHtml(o.phone)}</div>
      </td>
      <td>
        <span class="order-items-snippet">
          ${(o.items || []).map(i => `${escapeHtml(i.name)} ×<b>${i.qty}</b>`).join(", ")}
        </span>
      </td>
      <td>
        <b class="text-price">${money(o.total)}</b>
      </td>
      <td>
        <div class="payment-col-wrap">
          <span class="payment-badge ${o.payment === 'MOMO' ? 'badge-momo-qr' : (o.payment === 'ZALOPAY' ? 'badge-zalopay-qr' : '')}">
            ${o.payment === "VIETQR" ? "⚡ VietQR" : (o.payment === "MOMO" ? "🟣 MoMo" : (o.payment === "ZALOPAY" ? "🔵 ZaloPay" : "💵 COD"))}
          </span>
          <small class="${o.paymentStatus.includes('Đã') ? 'text-success' : 'text-orange'}">${escapeHtml(o.paymentStatus)}</small>
        </div>
      </td>
      <td>
        <select class="status-select ${getStatusClass(o.status)}" onchange="updateOrderStatus('${escapeJs(o.id)}', this.value)">
          <option value="Mới đặt" ${o.status === "Mới đặt" ? "selected" : ""}>Mới đặt</option>
          <option value="Đang sơ chế" ${o.status === "Đang sơ chế" ? "selected" : ""}>Đang sơ chế</option>
          <option value="Đang giao hàng" ${o.status === "Đang giao hàng" || o.status === "Đang giao" ? "selected" : ""}>Đang giao hàng</option>
          <option value="Hoàn tất" ${o.status === "Hoàn tất" ? "selected" : ""}>Hoàn tất</option>
          <option value="Đã hủy" ${o.status === "Đã hủy" ? "selected" : ""}>Đã hủy</option>
        </select>
      </td>
      <td>
        <button class="btn btn-outline btn-tiny" onclick="viewOrderDetail('${escapeJs(o.id)}')">Chi tiết</button>
        <button class="btn btn-outline btn-tiny btn-danger" onclick="deleteOrder('${escapeJs(o.id)}')">Xóa</button>
      </td>
    </tr>
  `).join("");
}

window.updateOrderStatus = function(orderId, newStatus) {
  const orders = loadOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  order.status = newStatus;
  if (newStatus === "Hoàn tất" && order.payment === "COD") {
    order.paymentStatus = "Đã thu tiền COD ✓";
  }
  saveOrders(orders);
  renderAdminKPIs();
  renderAdminOrders();
  showToast(`Đã chuyển đơn ${orderId} sang "${newStatus}"!`);
};

window.viewOrderDetail = function(orderId) {
  const orders = loadOrders();
  const o = orders.find(x => x.id === orderId);
  if (!o) return;

  const modal = document.getElementById("adminOrderModal");
  const content = document.getElementById("adminOrderModalContent");

  content.innerHTML = `
    <div class="order-detail-modal-body">
      <h2>Chi tiết đơn hàng: ${escapeHtml(o.id)}</h2>
      <p class="muted">Thời gian đặt: ${new Date(o.createdAt).toLocaleString("vi-VN")}</p>

      <div class="detail-columns">
        <div class="col">
          <h4>Thông tin người nhận:</h4>
          <p>👤 <b>Khách hàng:</b> ${escapeHtml(o.name)}</p>
          <p>📞 <b>Điện thoại:</b> ${escapeHtml(o.phone)}</p>
          <p>📧 <b>Email:</b> ${escapeHtml(o.email || "Không có")}</p>
          <p>📍 <b>Địa chỉ:</b> ${escapeHtml(o.address)}</p>
          ${o.note ? `<p>📝 <b>Ghi chú:</b> ${escapeHtml(o.note)}</p>` : ""}
        </div>

        <div class="col">
          <h4>Thanh toán & Giao vận:</h4>
          <p>💳 <b>Phương thức:</b> ${escapeHtml(o.payment)}</p>
          <p>🏷️ <b>Trạng thái tiền:</b> <b class="text-success">${escapeHtml(o.paymentStatus)}</b></p>
          <p>🚚 <b>Tiến độ đơn:</b> <span class="status-pill ${getStatusClass(o.status)}">${escapeHtml(o.status)}</span></p>
          <p>💰 <b>Tổng tiền thanh toán:</b> <span class="price">${money(o.total)}</span></p>
        </div>
      </div>

      <hr>
      <h4>Danh sách món ăn:</h4>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Món</th><th>Đơn giá</th><th>Số lượng</th><th>Thành tiền</th></tr>
          </thead>
          <tbody>
            ${(o.items || []).map(i => `
              <tr>
                <td><b>${escapeHtml(i.name)}</b></td>
                <td>${money(i.price)}</td>
                <td>${i.qty}</td>
                <td><b>${money(i.price * i.qty)}</b></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <div class="modal-actions-bar">
        <button class="btn btn-primary" onclick="closeAdminOrderModal()">Đóng cửa sổ</button>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
};

window.closeAdminOrderModal = function() {
  const modal = document.getElementById("adminOrderModal");
  if (modal) modal.classList.add("hidden");
};

window.deleteOrder = function(orderId) {
  if (!confirm(`Xác nhận xóa hoàn toàn đơn hàng ${orderId}?`)) return;
  const orders = loadOrders().filter(o => o.id !== orderId);
  saveOrders(orders);
  renderAdminAll();
  showToast(`Đã xóa đơn hàng ${orderId}.`);
};

// 4. Quản lý Món ăn
function renderAdminProducts() {
  const products = loadProducts();
  const tbody = document.getElementById("adminProductRows");
  if (!tbody) return;

  tbody.innerHTML = products.map(p => `
    <tr>
      <td>
        <div class="table-product">
          <img src="${escapeHtml(p.image)}" alt="" onerror="this.src='https://placehold.co/100x100/e9eee2/236b4b?text=QC'">
          <div>
            <b>${escapeHtml(p.name)}</b>
            <div class="small muted">Mã: ${escapeHtml(p.id)}</div>
          </div>
        </div>
      </td>
      <td>${escapeHtml(CATEGORY_NAMES[p.category] || p.category)}</td>
      <td>
        <b>${money(p.price)}</b>
        ${p.oldPrice ? `<div class="small muted" style="text-decoration:line-through;">${money(p.oldPrice)}</div>` : ""}
      </td>
      <td>
        <div class="stock-control-cell">
          <button class="stock-step-btn" onclick="adjustStock('${escapeJs(p.id)}', -1)">−</button>
          <span class="stock-num ${p.stock < 15 ? 'text-orange' : ''}">${p.stock}</span>
          <button class="stock-step-btn" onclick="adjustStock('${escapeJs(p.id)}', 1)">+</button>
        </div>
      </td>
      <td>
        <small>${escapeHtml(p.weight || "2 người")} · ${escapeHtml(p.time || "20 phút")}</small>
      </td>
      <td>
        <span class="badge-mini">🥗 ${(p.ingredients || []).length} loại nguyên liệu</span>
      </td>
      <td>
        <button class="btn btn-outline btn-tiny" onclick="editProduct('${escapeJs(p.id)}')">Sửa</button>
        <button class="btn btn-outline btn-tiny btn-danger" onclick="deleteProduct('${escapeJs(p.id)}')">Xóa</button>
      </td>
    </tr>
  `).join("");
}

window.adjustStock = function(id, delta) {
  const products = loadProducts();
  const p = products.find(x => x.id === id);
  if (!p) return;
  p.stock = Math.max(0, p.stock + delta);
  saveProducts(products);
  renderAdminProducts();
  renderAdminKPIs();
};

window.editProduct = function(id) {
  const p = loadProducts().find(x => x.id === id);
  if (!p) return;
  const f = document.getElementById("productForm");
  f.classList.remove("hidden");
  document.getElementById("productFormTitle").textContent = "Sửa món ăn: " + p.name;

  Object.entries(p).forEach(([k, v]) => {
    if (f.elements[k]) f.elements[k].value = v ?? "";
  });
  f.scrollIntoView({ behavior: "smooth", block: "center" });
};

window.deleteProduct = function(id) {
  if (!confirm("Bạn có chắc muốn xóa món " + id + " khỏi thực đơn?")) return;
  saveProducts(loadProducts().filter(p => p.id !== id));
  renderAdminAll();
  showToast("Đã xóa món ăn khỏi thực đơn.");
};

// 5. Quản lý Nguyên liệu & Nguồn gốc
function renderAdminIngredients() {
  const ingredients = loadIngredients();
  const container = document.getElementById("adminIngredientsGrid");
  if (!container) return;

  container.innerHTML = Object.values(ingredients).map(ing => `
    <div class="admin-ing-card">
      <div class="admin-ing-top">
        <img src="${escapeHtml(ing.image)}" alt="" onerror="this.src='https://placehold.co/200x200/e9eee2/236b4b?text=QC'">
        <div>
          <h4>${escapeHtml(ing.name)}</h4>
          <span class="badge-mini">🏷️ Mã lô: ${escapeHtml(ing.batchCode)}</span>
          <p class="small muted">🏢 ${escapeHtml(ing.supplier)}</p>
        </div>
      </div>
      <div class="admin-ing-details">
        <p class="small">📍 <b>Trang trại:</b> ${escapeHtml(ing.farmLocation)}</p>
        <p class="small">🛡️ <b>Tiêu chuẩn:</b> ${(ing.standards || []).join(", ")}</p>
        <p class="small">📜 <b>Hồ sơ:</b> ${(ing.certificates || []).length} giấy chứng nhận hợp lệ</p>
      </div>
      <div class="admin-ing-actions">
        <a href="ingredient.html?id=${encodeURIComponent(ing.id)}" class="btn btn-outline btn-full btn-tiny" target="_blank">
          🔍 Xem trang nguồn gốc & Chứng từ →
        </a>
      </div>
    </div>
  `).join("");
}

// 6. Quản lý Người dùng & Phân quyền
function renderAdminUsers() {
  const users = loadUsers();
  const tbody = document.getElementById("adminUserRows");
  if (!tbody) return;

  tbody.innerHTML = users.map(u => `
    <tr>
      <td>
        <b>${escapeHtml(u.name)}</b>
      </td>
      <td>${escapeHtml(u.email)}</td>
      <td>${escapeHtml(u.phone || "Chưa cập nhật")}</td>
      <td>
        <span class="role-pill ${u.role === 'admin' ? 'role-admin' : 'role-customer'}">
          ${u.role === 'admin' ? '👑 Quản trị viên (Admin)' : '👤 Khách hàng (Customer)'}
        </span>
      </td>
      <td>${u.joinedAt ? new Date(u.joinedAt).toLocaleDateString("vi-VN") : "Hệ thống"}</td>
      <td>
        <button class="btn btn-outline btn-tiny" onclick="toggleUserRole('${escapeJs(u.email)}')">
          ${u.role === 'admin' ? 'Chuyển về Khách hàng' : 'Thăng cấp thành Admin'}
        </button>
      </td>
    </tr>
  `).join("");
}

window.toggleUserRole = function(email) {
  const users = loadUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return;

  const currentLoggedIn = getCurrentUser();
  if (currentLoggedIn && currentLoggedIn.email.toLowerCase() === email.toLowerCase() && user.role === "admin") {
    if (!confirm("Bạn đang tự hạ quyền tài khoản Admin của chính mình. Bạn sẽ bị mất quyền vào trang này. Bạn có chắc không?")) return;
  }

  user.role = user.role === "admin" ? "customer" : "admin";
  saveUsers(users);

  // Nếu là chính user đang đăng nhập thì cập nhật session
  if (currentLoggedIn && currentLoggedIn.email.toLowerCase() === email.toLowerCase()) {
    currentLoggedIn.role = user.role;
    setCurrentUser(currentLoggedIn);
  }

  renderAdminAll();
  showToast(`Đã thay đổi quyền tài khoản ${email} thành ${user.role}!`);
};

function getStatusClass(status) {
  if (status === "Hoàn tất") return "tag-green";
  if (status === "Đang giao hàng" || status === "Đang giao") return "tag-blue";
  if (status === "Đang sơ chế") return "tag-orange";
  if (status === "Đã hủy") return "tag-gray";
  return "tag-active";
}
