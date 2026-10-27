/* QuickCook Data Layer & LocalStorage Management */

// Danh mục nguyên liệu sạch minh bạch & hồ sơ chứng nhận chất lượng
const INGREDIENTS_DATA = {
  "thit-ba-roi-cp": {
    id: "thit-ba-roi-cp",
    name: "Thịt ba rọi heo thảo mộc",
    category: "Thịt tươi sống",
    supplier: "Trang trại CP Green Farm Việt Nam",
    farmLocation: "Xã An Nhơn Tây, Huyện Củ Chi, TP. Hồ Chí Minh",
    standards: ["VietGAP", "ISO 22000:2018", "Kiểm dịch thú y"],
    batchCode: "CP-HCM-2026-B0892",
    harvestDate: "04:30 sáng mỗi ngày",
    storageCondition: "Bảo quản mát 0°C đến 4°C (Thịt tươi trong ngày)",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=700&q=80",
    description: "Heo được nuôi theo quy trình chuẩn khép kín 3F (Feed - Farm - Food). Thức ăn hoàn toàn từ thảo mộc tự nhiên, không sử dụng chất tạo nạc, không kháng sinh tồn dư, thịt thơm mềm, mỡ giòn thanh.",
    certificates: [
      {
        id: "CERT-VG-01",
        title: "Giấy chứng nhận Thực hành nông nghiệp tốt (VietGAP)",
        issuer: "Trung tâm Chứng nhận Phù hợp (QUACERT) - Bộ KH&CN",
        code: "VG-2024-HCM-08912",
        issueDate: "15/01/2024",
        expiryDate: "15/01/2027",
        status: "Đang hiệu lực",
        summary: "Chứng nhận cơ sở chăn nuôi đạt đầy đủ tiêu chuẩn vệ sinh, an toàn sinh học và truy xuất nguồn gốc theo TCVN 11892-1:2017."
      },
      {
        id: "CERT-KD-02",
        title: "Giấy kiểm dịch động vật và sản phẩm động vật nội tỉnh",
        issuer: "Chi cục Chăn nuôi và Thú y TP. Hồ Chí Minh",
        code: "KD-TY-2026/84210",
        issueDate: "Cấp theo ngày xuất kho",
        expiryDate: "Lô hàng xuất xưởng",
        status: "Đang hiệu lực",
        summary: "100% lô thịt được kiểm soát thú y nghiêm ngặt trước và sau giết mổ tại lò mổ công nghiệp đạt chuẩn châu Âu."
      },
      {
        id: "CERT-KN-03",
        title: "Phiếu kết quả kiểm nghiệm tồn dư hóa chất & kháng sinh",
        issuer: "Trung tâm Kỹ thuật Tiêu chuẩn Đo lường Chất lượng 3 (QUATEST 3)",
        code: "QT3-KN-89241/2026",
        issueDate: "10/01/2026",
        expiryDate: "10/07/2026",
        status: "Âm tính - Đạt chuẩn",
        summary: "Chỉ số Salbutamol, Clenbuterol, Ractopamine và kháng sinh cấm: ÂM TÍNH (dưới ngưỡng phát hiện phương pháp test ELISA)."
      }
    ]
  },
  "trung-ba-huan": {
    id: "trung-ba-huan",
    name: "Trứng gà tươi sạch tiệt trùng",
    category: "Trứng & Sản phẩm từ trứng",
    supplier: "Công ty Cổ phần Ba Huân",
    farmLocation: "Trang trại công nghệ cao Ba Huân, Huyện Bến Lức, Long An",
    standards: ["HACCP", "VietGAP", "Tiệt trùng UV"],
    batchCode: "BH-LA-2026-T402",
    harvestDate: "Thu hoạch trong 24 giờ",
    storageCondition: "Nhiệt độ phòng thoáng mát hoặc ngăn mát tủ lạnh (2-8°C)",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=700&q=80",
    description: "Trứng gà được rửa sạch tự động, xử lý diệt khuẩn bằng tia cực tím (UV) công nghệ tiên tiến từ Hà Lan, loại bỏ hoàn toàn vi khuẩn Salmonella trên vỏ trứng.",
    certificates: [
      {
        id: "CERT-BH-01",
        title: "Chứng nhận Hệ thống phân tích mối nguy và điểm kiểm soát tới hạn (HACCP)",
        issuer: "Tổ chức Chứng nhận Quốc tế SGS Thụy Sĩ",
        code: "VN22/00482-HACCP",
        issueDate: "20/03/2023",
        expiryDate: "19/03/2026",
        status: "Đang hiệu lực",
        summary: "Quy trình sơ chế, đóng hộp và xử lý tiệt trùng trứng đạt chuẩn an toàn thực phẩm xuất khẩu quốc tế."
      },
      {
        id: "CERT-BH-02",
        title: "Giấy chứng nhận Chuỗi thực phẩm an toàn TP.HCM",
        issuer: "Ban Quản lý An toàn thực phẩm TP. Hồ Chí Minh",
        code: "BQL-ATTP-CHUOI-118",
        issueDate: "05/05/2024",
        expiryDate: "05/05/2027",
        status: "Đang hiệu lực",
        summary: "Sản phẩm nằm trong chương trình Đề án chuỗi cung cấp thực phẩm sạch an toàn cho người tiêu dùng đô thị."
      }
    ]
  },
  "kho-qua-dalat": {
    id: "kho-qua-dalat",
    name: "Khổ qua sạch VietGAP Đơn Dương",
    category: "Rau củ hữu cơ",
    supplier: "Hợp tác xã Nông sản An Toàn Đơn Dương",
    farmLocation: "Thị trấn Thạnh Mỹ, Huyện Đơn Dương, Tỉnh Lâm Đồng",
    standards: ["VietGAP", "GlobalGAP hướng hữu cơ", "Không dư lượng BVTV"],
    batchCode: "HTX-DD-2026-KQ01",
    harvestDate: "Sáng sớm mỗi ngày chuyển xe lạnh về QuickCook",
    storageCondition: "Nhiệt độ 4°C - 8°C",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80",
    description: "Khổ qua giống xanh F1 được canh tác trong nhà lưới công nghệ cao, tưới nhỏ giọt Israel, sử dụng chế phẩm sinh học kiểm soát sâu bệnh, đảm bảo vị đắng thanh dịu, giòn ngọt tự nhiên.",
    certificates: [
      {
        id: "CERT-KQ-01",
        title: "Chứng nhận VietGAP Trồng trọt",
        issuer: "Chi cục Trồng trọt và Bảo vệ thực vật Tỉnh Lâm Đồng",
        code: "LD-TT-VG-2025-0391",
        issueDate: "12/04/2024",
        expiryDate: "12/04/2027",
        status: "Đang hiệu lực",
        summary: "Quy trình canh tác đáp ứng nghiêm ngặt thời gian cách ly thuốc sinh học, nguồn nước tưới đạt chuẩn QCVN 08-MT:2015."
      },
      {
        id: "CERT-KQ-02",
        title: "Phiếu xét nghiệm dư lượng hóa chất bảo vệ thực vật",
        issuer: "Viện Nghiên cứu Hạt nhân Đà Lạt - TT Phân tích",
        code: "KQ-TEST-2026-892",
        issueDate: "18/02/2026",
        expiryDate: "18/08/2026",
        status: "Không phát hiện dư lượng",
        summary: "Kiểm nghiệm 48 hoạt chất BVTV thông dụng: Tất cả đều dưới ngưỡng phát hiện (Non-detected)."
      }
    ]
  },
  "thit-bo-uc": {
    id: "thit-bo-uc",
    name: "Thịt thăn bò Úc mát (Chilled Beef)",
    category: "Thịt nhập khẩu",
    supplier: "Kilcoy Global Foods Australia & NK bởi Cty CP Thực phẩm CJ Minh Đạt",
    farmLocation: "Bang Queensland, Australia (Đóng gói tại KCN Hiệp Phước, TP.HCM)",
    standards: ["Meat & Livestock Australia (MLA)", "HACCP", "Halal Certified"],
    batchCode: "AUS-QLD-2026-KGF-04",
    harvestDate: "Bảo quản lạnh sâu theo tiêu chuẩn Chilled Beef 0-2°C",
    storageCondition: "0°C đến 2°C (Tuyệt đối không cấp đông lại sau rã đông)",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",
    description: "Thăn ngoại bò Úc chăn thả tự nhiên ăn cỏ và ngũ cốc dinh dưỡng 100 ngày. Thịt bò mát giữ nguyên độ mọng nước tự nhiên, vân mỡ mềm, thơm ngậy khi xào hoặc áp chảo.",
    certificates: [
      {
        id: "CERT-BO-01",
        title: "Giấy chứng nhận kiểm dịch và an toàn thực phẩm nhập khẩu",
        issuer: "Cơ quan Thú y Vùng VI - Cục Thú y Bộ Nông nghiệp & PTNT",
        code: "CSTY-V6-NK-2026-19283",
        issueDate: "02/01/2026",
        expiryDate: "02/07/2026",
        status: "Đạt chuẩn nhập khẩu",
        summary: "Lô hàng thịt bò mát có đầy đủ Health Certificate do Chính phủ Australia cấp và đã qua xét nghiệm kiểm dịch cửa khẩu."
      },
      {
        id: "CERT-BO-02",
        title: "Chứng chỉ Hệ thống An toàn Thực phẩm Quốc tế BRCGS",
        issuer: "DNV GL Business Assurance Australia",
        code: "BRC-KGF-AU-89102",
        issueDate: "10/11/2024",
        expiryDate: "09/11/2027",
        status: "Grade AA (Xuất sắc)",
        summary: "Nhà máy giết mổ và chế biến Kilcoy Foods đạt chuẩn cao cấp nhất của Hiệp hội Bán lẻ Anh Quốc (BRCGS)."
      }
    ]
  },
  "ca-loc-dong-thap": {
    id: "ca-loc-dong-thap",
    name: "Cá lóc đồng làm sạch phi lê",
    category: "Thủy hải sản",
    supplier: "Hợp tác xã Thủy sản Nước ngọt Đồng Tháp Mười",
    farmLocation: "Huyện Tam Nông, Tỉnh Đồng Tháp",
    standards: ["VietGAP Thủy sản", "ASC", "OCOP 4 Sao"],
    batchCode: "DT-TN-2026-CL09",
    harvestDate: "Thu hoạch và phi lê sạch lúc 03:00 sáng",
    storageCondition: "Bảo quản 0°C đến 4°C trong khay hút chân không sinh học",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=700&q=80",
    description: "Cá lóc nuôi theo mô hình lúa - cá sinh thái, không chất kích thích tăng trưởng. Thịt cá dai ngọt, thơm tự nhiên, được làm sạch vảy, bỏ ruột và cắt khoanh hoặc phi lê sẵn tiện lợi.",
    certificates: [
      {
        id: "CERT-CL-01",
        title: "Giấy chứng nhận OCOP 4 Sao Tỉnh Đồng Tháp",
        issuer: "UBND Tỉnh Đồng Tháp",
        code: "OCOP-DT-2024-4S-042",
        issueDate: "14/08/2024",
        expiryDate: "14/08/2027",
        status: "Đang hiệu lực",
        summary: "Đánh giá xếp hạng sản phẩm OCOP cấp tỉnh đạt tiêu chuẩn chất lượng cao và phát triển chuỗi giá trị bền vững."
      },
      {
        id: "CERT-CL-02",
        title: "Chứng nhận Thực hành Nuôi trồng Thủy sản Tốt (VietGAP)",
        issuer: "Chi cục Thủy sản Tỉnh Đồng Tháp",
        code: "TS-VG-2025-1029",
        issueDate: "18/06/2024",
        expiryDate: "18/06/2027",
        status: "Đang hiệu lực",
        summary: "Cơ sở nuôi đạt quy chuẩn QCVN 02-20:2014/BNNPTNT về điều kiện an toàn sinh học và kiểm soát dịch bệnh."
      }
    ]
  },
  "ga-ta-yen-the": {
    id: "ga-ta-yen-the",
    name: "Gà ta thả đồi Yên Thế sơ chế",
    category: "Gia cầm",
    supplier: "Hợp tác xã Nông nghiệp Xanh Yên Thế",
    farmLocation: "Huyện Yên Thế, Tỉnh Bắc Giang",
    standards: ["Nhãn hiệu chứng nhận Gà đồi Yên Thế", "VietGAP", "Kiểm dịch thú y"],
    batchCode: "YT-BG-2026-GA88",
    harvestDate: "Sơ chế và đóng khay lúc 04:00 sáng",
    storageCondition: "0°C đến 4°C",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=700&q=80",
    description: "Gà ta thả đồi tự nhiên, vận động liên tục trên đồi vải, thức ăn chủ yếu là ngô hạt và thảo dược. Thịt gà săn chắc, da giòn vàng ươm, ngọt đậm đà đúng chất gà thả vườn truyền thống.",
    certificates: [
      {
        id: "CERT-GA-01",
        title: "Giấy chứng nhận đăng ký nhãn hiệu Gà đồi Yên Thế",
        issuer: "Cục Sở hữu Trí tuệ - Bộ Khoa học và Công nghệ",
        code: "NH-SHTT-YT-18291",
        issueDate: "10/05/2023",
        expiryDate: "10/05/2033",
        status: "Đang hiệu lực",
        summary: "Bảo hộ chỉ dẫn địa lý và tiêu chuẩn chất lượng giống gà ta bản địa chăn thả bán hoang dã."
      },
      {
        id: "CERT-GA-02",
        title: "Giấy chứng nhận kiểm dịch vận chuyển động vật",
        issuer: "Chi cục Thú y Vùng I",
        code: "KD-TY1-2026-0928",
        issueDate: "Cấp theo từng lô",
        expiryDate: "Lô hàng xuất xưởng",
        status: "Đang hiệu lực",
        summary: "Đảm bảo gia cầm khỏe mạnh, có nguồn gốc từ vùng an toàn dịch cúm gia cầm H5N1 / H5N6."
      }
    ]
  },
  "rau-thuy-canh-dalat": {
    id: "rau-thuy-canh-dalat",
    name: "Rau xanh thủy canh Đà Lạt Hasfarm",
    category: "Rau ăn lá & Salad",
    supplier: "Công ty TNHH Dalat Hasfarm Fresh",
    farmLocation: "Xã Tu Tra, Huyện Đơn Dương, Tỉnh Lâm Đồng",
    standards: ["GlobalGAP", "VietGAP", "Canh tác giá thể xơ dừa sạch"],
    batchCode: "DHF-2026-RAU-552",
    harvestDate: "Sáng sớm mỗi ngày",
    storageCondition: "Ngăn mát 5°C - 10°C",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80",
    description: "Trồng trong nhà kính kiểm soát khí hậu tự động. Rau được rửa qua bọt khí ozone khử khuẩn, không sử dụng thuốc trừ sâu hóa học, ăn tươi giòn mọng, giữ nguyên vitamin.",
    certificates: [
      {
        id: "CERT-DHF-01",
        title: "Chứng chỉ Nông nghiệp Toàn cầu GlobalGAP",
        issuer: "Control Union Certifications BV Hà Lan",
        code: "GG-CU-884210-VN",
        issueDate: "12/09/2024",
        expiryDate: "11/09/2027",
        status: "Đang hiệu lực",
        summary: "Chuỗi sản xuất rau sạch đạt tiêu chuẩn an toàn người tiêu dùng, an toàn môi trường và phúc lợi lao động quốc tế."
      }
    ]
  },
  "suon-non-cp": {
    id: "suon-non-cp",
    name: "Sườn non heo thảo mộc chặt khúc",
    category: "Thịt tươi sống",
    supplier: "Trang trại CP Green Farm Việt Nam",
    farmLocation: "Huyện Củ Chi, TP. Hồ Chí Minh",
    standards: ["VietGAP", "ISO 22000", "Kiểm dịch"],
    batchCode: "CP-HCM-2026-SN41",
    harvestDate: "Chế biến trong ngày",
    storageCondition: "0°C - 4°C",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",
    description: "Sườn non heo nhiều nạc, dẻ sườn mềm, xương sụn giòn sần sật. Được chặt khúc vừa ăn 3-4cm bằng máy cưa xương thực phẩm vô trùng, rửa sạch và thấm ráo.",
    certificates: [
      {
        id: "CERT-SN-01",
        title: "Chứng nhận VietGAP Chăn nuôi & Giết mổ",
        issuer: "QUACERT - Bộ Khoa học và Công nghệ",
        code: "VG-2024-HCM-08912",
        issueDate: "15/01/2024",
        expiryDate: "15/01/2027",
        status: "Đang hiệu lực",
        summary: "Tiêu chuẩn chăn nuôi không kháng sinh, kiểm soát nhiệt độ chuỗi cung ứng lạnh từ lò mổ đến kho QuickCook."
      }
    ]
  },
  "ca-hoi-na-uy": {
    id: "ca-hoi-na-uy",
    name: "Cá hồi Na Uy tươi phi lê (Atlantic Salmon)",
    category: "Hải sản cao cấp",
    supplier: "Tập đoàn Leroy Seafood Na Uy & NK bởi Good Food VN",
    farmLocation: "Vịnh hẹp Bergen, Na Uy (Chế biến tại TP.HCM)",
    standards: ["GlobalGAP Aqua", "ASC Certified", "Kiểm dịch hải quan"],
    batchCode: "NO-BGN-2026-SALM-11",
    harvestDate: "Vận chuyển đường hàng không Chilled 48h từ Na Uy",
    storageCondition: "0°C đến 2°C trên đá vảy",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80",
    description: "Cá hồi Đại Tây Dương nuôi tự nhiên trong môi trường nước biển lạnh sạch của Na Uy. Giàu hàm lượng Omega-3, DHA, vân mỡ cam tự nhiên bóng đẹp, thịt béo ngậy ngọt lịm.",
    certificates: [
      {
        id: "CERT-SAL-01",
        title: "Chứng nhận Thủy sản Nuôi có Trách nhiệm (ASC Certification)",
        issuer: "Aquaculture Stewardship Council",
        code: "ASC-AQUA-NO-2024-998",
        issueDate: "01/04/2024",
        expiryDate: "31/03/2027",
        status: "Đang hiệu lực",
        summary: "Bảo đảm quy trình nuôi cá hồi tôn trọng hệ sinh thái biển và không sử dụng hormone nhân tạo."
      },
      {
        id: "CERT-SAL-02",
        title: "Chứng thư kiểm dịch nhập khẩu Hải quan Tân Sơn Nhất",
        issuer: "Chi cục Thú y Vùng VI",
        code: "HQ-TSN-TY6-2026-0812",
        issueDate: "20/02/2026",
        expiryDate: "20/05/2026",
        status: "Thông quan hợp pháp",
        summary: "Đạt chuẩn vệ sinh vi sinh vật (E.coli, Salmonella, Listeria monocytogenes âm tính)."
      }
    ]
  },
  "tom-su-ca-mau": {
    id: "tom-su-ca-mau",
    name: "Tôm sú rừng ngập mặn Cà Mau",
    category: "Thủy hải sản",
    supplier: "Hợp tác xã Tôm Sinh Thái Rừng Đước Năm Căn",
    farmLocation: "Huyện Năm Căn, Tỉnh Cà Mau",
    standards: ["Chứng nhận Sinh thái Naturland", "VietGAP", "OCOP 4 Sao"],
    batchCode: "CM-NC-2026-TS77",
    harvestDate: "Thu hoạch con nước rằm và mùng 1 hàng tháng",
    storageCondition: "Nhiệt độ 0°C đến 4°C",
    image: "https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=700&q=80",
    description: "Tôm sú sống tự nhiên dưới tán rừng đước ngập mặn Cà Mau, tự kiếm ăn từ phiêu sinh vật và lá đước rụng, không cho ăn cám công nghiệp. Vỏ tôm mỏng, thịt dai ngọt đậm đà.",
    certificates: [
      {
        id: "CERT-TOM-01",
        title: "Chứng nhận Nông nghiệp Sinh thái Hữu cơ Naturland (Đức)",
        issuer: "Naturland Association for Organic Agriculture",
        code: "NAT-ORG-VN-2025-412",
        issueDate: "05/10/2024",
        expiryDate: "04/10/2027",
        status: "Đang hiệu lực",
        summary: "Tôm sinh thái hoàn toàn tự nhiên không sử dụng hóa chất hay thức ăn công nghiệp dưới rừng đước."
      }
    ]
  },
  "nuoc-dua-ben-tre": {
    id: "nuoc-dua-ben-tre",
    name: "Nước dừa tươi xiêm gọt sọ Bến Tre",
    category: "Gia vị & Nước hầm",
    supplier: "Hợp tác xã Dừa Hữu Cơ Giồng Trôm",
    farmLocation: "Huyện Giồng Trôm, Tỉnh Bến Tre",
    standards: ["Hữu cơ USDA Organic", "OCOP 4 Sao"],
    batchCode: "BT-GT-2026-DUA12",
    harvestDate: "Chắt tươi trong ngày",
    storageCondition: "4°C - 8°C",
    image: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=700&q=80",
    description: "Nước dừa xiêm xanh nguyên chất 100%, vị ngọt thanh mát tự nhiên, dùng để kho thịt, nấu canh hoặc làm nước sốt thanh ngọt dịu mà không cần thêm đường tinh luyện.",
    certificates: [
      {
        id: "CERT-DUA-01",
        title: "Chứng nhận Vùng trồng Hữu cơ Chuẩn Quốc Tế",
        issuer: "Control Union Certifications",
        code: "CU-USDA-ORG-2024-819",
        issueDate: "01/01/2024",
        expiryDate: "31/12/2026",
        status: "Đang hiệu lực",
        summary: "Vườn dừa canh tác không phân bón hóa học, không thuốc bảo vệ thực vật theo tiêu chuẩn USDA Hoa Kỳ."
      }
    ]
  },
  "nam-linh-chi-dalat": {
    id: "nam-linh-chi-dalat",
    name: "Set nấm sạch tươi Đà Lạt (Nấm đùi gà, bào ngư, linh chi nâu)",
    category: "Rau củ & Nấm",
    supplier: "Trang trại Nấm Hữu Cơ Lạc Dương",
    farmLocation: "Huyện Lạc Dương, Tỉnh Lâm Đồng",
    standards: ["VietGAP Nấm", "OCOP 3 Sao"],
    batchCode: "LD-NAM-2026-03",
    harvestDate: "Sáng sớm mỗi ngày",
    storageCondition: "Ngăn mát 4°C - 8°C",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80",
    description: "Nấm được nuôi trồng trên giá thể mùn cưa cao su đã tiệt trùng nhiệt độ cao, khí hậu lạnh mát lý tưởng của cao nguyên Langbiang giúp nấm giòn ngọt, giàu đạm thực vật.",
    certificates: [
      {
        id: "CERT-NAM-01",
        title: "Giấy chứng nhận VietGAP cơ sở nuôi trồng nấm",
        issuer: "Chi cục Trồng trọt và BVTV Lâm Đồng",
        code: "LD-NAM-VG-2025-88",
        issueDate: "15/07/2024",
        expiryDate: "15/07/2027",
        status: "Đang hiệu lực",
        summary: "Quy trình vô trùng nghiêm ngặt, nước ngầm kiểm định không chứa kim loại nặng asen hay chì."
      }
    ]
  }
};

