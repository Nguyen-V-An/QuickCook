/*
  QuickCook SQL Server schema - dùng khi nâng cấp từ frontend demo sang backend.
  Chạy trong SSMS trên database QuickCookDB.
  Lưu ý: website HTML tĩnh KHÔNG kết nối trực tiếp SQL Server. Cần API/backend (ví dụ ASP.NET Core) để dùng schema này.
*/
IF DB_ID(N'QuickCookDB') IS NULL CREATE DATABASE QuickCookDB;
GO
USE QuickCookDB;
GO
IF OBJECT_ID('dbo.OrderItems','U') IS NOT NULL DROP TABLE dbo.OrderItems;
IF OBJECT_ID('dbo.Orders','U') IS NOT NULL DROP TABLE dbo.Orders;
IF OBJECT_ID('dbo.Products','U') IS NOT NULL DROP TABLE dbo.Products;
IF OBJECT_ID('dbo.Categories','U') IS NOT NULL DROP TABLE dbo.Categories;
IF OBJECT_ID('dbo.Users','U') IS NOT NULL DROP TABLE dbo.Users;
GO
CREATE TABLE dbo.Categories(
 CategoryId INT IDENTITY(1,1) PRIMARY KEY,
 Name NVARCHAR(100) NOT NULL,
 Slug VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE dbo.Products(
 ProductId INT IDENTITY(1,1) PRIMARY KEY,
 SKU VARCHAR(30) NOT NULL UNIQUE,
 Name NVARCHAR(200) NOT NULL,
 CategoryId INT NOT NULL REFERENCES dbo.Categories(CategoryId),
 Description NVARCHAR(MAX) NULL,
 Price DECIMAL(12,2) NOT NULL CHECK(Price >= 0),
 OldPrice DECIMAL(12,2) NULL,
 Stock INT NOT NULL DEFAULT 0 CHECK(Stock >= 0),
 ImageUrl NVARCHAR(1000) NULL,
 OriginUrl NVARCHAR(1000) NULL,
 IsActive BIT NOT NULL DEFAULT 1,
 CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
CREATE TABLE dbo.Users(
 UserId INT IDENTITY(1,1) PRIMARY KEY,
 FullName NVARCHAR(150) NOT NULL,
 Email NVARCHAR(254) NOT NULL UNIQUE,
 PasswordHash NVARCHAR(500) NOT NULL,
 Role VARCHAR(20) NOT NULL DEFAULT 'Customer' CHECK(Role IN ('Customer','Admin')),
 CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
CREATE TABLE dbo.Orders(
 OrderId BIGINT IDENTITY(100001,1) PRIMARY KEY,
 UserId INT NULL REFERENCES dbo.Users(UserId),
 CustomerName NVARCHAR(150) NOT NULL,
 Phone VARCHAR(20) NOT NULL,
 Email NVARCHAR(254) NULL,
 ShippingAddress NVARCHAR(500) NOT NULL,
 Note NVARCHAR(1000) NULL,
 PaymentMethod VARCHAR(20) NOT NULL CHECK(PaymentMethod IN ('COD','BANKING','VNPAY')),
 PaymentStatus VARCHAR(20) NOT NULL DEFAULT 'Pending',
 OrderStatus VARCHAR(30) NOT NULL DEFAULT 'New',
 Subtotal DECIMAL(12,2) NOT NULL,
 ShippingFee DECIMAL(12,2) NOT NULL DEFAULT 0,
 Total DECIMAL(12,2) NOT NULL,
 CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
CREATE TABLE dbo.OrderItems(
 OrderItemId BIGINT IDENTITY(1,1) PRIMARY KEY,
 OrderId BIGINT NOT NULL REFERENCES dbo.Orders(OrderId),
 ProductId INT NULL REFERENCES dbo.Products(ProductId),
 ProductName NVARCHAR(200) NOT NULL,
 UnitPrice DECIMAL(12,2) NOT NULL,
 Quantity INT NOT NULL CHECK(Quantity > 0),
 LineTotal AS (UnitPrice * Quantity) PERSISTED
);
GO
INSERT dbo.Categories(Name,Slug) VALUES
(N'Combo gia đình','combo'),(N'Rau củ sơ chế','rau'),(N'Thịt cá','thit'),(N'Canh & món nhẹ','canh');
INSERT dbo.Products(SKU,Name,CategoryId,Description,Price,OldPrice,Stock,ImageUrl,OriginUrl) VALUES
('QC001',N'Combo thịt kho trứng 2 người',1,N'Set nguyên liệu định lượng cho bữa thịt kho trứng.',129000,149000,24,N'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80',NULL),
('QC002',N'Set canh khổ qua dồn thịt',4,N'Khổ qua làm sạch, thịt chuẩn bị và nguyên liệu đi kèm.',89000,99000,18,N'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80',NULL),
('QC003',N'Combo gà kho gừng',1,N'Thịt gà và gừng sơ chế, chia phần tiện lợi.',115000,NULL,15,N'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=700&q=80',NULL),
('QC004',N'Set rau củ xào thập cẩm',2,N'Rau củ làm sạch và cắt sẵn.',59000,NULL,32,N'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80',NULL),
('QC005',N'Set bò xào lúc lắc',3,N'Thịt bò, ớt chuông và hành tây định lượng sẵn.',139000,155000,12,N'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80',NULL),
('QC006',N'Set canh chua cá',4,N'Set nguyên liệu canh chua phong cách gia đình.',99000,NULL,10,N'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80',NULL),
('QC007',N'Set salad rau xanh',2,N'Rau xanh và nguyên liệu salad đã làm sạch.',69000,NULL,20,N'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80',NULL),
('QC008',N'Combo gia đình 4 người',1,N'Combo nguyên liệu cho bữa cơm gia đình.',249000,279000,8,N'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80',NULL);
GO
