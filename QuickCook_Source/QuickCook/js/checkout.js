/* QuickCook Checkout & VietQR Payment Gateway Logic */

let appliedDiscount = 0;
let discountCode = "";

function checkoutTotals() {
  const cart = getCart();
  const products = loadProducts();
  const items = cart.map(i => ({
    ...i,
    product: products.find(p => p.id === i.id)
  })).filter(i => i.product);

  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  let shipping = subtotal >= 300000 || subtotal === 0 ? 0 : 25000;
  
  if (discountCode === "FREESHIP") {
    shipping = 0;
  }

  const grandTotal = Math.max(0, subtotal + shipping - appliedDiscount);

  return {
    items,
    subtotal,
    shipping,
    discount: appliedDiscount,
    discountCode,
    total: grandTotal
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const currentUser = getCurrentUser();
  const noticeBox = document.getElementById("loggedUserNotice");

  // Tự động điền thông tin tài khoản nếu đã đăng nhập
  if (currentUser) {
    if (noticeBox) {
      noticeBox.innerHTML = `
        👤 Bạn đang đặt hàng với tài khoản <b>${escapeHtml(currentUser.name)}</b> (${escapeHtml(currentUser.email)}). 
        Thông tin đã được tự động điền bên dưới!
      `;
      noticeBox.classList.remove("hidden");
    }
    if (document.getElementById("cName")) document.getElementById("cName").value = currentUser.name || "";
    if (document.getElementById("cPhone")) document.getElementById("cPhone").value = currentUser.phone || "";
    if (document.getElementById("cEmail")) document.getElementById("cEmail").value = currentUser.email || "";
    if (document.getElementById("cAddress")) document.getElementById("cAddress").value = currentUser.address || "";
  }

  renderCheckoutSummary();

  // Highlight lựa chọn phương thức thanh toán
  document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener("change", () => {
      document.querySelectorAll(".payment-option").forEach(opt => opt.classList.remove("selected"));
      radio.closest(".payment-option").classList.add("selected");
    });
  });

  // Xử lý mã giảm giá
  const applyBtn = document.getElementById("applyVoucherBtn");
  const voucherInput = document.getElementById("voucherInput");
  const voucherMsg = document.getElementById("voucherMsg");

  if (applyBtn && voucherInput) {
    applyBtn.addEventListener("click", () => {
      const code = voucherInput.value.trim().toUpperCase();
      if (!code) return;

      if (code === "QUICKCOOK20") {
        appliedDiscount = 20000;
        discountCode = code;
        voucherMsg.className = "voucher-status-msg text-success";
        voucherMsg.textContent = "✓ Áp dụng thành công mã QUICKCOOK20: Giảm 20.000đ!";
        showToast("Đã áp dụng mã giảm 20.000đ!");
      } else if (code === "FREESHIP") {
        appliedDiscount = 0;
        discountCode = code;
        voucherMsg.className = "voucher-status-msg text-success";
        voucherMsg.textContent = "✓ Áp dụng thành công mã FREESHIP: Miễn phí vận chuyển!";
        showToast("Đã áp dụng miễn phí vận chuyển!");
      } else {
        voucherMsg.className = "voucher-status-msg text-error";
        voucherMsg.textContent = "Mã không hợp lệ. Hãy thử: QUICKCOOK20 hoặc FREESHIP";
        showToast("Mã giảm giá không tồn tại.", "error");
      }
      renderCheckoutSummary();
    });
  }

  // Xử lý nộp form đặt hàng
  const form = document.getElementById("checkoutForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const data = checkoutTotals();
      if (!data.items.length) {
        showToast("Giỏ hàng của bạn đang trống!", "error");
        return;
      }

      const fd = new FormData(form);
      const orderId = "QC" + Date.now().toString().slice(-8);
      const paymentMethod = fd.get("payment");
      let initialPaymentStatus = "Chưa thanh toán (Thu COD)";
      if (paymentMethod === "VIETQR") initialPaymentStatus = "Chờ thanh toán VietQR";
      else if (paymentMethod === "MOMO") initialPaymentStatus = "Chờ thanh toán MoMo QR";
      else if (paymentMethod === "ZALOPAY") initialPaymentStatus = "Chờ thanh toán ZaloPay QR";

      const newOrder = {
        id: orderId,
        userId: currentUser ? currentUser.id : null,
        name: fd.get("name"),
        phone: fd.get("phone"),
        email: fd.get("email"),
        address: fd.get("address"),
        note: fd.get("note"),
        payment: paymentMethod,
        paymentStatus: initialPaymentStatus,
        status: "Mới đặt",
        items: data.items.map(i => ({
          id: i.id,
          name: i.product.name,
          price: i.product.price,
          qty: i.qty,
          image: i.product.image
        })),
        subtotal: data.subtotal,
        shipping: data.shipping,
        discount: data.discount,
        total: data.total,
        createdAt: new Date().toISOString()
      };

      // Lưu đơn vào LocalStorage
      const orders = loadOrders();
      orders.unshift(newOrder);
      saveOrders(orders);

      // Xóa giỏ hàng
      saveCart([]);

      // Hiển thị màn hình tương ứng
      displayOrderSuccessScreen(newOrder);
    });
  }
});