// 16 Món ăn / Combo nguyên liệu đa dạng cho QuickCook
const SEED_PRODUCTS = [
  {
    id: "QC001",
    name: "Combo thịt kho trứng nước dừa 2-3 người",
    category: "combo",
    price: 139000,
    oldPrice: 159000,
    stock: 28,
    tag: "Bán chạy nhất",
    weight: "2-3 người ăn",
    time: "25-30 phút",
    difficulty: "Dễ",
    calories: "520 kcal / phần",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80",
    description: "Set combo chuẩn vị cơm mẹ nấu: Thịt ba rọi heo thảo mộc mềm rục, trứng gà Ba Huân bùi béo kết hợp nước dừa xiêm Bến Tre ngọt thanh đậm đà. Đã ướp sẵn nước màu thắng dừa tự nhiên.",
    nutrition: { protein: "38g", carbs: "12g", fat: "26g", fiber: "2g" },
    cookingSteps: [
      "Bước 1: Mở gói thịt ba rọi đã thái con chì sẵn, ướp cùng gói sốt kho nước dừa trong 10 phút.",
      "Bước 2: Cho thịt vào nồi đảo săn vàng các mặt trong 5 phút.",
      "Bước 3: Đổ gói nước dừa xiêm tươi vào nồi, thả trứng gà đã luộc bóc vỏ sẵn vào.",
      "Bước 4: Hạ lửa nhỏ đun liu riu 15-20 phút cho nước sốt sánh kẹo, rắc thêm tiêu và hành lá."
    ],
    ingredients: [
      { id: "thit-ba-roi-cp", amount: "400g (thái sẵn miếng vừa ăn)" },
      { id: "trung-ba-huan", amount: "4 quả trứng gà sạch luộc sẵn" },
      { id: "nuoc-dua-ben-tre", amount: "350ml nước dừa xiêm nguyên chất" }
    ]
  },
  {
    id: "QC002",
    name: "Set canh khổ qua dồn thịt thanh mát",
    category: "canh",
    price: 89000,
    oldPrice: 99000,
    stock: 22,
    tag: "Giải nhiệt",
    weight: "2-3 người ăn",
    time: "20 phút",
    difficulty: "Dễ",
    calories: "280 kcal / phần",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80",
    description: "Món canh thanh mát mang lại nhiều may mắn. Khổ qua Đơn Dương đã lấy sạch ruột, nhân thịt nạc vai xay quết nấm mèo tiêu sọ giòn dai, nước dùng hầm xương rau củ trong ngọt.",
    nutrition: { protein: "24g", carbs: "8g", fat: "11g", fiber: "5g" },
    cookingSteps: [
      "Bước 1: Khổ qua đã dồn sẵn thịt nạc xay và nấm mèo vào từng khoanh.",
      "Bước 2: Đun sôi 800ml nước dùng hầm rau củ đi kèm trong set.",
      "Bước 3: Thả khổ qua vào nồi, nấu lửa vừa trong 12-15 phút đến khi khổ qua vừa chín tới.",
      "Bước 4: Nêm gói gia vị thảo mộc QuickCook, rắc hành ngò và tiêu xay thơm nức."
    ],
    ingredients: [
      { id: "kho-qua-dalat", amount: "350g (3 khúc khổ qua VietGAP)" },
      { id: "thit-ba-roi-cp", amount: "200g thịt nạc heo thảo mộc xay" }
    ]
  },
  {
    id: "QC003",
    name: "Combo gà ta kho gừng lá chanh",
    category: "combo",
    price: 125000,
    oldPrice: 145000,
    stock: 19,
    tag: "Đậm đà",
    weight: "2-3 người ăn",
    time: "25 phút",
    difficulty: "Dễ",
    calories: "450 kcal / phần",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=700&q=80",
    description: "Gà ta thả đồi Yên Thế thịt chắc, ngọt thơm được sơ chế chặt miếng vừa ăn, ướp cùng gừng sẻ Đắk Lắk cay nồng ấm bụng và lá chanh tươi thái chỉ thơm lừng.",
    nutrition: { protein: "42g", carbs: "6g", fat: "18g", fiber: "1g" },
    cookingSteps: [
      "Bước 1: Trộn gà với gói sốt kho gừng gia truyền trong 5 phút.",
      "Bước 2: Phi thơm gừng thái sợi với một muỗng dầu ăn, trút gà vào xào săn.",
      "Bước 3: Cho 100ml nước vào đun sôi bùng, sau đó hạ nhỏ lửa kho 15 phút.",
      "Bước 4: Tắt bếp, rắc lá chanh thái sợi tươi lên trên và thưởng thức cùng cơm nóng."
    ],
    ingredients: [
      { id: "ga-ta-yen-the", amount: "500g gà ta đồi chặt miếng sạch" }
    ]
  },
  {
    id: "QC004",
    name: "Set rau củ xào thập cẩm nấm hương",
    category: "rau",
    price: 65000,
    oldPrice: null,
    stock: 35,
    tag: "Tươi mỗi ngày",
    weight: "2 người ăn",
    time: "10-15 phút",
    difficulty: "Rất dễ",
    calories: "160 kcal / phần",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80",
    description: "Súp lơ xanh, cà rốt Đà Lạt, bắp non và nấm đùi gà được rửa sạch cắt tỉa bông đẹp mắt. Đi kèm gói sốt dầu hào tỏi phi thơm lừng giúp giữ rau củ luôn xanh mướt giòn ngọt.",
    nutrition: { protein: "7g", carbs: "18g", fat: "4g", fiber: "9g" },
    cookingSteps: [
      "Bước 1: Chần nhanh rau củ qua nước sôi có chút muối trong 30 giây rồi vớt ra.",
      "Bước 2: Đun nóng chảo, phi thơm tỏi đập dập với 1 muỗng dầu ăn.",
      "Bước 3: Cho toàn bộ rau củ và nấm vào đảo đều tay trên lửa lớn trong 3 phút.",
      "Bước 4: Rưới gói sốt xào hào QuickCook đảo thêm 1 phút là hoàn thành đĩa rau giòn ngọt."
    ],
    ingredients: [
      { id: "rau-thuy-canh-dalat", amount: "300g bông cải xanh & cà rốt" },
      { id: "nam-linh-chi-dalat", amount: "150g nấm đùi gà và nấm bào ngư tươi" }
    ]
  },
  {
    id: "QC005",
    name: "Set bò Úc xào lúc lắc khoai tây",
    category: "thit",
    price: 159000,
    oldPrice: 179000,
    stock: 16,
    tag: "Yêu thích",
    weight: "2 người ăn",
    time: "15 phút",
    difficulty: "Trung bình",
    calories: "580 kcal / phần",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",
    description: "Thịt thăn bò Úc mát cắt quân cờ vuông vức mềm tan mọng nước, ớt chuông Đà Lạt ba màu giòn ngọt, hành tây và khoai tây múi cau chiên sẵn. Sốt bơ tiêu đen chuẩn vị nhà hàng.",
    nutrition: { protein: "45g", carbs: "22g", fat: "24g", fiber: "4g" },
    cookingSteps: [
      "Bước 1: Ướp bò với gói sốt ướp tiêu đen và tỏi băm trong 5 phút.",
      "Bước 2: Bật lửa to, áp chảo thịt bò nhanh trong 2-3 phút cho xém cạnh ngoài nhưng mềm trong.",
      "Bước 3: Cho ớt chuông, hành tây vào chảo lắc đều trong 2 phút cùng 1 thìa bơ lạt thơm.",
      "Bước 4: Bày ra đĩa kèm khoai tây chiên vàng và xà lách sạch đi kèm."
    ],
    ingredients: [
      { id: "thit-bo-uc", amount: "320g thịt thăn bò Úc mát cắt quân cờ" },
      { id: "rau-thuy-canh-dalat", amount: "200g ớt chuông ba màu & xà lách" }
    ]
  },
  {
    id: "QC006",
    name: "Set canh chua cá lóc bông điên điển",
    category: "canh",
    price: 109000,
    oldPrice: 125000,
    stock: 14,
    tag: "Đậm vị miền Tây",
    weight: "3-4 người ăn",
    time: "20 phút",
    difficulty: "Dễ",
    calories: "310 kcal / phần",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=700&q=80",
    description: "Cá lóc đồng Đồng Tháp béo ngọt cắt khoanh tròn, nước cốt me tươi, bạc hà, đậu bắp, cà chua và bông điên điển mùa nước nổi. Rau ngò ôm, ngò gai thái sẵn thơm phức.",
    nutrition: { protein: "32g", carbs: "14g", fat: "8g", fiber: "6g" },
    cookingSteps: [
      "Bước 1: Nấu sôi 1 lít nước, cho gói nước cốt me và gia vị canh chua vào khuấy tan.",
      "Bước 2: Thả cá lóc đồng vào nấu sôi trong 7 phút cho cá chín ngọt nước.",
      "Bước 3: Cho tiếp cà chua, thơm, đậu bắp, bạc hà vào đun sôi thêm 3 phút.",
      "Bước 4: Thả bông điên điển, tắt bếp và rắc rau om, ngò gai kèm vài lát ớt sừng."
    ],
    ingredients: [
      { id: "ca-loc-dong-thap", amount: "400g cá lóc đồng phi lê cắt khoanh" },
      { id: "rau-thuy-canh-dalat", amount: "300g bạc hà, đậu bắp, bông điên điển" }
    ]
  },
  {
    id: "QC007",
    name: "Set salad ức gà rau mầm sốt mè rang",
    category: "rau",
    price: 79000,
    oldPrice: 89000,
    stock: 25,
    tag: "Eat Clean / Healthy",
    weight: "1-2 người ăn",
    time: "8-10 phút",
    difficulty: "Rất dễ",
    calories: "320 kcal / phần",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80",
    description: "Lựa chọn hoàn hảo cho người ăn kiêng, tập gym. Ức gà áp chảo xé sợi, xà lách thủy canh mơn mởn, cà chua bi cherry và sốt mè rang Nhật Bản thơm béo tự nhiên.",
    nutrition: { protein: "35g", carbs: "10g", fat: "9g", fiber: "5g" },
    cookingSteps: [
      "Bước 1: Áp chảo miếng ức gà đã ướp muối tiêu thảo mộc trong 5-6 phút cho vàng hai mặt.",
      "Bước 2: Xé hoặc thái lát ức gà thành sợi vừa ăn.",
      "Bước 3: Cho xà lách thủy canh, rau mầm và cà chua bi ra đĩa sâu lòng.",
      "Bước 4: Xếp gà lên trên và rưới gói sốt mè rang Nhật Bản, trộn đều và thưởng thức ngay."
    ],
    ingredients: [
      { id: "ga-ta-yen-the", amount: "250g ức gà tươi nạc sạch" },
      { id: "rau-thuy-canh-dalat", amount: "250g xà lách Romaine, rau mầm, cà chua bi" }
    ]
  },
  {
    id: "QC008",
    name: "Combo đại gia đình 4 người ấm cúng",
    category: "combo",
    price: 279000,
    oldPrice: 319000,
    stock: 12,
    tag: "Đầy đủ 3 món",
    weight: "4 người ăn",
    time: "35 phút",
    difficulty: "Trung bình",
    calories: "620 kcal / người",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80",
    description: "Giải pháp trọn gói cho mâm cơm 4 người: Món mặn Thịt kho trứng nước dừa + Canh chua cá lóc đồng + Rau xào thập cẩm nấm hương. Tiết kiệm 45 phút đi chợ và sơ chế.",
    nutrition: { protein: "65g", carbs: "30g", fat: "32g", fiber: "11g" },
    cookingSteps: [
      "Bước 1: Bắt đầu kho nồi thịt ba rọi trứng nước dừa ở bếp 1 (kho trong 25 phút).",
      "Bước 2: Trong lúc đợi thịt kho, nấu nồi canh chua cá lóc ở bếp 2 (khoảng 15 phút).",
      "Bước 3: Cuối cùng xào nhanh đĩa rau củ thập cẩm giòn ngọt trong 5 phút.",
      "Bước 4: Bày cả 3 món ra bàn ăn, hoàn thành bữa cơm gia đình thịnh soạn."
    ],
    ingredients: [
      { id: "thit-ba-roi-cp", amount: "400g thịt ba rọi heo" },
      { id: "trung-ba-huan", amount: "4 quả trứng gà" },
      { id: "ca-loc-dong-thap", amount: "350g cá lóc đồng" },
      { id: "rau-thuy-canh-dalat", amount: "400g rau canh chua & rau xào" }
    ]
  },
  {
    id: "QC009",
    name: "Set lẩu nấm bách thảo thanh đạm",
    category: "combo",
    price: 199000,
    oldPrice: 229000,
    stock: 15,
    tag: "Thanh mát",
    weight: "3-4 người ăn",
    time: "20 phút",
    difficulty: "Dễ",
    calories: "340 kcal / người",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80",
    description: "Nước dùng lẩu hầm từ táo đỏ, kỷ tử và củ sen thanh ngọt tự nhiên. Đi kèm khay 5 loại nấm sạch Đà Lạt tươi rói, đậu hũ non và mì tươi trứng hữu cơ.",
    nutrition: { protein: "22g", carbs: "45g", fat: "6g", fiber: "14g" },
    cookingSteps: [
      "Bước 1: Hòa gói cốt lẩu nấm bách thảo với 1.5 lít nước, đun sôi trong 5 phút.",
      "Bước 2: Xếp các loại nấm tươi sạch và rau nhúng ra đĩa lớn.",
      "Bước 3: Khi nước lẩu sôi, nhúng nấm đùi gà, nấm bào ngư, nấm linh chi và đậu hũ non.",
      "Bước 4: Thưởng thức cùng mì tươi trứng và nước chấm nấm đặc biệt."
    ],
    ingredients: [
      { id: "nam-linh-chi-dalat", amount: "450g hỗn hợp nấm đùi gà, bào ngư, linh chi" },
      { id: "rau-thuy-canh-dalat", amount: "300g rau cải cúc, nấm tuyết, cải thảo" }
    ]
  },
  {
    id: "QC010",
    name: "Set cá hồi Na Uy sốt bơ tỏi măng tây",
    category: "thit",
    price: 189000,
    oldPrice: 215000,
    stock: 10,
    tag: "Cao cấp",
    weight: "1-2 người ăn",
    time: "12-15 phút",
    difficulty: "Trung bình",
    calories: "510 kcal / phần",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80",
    description: "Miếng cá hồi Na Uy phi lê dày thịt, da giòn thịt mềm béo ngậy. Kèm măng tây xanh Đà Lạt giòn ngọt, sốt bơ chanh tỏi thơm béo chuẩn Âu.",
    nutrition: { protein: "40g", carbs: "8g", fat: "29g", fiber: "3g" },
    cookingSteps: [
      "Bước 1: Rắc chút muối tiêu lên hai mặt miếng cá hồi Na Uy, để ráo 5 phút.",
      "Bước 2: Đun nóng chảo với chút bơ lạt, đặt mặt da cá áp sát chảo trong 3-4 phút cho giòn rụm.",
      "Bước 3: Lật mặt cá áp tiếp 2 phút, cho măng tây xanh vào đảo cùng bơ tỏi.",
      "Bước 4: Rưới sốt bơ chanh vàng lên cá và măng tây, trang trí thêm lá thì là tươi."
    ],
    ingredients: [
      { id: "ca-hoi-na-uy", amount: "280g cá hồi Na Uy tươi phi lê còn da" },
      { id: "rau-thuy-canh-dalat", amount: "150g măng tây xanh tươi Đà Lạt" }
    ]
  },
  {
    id: "QC011",
    name: "Set sườn non heo rim chua ngọt",
    category: "thit",
    price: 145000,
    oldPrice: 165000,
    stock: 20,
    tag: "Bé cực thích",
    weight: "2-3 người ăn",
    time: "25 phút",
    difficulty: "Dễ",
    calories: "490 kcal / phần",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",
    description: "Sườn non heo thảo mộc mềm róc thịt chặt miếng vừa ăn, rim ngập trong nước sốt cà chua dứa tươi sánh đỏ, vị chua thanh ngọt bùi bắt cơm vô cùng.",
    nutrition: { protein: "36g", carbs: "18g", fat: "22g", fiber: "2g" },
    cookingSteps: [
      "Bước 1: Chần nhanh sườn qua nước sôi 1 phút rồi rửa lại cho sạch bọt.",
      "Bước 2: Rán vàng hai mặt dẻ sườn trong chảo ngập dầu nóng 5 phút.",
      "Bước 3: Đổ gói sốt chua ngọt dứa QuickCook vào, đậy nắp rim nhỏ lửa 15 phút.",
      "Bước 4: Mở nắp đảo đều cho sốt bám áo màu nâu bóng lên từng dẻ sườn."
    ],
    ingredients: [
      { id: "suon-non-cp", amount: "450g sườn non heo CP cắt khúc sạch" }
    ]
  },
  {
    id: "QC012",
    name: "Set canh sườn hầm củ quả dinh dưỡng",
    category: "canh",
    price: 95000,
    oldPrice: null,
    stock: 18,
    tag: "Bổ dưỡng",
    weight: "3 người ăn",
    time: "25 phút",
    difficulty: "Rất dễ",
    calories: "320 kcal / phần",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80",
    description: "Sườn heo thảo mộc hầm cùng ngô ngọt, cà rốt, khoai tây và su hào Đà Lạt. Nước canh trong veo ngọt lịm từ tủy xương và rau củ tươi mát lành.",
    nutrition: { protein: "28g", carbs: "22g", fat: "14g", fiber: "5g" },
    cookingSteps: [
      "Bước 1: Cho sườn non vào nồi với 1 lít nước, đun sôi hớt bọt trong 5 phút.",
      "Bước 2: Cho ngô ngọt và cà rốt vào hầm trước trong 10 phút.",
      "Bước 3: Cho khoai tây và su hào vào hầm tiếp 8 phút đến khi củ mềm bùi.",
      "Bước 4: Nêm gói muối hầm thảo mộc và rắc hành hoa, ngò rí."
    ],
    ingredients: [
      { id: "suon-non-cp", amount: "300g sườn non heo CP" },
      { id: "rau-thuy-canh-dalat", amount: "350g ngô ngọt, khoai tây, cà rốt tỉa hoa" }
    ]
  },
  {
    id: "QC013",
    name: "Set tôm sú rang thịt ba chỉ đậm vị",
    category: "thit",
    price: 149000,
    oldPrice: 169000,
    stock: 15,
    tag: "Món ngon quê nhà",
    weight: "2-3 người ăn",
    time: "20 phút",
    difficulty: "Dễ",
    calories: "460 kcal / phần",
    image: "https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=700&q=80",
    description: "Tôm sú Cà Mau vỏ giòn thịt chắc ngọt rang cháy cạnh cùng thịt ba rọi heo thảo mộc béo ngậy. Nước sốt kẹo bám quanh tôm bóng lưỡng mặn ngọt cay tê.",
    nutrition: { protein: "41g", carbs: "12g", fat: "21g", fiber: "1g" },
    cookingSteps: [
      "Bước 1: Cho thịt ba chỉ vào chảo đảo xém cạnh cho tươm mỡ tự nhiên.",
      "Bước 2: Trút tôm sú đã cắt râu sạch vào đảo đều trên lửa lớn cho tôm chuyển màu đỏ au.",
      "Bước 3: Rưới gói sốt mắm đường tỏi ớt vào rim nhỏ lửa 7-10 phút cho sốt sánh keo.",
      "Bước 4: Rắc nhiều hành lá cắt khúc và tiêu xay đen lên đĩa."
    ],
    ingredients: [
      { id: "tom-su-ca-mau", amount: "250g tôm sú sinh thái Năm Căn" },
      { id: "thit-ba-roi-cp", amount: "200g thịt ba rọi heo thảo mộc thái mỏng" }
    ]
  },
  {
    id: "QC014",
    name: "Combo cơm tấm sườn nướng mật ong tại nhà",
    category: "combo",
    price: 135000,
    oldPrice: 155000,
    stock: 20,
    tag: "Hương vị Sài Gòn",
    weight: "2 người ăn",
    time: "20 phút",
    difficulty: "Dễ",
    calories: "590 kcal / phần",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",
    description: "Sườn cốt lết heo dày dặn ướp sẵn sốt sả ớt mật ong hoa cà phê. Đi kèm chả trứng hấp mềm xốp, mỡ hành tép mỡ giòn rụm và nước mắm chua ngọt sệt chuẩn vị.",
    nutrition: { protein: "44g", carbs: "35g", fat: "26g", fiber: "2g" },
    cookingSteps: [
      "Bước 1: Áp chảo hoặc nướng miếng sườn cốt lết trong nồi chiên không dầu (180°C trong 15 phút).",
      "Bước 2: Hâm nóng miếng chả trứng hấp trong 2 phút bằng lò vi sóng hoặc hấp cách thủy.",
      "Bước 3: Làm mỡ hành nóng rưới lên chén mỡ tép giòn tan.",
      "Bước 4: Bày sườn nướng, chả trứng lên dĩa cơm, ăn kèm dưa leo cà chua và nước mắm kẹo."
    ],
    ingredients: [
      { id: "thit-ba-roi-cp", amount: "350g sườn cốt lết heo tươi ướp sốt" },
      { id: "trung-ba-huan", amount: "2 quả trứng gà & 1 phần chả trứng" }
    ]
  },
  {
    id: "QC015",
    name: "Set đậu hũ dồn thịt sốt cà chua",
    category: "thit",
    price: 79000,
    oldPrice: null,
    stock: 24,
    tag: "Dân dã ấm cúng",
    weight: "2 người ăn",
    time: "15 phút",
    difficulty: "Rất dễ",
    calories: "340 kcal / phần",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80",
    description: "Miếng đậu hũ làng Mơ vàng ruộm nhồi nhân thịt nạc băm nấm mèo mộc nhĩ giòn ngọt, sốt cùng cà chua tươi chín mọng sánh đặc đậm đà.",
    nutrition: { protein: "29g", carbs: "14g", fat: "16g", fiber: "4g" },
    cookingSteps: [
      "Bước 1: Đậu hũ đã nhồi sẵn nhân thịt nạc và mộc nhĩ được đóng khay bảo quản sạch.",
      "Bước 2: Cho đậu hũ vào chảo chiên sơ nhẹ 3 phút cho thịt săn mặt.",
      "Bước 3: Đổ gói sốt cà chua tươi vào rim nhỏ lửa trong 10 phút cho đậu ngấm đẫm sốt.",
      "Bước 4: Rắc hành lá thái nhỏ và chút tiêu cay nhẹ thơm lừng."
    ],
    ingredients: [
      { id: "thit-ba-roi-cp", amount: "200g thịt nạc heo thảo mộc xay ướp sẵn" },
      { id: "rau-thuy-canh-dalat", amount: "3 quả cà chua tươi & hành hoa" }
    ]
  },
  {
    id: "QC016",
    name: "Set mướp hương xào lòng mề hoa thiên lý",
    category: "rau",
    price: 75000,
    oldPrice: 85000,
    stock: 16,
    tag: "Đặc sản mùa hè",
    weight: "2 người ăn",
    time: "12 phút",
    difficulty: "Dễ",
    calories: "220 kcal / phần",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80",
    description: "Mướp hương vườn ngọt thơm nức mũi kết hợp hoa thiên lý tươi non giải nhiệt ngày hè, xào cùng lòng mề gà ta giòn sần sật ướp tiêu tỏi.",
    nutrition: { protein: "18g", carbs: "15g", fat: "7g", fiber: "6g" },
    cookingSteps: [
      "Bước 1: Phi thơm hành tím băm với 1 muỗng dầu ăn, cho lòng mề gà vào xào chín tới trong 3 phút.",
      "Bước 2: Trút mướp hương gọt vỏ cắt vát vào đảo nhanh trên lửa to trong 2 phút.",
      "Bước 3: Thả hoa thiên lý vào đảo cùng trong 1 phút để giữ màu xanh và độ ngọt giòn.",
      "Bước 4: Nêm gói sốt tỏi ớt QuickCook và múc ra đĩa rắc tiêu."
    ],
    ingredients: [
      { id: "ga-ta-yen-the", amount: "180g lòng mề gà ta làm sạch tiệt trùng" },
      { id: "rau-thuy-canh-dalat", amount: "250g mướp hương và hoa thiên lý tươi" }
    ]
  }
];

