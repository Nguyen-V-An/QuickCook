/* Dữ liệu demo. Có thể thay đổi ở admin.html; dữ liệu được lưu trong localStorage. */
const SEED_PRODUCTS = [
 {id:"QC001",name:"Combo thịt kho trứng 2 người",category:"combo",price:129000,oldPrice:149000,stock:24,tag:"Bán chạy",weight:"2 người",time:"25-30 phút",image:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80",description:"Set nguyên liệu định lượng cho bữa thịt kho trứng đậm đà. Gồm thịt, trứng, gia vị cơ bản và hướng dẫn chế biến."},
 {id:"QC002",name:"Set canh khổ qua dồn thịt",category:"canh",price:89000,oldPrice:99000,stock:18,tag:"Tiện lợi",weight:"2-3 người",time:"25 phút",image:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80",description:"Khổ qua làm sạch, thịt đã chuẩn bị và nguyên liệu đi kèm được chia phần. Nấu nhanh cho bữa cơm gia đình."},
 {id:"QC003",name:"Combo gà kho gừng",category:"combo",price:115000,oldPrice:null,stock:15,tag:"Dễ nấu",weight:"2 người",time:"30 phút",image:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=700&q=80",description:"Thịt gà và gừng được sơ chế, chia phần tiện lợi. Phù hợp bữa cơm nhà ấm cúng."},
 {id:"QC004",name:"Set rau củ xào thập cẩm",category:"rau",price:59000,oldPrice:null,stock:32,tag:"Tươi mỗi ngày",weight:"2 người",time:"10-15 phút",image:"https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80",description:"Rau củ đa dạng được làm sạch và cắt sẵn, phù hợp xào nhanh hoặc dùng làm món ăn kèm."},
 {id:"QC005",name:"Set bò xào lúc lắc",category:"thit",price:139000,oldPrice:155000,stock:12,tag:"Được yêu thích",weight:"2 người",time:"15-20 phút",image:"https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",description:"Thịt bò, ớt chuông và hành tây được định lượng sẵn để bạn hoàn thiện món bò xào tại nhà."},
 {id:"QC006",name:"Set canh chua cá",category:"canh",price:99000,oldPrice:null,stock:10,tag:"Bữa cơm Việt",weight:"2 người",time:"20-25 phút",image:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80",description:"Set nguyên liệu canh chua phong cách gia đình. Vui lòng bảo quản lạnh và nấu ngay sau khi nhận."},
 {id:"QC007",name:"Set salad rau xanh",category:"rau",price:69000,oldPrice:null,stock:20,tag:"Nhẹ nhàng",weight:"1-2 người",time:"5-10 phút",image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80",description:"Rau xanh và nguyên liệu salad đã làm sạch, tiện lợi cho bữa ăn nhẹ hoặc món ăn kèm."},
 {id:"QC008",name:"Combo gia đình 4 người",category:"combo",price:249000,oldPrice:279000,stock:8,tag:"Tiết kiệm",weight:"3-4 người",time:"30-40 phút",image:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80",description:"Combo nguyên liệu cho bữa cơm gia đình, gồm gợi ý món mặn và rau củ theo định lượng tham khảo."}
];
const STORAGE_KEYS = {products:"quickcook_products",cart:"quickcook_cart",orders:"quickcook_orders",users:"quickcook_users",session:"quickcook_session"};
function loadProducts(){try{return JSON.parse(localStorage.getItem(STORAGE_KEYS.products))||structuredClone(SEED_PRODUCTS)}catch(e){return SEED_PRODUCTS.map(p=>({...p}))}}
function saveProducts(items){localStorage.setItem(STORAGE_KEYS.products,JSON.stringify(items))}
if(!localStorage.getItem(STORAGE_KEYS.products))saveProducts(SEED_PRODUCTS);
if(!localStorage.getItem(STORAGE_KEYS.orders))localStorage.setItem(STORAGE_KEYS.orders,"[]");
if(!localStorage.getItem(STORAGE_KEYS.users))localStorage.setItem(STORAGE_KEYS.users,JSON.stringify([{name:"Khách Demo",email:"khach@quickcook.local",password:"123456"}]));
let PRODUCTS=loadProducts();
const CATEGORY_NAMES={combo:"Combo gia đình",rau:"Rau củ sơ chế",thit:"Thịt cá",canh:"Canh & món nhẹ"};
function money(value){return new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND",maximumFractionDigits:0}).format(Number(value)||0)}
