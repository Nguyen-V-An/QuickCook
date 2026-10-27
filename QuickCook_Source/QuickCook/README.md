# QuickCook — Nấu Ngon, Sống Nhẹ (Nền Tảng Thực Phẩm Sơ Chế & Minh Bạch Nguồn Gốc)
> Đồ án Khởi nghiệp đổi mới sáng tạo — EXE101 | Đại học FPT

Website thương mại điện tử cung cấp các combo nguyên liệu sơ chế sạch, định lượng chuẩn cho bữa cơm gia đình, tiên phong ứng dụng **Hệ thống minh bạch nguồn gốc & Giấy chứng nhận chất lượng (VietGAP / HACCP / Kiểm dịch thú y)**, **Cổng thanh toán tự động VietQR (Napas 247)** và **Bảng điều khiển quản trị (Admin Dashboard)**.

---

## 🚀 HƯỚNG DẪN DÀNH CHO NGƯỜI KHÁC KHI TẢI / CLONE TỪ GIT VỀ

Khi bạn đẩy code lên Git (GitHub / GitLab), người khác (thành viên trong nhóm, mentor, giảng viên hướng dẫn, ban giám khảo) muốn tải về và chạy thử website chỉ cần làm theo các bước cực kỳ đơn giản dưới đây:

### Bước 1: Clone dự án về máy tính
Mở Terminal / Git Bash / Command Prompt và chạy lệnh:
```bash
git clone <URL_REPO_CUA_BAN>
cd QuickCook/QuickCook_Source/QuickCook
```
*(Nếu bạn tải về dưới dạng file .zip thì chỉ cần giải nén rồi mở thư mục `QuickCook_Source/QuickCook`).*

---

### Bước 2: Chọn 1 trong các cách dưới đây để chạy website

Website được xây dựng theo chuẩn công nghệ Web hiện đại, **hoạt động ngay lập tức 100% trên trình duyệt mà không bắt buộc phải cài database phức tạp để xem demo**. Chọn cách tiện nhất với máy của bạn:

#### ⚡ Cách 1: Chạy bằng Node.js (Khuyên dùng - Nhanh & chuẩn nhất)
Dự án đã tích hợp sẵn file `serve.js` siêu nhẹ dùng thư viện gốc của Node.js (không cần chạy `npm install`):
1. Mở Terminal / PowerShell tại thư mục `QuickCook`:
   ```bash
   node serve.js
   ```
2. Mở trình duyệt và truy cập vào địa chỉ: **`http://localhost:5500`**
3. Dừng server bằng tổ hợp phím `Ctrl + C`.

#### 💻 Cách 2: Mở bằng Visual Studio Code (Extension Live Server)
1. Mở Visual Studio Code.
2. Chọn **File > Open Folder...** và chọn thư mục `QuickCook` (trong `QuickCook_Source/QuickCook`).
3. Nhấp chuột phải vào file `index.html` chọn **Open with Live Server** (hoặc bấm nút "Go Live" ở thanh trạng thái góc dưới bên phải màn hình VS Code).
4. Website sẽ tự động mở trên trình duyệt tại `http://127.0.0.1:5500`.

#### 🛠️ Cách 3: Mở bằng Visual Studio 2022
1. Mở Visual Studio 2022.
2. Chọn **File > Open > Folder...**, duyệt chọn thư mục `QuickCook`.
3. Trong cửa sổ Solution Explorer, nhấp đúp file `index.html`.
4. Nhấp chuột phải vào `index.html` > chọn **View in Browser** (hoặc nhấn phím tắt `Ctrl + Shift + W`).

#### 🐍 Cách 4: Chạy bằng Python (nếu máy có cài Python)
Mở Terminal tại thư mục `QuickCook` và gõ lệnh:
```bash
python -m http.server 5500
```
Sau đó mở trình duyệt vào: **`http://localhost:5500`**.