function renderCheckoutSummary() {
  const data = checkoutTotals();
  const summary = document.getElementById("checkoutSummary");
  if (!summary) return;

  if (!data.items.length) {
    summary.innerHTML = `
      <h2>Chưa có sản phẩm</h2>
      <p class="muted">Hãy chọn một vài set nguyên liệu trước khi tiến hành thanh toán nhé.</p>
      <a class="btn btn-primary btn-full" href="products.html">Khám phá món ăn →</a>
    `;
    const submitBtn = document.getElementById("btnSubmitOrder");
    if (submitBtn) submitBtn.disabled = true;
    return;
  }

  summary.innerHTML = `
    <h2>Đơn hàng của bạn (${data.items.length} món)</h2>
    <div class="summary-items-list">
      ${data.items.map(i => `
        <div class="summary-product">
          <img src="${escapeHtml(i.product.image)}" alt="${escapeHtml(i.product.name)}" onerror="this.src='https://placehold.co/100x100/e9eee2/236b4b?text=QC'">
          <div class="summary-prod-info">
            <b>${escapeHtml(i.product.name)}</b>
            <small>Số lượng: ${i.qty} phần · ${money(i.product.price)}/set</small>
          </div>
          <span class="summary-prod-total">${money(i.product.price * i.qty)}</span>
        </div>
      `).join("")}
    </div>

    <div class="summary-calculations">
      <div class="summary-line">
        <span>Tạm tính hàng</span>
        <b>${money(data.subtotal)}</b>
      </div>
      <div class="summary-line">
        <span>Phí giao hàng bảo ôn 0-4°C</span>
        <b>${data.shipping === 0 ? '<span class="text-success">Miễn phí</span>' : money(data.shipping)}</b>
      </div>
      ${data.discount > 0 ? `
        <div class="summary-line text-success">
          <span>Khuyến mãi (${escapeHtml(data.discountCode)})</span>
          <b>- ${money(data.discount)}</b>
        </div>
      ` : ""}
      <div class="summary-line total">
        <span>Tổng thanh toán</span>
        <b class="grand-total-amount">${money(data.total)}</b>
      </div>
    </div>

    <div class="summary-trust-badge">
      <span>🚚 Giao nhanh 2h nội thành TP.HCM</span>
      <span>❄️ Đóng thùng giữ nhiệt Cold Chain</span>
      <span>🥗 100% nguyên liệu chuẩn VietGAP</span>
    </div>
  `;
}