// Dữ liệu người dùng mẫu với phân quyền (Admin & Customer)
const SEED_USERS = [
  {
    id: "USR-001",
    name: "Quản trị viên QuickCook",
    email: "admin@quickcook.vn",
    password: "admin123",
    role: "admin",
    phone: "0901234567",
    joinedAt: "2026-01-01T08:00:00.000Z"
  },
  {
    id: "USR-002",
    name: "Nguyễn Văn An",
    email: "khach@quickcook.local",
    password: "123456",
    role: "customer",
    phone: "0987654321",
    address: "Số 12 đường D1, Khu Công nghệ cao, TP. Thủ Đức, TP.HCM",
    joinedAt: "2026-02-15T10:30:00.000Z"
  }
];

// Dữ liệu đơn hàng mẫu phục vụ thống kê Dashboard Admin
const SEED_ORDERS = [
  {
    id: "QC98214012",
    userId: "USR-002",
    name: "Nguyễn Văn An",
    phone: "0987654321",
    email: "khach@quickcook.local",
    address: "Số 12 đường D1, Khu Công nghệ cao, TP. Thủ Đức, TP.HCM",
    note: "Giao trước 11h trưa để kịp nấu cơm trưa",
    payment: "VIETQR",
    paymentStatus: "Đã thanh toán QR",
    status: "Đang giao hàng",
    items: [
      { id: "QC001", name: "Combo thịt kho trứng nước dừa 2-3 người", price: 139000, qty: 1 },
      { id: "QC004", name: "Set rau củ xào thập cẩm nấm hương", price: 65000, qty: 1 }
    ],
    subtotal: 204000,
    shipping: 25000,
    total: 229000,
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString()
  },
  {
    id: "QC98213890",
    userId: null,
    name: "Trần Thị Mai",
    phone: "0912348899",
    email: "mai.tran@gmail.com",
    address: "Tòa S2.03 Vinhomes Grand Park, TP. Thủ Đức",
    note: "Gọi trước khi giao 15 phút",
    payment: "COD",
    paymentStatus: "Chưa thanh toán (Thu COD)",
    status: "Đang sơ chế",
    items: [
      { id: "QC008", name: "Combo đại gia đình 4 người ấm cúng", price: 279000, qty: 1 },
      { id: "QC010", name: "Set cá hồi Na Uy sốt bơ tỏi măng tây", price: 189000, qty: 1 }
    ],
    subtotal: 468000,
    shipping: 0,
    total: 468000,
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString()
  },
  {
    id: "QC98211029",
    userId: null,
    name: "Lê Hoàng Long",
    phone: "0934567890",
    email: "long.le@fpt.edu.vn",
    address: "Ký túc xá FPT University, Khu CNC, TP. Thủ Đức",
    note: "Để ở bàn bảo vệ giúp mình",
    payment: "VIETQR",
    paymentStatus: "Đã thanh toán QR",
    status: "Hoàn tất",
    items: [
      { id: "QC005", name: "Set bò Úc xào lúc lắc khoai tây", price: 159000, qty: 2 }
    ],
    subtotal: 318000,
    shipping: 0,
    total: 318000,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: "QC98198421",
    userId: null,
    name: "Phạm Hải Yến",
    phone: "0977889900",
    email: "haiyen.pham@yahoo.com",
    address: "45 Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM",
    note: "Giao giờ hành chính",
    payment: "VIETQR",
    paymentStatus: "Đã thanh toán QR",
    status: "Hoàn tất",
    items: [
      { id: "QC007", name: "Set salad ức gà rau mầm sốt mè rang", price: 79000, qty: 2 },
      { id: "QC009", name: "Set lẩu nấm bách thảo thanh đạm", price: 199000, qty: 1 }
    ],
    subtotal: 357000,
    shipping: 0,
    total: 357000,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

// Khóa lưu trữ LocalStorage
const STORAGE_KEYS = {
  products: "quickcook_products",
  cart: "quickcook_cart",
  orders: "quickcook_orders",
  users: "quickcook_users",
  session: "quickcook_session",
  ingredients: "quickcook_ingredients"
};

// Đọc và ghi dữ liệu
function loadProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.products);
    if (!raw) {
      saveProducts(SEED_PRODUCTS);
      return structuredClone(SEED_PRODUCTS);
    }
    const parsed = JSON.parse(raw);
    // Nếu dữ liệu cũ có ít hơn 10 món thì cập nhật lên danh sách mới
    if (!Array.isArray(parsed) || parsed.length < 10) {
      saveProducts(SEED_PRODUCTS);
      return structuredClone(SEED_PRODUCTS);
    }
    return parsed;
  } catch (e) {
    return structuredClone(SEED_PRODUCTS);
  }
}