#### 🌐 Cách 5: Mở trực tiếp bằng Trình duyệt (Không cần cài bất kỳ phần mềm nào)
1. Mở File Explorer của Windows, vào thư mục `QuickCook`.
2. Nhấp đúp chuột trực tiếp vào file **`index.html`** để mở bằng Google Chrome, Microsoft Edge hoặc Cốc Cốc.
*(Lưu ý: Khuyến khích dùng Cách 1 hoặc Cách 2 để các đường dẫn liên kết trang và ảnh mã QR hoạt động mượt mà và chuẩn xác nhất).*

---

## 🔑 TÀI KHOẢN TRUY CẬP DEMO & PHÂN QUYỀN (RBAC)

Hệ thống đã tích hợp sẵn cơ chế phân quyền bảo mật thực tế lưu trên `localStorage` trình duyệt:

| Vai trò | Email đăng nhập | Mật khẩu | Quyền hạn trong hệ thống |
| :--- | :--- | :--- | :--- |
| 👑 **Quản trị viên (Admin)** | `admin@quickcook.vn` | `admin123` | Toàn quyền truy cập **Admin Dashboard**, xem KPI doanh thu, biểu đồ phân tích 7 ngày, đổi trạng thái đơn hàng thời gian thực, CRUD món ăn, quản lý kho nguyên liệu, phân quyền tài khoản user. |
| 👤 **Khách hàng (Customer)** | `khach@quickcook.local` | `123456` | Đặt hàng, áp dụng Voucher, quét mã VietQR, theo dõi tiến độ đơn hàng tại *Đơn hàng của tôi*, tra cứu nguồn gốc nông trại & giấy kiểm định chất lượng. |

> 💡 **Tính năng thuyết trình tiện lợi**: Tại trang `login.html`, có sẵn 2 nút **"Đăng nhập demo nhanh 1 chạm"** cho quyền Admin và Khách hàng, giúp chuyển đổi vai trò tức thì mà không cần gõ bàn phím khi demo trước Hội đồng.

---

## 🌟 CÁC TÍNH NĂNG ĐÃ HOÀN THIỆN 100%

1. **Xác thực & Phân quyền bảo mật**:
   - Đăng ký tài khoản (hỗ trợ chọn vai trò), đăng nhập, nhớ phiên làm việc.
   - Bảo vệ trang `admin.html`: Tự động chặn người chưa đăng nhập hoặc khách hàng thường (Màn hình cảnh báo 403 Forbidden).
   - Thanh điều hướng Header tự động cập nhật tên, Avatar, Badge vai trò và menu dropdown tiện ích.

2. **16 Món ăn / Combo định lượng & Chi tiết món ăn (`product.html`)**:
   - Mở rộng 16 món ăn đa dạng: Combo gia đình, Món xào, Món kho, Canh dưỡng sinh, Lẩu thanh đạm, Salad Eat Clean.
   - Đầy đủ thông số: Khẩu phần, thời gian nấu, mức độ, lượng Calories, Protein, Carbs, Fat, Fiber.
   - Hướng dẫn công thức 4 bước chế biến chuẩn vị gia đình.
   - Hạn sử dụng bảo quản mát 48 giờ (Cold Chain 0-4°C).

3. **Hệ thống Minh bạch nguồn gốc & Hồ sơ chất lượng (`ingredient.html`)**:
   - Mỗi món ăn có danh sách các nguyên liệu sạch định lượng (Gram, số lượng).
   - Nút bấm **"Xem nguồn gốc & Giấy tờ 🔍"** chuyển sang trang hồ sơ từng nguyên liệu.
   - Thông tin trang trại đối tác (CP Green Farm, Ba Huân, HTX Đơn Dương Đà Lạt, Thủy sản Đồng Tháp...).
   - Mã lô kiểm định (Batch Code), ngày xuất kho, quy trình chuỗi cung ứng lạnh 5 bước khép kín.
   - Bộ hồ sơ giấy tờ chứng nhận ATVSTP: VietGAP, kiểm dịch động vật, kết quả xét nghiệm âm tính hóa chất BVTV (QUATEST 3).
   - **Interactive Certificate Modal**: Nút xem văn bản kiểm định gốc scan có quốc hiệu, con dấu đỏ và mã QR tra cứu.
   - Mã QR truy xuất nguồn gốc động quét bằng camera điện thoại.

