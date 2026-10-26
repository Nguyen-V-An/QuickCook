# QuickCook — frontend bán hàng demo

Website HTML/CSS/JavaScript thuần, thiết kế thương hiệu QuickCook riêng, tham khảo mô hình cửa hàng thực phẩm và combo nguyên liệu sơ chế.

## 1. Yêu cầu
- Visual Studio 2022 hoặc Visual Studio Code.
- Trình duyệt Chrome/Edge.
- Không cần Node.js để chạy bản demo.
- SQL Server/SSMS chỉ cần nếu muốn chuẩn bị database cho giai đoạn backend.

## 2. Chạy bằng Visual Studio 2022
1. Giải nén thư mục `QuickCook`.
2. Mở Visual Studio 2022.
3. Chọn **File > Open > Folder...**, chọn thư mục `QuickCook`.
4. Trong Solution Explorer, mở `index.html`.
5. Nhấp phải `index.html` > **Open With** > chọn trình duyệt nếu máy có tùy chọn này; hoặc mở File Explorer và nhấp đúp `index.html`.
6. Khuyến nghị cài extension **Live Server** trong Visual Studio Code nếu muốn tự reload khi sửa file. Với Visual Studio 2022, có thể dùng extension phục vụ static files hoặc mở trực tiếp HTML trong trình duyệt.
7. Mở `index.html` để bắt đầu. Các trang còn lại được liên kết từ menu.

### Cách chạy bằng HTTP server (tùy chọn)
Nếu máy có Python cài sẵn, mở Terminal/Command Prompt tại thư mục `QuickCook` rồi chạy:
```bash
python -m http.server 5500
```
Mở `http://localhost:5500`. Dừng server bằng `Ctrl+C`.

## 3. Cấu trúc thư mục
```text
QuickCook/
├── index.html              # Trang chủ
├── products.html           # Danh mục, tìm kiếm, lọc, sắp xếp
├── product.html            # Chi tiết sản phẩm
├── cart.html               # Giỏ hàng
├── checkout.html           # Đặt hàng
├── login.html              # Đăng nhập / đăng ký demo
├── admin.html              # Quản trị sản phẩm và xem đơn demo
├── css/
│   └── styles.css
├── js/
│   ├── data.js             # Dữ liệu mẫu và localStorage
│   ├── app.js              # Hàm dùng chung
│   ├── catalog.js
│   ├── product.js
│   ├── cart.js
│   ├── checkout.js
│   ├── auth.js
│   └── admin.js
└── database/
    └── quickcook_schema.sql
```

## 4. Chức năng có trong bản demo
- Trang chủ, danh mục sản phẩm, tìm kiếm theo tên/mô tả.
- Lọc theo danh mục và khoảng giá; sắp xếp giá.
- Chi tiết sản phẩm, chọn số lượng, thêm giỏ.
- Giỏ hàng, sửa số lượng, xóa sản phẩm.
- Form đặt hàng, lựa chọn COD/chuyển khoản demo, phí ship mẫu.
- Đăng ký/đăng nhập demo.
- Trang admin thêm/sửa/xóa sản phẩm, xem đơn hàng, khôi phục dữ liệu mẫu.
- Dữ liệu demo lưu bằng `localStorage` trong trình duyệt đang dùng.

## 5. Tài khoản demo
- Email: `khach@quickcook.local`
- Mật khẩu: `123456`

Admin hiện là trang demo không có bảo vệ quyền truy cập. Đây KHÔNG phải phân quyền bảo mật thật.

## 6. Database SQL Server
1. Mở SQL Server Management Studio (SSMS), kết nối SQL Server của bạn.
2. Mở `database/quickcook_schema.sql`.
3. Chạy script. Script tạo database `QuickCookDB`, bảng Categories, Products, Users, Orders, OrderItems và dữ liệu sản phẩm mẫu.
4. Nếu chạy lại script, các bảng hiện có trong script sẽ bị xóa và tạo lại. Không chạy trên database có dữ liệu cần giữ.

**Quan trọng:** HTML/CSS/JavaScript chạy trực tiếp trên trình duyệt không thể kết nối an toàn trực tiếp tới SQL Server. Script SQL hiện là bước chuẩn bị dữ liệu. Để website thật dùng database, cần xây dựng backend/API (ví dụ ASP.NET Core Web API/MVC), kết nối SQL Server ở phía server, mã hóa mật khẩu bằng thư viện an toàn, xác thực và phân quyền Admin, kiểm tra tồn kho và tạo đơn hàng phía server.

## 7. Các điểm cần thay trước khi dùng thật
- Thay ảnh demo và nội dung/giá/tồn kho bằng dữ liệu thật.
- Thêm QR hoặc link nguồn gốc chính xác của từng sản phẩm.
- Thêm API/backend, xác thực server-side và role Admin.
- Không lưu mật khẩu dạng chữ thường; bản demo chỉ làm để minh họa giao diện.
- Tích hợp cổng thanh toán qua backend; không giả lập giao dịch thật.
- Bổ sung chính sách giao hàng, đổi trả, bảo mật, quyền riêng tư và điều khoản.
- Kiểm tra bảo quản lạnh, hạn sử dụng, nguồn cung và thông tin dị ứng trước khi bán thực phẩm thật.

## 8. Chỉnh sửa nhanh
- Màu thương hiệu: biến CSS ở đầu `css/styles.css`.
- Dữ liệu sản phẩm: mảng `SEED_PRODUCTS` trong `js/data.js`.
- Thêm sản phẩm: vào `admin.html` > Thêm sản phẩm.
- Để xóa dữ liệu localStorage của bản demo, mở DevTools > Application > Local Storage và xóa các khóa bắt đầu bằng `quickcook_`.
