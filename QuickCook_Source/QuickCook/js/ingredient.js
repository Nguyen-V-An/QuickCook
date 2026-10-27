/* QuickCook Ingredient Traceability & Quality Dossier Logic */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const ingId = params.get("id");
  const fromDishId = params.get("from");
  const ingredients = loadIngredients();
  const ing = ingredients[ingId] || Object.values(ingredients)[0];
  const container = document.getElementById("ingredientDetailContainer");

  if (!ing) {
    container.innerHTML = `
      <div class="empty-state">
        <h2>Không tìm thấy thông tin nguyên liệu</h2>
        <p>Vui lòng quay lại danh sách món ăn để xem thông tin nguyên liệu sạch khác.</p>
        <a href="products.html" class="btn btn-primary">Xem danh sách món ăn →</a>
      </div>
    `;
    return;
  }

  document.title = `${ing.name} - Minh bạch nguồn gốc | QuickCook`;

  // Breadcrumbs
  const breadcrumbDish = document.getElementById("breadcrumbDish");
  if (fromDishId) {
    const dish = loadProducts().find(p => p.id === fromDishId);
    if (dish) {
      breadcrumbDish.innerHTML = `<a href="product.html?id=${encodeURIComponent(dish.id)}">${escapeHtml(dish.name)}</a>`;
    }
  }

  // Generate QR Code URL
  const currentUrl = location.href;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(currentUrl)}&margin=6`;

  // Render Chi tiết nguyên liệu & Giấy tờ
  container.innerHTML = `
    <section class="ingredient-hero-card">
      <div class="ingredient-hero-grid">
        <div class="ingredient-media">
          <img src="${escapeHtml(ing.image)}" alt="${escapeHtml(ing.name)}" onerror="this.src='https://placehold.co/700x500/e9eee2/236b4b?text=QuickCook+Trace'">
          <div class="cert-status-badge">
            <span class="icon">🛡️</span>
            <span>100% Đã kiểm định ATTP</span>
          </div>
        </div>

        <div class="ingredient-info-content">
          <div class="origin-eyebrow">HỒ SƠ NGUỒN GỐC & TRUY XUẤT THỰC PHẨM SẠCH</div>
          <h1>${escapeHtml(ing.name)}</h1>
          
          <div class="standard-tags">
            ${(ing.standards || []).map(s => `<span class="std-badge">✓ ${escapeHtml(s)}</span>`).join("")}
          </div>

          <p class="ingredient-summary">${escapeHtml(ing.description)}</p>

          <div class="trace-meta-grid">
            <div class="meta-item">
              <span class="label">🏢 Đơn vị cung ứng:</span>
              <b>${escapeHtml(ing.supplier)}</b>
            </div>
            <div class="meta-item">
              <span class="label">📍 Địa chỉ nông trại / trang trại:</span>
              <span>${escapeHtml(ing.farmLocation)}</span>
            </div>
            <div class="meta-item">
              <span class="label">🏷️ Mã lô kiểm nghiệm:</span>
              <code class="batch-code">${escapeHtml(ing.batchCode)}</code>
            </div>
            <div class="meta-item">
              <span class="label">⏱️ Tần suất thu hoạch / sơ chế:</span>
              <span>${escapeHtml(ing.harvestDate)}</span>
            </div>
            <div class="meta-item">
              <span class="label">❄️ Tiêu chuẩn bảo quản:</span>
              <span>${escapeHtml(ing.storageCondition)}</span>
            </div>
          </div>

          <!-- Traceability QR Box -->
          <div class="qr-trace-box">
            <img src="${qrUrl}" alt="Mã QR truy xuất nguồn gốc" class="qr-image" width="90" height="90">
            <div>
              <b>Mã QR truy xuất nguồn gốc</b>
              <small>Quét mã bằng camera điện thoại để kiểm tra nguồn gốc lô hàng & giấy tờ tại bàn ăn bất cứ lúc nào.</small>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- QUY TRÌNH CHUỖI CUNG ỨNG LẠNH (COLD CHAIN LOGISTICS) -->
    <section class="supply-chain-section">
      <div class="section-heading">
        <div>
          <span class="eyebrow">QUY TRÌNH KHÉP KÍN TỪ NÔNG TRẠI ĐẾN BÀN ĂN</span>
          <h2>Chuỗi cung ứng minh bạch 5 bước</h2>
          <p>Đảm bảo thực phẩm tươi sống giữ nguyên dưỡng chất và loại bỏ 100% nguy cơ nhiễm khuẩn.</p>
        </div>
      </div>

      <div class="supply-steps-grid">
        <div class="supply-step-card">
          <div class="step-num">01</div>
          <div class="step-icon">🌱</div>
          <h3>Canh tác & Chăn nuôi chuẩn</h3>
          <p>Tuân thủ nghiêm ngặt quy trình VietGAP, không chất kích thích tăng trưởng hay thuốc BVTV độc hại.</p>
        </div>
        <div class="supply-step-card">
          <div class="step-num">02</div>
          <div class="step-icon">🩺</div>
          <h3>Kiểm dịch & Xét nghiệm mẫu</h3>
          <p>Lấy mẫu kiểm tra vi sinh và dư lượng kháng sinh, cấp chứng thư thú y / kiểm dịch xuất trại.</p>
        </div>
        <div class="supply-step-card">
          <div class="step-num">03</div>
          <div class="step-icon">🚛</div>
          <h3>Vận chuyển xe lạnh chuyên dụng</h3>
          <p>Duy trì nhiệt độ 0°C đến 4°C liên tục trên hành trình từ trang trại về bếp trung tâm QuickCook.</p>
        </div>
        <div class="supply-step-card">
          <div class="step-num">04</div>
          <div class="step-icon">🧼</div>
          <h3>Làm sạch khử khuẩn bọt khí</h3>
          <p>Sơ chế và rửa qua hệ thống ozone / tia cực tím UV, cắt thái định lượng và đóng túi hút chân không.</p>
        </div>
        <div class="supply-step-card">
          <div class="step-num">05</div>
          <div class="step-icon">🛵</div>
          <h3>Giao nhanh thùng bảo ôn lạnh</h3>
          <p>Đóng hộp kèm túi gel giữ lạnh sinh học, giao tận tay gia đình trong vòng 2 giờ nội thành.</p>
        </div>
      </div>
    </section>

    <!-- HỒ SƠ PHÁP LÝ & GIẤY TỜ CHỨNG NHẬN CHẤT LƯỢNG -->
    <section class="cert-documents-section">
      <div class="section-heading">
        <div>
          <span class="eyebrow">HỒ SƠ PHÁP LÝ & CHỨNG TỪ KIỂM ĐỊNH</span>
          <h2>Giấy tờ chứng nhận chất lượng chính thức</h2>
          <p>Toàn bộ văn bằng, chứng chỉ và kết quả xét nghiệm được các cơ quan chức năng có thẩm quyền cấp.</p>
        </div>
      </div>

      <div class="cert-cards-list">
        ${(ing.certificates || []).map((cert, idx) => `
          <div class="cert-card">
            <div class="cert-card-header">
              <div class="cert-stamp">
                <span class="stamp-icon">📜</span>
                <span class="stamp-verified">ĐÃ XÁC THỰC</span>
              </div>
              <div class="cert-main-info">
                <h3>${escapeHtml(cert.title)}</h3>
                <div class="cert-meta-row">
                  <span>🏛️ <b>Cơ quan cấp:</b> ${escapeHtml(cert.issuer)}</span>
                  <span>🔢 <b>Số hiệu:</b> <code class="cert-code">${escapeHtml(cert.code)}</code></span>
                </div>
              </div>
              <div class="cert-status-tag ${cert.status.includes('Âm tính') ? 'tag-green' : 'tag-active'}">
                ● ${escapeHtml(cert.status)}
              </div>
            </div>

            <p class="cert-summary-text">${escapeHtml(cert.summary)}</p>

            <div class="cert-card-footer">
              <div class="cert-dates">
                <span>Ngày cấp: <b>${escapeHtml(cert.issueDate)}</b></span>
                <span>Thời hạn hiệu lực: <b>${escapeHtml(cert.expiryDate)}</b></span>
              </div>
              <button class="btn btn-outline view-cert-btn" onclick="openCertModal('${escapeJs(ing.id)}', ${idx})">
                🔍 Xem bản chứng nhận gốc →
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </section>
  `;

  // Render các món ăn liên quan
  const allProducts = loadProducts();
  const relatedDishes = allProducts.filter(p => 
    p.ingredients && p.ingredients.some(i => i.id === ing.id)
  );

  renderProductCards("ingredientDishes", relatedDishes.length > 0 ? relatedDishes : allProducts.slice(0, 4));
});