4. **Cổng thanh toán tự động VietQR Napas 247 & Quản lý đơn hàng (`checkout.html`)**:
   - Tự động điền thông tin khách hàng nếu đã đăng nhập.
   - Lựa chọn: Chuyển khoản VietQR, COD tiền mặt, Ví MoMo.
   - Áp dụng Voucher giảm giá: `QUICKCOOK20` (giảm 20.000đ), `FREESHIP` (miễn phí ship).
   - Sinh mã VietQR thời gian thực từ API VietQR kèm STK ngân hàng MBBank, số tiền và mã đơn `QCxxxxxx`, nút sao chép 1-click, đồng hồ đếm ngược 15 phút.
   - Nút xác nhận thanh toán mô phỏng kiểm tra giao dịch và tự động cập nhật trạng thái đơn thành *Đã thanh toán VietQR*.
   - Timeline tiến độ: *Đã tiếp nhận ➔ Bếp sơ chế ➔ Đóng thùng lạnh ➔ Đang giao ➔ Hoàn tất*.
   - Trang **"Đơn hàng của tôi" (`my-orders.html`)** để theo dõi và quét lại mã thanh toán.

5. **Bảng điều khiển Quản trị viên (Admin Dashboard - `admin.html`)**:
   - 4 Khối thống kê KPI tài chính & vận hành thời gian thực.
   - Biểu đồ phân tích doanh thu 7 ngày gần nhất và cơ cấu danh mục bán chạy.
   - Quản lý đơn hàng: Lọc theo trạng thái (*Mới đặt, Đang sơ chế, Đang giao, Hoàn tất, Đã hủy*), đổi trạng thái đơn hàng trực tiếp, xem modal chi tiết hóa đơn.
   - Quản lý món ăn: Thêm / Sửa / Xóa món ăn, tăng giảm tồn kho (+/-), liên kết nguyên liệu.
   - Quản lý cơ sở dữ liệu nguồn gốc & chứng nhận ATVSTP.
   - Quản lý người dùng: Danh sách thành viên, đổi quyền qua lại giữa Admin và Khách hàng.
   - Nút "Khôi phục dữ liệu mẫu (16 món)" để reset dữ liệu demo bất cứ lúc nào.

---

## 🗄️ CƠ SỞ DỮ LIỆU SQL SERVER & HƯỚNG DẪN KẾT NỐI BACKEND (C# / JAVA)

Khi muốn chuyển đổi từ Frontend MVP sang hệ thống Backend chuyên sâu với C# (ASP.NET Core) hoặc Java (Spring Boot):
1. Mở **SQL Server Management Studio (SSMS)**, kết nối vào SQL Server cục bộ.
2. Mở file `database/quickcook_schema.sql` và bấm **Execute (F5)**.
3. Script sẽ tự động tạo database `QuickCookDB` với cấu trúc chuẩn:
   - `Categories`: Danh mục món ăn
   - `Products`: Món ăn & combo thực đơn
   - `Ingredients`: Danh mục nguyên liệu sạch minh bạch
   - `ProductIngredients`: Khóa ngoại bảng nối N:N giữa Món ăn và Nguyên liệu
   - `Certificates`: Giấy chứng nhận pháp lý VietGAP, kiểm dịch
   - `Users`: Người dùng & phân quyền vai trò (Admin / Customer)
   - `Orders` & `OrderItems`: Đơn hàng và chi tiết sản phẩm

---

## 📁 CẤU TRÚC THƯ MỤC DỰ ÁN