// Hiển thị màn hình Thanh toán VietQR / MoMo / ZaloPay & Xác nhận đặt hàng
function displayOrderSuccessScreen(order) {
  const mainLayout = document.getElementById("checkoutMainLayout");
  const successScreen = document.getElementById("paymentSuccessScreen");
  if (mainLayout) mainLayout.classList.add("hidden");
  if (!successScreen) return;

  successScreen.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });

  const isVietQR = order.payment === "VIETQR";
  const isMoMo = order.payment === "MOMO";
  const isZaloPay = order.payment === "ZALOPAY";
  const isOnlinePayment = isVietQR || isMoMo || isZaloPay;

  let qrTitle = "Đặt hàng thành công!";
  let qrIcon = "🎉";
  let qrImgUrl = "";
  let providerName = "";
  let accountLabel = "Số tài khoản:";
  let accountNumber = "0388998899";
  let accountHolder = "CONG TY QUICKCOOK VIETNAM";
  let themeClass = "theme-vietqr";
  let guideSteps = [];

  if (isVietQR) {
    qrTitle = "Quét mã VietQR để hoàn tất thanh toán";
    qrIcon = "⚡";
    qrImgUrl = `https://img.vietqr.io/image/MB-0388998899-compact2.jpg?amount=${order.total}&addInfo=${encodeURIComponent(order.id)}&accountName=QUICKCOOK%20VIETNAM`;
    providerName = "MBBank - Ngân hàng Quân Đội";
    accountLabel = "Số tài khoản:";
    accountNumber = "0388998899";
    accountHolder = "CONG TY QUICKCOOK VIETNAM";
    themeClass = "theme-vietqr";
    guideSteps = [
      "Mở app ngân hàng bất kỳ (MB, VCB, Techcombank, VPBank, ACB...)",
      "Chọn tính năng <b>Quét mã QR</b> và quét mã VietQR bên cạnh.",
      "Kiểm tra số tiền và nội dung chuyển khoản, sau đó bấm <b>Xác nhận</b>."
    ];
  } else if (isMoMo) {
    qrTitle = "Quét mã MoMo QR để hoàn tất thanh toán";
    qrIcon = "🟣";
    qrImgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=8&data=${encodeURIComponent('2|99|0987654321|CONG TY QUICKCOOK VIETNAM|hello@quickcook.vn|0|0|' + order.total + '|' + order.id + '|transfer_myqr')}`;
    providerName = "Ví điện tử MoMo (MoMo Business)";
    accountLabel = "Số điện thoại ví MoMo:";
    accountNumber = "0987654321";
    accountHolder = "CONG TY QUICKCOOK VIETNAM (Doanh nghiệp ✓)";
    themeClass = "theme-momo";
    guideSteps = [
      "Mở ứng dụng <b>Ví MoMo</b> trên điện thoại của bạn.",
      "Bấm vào biểu tượng <b>Quét Mã</b> ở góc trên màn hình chính.",
      "Quét mã MoMo QR bên cạnh, kiểm tra số tiền và xác nhận chuyển tiền."
    ];
  } else if (isZaloPay) {
    qrTitle = "Quét mã ZaloPay QR để hoàn tất thanh toán";
    qrIcon = "🔵";
    qrImgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=8&data=${encodeURIComponent('https://zalopay.vn/pay?amount=' + order.total + '&desc=' + order.id + '&merchant=QUICKCOOK_VIETNAM')}`;
    providerName = "Ví điện tử ZaloPay (ZaloPay Merchant)";
    accountLabel = "Tài khoản nhận ZaloPay:";
    accountNumber = "0987654321";
    accountHolder = "CONG TY QUICKCOOK VIETNAM";
    themeClass = "theme-zalopay";
    guideSteps = [
      "Mở ứng dụng <b>Zalo</b> hoặc <b>ZaloPay</b> trên điện thoại.",
      "Bấm vào biểu tượng <b>Quét mã QR</b> trên thanh tìm kiếm hoặc màn hình chính.",
      "Quét mã ZaloPay QR bên cạnh để hoàn tất chuyển tiền nhanh chóng."
    ];
  }

  successScreen.innerHTML = `
    <div class="order-confirm-card ${themeClass}">
      <div class="confirm-header">
        <div class="confirm-icon">${qrIcon}</div>
        <h1>${qrTitle}</h1>
        <p class="muted">Mã đơn hàng: <b class="order-id-highlight">${order.id}</b></p>
      </div>

      ${isOnlinePayment ? `
        <!-- KHU VỰC QUÉT MÃ QR THANH TOÁN (VIETQR / MOMO / ZALOPAY) -->
        <div class="vietqr-box-container qr-box-${order.payment.toLowerCase()}">
          <div class="vietqr-qr-col">
            <div class="qr-brand-badge ${isMoMo ? 'badge-momo-qr' : (isZaloPay ? 'badge-zalopay-qr' : 'badge-vietqr-qr')}">
              ${isMoMo ? '🟣 MoMo QR Chính Hãng' : (isZaloPay ? '🔵 ZaloPay QR Chính Hãng' : '⚡ VietQR Napas 247')}
            </div>
            <div class="qr-frame">
              <img src="${qrImgUrl}" alt="Mã thanh toán ${order.payment} Đơn ${order.id}" class="vietqr-img" onerror="this.src='https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${order.payment}-${order.id}'">
            </div>
            <div class="qr-countdown" id="qrCountdown">
              ⏱️ Mã QR có hiệu lực trong: <b id="countdownTimer">14:59</b>
            </div>
          </div>

          <div class="vietqr-info-col">
            <h3>Thông tin thanh toán:</h3>
            <div class="bank-details-card">
              <div class="b-row">
                <span>Dịch vụ nhận tiền:</span>
                <b>${providerName}</b>
              </div>
              <div class="b-row">
                <span>${accountLabel}</span>
                <div class="copy-field">
                  <b id="stkVal">${accountNumber}</b>
                  <button type="button" class="btn-copy" onclick="copyText('${accountNumber}', this)">Sao chép</button>
                </div>
              </div>
              <div class="b-row">
                <span>Chủ tài khoản / Đơn vị nhận:</span>
                <b>${accountHolder}</b>
              </div>
              <div class="b-row">
                <span>Số tiền thanh toán:</span>
                <div class="copy-field">
                  <b class="text-price" id="amountVal">${money(order.total)}</b>
                  <button type="button" class="btn-copy" onclick="copyText('${order.total}', this)">Sao chép</button>
                </div>
              </div>
              <div class="b-row">
                <span>Nội dung chuyển khoản (Memo):</span>
                <div class="copy-field">
                  <b class="text-memo" id="memoVal">${order.id}</b>
                  <button type="button" class="btn-copy" onclick="copyText('${order.id}', this)">Sao chép</button>
                </div>
              </div>
            </div>

            <div class="qr-steps-guide">
              <p><b>Hướng dẫn 3 bước thanh toán qua ${isMoMo ? 'MoMo' : (isZaloPay ? 'ZaloPay' : 'Ngân hàng')}:</b></p>
              <ol>
                ${guideSteps.map(st => `<li>${st}</li>`).join("")}
              </ol>
            </div>

            <div class="confirm-payment-action">
              <button class="btn btn-primary btn-full btn-large ${isMoMo ? 'btn-momo' : (isZaloPay ? 'btn-zalopay' : '')}" id="btnConfirmPaid" onclick="simulatePaymentConfirm('${order.id}', '${order.payment}')">
                ✅ Tôi đã hoàn tất thanh toán ${isMoMo ? 'MoMo' : (isZaloPay ? 'ZaloPay' : 'VietQR')}
              </button>
              <small class="muted text-center" style="display:block;margin-top:6px;">
                Hệ thống tự động kiểm tra giao dịch và xác nhận đơn hàng sau 2-3 giây.
              </small>
            </div>
          </div>
        </div>
      ` : `
        <!-- XÁC NHẬN THANH TOÁN TIỀN MẶT COD -->
        <div class="cod-success-box">
          <div class="status-alert">
            <span class="icon">📦</span>
            <div>
              <b>Đơn hàng đã được chuyển tới Bếp trung tâm QuickCook</b>
              <p>Bếp đang tiến hành chuẩn bị các phần nguyên liệu tươi sạch và đóng gói thùng lạnh chuyển giao cho shipper. Bạn sẽ thanh toán <b>${money(order.total)}</b> tiền mặt khi nhận hàng.</p>
            </div>
          </div>
        </div>
      `}

      <!-- TIẾN ĐỘ THEO DÕI ĐƠN HÀNG (TIMELINE) -->
      <div class="order-timeline-box">
        <h3>Tiến độ đơn hàng thời gian thực:</h3>
        <div class="timeline-steps">
          <div class="t-step active">
            <div class="t-circle">1</div>
            <b>Đã tiếp nhận</b>
            <small>Đơn mới</small>
          </div>
          <div class="t-step active">
            <div class="t-circle">2</div>
            <b>Đang sơ chế</b>
            <small>Bếp trung tâm</small>
          </div>
          <div class="t-step">
            <div class="t-circle">3</div>
            <b>Đóng thùng lạnh</b>
            <small>Kiểm tra ATTP</small>
          </div>
          <div class="t-step">
            <div class="t-circle">4</div>
            <b>Đang giao</b>
            <small>Shipper nội thành</small>
          </div>
          <div class="t-step">
            <div class="t-circle">5</div>
            <b>Giao thành công</b>
            <small>Hoàn tất</small>
          </div>
        </div>
      </div>

      <!-- CHI TIẾT ĐƠN HÀNG & THÔNG TIN NGƯỜI NHẬN -->
      <div class="order-details-grid">
        <div class="info-block">
          <h4>Thông tin người nhận:</h4>
          <p>👤 <b>Họ tên:</b> ${escapeHtml(order.name)}</p>
          <p>📞 <b>Số điện thoại:</b> ${escapeHtml(order.phone)}</p>
          <p>📍 <b>Địa chỉ:</b> ${escapeHtml(order.address)}</p>
          ${order.note ? `<p>📝 <b>Ghi chú:</b> ${escapeHtml(order.note)}</p>` : ""}
          <p>💳 <b>Phương thức:</b> ${order.payment === "VIETQR" ? "Chuyển khoản VietQR" : (order.payment === "MOMO" ? "Ví điện tử MoMo" : (order.payment === "ZALOPAY" ? "Ví điện tử ZaloPay" : "Thanh toán COD"))}</p>
          <p>🏷️ <b>Trạng thái thanh toán:</b> <span id="paymentStatusTag" class="status-pill">${escapeHtml(order.paymentStatus)}</span></p>
        </div>

        <div class="info-block">
          <h4>Món ăn trong đơn:</h4>
          <div class="order-receipt-items">
            ${order.items.map(i => `
              <div class="receipt-item-line">
                <span>${escapeHtml(i.name)} × <b>${i.qty}</b></span>
                <b>${money(i.price * i.qty)}</b>
              </div>
            `).join("")}
            <hr>
            <div class="receipt-item-line">
              <span>Phí vận chuyển:</span>
              <span>${order.shipping === 0 ? "Miễn phí" : money(order.shipping)}</span>
            </div>
            ${order.discount > 0 ? `
              <div class="receipt-item-line text-success">
                <span>Khuyến mãi:</span>
                <span>- ${money(order.discount)}</span>
              </div>
            ` : ""}
            <div class="receipt-item-line total">
              <span>Tổng thanh toán:</span>
              <b class="text-price">${money(order.total)}</b>
            </div>
          </div>
        </div>
      </div>

      <div class="confirm-footer-actions">
        <a href="my-orders.html" class="btn btn-outline">
          📦 Xem tại Đơn hàng của tôi
        </a>
        <a href="index.html" class="btn btn-primary">
          Tiếp tục mua sắm →
        </a>
      </div>
    </div>
  `;

  // Start 15m countdown if online payment
  if (isOnlinePayment) {
    let timeLeft = 15 * 60;
    const timerEl = document.getElementById("countdownTimer");
    if (timerEl) {
      clearInterval(window.vietQrInterval);
      window.vietQrInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
          clearInterval(window.vietQrInterval);
          timerEl.textContent = "Hết hạn";
          return;
        }
        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        timerEl.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
      }, 1000);
    }
  }
}

