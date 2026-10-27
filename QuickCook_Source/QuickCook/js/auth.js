/* QuickCook Authentication & Role Authorization Logic */

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll("[data-tab]");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const msg = document.getElementById("authMessage");
  const redirectUrl = new URLSearchParams(location.search).get("redirect");

  // Tab switching
  tabs.forEach(t => {
    t.onclick = () => {
      tabs.forEach(x => x.classList.toggle("active", x === t));
      loginForm.classList.toggle("hidden", t.dataset.tab !== "login");
      registerForm.classList.toggle("hidden", t.dataset.tab !== "register");
      msg.classList.add("hidden");
    };
  });

  // Quick 1-click Demo Login buttons
  document.querySelectorAll(".quick-login-btn").forEach(btn => {
    btn.onclick = () => {
      const email = btn.dataset.email;
      const pass = btn.dataset.pass;
      loginForm.elements.email.value = email;
      loginForm.elements.password.value = pass;
      tabs[0].click();
      document.getElementById("submitLoginBtn").click();
    };
  });

  // Handle Login Submission
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const fd = new FormData(loginForm);
    const email = String(fd.get("email")).trim().toLowerCase();
    const password = String(fd.get("password"));

    const users = loadUsers();
    const user = users.find(u => u.email.toLowerCase() === email && u.password === password);

    if (!user) {
      msg.textContent = "Email hoặc mật khẩu không chính xác. Hãy dùng tài khoản có sẵn bên dưới.";
      msg.className = "notice notice-error";
      msg.classList.remove("hidden");
      return;
    }

    // Lưu session có vai trò (Role)
    const sessionData = {
      id: user.id || "USR-" + Date.now(),
      name: user.name,
      email: user.email,
      role: user.role || "customer",
      phone: user.phone || "",
      address: user.address || "",
      loggedInAt: new Date().toISOString()
    };
    setCurrentUser(sessionData);

    msg.textContent = `Đăng nhập thành công với vai trò ${user.role === "admin" ? "Quản trị viên (Admin)" : "Khách hàng"}. Đang chuyển hướng...`;
    msg.className = "notice notice-success";
    msg.classList.remove("hidden");

    showToast(`Xin chào ${user.name}! (${user.role === "admin" ? "👑 Quản trị viên" : "👤 Khách hàng"})`);

    setTimeout(() => {
      if (redirectUrl) {
        location.href = decodeURIComponent(redirectUrl);
      } else if (user.role === "admin") {
        location.href = "admin.html";
      } else {
        location.href = "index.html";
      }
    }, 800);
  });

  // Handle Register Submission
  registerForm.addEventListener("submit", e => {
    e.preventDefault();
    const fd = new FormData(registerForm);
    const email = String(fd.get("email")).trim().toLowerCase();
    const name = String(fd.get("name")).trim();
    const phone = String(fd.get("phone") || "").trim();
    const role = String(fd.get("role") || "customer");
    const password = String(fd.get("password"));

    const users = loadUsers();
    if (users.some(u => u.email.toLowerCase() === email)) {
      msg.textContent = "Email này đã được sử dụng. Vui lòng chọn email khác hoặc đăng nhập.";
      msg.className = "notice notice-error";
      msg.classList.remove("hidden");
      return;
    }

    const newUser = {
      id: "USR-" + Date.now().toString().slice(-6),
      name,
      email,
      password,
      role,
      phone,
      joinedAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    msg.textContent = `Tạo tài khoản ${role === "admin" ? "Admin" : "Khách hàng"} thành công! Vui lòng đăng nhập.`;
    msg.className = "notice notice-success";
    msg.classList.remove("hidden");

    showToast("Đăng ký thành công! Hãy đăng nhập ngay.");

    tabs[0].click();
    loginForm.elements.email.value = email;
    loginForm.elements.password.value = password;
  });
});