```text
QuickCook/
├── index.html                  # Trang chủ giới thiệu thương hiệu & danh mục nổi bật
├── products.html               # Trang danh mục sản phẩm, tìm kiếm, lọc giá & sắp xếp
├── product.html                # Trang chi tiết món ăn, công thức nấu, dinh dưỡng & nguyên liệu
├── ingredient.html             # Trang minh bạch nguồn gốc nông trại & giấy tờ kiểm định ATVSTP
├── cart.html                   # Giỏ hàng & điều chỉnh số lượng
├── checkout.html               # Cổng đặt hàng & thanh toán mã VietQR tự động
├── my-orders.html              # Trang tra cứu & theo dõi tiến độ đơn hàng cá nhân
├── login.html                  # Đăng nhập, đăng ký & nút chuyển nhanh quyền Admin / Khách
├── admin.html                  # Dashboard quản trị, biểu đồ KPI, quản lý đơn, món & phân quyền
├── policy.html                 # Trang văn bản chính sách TMĐT, Cold Chain, đổi trả & bảo mật NĐ 13
├── serve.js                    # Fullstack server Node.js: Static Web & RESTful Backend API Engine
├── images/                     # Thư mục chứa hình ảnh cục bộ (Local/Offline)
├── css/
│   └── styles.css              # Hệ thống CSS thiết kế giao diện hiện đại, responsive
├── js/
│   ├── data.js                 # Kho dữ liệu mẫu 16 món ăn, nguồn gốc nguyên liệu & LocalStorage
│   ├── app.js                  # Logic dùng chung, giỏ hàng, toasts & đồng bộ thanh Header
│   ├── catalog.js              # Lọc danh mục, tìm kiếm và sắp xếp sản phẩm
│   ├── product.js              # Render chi tiết món, dị ứng, bảo quản, nguyên liệu & dinh dưỡng
│   ├── ingredient.js           # Xử lý truy xuất nguồn gốc, chuỗi cung ứng & modal chứng nhận scan
│   ├── cart.js                 # Tính toán tiền giỏ hàng & cập nhật số lượng
│   ├── checkout.js             # Xử lý thanh toán VietQR, MoMo, ZaloPay, áp voucher & lưu đơn
│   ├── auth.js                 # Xử lý đăng nhập, đăng ký, phiên đăng nhập & phân quyền
│   └── admin.js                # Xử lý Dashboard admin, biểu đồ, đổi trạng thái đơn & CRUD món
└── database/
    └── quickcook_schema.sql    # Schema cơ sở dữ liệu quan hệ cho SQL Server (C# / Java)
```

---

## 🛡️ HỆ THỐNG BẢO MẬT BACKEND, CỔNG THANH TOÁN & AN TOÀN THỰC PHẨM

Nhằm đáp ứng yêu cầu khắt khe từ đồ án khởi nghiệp EXE101 và quy định kinh doanh thương mại điện tử thực tế, QuickCook được thiết kế với kiến trúc chuẩn hóa 4 trụ cột:

### 1. Backend REST API & Xác thực Server-side (Authentication & Role Guard):
* **Kiến trúc Server**: Server Node.js ([serve.js](file:///d:/Study%20FPT/Fall%2026/EXE101/Code%20web/QuickCook/QuickCook_Source/QuickCook/serve.js)) tích hợp sẵn REST API Engine:
  - `GET /api/health`: Kiểm tra tình trạng backend và các cơ chế mã hóa.
  - `POST /api/auth/register`: Đăng ký tài khoản, băm mật khẩu một chiều trước khi lưu trữ.
  - `POST /api/auth/login`: Xác thực tài khoản, so khớp chuỗi băm mật khẩu và cấp **Server-side JWT Bearer Token (HS256)**.
  - `GET /api/admin/users`: Endpoint quản trị viên có gắn **Server-side Role Guard**: Trả về `HTTP 403 Forbidden` nếu người dùng không mang token quyền `ADMIN`.

### 2. An toàn mật khẩu (Password Hashing - Tuyệt đối không lưu chữ thường):
* **Chuẩn mã hóa**: Áp dụng thuật toán **Salted PBKDF2 với SHA-512** và **10,000 vòng lặp (iterations)** cùng chuỗi muối ngẫu nhiên (Salt 16 bytes).
* **Bảo mật tuyệt đối**: Ngay cả khi cơ sở dữ liệu bị lộ, kẻ tấn công cũng không thể dịch ngược ra mật khẩu gốc.
* **Minh bạch demo**: Trên giao diện đăng nhập `login.html`, hệ thống ghi rõ ghi chú: *"Mật khẩu trên hệ thống thật được mã hóa một chiều; bản demo hỗ trợ nút 1 chạm để phục vụ chấm điểm giao diện."*

### 3. Tích hợp cổng thanh toán Backend & Webhook IPN (Không giả lập client-side):
* **Quy trình thanh toán thật (Production Payment Flow)**:
  1. Client gửi yêu cầu tạo thanh toán lên Server: `POST /api/payments/create-qr`.
  2. Server tính toán lại tổng tiền từ Database (không tin tưởng giá gửi từ client để chống gian lận) và ký số điện tử **HMAC-SHA256** với Secret Key.
  3. Server tạo mã QR chuẩn của MoMo Business, ZaloPay Merchant hoặc VietQR Napas 247 và gửi về cho Client hiển thị.
  4. **Webhook / IPN (Instant Payment Notification)**: Khi khách hoàn tất chuyển tiền, hệ thống MoMo / ZaloPay / Ngân hàng sẽ gửi một HTTP POST ngầm vào `POST /api/payments/webhook` của QuickCook.
  5. Server QuickCook kiểm tra chữ ký số (Checksum), nếu hợp lệ mới tự động đổi trạng thái đơn hàng thành `PAID` và kích hoạt đơn cho Bếp sơ chế.

### 4. Pháp lý Thương mại điện tử & Quy chuẩn ATVSTP trước khi bán thực phẩm thật:
* **Văn bản chính sách pháp lý đầy đủ (`policy.html`)**:
  - **Chính sách giao hàng Cold Chain**: Vận chuyển trong 2h nội thành, thùng xốp cách nhiệt đá gel (-5°C), duy trì nhiệt độ bảo quản lạnh **0°C đến 4°C**.
  - **Chính sách đổi trả & Hoàn tiền 100% trong 24h**: Bồi hoàn ngay lập tức nếu thực phẩm không đạt chuẩn tươi hoặc hỏng hóc bao bì.
  - **Bảo mật dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP**: Quy định rõ mục đích thu thập và cam kết không chia sẻ dữ liệu cho bên thứ ba.
  - **Điều khoản dịch vụ**: Phân định trách nhiệm người bán, người mua và giấy phép đủ điều kiện ATVSTP.
* **Kiểm soát Dị ứng & Hạn dùng (Food Safety & Allergen Control)**:
  - **Cảnh báo dị ứng (Big 8 Allergens)**: Hiển thị hộp cảnh báo màu vàng trên trang từng món ăn (Trứng, Hải sản, Gluten, Đậu nành...).
  - **Tem nhãn HSD & Bảo quản**: Ghi rõ quy cách bảo quản ngăn mát 0°C - 4°C, hạn dùng tốt nhất 48 giờ kể từ khi sơ chế tại bếp trung tâm.


---

## 🖼️ HƯỚNG DẪN THAY ĐỔI HÌNH ẢNH MÓN ĂN & MINH HỌA

### 1. Thay đổi hình ảnh món ăn (2 cách linh hoạt):
* **Cách 1 (Dễ nhất - Không cần sửa code)**:
  1. Đăng nhập tài khoản Admin (`admin@quickcook.vn` / `admin123`) tại `login.html`.
  2. Truy cập trang Quản trị: `http://localhost:5500/admin.html` -> Chọn tab **"🍲 Quản lý Món ăn & Tồn kho"**.
  3. Bấm nút **"Sửa" (✏️)** tại món muốn đổi ảnh (hoặc bấm *"+ Thêm món ăn mới"*).
  4. Dán link ảnh mới (hoặc đường dẫn ảnh nội bộ như `images/mon-an.jpg`) vào ô **"Đường dẫn hình ảnh (URL)"** -> Bấm **"💾 Lưu món ăn"**.
  5. Món ăn sẽ được cập nhật tức thì trên toàn bộ trang chủ, danh sách món, chi tiết và giỏ hàng.

* **Cách 2 (Sửa trực tiếp trong mã nguồn dữ liệu gốc `js/data.js`)**:
  1. Mở file `js/data.js`, cuộn xuống mảng `SEED_PRODUCTS` (dòng 388 trở đi).
  2. Sửa giá trị thuộc tính `image: "ĐƯỜNG_DẪN_ẢNH_MỚI"` của món tương ứng (QC001, QC002, ...).
  3. *Lưu ý*: Sau khi sửa trong `js/data.js`, vào `admin.html` bấm nút **"↺ Khôi phục dữ liệu mẫu (16 món)"** để web làm mới lại dữ liệu từ file.

### 2. Sử dụng hình ảnh tự chụp / tải về lưu trong máy (Offline):
1. Copy các file ảnh (.jpg, .png, .webp) vào thư mục `images/` trong thư mục dự án (ví dụ: `images/thit-kho.jpg`, `images/hero-banner.jpg`).
2. Trong `js/data.js` hoặc giao diện Admin, điền đường dẫn dạng: `images/thit-kho.jpg`.
3. Ảnh sẽ hiển thị ngay mà không cần phụ thuộc vào mạng internet bên ngoài.

### 3. Thay đổi hình ảnh minh họa banner trang chủ & logo:
* **Banner chính trang chủ (Hero Banner)**: Mở file `index.html`, tại dòng 19, sửa đường dẫn trong thẻ:
  `<img src="images/hero-banner.jpg" alt="...">`
* **Hình ảnh nguyên liệu & giấy chứng nhận**: Mở file `js/data.js`, tìm đối tượng `INGREDIENTS_DATA` (dòng 4 đến 385), sửa trường `image` của từng nguyên liệu.
* **Logo QuickCook**: Mở file `index.html` (và các file html khác), tại thẻ `<a class="brand" ...>`, bạn có thể thay thế icon chữ Q bằng thẻ `<img src="images/logo.png" style="height:38px;">`.

---

## 💡 LƯU Ý KHI THUYẾT TRÌNH BẢO VỆ ĐỒ ÁN (TIPS FOR PITCHING)

1. **Trình chiếu tính năng Đăng nhập**: Dùng nút *Đăng nhập quyền Admin* trên `login.html` để vào xem Dashboard ngay lập tức. Sau đó đăng xuất và bấm *Đăng nhập quyền Khách hàng* để thử nghiệm luồng mua hàng thực tế.
2. **Trình chiếu tính năng Minh bạch Nguồn gốc**: Vào món *Combo thịt kho trứng* -> Cuộn xuống mục nguyên liệu -> Bấm nút **"Xem nguồn gốc & Giấy tờ"** -> Bấm **"Xem bản chứng nhận gốc"** để mở chứng thư kiểm nghiệm VietGAP có mộc đỏ và quét thử QR bằng điện thoại.
3. **Trình chiếu Thanh toán**: Cho món vào giỏ hàng -> Thanh toán -> Nhập mã `QUICKCOOK20` -> Chọn Chuyển khoản VietQR -> Bấm *Tôi đã chuyển khoản thành công* để xem hiệu ứng xác thực giao dịch thời gian thực.
4. **Dọn sạch dữ liệu sau khi thử nghiệm**: Chỉ cần vào trang Admin và bấm nút **"↺ Khôi phục dữ liệu mẫu (16 món)"** ở góc trên bên phải.
