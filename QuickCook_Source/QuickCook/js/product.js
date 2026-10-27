/* QuickCook Product Detail & Ingredient Traceability Render Logic */

document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(location.search).get("id");
  const products = loadProducts();
  const allIngredients = loadIngredients();
  const p = products.find(x => x.id === id) || products[0];
  const target = document.getElementById("productDetail");

  if (!p) {
    target.innerHTML = "<div class='empty-state'><h2>Không tìm thấy món ăn này.</h2><p><a href='products.html' class='btn btn-primary'>Quay lại danh mục sản phẩm</a></p></div>";
    return;
  }

  document.title = `${p.name} | QuickCook`;

  const breadcrumbDishName = document.getElementById("breadcrumbDishName");
  if (breadcrumbDishName) breadcrumbDishName.textContent = p.name;

  // 1. Render Hero & Thông tin chi tiết món ăn
  target.innerHTML = `
    <div class="detail-image-wrap">
      <div class="detail-image">
        <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" onerror="this.src='https://placehold.co/800x800/e9eee2/236b4b?text=QuickCook'">
        ${p.tag ? `<span class="detail-badge">${escapeHtml(p.tag)}</span>` : ""}
      </div>
      <div class="fresh-guarantee-note">
        <span>🛡️</span>
        <small>100% nguyên liệu đã sơ chế, chia phần và bảo quản lạnh chuẩn Cold Chain</small>
      </div>
    </div>

    <div class="detail-copy">
      <div class="product-category">${escapeHtml(CATEGORY_NAMES[p.category] || "Món ngon gia đình")}</div>
      <h1>${escapeHtml(p.name)}</h1>
      
      <div class="detail-price-box">
        <span class="price">${money(p.price)}</span>
        ${p.oldPrice ? `<span class="old-price">${money(p.oldPrice)}</span>` : ""}
        ${p.oldPrice ? `<span class="save-badge">Tiết kiệm ${money(p.oldPrice - p.price)}</span>` : ""}
      </div>

      <p class="description">${escapeHtml(p.description || "Nguyên liệu sơ chế tiện lợi cho bữa cơm gia đình thơm ngon chuẩn vị.")}</p>

      <div class="detail-meta-pills">
        <div class="meta-pill">
          <span class="icon">👨‍👩‍👧‍👦</span>
          <div>
            <small>Khẩu phần</small>
            <b>${escapeHtml(p.weight || "2-3 người")}</b>
          </div>
        </div>
        <div class="meta-pill">
          <span class="icon">⏱️</span>
          <div>
            <small>Thời gian nấu</small>
            <b>${escapeHtml(p.time || "20-30 phút")}</b>
          </div>
        </div>
        <div class="meta-pill">
          <span class="icon">🍳</span>
          <div>
            <small>Độ khó</small>
            <b>${escapeHtml(p.difficulty || "Dễ")}</b>
          </div>
        </div>
        <div class="meta-pill">
          <span class="icon">🔥</span>
          <div>
            <small>Năng lượng</small>
            <b>${escapeHtml(p.calories || "450 kcal")}</b>
          </div>
        </div>
      </div>

      <div class="safety-compliance-box">
        <div class="safety-item cold-chain">
          <span class="icon">❄️</span>
          <div>
            <b>Bảo quản Cold Chain:</b>
            <span>${escapeHtml(p.storageGuide || "Ngăn mát 0°C - 4°C · Hạn sử dụng: 48h từ khi sơ chế")}</span>
          </div>
        </div>
        <div class="safety-item allergen-alert">
          <span class="icon">⚠️</span>
          <div>
            <b>Cảnh báo dị ứng:</b>
            <span>${(p.allergens && p.allergens.length ? p.allergens : ["Không chứa chất gây dị ứng nhóm Big 8"]).map(a => `<span class="allergen-tag">${escapeHtml(a)}</span>`).join("")}</span>
          </div>
        </div>
      </div>

      <div class="quantity-row">
        <div class="quantity-control">
          <button type="button" id="minusQty" aria-label="Giảm số lượng">−</button>
          <span id="qty">1</span>
          <button type="button" id="plusQty" aria-label="Tăng số lượng">+</button>
        </div>
        <button class="btn btn-primary btn-large" id="detailAdd" ${p.stock <= 0 ? "disabled" : ""}>
          Thêm vào giỏ hàng 🛒
        </button>
      </div>

      <div class="quick-links-row">
        <a class="text-link" href="#dishIngredientsSection">👉 Xem các nguyên liệu & giấy chứng nhận</a>
        <a class="text-link" href="#dishCookingGuide">📖 Xem công thức nấu 4 bước</a>
      </div>
    </div>
  `;

  // Xử lý tăng giảm số lượng
  let qty = 1;
  const minusBtn = document.getElementById("minusQty");
  const plusBtn = document.getElementById("plusQty");
  const qtyEl = document.getElementById("qty");
  const addBtn = document.getElementById("detailAdd");

  if (minusBtn && plusBtn) {
    minusBtn.onclick = () => {
      qty = Math.max(1, qty - 1);
      qtyEl.textContent = qty;
    };
    plusBtn.onclick = () => {
      qty = Math.min(Math.min(99, p.stock || 99), qty + 1);
      qtyEl.textContent = qty;
    };
  }

  if (addBtn) {
    addBtn.onclick = () => addToCart(p.id, qty);
  }

  // 2. Render Danh sách nguyên liệu và NÚT BẤM CHUYỂN TỚI TRANG NGUỒN GỐC & GIẤY TỜ
  const ingredientsList = document.getElementById("dishIngredientsList");
  if (ingredientsList) {
    if (p.ingredients && p.ingredients.length > 0) {
      ingredientsList.innerHTML = p.ingredients.map(ingRef => {
        const ing = allIngredients[ingRef.id] || {
          id: ingRef.id,
          name: ingRef.id,
          supplier: "Đối tác nông trại VietGAP",
          standards: ["VietGAP", "Kiểm định thú y"],
          image: "https://placehold.co/400x300/e9eee2/236b4b?text=Nguyên+liệu+sạch",
          farmLocation: "Lâm Đồng / TP.HCM",
          batchCode: "LOT-2026-QC"
        };

        return `
          <div class="ingredient-card">
            <div class="ing-card-top">
              <img src="${escapeHtml(ing.image)}" alt="${escapeHtml(ing.name)}" onerror="this.src='https://placehold.co/400x300/e9eee2/236b4b?text=QuickCook'">
              <span class="ing-amount-badge">${escapeHtml(ingRef.amount)}</span>
            </div>
            <div class="ing-card-body">
              <h3>${escapeHtml(ing.name)}</h3>
              <p class="ing-supplier">🏢 <b>Cung cấp:</b> ${escapeHtml(ing.supplier)}</p>
              <div class="ing-standards">
                ${(ing.standards || []).slice(0, 2).map(s => `<span class="badge-mini">✓ ${escapeHtml(s)}</span>`).join("")}
              </div>
              <p class="ing-location"><small>📍 ${escapeHtml(ing.farmLocation || "Nông trại kiểm định")}</small></p>
            </div>
            <div class="ing-card-action">
              <a href="ingredient.html?id=${encodeURIComponent(ing.id)}&from=${encodeURIComponent(p.id)}" class="btn btn-primary btn-full ing-cert-btn">
                Xem nguồn gốc & Giấy tờ 🔍
              </a>
            </div>
          </div>
        `;
      }).join("");
    } else {
      ingredientsList.innerHTML = "<p class='muted'>Combo bao gồm đầy đủ thịt, rau củ và gói gia vị chuẩn định lượng đã sơ chế sạch.</p>";
    }
  }

  // 3. Render Các bước nấu ăn (Cooking Steps)
  const stepsList = document.getElementById("dishStepsList");
  if (stepsList) {
    const steps = p.cookingSteps || [
      "Bước 1: Rửa tay sạch sẽ và mở bao bì các phần nguyên liệu đã định lượng.",
      "Bước 2: Ướp thực phẩm với gói sốt gia vị độc quyền trong 5-10 phút.",
      "Bước 3: Nấu chín trên lửa vừa theo thời gian khuyến nghị.",
      "Bước 4: Bày món ra đĩa, trang trí và thưởng thức cùng gia đình."
    ];

    stepsList.innerHTML = steps.map((st, i) => `
      <div class="step-item-card">
        <div class="step-badge">${i + 1}</div>
        <div class="step-text">${escapeHtml(st)}</div>
      </div>
    `).join("");
  }

  // 4. Render Bảng dinh dưỡng
  const nutritionCard = document.getElementById("dishNutritionCard");
  if (nutritionCard) {
    const nut = p.nutrition || { protein: "35g", carbs: "15g", fat: "18g", fiber: "4g" };
    nutritionCard.innerHTML = `
      <div class="nutrition-grid">
        <div class="nut-item">
          <small>Năng lượng</small>
          <b>${escapeHtml(p.calories || "450 kcal")}</b>
        </div>
        <div class="nut-item">
          <small>Chất đạm (Protein)</small>
          <b>${escapeHtml(nut.protein)}</b>
        </div>
        <div class="nut-item">
          <small>Tinh bột (Carbs)</small>
          <b>${escapeHtml(nut.carbs)}</b>
        </div>
        <div class="nut-item">
          <small>Chất béo (Fat)</small>
          <b>${escapeHtml(nut.fat)}</b>
        </div>
      </div>
    `;
  }

  // 5. Render Sản phẩm liên quan
  renderProductCards("relatedProducts", products.filter(x => x.id !== p.id).slice(0, 4));
});
