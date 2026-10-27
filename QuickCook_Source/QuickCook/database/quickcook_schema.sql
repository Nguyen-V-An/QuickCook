/*
  QuickCook SQL Server Enterprise Schema & Data Script
  Dùng cho Backend C# (ASP.NET Core Web API / Entity Framework Core) hoặc Java (Spring Boot / Spring Data JPA).
  Chạy trong SQL Server Management Studio (SSMS) trên database QuickCookDB.
*/
IF DB_ID(N'QuickCookDB') IS NULL CREATE DATABASE QuickCookDB;
GO
USE QuickCookDB;
GO

-- Xóa bảng theo thứ tự quan hệ khóa ngoại
IF OBJECT_ID('dbo.Certificates','U') IS NOT NULL DROP TABLE dbo.Certificates;
IF OBJECT_ID('dbo.ProductIngredients','U') IS NOT NULL DROP TABLE dbo.ProductIngredients;
IF OBJECT_ID('dbo.Ingredients','U') IS NOT NULL DROP TABLE dbo.Ingredients;
IF OBJECT_ID('dbo.OrderItems','U') IS NOT NULL DROP TABLE dbo.OrderItems;
IF OBJECT_ID('dbo.Orders','U') IS NOT NULL DROP TABLE dbo.Orders;
IF OBJECT_ID('dbo.Products','U') IS NOT NULL DROP TABLE dbo.Products;
IF OBJECT_ID('dbo.Categories','U') IS NOT NULL DROP TABLE dbo.Categories;
IF OBJECT_ID('dbo.Users','U') IS NOT NULL DROP TABLE dbo.Users;
GO

-- 1. Bảng Danh mục món ăn
CREATE TABLE dbo.Categories(
  CategoryId INT IDENTITY(1,1) PRIMARY KEY,
  Name NVARCHAR(100) NOT NULL,
  Slug VARCHAR(50) NOT NULL UNIQUE
);