// Modal mở xem bản chứng nhận / văn bằng scan chi tiết
window.openCertModal = function(ingId, certIndex) {
  const ingredients = loadIngredients();
  const ing = ingredients[ingId];
  if (!ing || !ing.certificates || !ing.certificates[certIndex]) return;

  const cert = ing.certificates[certIndex];
  const modal = document.getElementById("certificateModal");
  const content = document.getElementById("certModalContent");

  content.innerHTML = `
    <div class="official-paper">
      <!-- Tiêu ngữ CHXHCN Việt Nam -->
      <div class="paper-top">
        <div class="paper-emblem">🇻🇳</div>
        <div class="paper-country-title">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
        <div class="paper-country-sub">Độc lập - Tự do - Hạnh phúc</div>
        <div class="paper-divider">❖ ❖ ❖</div>
      </div>

      <div class="paper-issuer">
        <b>${escapeHtml(cert.issuer.toUpperCase())}</b>
        <small>Số hiệu chứng nhận: <b>${escapeHtml(cert.code)}</b></small>
      </div>

      <div class="paper-heading">
        <h2>${escapeHtml(cert.title.toUpperCase())}</h2>
        <div class="paper-badge-type">CHỨNG NHẬN CHÍNH THỨC</div>
      </div>

      <div class="paper-body">
        <div class="paper-row">
          <span class="p-label">Tên tổ chức / Doanh nghiệp:</span>
          <span class="p-value"><b>${escapeHtml(ing.supplier)}</b></span>
        </div>
        <div class="paper-row">
          <span class="p-label">Địa chỉ cơ sở nuôi trồng:</span>
          <span class="p-value">${escapeHtml(ing.farmLocation)}</span>
        </div>
        <div class="paper-row">
          <span class="p-label">Đối tượng kiểm định:</span>
          <span class="p-value"><b>${escapeHtml(ing.name)}</b> (Mã lô: ${escapeHtml(ing.batchCode)})</span>
        </div>
        <div class="paper-row">
          <span class="p-label">Nội dung chứng nhận & đánh giá:</span>
          <span class="p-value">${escapeHtml(cert.summary)}</span>
        </div>
        <div class="paper-row">
          <span class="p-label">Tiêu chuẩn áp dụng:</span>
          <span class="p-value"><b>${escapeHtml((ing.standards || []).join(" · "))}</b></span>
        </div>
        <div class="paper-row">
          <span class="p-label">Kết luận kiểm nghiệm:</span>
          <span class="p-value text-success"><b>ĐẠT TIÊU CHUẨN AN TOÀN VỆ SINH THỰC PHẨM QUỐC GIA</b></span>
        </div>
      </div>

      <div class="paper-footer">
        <div class="paper-validity">
          <p>Ngày ký ban hành: <b>${escapeHtml(cert.issueDate)}</b></p>
          <p>Có giá trị đến hết: <b>${escapeHtml(cert.expiryDate)}</b></p>
          <div class="paper-qr-mini">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=CERT-${encodeURIComponent(cert.code)}" alt="QR Cert" width="70" height="70">
            <small>Mã số tra cứu trực tuyến cổng thông tin</small>
          </div>
        </div>

        <div class="paper-signature-box">
          <p class="sig-title">THAY MẶT CƠ QUAN THẨM QUYỀN<br><b>GIÁM ĐỐC / TRƯỞNG ĐOÀN ĐÁNH GIÁ</b></p>
          <div class="red-seal-graphic">
            <div class="seal-inner">
              <span>★ CƠ QUAN KIỂM ĐỊNH ★</span>
              <b>ĐÃ ĐỐI CHIẾU</b>
              <small>HỢP CHUẨN ATTP</small>
            </div>
          </div>
          <div class="sig-name"><i>(Đã ký duyệt & đóng dấu điện tử)</i></div>
        </div>
      </div>

      <div class="paper-actions">
        <button class="btn btn-outline" onclick="window.print()">🖨️ In chứng nhận / Lưu PDF</button>
        <button class="btn btn-primary" onclick="closeCertModal()">Đóng cửa sổ</button>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
};

window.closeCertModal = function() {
  const modal = document.getElementById("certificateModal");
  if (modal) modal.classList.add("hidden");
  document.body.style.overflow = "";
};