// Sao chép thông tin
window.copyText = function(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.textContent;
    btn.textContent = "Đã chép ✓";
    btn.classList.add("copied");
    showToast(`Đã sao chép: ${text}`);
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove("copied");
    }, 2000);
  });
};

// Mô phỏng kiểm tra thanh toán thành công (VietQR / MoMo / ZaloPay)
window.simulatePaymentConfirm = function(orderId, paymentMethod = "VIETQR") {
  const btn = document.getElementById("btnConfirmPaid");
  let methodLabel = "VietQR";
  if (paymentMethod === "MOMO") methodLabel = "MoMo";
  else if (paymentMethod === "ZALOPAY") methodLabel = "ZaloPay";

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-inline"></span> Đang xác thực giao dịch ${methodLabel}...`;
  }

  setTimeout(() => {
    // Cập nhật trạng thái trong LocalStorage
    const orders = loadOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.paymentStatus = `Đã thanh toán ${methodLabel} ✓`;
      order.status = "Đang sơ chế";
      saveOrders(orders);
    }

    const tag = document.getElementById("paymentStatusTag");
    if (tag) {
      tag.textContent = `Đã thanh toán ${methodLabel} ✓`;
      tag.className = "status-pill tag-green";
    }

    if (btn) {
      btn.className = "btn btn-full btn-large btn-success";
      btn.innerHTML = `🎉 Giao dịch ${methodLabel} thành công! Bếp đang nấu món cho bạn.`;
    }

    showToast(`Xác nhận thanh toán ${methodLabel} thành công! Đơn hàng đang được chuẩn bị.`, "success");
  }, 1600);
};