function saveProducts(items) {
  localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(items));
}

function loadIngredients() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ingredients);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ingredients, JSON.stringify(INGREDIENTS_DATA));
      return structuredClone(INGREDIENTS_DATA);
    }
    return JSON.parse(raw);
  } catch (e) {
    return structuredClone(INGREDIENTS_DATA);
  }
}

function loadUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.users);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(SEED_USERS));
      return structuredClone(SEED_USERS);
    }
    const parsed = JSON.parse(raw);
    // Đảm bảo có sẵn tài khoản admin
    if (!parsed.some(u => u.role === "admin")) {
      parsed.unshift(SEED_USERS[0]);
      localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(parsed));
    }
    return parsed;
  } catch (e) {
    return structuredClone(SEED_USERS);
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

function loadOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.orders);
    if (!raw || JSON.parse(raw).length === 0) {
      localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(SEED_ORDERS));
      return structuredClone(SEED_ORDERS);
    }
    return JSON.parse(raw);
  } catch (e) {
    return structuredClone(SEED_ORDERS);
  }
}

function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
}

// Lấy thông tin phiên đăng nhập
function getCurrentUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.session);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function setCurrentUser(user) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.session);
  }
}

// Khởi tạo ban đầu
if (!localStorage.getItem(STORAGE_KEYS.products)) saveProducts(SEED_PRODUCTS);
if (!localStorage.getItem(STORAGE_KEYS.ingredients)) localStorage.setItem(STORAGE_KEYS.ingredients, JSON.stringify(INGREDIENTS_DATA));
if (!localStorage.getItem(STORAGE_KEYS.users)) saveUsers(SEED_USERS);
if (!localStorage.getItem(STORAGE_KEYS.orders)) saveOrders(SEED_ORDERS);

let PRODUCTS = loadProducts();

const CATEGORY_NAMES = {
  combo: "Combo bữa cơm gia đình",
  rau: "Rau củ sơ chế & Salad",
  thit: "Thịt cá & Món mặn",
  canh: "Canh dinh dưỡng & Lẩu"
};

function money(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  }).format(Number(value) || 0);
}
