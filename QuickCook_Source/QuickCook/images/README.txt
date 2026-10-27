Thư mục chứa hình ảnh nội bộ cho QuickCook (Local Images)
======================================================
Bạn có thể copy các file ảnh (.jpg, .png, .webp) vào thư mục này để sử dụng offline mà không phụ thuộc vào link mạng bên ngoài:

Ví dụ cách đặt tên:
- images/hero-banner.jpg      (Ảnh banner lớn ngoài trang chủ)
- images/logo.png             (Ảnh logo QuickCook nếu muốn thay chữ Q)
- images/mon-an-1.jpg         (Ảnh các món ăn)
- images/nguyen-lieu-1.jpg    (Ảnh nguyên liệu tươi sạch)

Cách dùng trong code hoặc Admin:
- Trong ô "Đường dẫn hình ảnh (URL)" ở Admin hoặc trong js/data.js:
  Điền: images/ten-file-anh.jpg
- Trong index.html:
  <img src="images/hero-banner.jpg" alt="...">