-- 2. Bảng Sản phẩm (Món ăn / Combo)
CREATE TABLE dbo.Products(
  ProductId INT IDENTITY(1,1) PRIMARY KEY,
  SKU VARCHAR(30) NOT NULL UNIQUE,
  Name NVARCHAR(200) NOT NULL,
  CategoryId INT NOT NULL REFERENCES dbo.Categories(CategoryId),
  Description NVARCHAR(MAX) NULL,
  Price DECIMAL(12,2) NOT NULL CHECK(Price >= 0),
  OldPrice DECIMAL(12,2) NULL,
  Stock INT NOT NULL DEFAULT 0 CHECK(Stock >= 0),
  Tag NVARCHAR(50) NULL,
  Weight NVARCHAR(50) NULL,
  CookingTime NVARCHAR(50) NULL,
  Difficulty NVARCHAR(30) NULL,
  Calories NVARCHAR(50) NULL,
  ImageUrl NVARCHAR(1000) NULL,
  IsActive BIT NOT NULL DEFAULT 1,
  CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

-- 3. Bảng Nguyên liệu sạch minh bạch nguồn gốc (Traceability)
CREATE TABLE dbo.Ingredients(
  IngredientId VARCHAR(50) PRIMARY KEY,
  Name NVARCHAR(200) NOT NULL,
  Category NVARCHAR(100) NOT NULL,
  Supplier NVARCHAR(250) NOT NULL,
  FarmLocation NVARCHAR(500) NOT NULL,
  Standards NVARCHAR(250) NOT NULL,
  BatchCode VARCHAR(50) NOT NULL,
  HarvestDate NVARCHAR(100) NULL,
  StorageCondition NVARCHAR(200) NULL,
  ImageUrl NVARCHAR(1000) NULL,
  Description NVARCHAR(MAX) NULL,
  CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

-- 4. Bảng liên kết Món ăn - Nguyên liệu (M:N)
CREATE TABLE dbo.ProductIngredients(
  ProductId INT NOT NULL REFERENCES dbo.Products(ProductId) ON DELETE CASCADE,
  IngredientId VARCHAR(50) NOT NULL REFERENCES dbo.Ingredients(IngredientId) ON DELETE CASCADE,
  Amount NVARCHAR(100) NOT NULL,
  PRIMARY KEY (ProductId, IngredientId)
);

-- 5. Bảng Giấy tờ chứng nhận & Hồ sơ pháp lý ATVSTP
CREATE TABLE dbo.Certificates(
  CertificateId VARCHAR(50) PRIMARY KEY,
  IngredientId VARCHAR(50) NOT NULL REFERENCES dbo.Ingredients(IngredientId) ON DELETE CASCADE,
  Title NVARCHAR(300) NOT NULL,
  Issuer NVARCHAR(300) NOT NULL,
  Code VARCHAR(100) NOT NULL,
  IssueDate NVARCHAR(50) NOT NULL,
  ExpiryDate NVARCHAR(50) NOT NULL,
  Status NVARCHAR(100) NOT NULL,
  Summary NVARCHAR(MAX) NULL
);

-- 6. Bảng Người dùng & Phân quyền (Users & Roles)
CREATE TABLE dbo.Users(
  UserId INT IDENTITY(1,1) PRIMARY KEY,
  FullName NVARCHAR(150) NOT NULL,
  Email NVARCHAR(254) NOT NULL UNIQUE,
  PasswordHash NVARCHAR(500) NOT NULL,
  Role VARCHAR(20) NOT NULL DEFAULT 'customer' CHECK(Role IN ('customer','admin')),
  Phone VARCHAR(20) NULL,
  Address NVARCHAR(500) NULL,
  CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

-- 7. Bảng Đơn hàng
CREATE TABLE dbo.Orders(
  OrderId BIGINT IDENTITY(100001,1) PRIMARY KEY,
  OrderCode VARCHAR(30) NOT NULL UNIQUE,
  UserId INT NULL REFERENCES dbo.Users(UserId),
  CustomerName NVARCHAR(150) NOT NULL,
  Phone VARCHAR(20) NOT NULL,
  Email NVARCHAR(254) NULL,
  ShippingAddress NVARCHAR(500) NOT NULL,
  Note NVARCHAR(1000) NULL,
  PaymentMethod VARCHAR(20) NOT NULL CHECK(PaymentMethod IN ('COD','VIETQR','MOMO')),
  PaymentStatus NVARCHAR(100) NOT NULL DEFAULT N'Chờ thanh toán',
  OrderStatus NVARCHAR(50) NOT NULL DEFAULT N'Mới đặt',
  Subtotal DECIMAL(12,2) NOT NULL,
  ShippingFee DECIMAL(12,2) NOT NULL DEFAULT 0,
  Discount DECIMAL(12,2) NOT NULL DEFAULT 0,
  Total DECIMAL(12,2) NOT NULL,
  CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

-- 8. Bảng Chi tiết món ăn trong Đơn hàng
CREATE TABLE dbo.OrderItems(
  OrderItemId BIGINT IDENTITY(1,1) PRIMARY KEY,
  OrderId BIGINT NOT NULL REFERENCES dbo.Orders(OrderId) ON DELETE CASCADE,
  ProductId INT NULL REFERENCES dbo.Products(ProductId),
  ProductName NVARCHAR(200) NOT NULL,
  UnitPrice DECIMAL(12,2) NOT NULL,
  Quantity INT NOT NULL CHECK(Quantity > 0),
  LineTotal AS (UnitPrice * Quantity) PERSISTED
);
GO

-- ==========================================================
-- DỮ LIỆU MẪU KHỞI TẠO (SEED DATA)
-- ==========================================================

-- Danh mục
INSERT dbo.Categories(Name,Slug) VALUES
(N'Combo bữa cơm gia đình','combo'),
(N'Rau củ sơ chế & Salad','rau'),
(N'Thịt cá & Món mặn','thit'),
(N'Canh dinh dưỡng & Lẩu','canh');

-- Người dùng (Admin & Customer)
INSERT dbo.Users(FullName,Email,PasswordHash,Role,Phone,Address) VALUES
(N'Quản trị viên QuickCook','admin@quickcook.vn','admin123','admin','0901234567',N'Trụ sở QuickCook TP.HCM'),
(N'Nguyễn Văn An','khach@quickcook.local','123456','customer','0987654321',N'Số 12 đường D1, TP. Thủ Đức, TP.HCM');

-- Nguyên liệu minh bạch
INSERT dbo.Ingredients(IngredientId,Name,Category,Supplier,FarmLocation,Standards,BatchCode,HarvestDate,StorageCondition,ImageUrl,Description) VALUES
('thit-ba-roi-cp',N'Thịt ba rọi heo thảo mộc',N'Thịt tươi sống',N'Trang trại CP Green Farm Việt Nam',N'Huyện Củ Chi, TP. Hồ Chí Minh',N'VietGAP, ISO 22000:2018','CP-HCM-2026-B0892',N'04:30 sáng mỗi ngày',N'0°C - 4°C',N'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f',N'Heo nuôi thảo mộc khép kín không tồn dư kháng sinh.'),
('trung-ba-huan',N'Trứng gà tươi sạch tiệt trùng',N'Trứng',N'Công ty Cổ phần Ba Huân',N'Trang trại Ba Huân, Bến Lức, Long An',N'HACCP, VietGAP, UV','BH-LA-2026-T402',N'Trong 24h',N'2°C - 8°C',N'https://images.unsplash.com/photo-1516467508483-a7212febe31a',N'Trứng xử lý diệt khuẩn bằng tia cực tím UV Hà Lan.'),
('kho-qua-dalat',N'Khổ qua sạch VietGAP Đơn Dương',N'Rau củ',N'HTX Nông sản An Toàn Đơn Dương',N'Huyện Đơn Dương, Tỉnh Lâm Đồng',N'VietGAP, Không tồn dư BVTV','HTX-DD-2026-KQ01',N'Sáng sớm mỗi ngày',N'4°C - 8°C',N'https://images.unsplash.com/photo-1540420773420-3366772f4999',N'Trồng nhà màng công nghệ cao, tưới nhỏ giọt Israel.'),
('thit-bo-uc',N'Thịt thăn bò Úc mát',N'Thịt nhập khẩu',N'Kilcoy Global Foods Australia',N'Queensland, Australia',N'MLA, HACCP, Halal','AUS-QLD-2026-KGF-04',N'Chilled 0-2°C',N'0°C - 2°C',N'https://images.unsplash.com/photo-1544025162-d76694265947',N'Bò chăn thả ăn ngũ cốc tự nhiên 100 ngày.'),
('ca-loc-dong-thap',N'Cá lóc đồng làm sạch phi lê',N'Thủy hải sản',N'HTX Thủy sản Nước ngọt Đồng Tháp Mười',N'Tam Nông, Đồng Tháp',N'VietGAP, OCOP 4 Sao','DT-TN-2026-CL09',N'03:00 sáng',N'0°C - 4°C',N'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb',N'Cá lóc sinh thái thịt dai ngọt đậm đà.');

-- Giấy chứng nhận
INSERT dbo.Certificates(CertificateId,IngredientId,Title,Issuer,Code,IssueDate,ExpiryDate,Status,Summary) VALUES
('CERT-VG-01','thit-ba-roi-cp',N'Giấy chứng nhận Thực hành nông nghiệp tốt (VietGAP)',N'QUACERT - Bộ Khoa học và Công nghệ','VG-2024-HCM-08912','15/01/2024','15/01/2027',N'Đang hiệu lực',N'Quy trình chăn nuôi đạt chuẩn an toàn sinh học TCVN 11892-1:2017.'),
('CERT-KD-02','thit-ba-roi-cp',N'Giấy kiểm dịch động vật và sản phẩm động vật',N'Chi cục Thú y TP. Hồ Chí Minh','KD-TY-2026/84210','Cấp theo lô hàng','Lô xuất xưởng',N'Đang hiệu lực',N'100% lô thịt được kiểm soát thú y nghiêm ngặt.'),
('CERT-BH-01','trung-ba-huan',N'Chứng nhận Hệ thống phân tích mối nguy HACCP',N'SGS Thụy Sĩ','VN22/00482-HACCP','20/03/2023','19/03/2026',N'Đang hiệu lực',N'Quy trình đóng hộp và tiệt trùng đạt chuẩn an toàn quốc tế.'),
('CERT-KQ-01','kho-qua-dalat',N'Chứng nhận VietGAP Trồng trọt',N'Chi cục Trồng trọt và BVTV Lâm Đồng','LD-TT-VG-2025-0391','12/04/2024','12/04/2027',N'Đang hiệu lực',N'Quy chuẩn cách ly thuốc sinh học an toàn không dư lượng.');

-- Sản phẩm (16 món ăn)
INSERT dbo.Products(SKU,Name,CategoryId,Description,Price,OldPrice,Stock,Tag,Weight,CookingTime,ImageUrl) VALUES
('QC001',N'Combo thịt kho trứng nước dừa 2-3 người',1,N'Set combo chuẩn vị cơm mẹ nấu: Thịt ba rọi heo thảo mộc mềm rục, trứng gà Ba Huân bùi béo kết hợp nước dừa xiêm Bến Tre.',139000,159000,28,N'Bán chạy nhất',N'2-3 người',N'25-30 phút',N'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80'),
('QC002',N'Set canh khổ qua dồn thịt thanh mát',4,N'Khổ qua Đơn Dương đã lấy sạch ruột, nhân thịt nạc vai xay quết nấm mèo tiêu sọ giòn dai.',89000,99000,22,N'Giải nhiệt',N'2-3 người',N'20 phút',N'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80'),
('QC003',N'Combo gà ta kho gừng lá chanh',1,N'Gà ta thả đồi Yên Thế thịt chắc, ngọt thơm được sơ chế chặt miếng vừa ăn, ướp cùng gừng sẻ cay nồng.',125000,145000,19,N'Đậm đà',N'2-3 người',N'25 phút',N'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=700&q=80'),
('QC004',N'Set rau củ xào thập cẩm nấm hương',2,N'Súp lơ xanh, cà rốt Đà Lạt, bắp non và nấm đùi gà được rửa sạch cắt tỉa bông đẹp mắt.',65000,NULL,35,N'Tươi mỗi ngày',N'2 người',N'10-15 phút',N'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80'),
('QC005',N'Set bò Úc xào lúc lắc khoai tây',3,N'Thịt thăn bò Úc mát cắt quân cờ vuông vức mềm tan mọng nước, ớt chuông Đà Lạt ba màu giòn ngọt.',159000,179000,16,N'Yêu thích',N'2 người',N'15 phút',N'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80'),
('QC006',N'Set canh chua cá lóc bông điên điển',4,N'Cá lóc đồng Đồng Tháp béo ngọt cắt khoanh tròn, nước cốt me tươi, bạc hà, đậu bắp, cà chua và bông điên điển.',109000,125000,14,N'Đặc sản miền Tây',N'3-4 người',N'20 phút',N'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=700&q=80'),
('QC007',N'Set salad ức gà rau mầm sốt mè rang',2,N'Ức gà áp chảo xé sợi, xà lách thủy canh mơn mởn, cà chua bi cherry và sốt mè rang Nhật Bản.',79000,89000,25,N'Eat Clean',N'1-2 người',N'8-10 phút',N'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80'),
('QC008',N'Combo đại gia đình 4 người ấm cúng',1,N'Món mặn Thịt kho trứng nước dừa + Canh chua cá lóc đồng + Rau xào thập cẩm nấm hương.',279000,319000,12,N'Đầy đủ 3 món',N'4 người',N'35 phút',N'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80');

-- Liên kết Món ăn - Nguyên liệu
INSERT dbo.ProductIngredients(ProductId,IngredientId,Amount) VALUES
(1,'thit-ba-roi-cp',N'400g thái sẵn'),
(1,'trung-ba-huan',N'4 quả luộc sẵn'),
(2,'kho-qua-dalat',N'350g khúc VietGAP'),
(2,'thit-ba-roi-cp',N'200g nạc xay'),
(5,'thit-bo-uc',N'320g thăn bò Úc'),
(6,'ca-loc-dong-thap',N'400g cá lóc đồng');
GO

PRINT N'Cơ sở dữ liệu QuickCookDB đã được tạo thành công với đầy đủ bảng và dữ liệu mẫu!';
GO
