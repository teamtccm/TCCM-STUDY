/**
 * js/editor_resources.js — Module Tài Nguyên Editor (Text 3D & Sound Effect & Nhạc Nền)
 * Tối ưu hóa triệt để theo phản hồi người dùng:
 * 1. Text Edit: Ảnh SIÊU TO RÕ NÉT (Mặc định 1 cột chiếm trọn khung hình) + Tên to + Keyword rõ ràng + Đổi chữ & Chép lệnh nhanh
 * 2. Sound Effect: Lựa chọn Style chuẩn Nhạc Nền (Thanh trượt Bottom Style Bar + Badge + Nút 3D / List cards)
 * 3. Nhạc Nền: Giữ nguyên 100% bản cũ
 */

(function() {
    // 1. DATA: 16 STYLE TEXT 3D
    const TEXT3D_DATA = [
        {
            id: 1,
            code: "[XANH NEON]",
            name: "Xanh Mát Resort",
            preset: "My presets1",
            cat: "chuyencanh",
            group: "Chuyển Cảnh Du Lịch",
            styleFit: "Review Resort, Homestay, Quán cafe sân vườn, Ăn uống Healthy, Vlog thiên nhiên chill",
            editSection: "Chuyển cảnh sang địa điểm mới (00:05 - 00:15) hoặc Title mở đầu chuyến đi",
            editTiming: "💨 Chuyển Cảnh (00:05 - 00:15)",
            timingColor: "emerald",
            soundName: "Clean Whoosh.wav",
            soundSrc: "sound-effects/01_whoosh_chuyen_canh/Clean Whoosh.wav",
            soundDb: "-6 dB",
            imgSrc: "images/text3d/style_01.png",
            sampleText: "RESORT VIEW BIỂN 5 SAO"
        },
        {
            id: 2,
            code: "[HOÀNG GIA]",
            name: "Thương Hiệu Đẳng Cấp",
            preset: "My presets2",
            cat: "doanhnhan",
            group: "Chủ Tịch & Thương Hiệu",
            styleFit: "Nhân hiệu Doanh nhân, Chủ tịch, Chuyên gia đầu ngành, Bất động sản cao cấp, Đồ hiệu xa xỉ",
            editSection: "Giới thiệu Profile VIP, Tên thương hiệu/tập đoàn, Khẳng định uy tín & vị thế",
            editTiming: "👑 Profile VIP / Giới Thiệu",
            timingColor: "yellow",
            soundName: "Subtle Hit.wav",
            soundSrc: "sound-effects/02_hit_diem_nhan/Subtle Hit.wav",
            soundDb: "-8 dB",
            imgSrc: "images/text3d/style_02.png",
            sampleText: "THƯƠNG HIỆU ĐẲNG CẤP"
        },
        {
            id: 3,
            code: "[XANH VIEW BIỂN]",
            name: "Đón Gió View Biển",
            preset: "My presets3",
            cat: "chuyencanh",
            group: "Chuyển Cảnh Biển Đảo",
            styleFit: "Du lịch biển đảo, Tour du thuyền, Khách sạn ven biển, Mùa hè sôi động, Thể thao nước",
            editSection: "Cắt cảnh Flycam lia từ trên cao xuống biển, Đập text địa danh hoặc tên bãi tắm",
            editTiming: "🌊 Flycam Lia Cảnh / Địa Danh",
            timingColor: "cyan",
            soundName: "Pop Flash.wav",
            soundSrc: "sound-effects/03_click_hanh_dong/Pop Flash.wav",
            soundDb: "-9 dB",
            imgSrc: "images/text3d/style_03.png",
            sampleText: "ĐÓN GIÓ VIEW BIỂN"
        },
        {
            id: 4,
            code: "[100 TỶ]",
            name: "Tài Chính 100 Tỷ",
            preset: "My presets4",
            cat: "taichinh",
            group: "Con Số Gây Sốc",
            styleFit: "Tài chính kinh tế, Tin giật gân về tiền bạc, Báo cáo doanh thu, Mức phạt, Thiệt hại tài sản",
            editSection: "Giữa video khi đập con số tài chính gây sốc (Ví dụ: Doanh thu 100 tỷ, Mức phạt 500 triệu)",
            editTiming: "💰 Giữa Clip - Đập Số Tiền Sốc",
            timingColor: "red",
            soundName: "Bass Clap.wav",
            soundSrc: "sound-effects/02_hit_diem_nhan/Bass Clap.wav",
            soundDb: "-5 dB",
            imgSrc: "images/text3d/style_04.png",
            sampleText: "DOANH THU 100 TỶ"
        },
        {
            id: 5,
            code: "[CAM BOOKING]",
            name: "Booking Quán Xá",
            preset: "My presets5",
            cat: "cta",
            group: "Kêu Gọi CTA",
            styleFit: "Review quán ăn, Ẩm thực đường phố, Trải nghiệm dịch vụ, Giảm giá bàn, Đặt phòng nhanh",
            editSection: "Cuối clip kêu gọi hành động CTA (Call To Action): Đặt bàn ngay, Click link bio nhận ưu đãi",
            editTiming: "🎯 Cuối Video (Kêu Gọi CTA)",
            timingColor: "amber",
            soundName: "Touch Screen Click.wav",
            soundSrc: "sound-effects/03_click_hanh_dong/Touch Screen Click.wav",
            soundDb: "-10 dB",
            imgSrc: "images/text3d/style_05.png",
            sampleText: "BOOKING ĐẶT BÀN NGAY"
        },
        {
            id: 6,
            code: "[ĐỎ DRAMA]",
            name: "Cảnh Báo & Biến Căng",
            preset: "My presets6",
            cat: "hook",
            group: "Hook 3s / Drama",
            styleFit: "Drama bóc phốt, Tin thời sự nóng, Cảnh báo lừa đảo, Biến căng MXH, Sự thật giật gân",
            editSection: "Hook 3 giây đầu tiên (00:00 - 00:03) giữ chân người xem bằng tiêu đề cực gắt giật nảy mình",
            editTiming: "🔥 Hook 3s Đầu Video",
            timingColor: "red",
            soundName: "vine-boom.wav",
            soundSrc: "sound-effects/05_glitch_bien_cang/vine-boom.wav",
            soundDb: "-4 dB",
            imgSrc: "images/text3d/style_06.png",
            sampleText: "CÔNG AN VÀO CUỘC BẮT TẠM GIAM"
        },
        {
            id: 7,
            code: "[HỒNG HYPEBEAST]",
            name: "Giới Trẻ & Xu Hướng",
            preset: "My presets7",
            cat: "review",
            group: "GenZ & Streetwear",
            styleFit: "Giới trẻ GenZ, Thời trang Streetwear, Săn giày Sneaker, Trend TikTok bùng nổ, Hypebeast",
            editSection: "Đoạn nhạc Drop nhịp nhanh giới thiệu item hot trend, Mở hộp unbox đồ độc lạ",
            editTiming: "⚡ Drop Nhạc Giới Thiệu Item",
            timingColor: "fuchsia",
            soundName: "Riser 1.wav",
            soundSrc: "sound-effects/04_riser_kich_tinh/Riser 1.wav",
            soundDb: "-5 dB",
            imgSrc: "images/text3d/style_07.png",
            sampleText: "HOT TREND GIỚI TRẺ SĂN ĐÓN"
        },
        {
            id: 8,
            code: "[GOLD CHỦ TỊCH]",
            name: "Chủ Tịch & Quyền Lực",
            preset: "My presets8",
            cat: "doanhnhan",
            group: "Chủ Tịch & Thương Hiệu",
            styleFit: "Đạo lý doanh nhân, Câu chuyện khởi nghiệp, Triết lý sống của người giàu, Podcast sâu sắc",
            editSection: "Điểm nhấn câu nói quote đắt giá, Đoạn lắng đọng chiêm nghiệm giá trị cốt lõi",
            editTiming: "💎 Quote Đắt Giá / Chiêm Nghiệm",
            timingColor: "yellow",
            soundName: "Subtle Hit.wav",
            soundSrc: "sound-effects/02_hit_diem_nhan/Subtle Hit.wav",
            soundDb: "-8 dB",
            imgSrc: "images/text3d/style_08.png",
            sampleText: "BẢN LĨNH TẠO NÊN VỊ THẾ"
        },
        {
            id: 9,
            code: "[XANH HYPER]",
            name: "Review Xe & Tốc Độ",
            preset: "My presets9",
            cat: "review",
            group: "Xe Cộ & Công Nghệ",
            styleFit: "Review siêu xe, Ô tô xe máy, Đồ chơi công nghệ cao, Gaming gear, Thể thao mạo hiểm",
            editSection: "Đoạn test tăng tốc 0-100km/h, Hiện thông số kỹ thuật mã lực, Cấu hình chip khủng",
            editTiming: "🏎️ Hiện Thông Số / Tăng Tốc",
            timingColor: "blue",
            soundName: "Sequence Click.wav",
            soundSrc: "sound-effects/03_click_hanh_dong/Sequence Click.wav",
            soundDb: "-10 dB",
            imgSrc: "images/text3d/style_09.png",
            sampleText: "TĂNG TỐC 0-100KM/H TRONG 3S"
        },
        {
            id: 10,
            code: "[ÂM BẢN GLITCH]",
            name: "Bóc Phốt & Sự Thật",
            preset: "My presets10",
            cat: "hook",
            group: "Hook 3s / Drama",
            styleFit: "Điều tra chân tướng, Vạch trần chiêu trò lừa đảo, Góc khuất đen tối, Bẻ lái bất ngờ",
            editSection: "Đoạn bẻ lái cốt truyện (Plot Twist), Vạch trần sự dối trá: SỰ THẬT ĐẰNG SAU, LẬT TẨY CHIÊU TRÒ",
            editTiming: "⚡ Plot Twist / Lật Tẩy Sự Thật",
            timingColor: "purple",
            soundName: "ding.wav",
            soundSrc: "sound-effects/05_glitch_bien_cang/ding.wav",
            soundDb: "-9 dB",
            imgSrc: "images/text3d/style_10.png",
            sampleText: "SỰ THẬT BỊ CHE GIẤU BẤY LÂU"
        },
        {
            id: 11,
            code: "[VÀNG ĐEN VIRAL]",
            name: "Kỷ Lục Gây Sốc",
            preset: "My presets11",
            cat: "taichinh",
            group: "Con Số Gây Sốc",
            styleFit: "Tin tức số liệu bùng nổ, Kỷ lục Guiness, Tăng trưởng doanh số, Thống kê kinh hoàng",
            editSection: "Đoạn so sánh số liệu trước & sau, Đập kỷ lục khủng làm người xem phải ngỡ ngàng",
            editTiming: "📊 Đập Kỷ Lục / So Sánh Số Liệu",
            timingColor: "amber",
            soundName: "Bass Clap.wav",
            soundSrc: "sound-effects/02_hit_diem_nhan/Bass Clap.wav",
            soundDb: "-5 dB",
            imgSrc: "images/text3d/style_11.png",
            sampleText: "KỶ LỤC 1 TRIỆU ĐƠN HÀNG"
        },
        {
            id: 12,
            code: "[HỒNG HỘI CHỊ EM]",
            name: "Vlog Đời Thường",
            preset: "My presets12",
            cat: "chuyencanh",
            group: "Chuyển Cảnh Du Lịch",
            styleFit: "Daily Vlog, Chăm sóc sắc đẹp, Hội bạn thân cafe cuối tuần, Mua sắm mỹ phẩm, OOTD",
            editSection: "Intro mở đầu ngày mới, Đoạn dạo phố nhẹ nhàng, Chuyển cảnh sang quán cafe chill",
            editTiming: "🌸 Intro Ngày Mới / Chuyển Cảnh Chill",
            timingColor: "pink",
            soundName: "Sun Ray.wav",
            soundSrc: "sound-effects/02_hit_diem_nhan/Sun Ray.wav",
            soundDb: "-6 dB",
            imgSrc: "images/text3d/style_12.png",
            sampleText: "HỘI CHỊ EM LÊN ĐỒ ĐI CHƠI"
        },
        {
            id: 13,
            code: "[BĂNG TUYẾT]",
            name: "Siêu Dự Án Tỷ Đô",
            preset: "My presets13",
            cat: "chuyencanh",
            group: "Chuyển Cảnh Du Lịch",
            styleFit: "Quy hoạch hạ tầng tỷ đô, Đại đô thị thông minh, Tầm nhìn vĩ mô 2030, Điện ảnh cinematic",
            editSection: "Đoạn flycam phóng tầm mắt ra quy hoạch toàn cảnh: Tên dự án, Vốn đầu tư tỷ USD",
            editTiming: "🏙️ Toàn Cảnh Quy Hoạch Vĩ Mô",
            timingColor: "sky",
            soundName: "Long Cinema Whoosh.wav",
            soundSrc: "sound-effects/01_whoosh_chuyen_canh/Long Cinema Whoosh.wav",
            soundDb: "-8 dB",
            imgSrc: "images/text3d/style_13.png",
            sampleText: "ĐẠI DỰ ÁN QUY MÔ 50.000 TỶ"
        },
        {
            id: 14,
            code: "[CAM SALE SHOCK]",
            name: "Siêu Khuyến Mãi",
            preset: "My presets14",
            cat: "cta",
            group: "Kêu Gọi CTA",
            styleFit: "E-commerce, Review TikTok Shop, Flash sale giờ vàng, Xả kho cắt lỗ, Deal độc quyền",
            editSection: "Đoạn chốt giá bán sốc làm khách hàng chốt đơn: MUA 1 TẶNG 1, GIẢM 50% DUY NHẤT HÔM NAY",
            editTiming: "💥 Đoạn Chốt Giá / Flash Sale",
            timingColor: "orange",
            soundName: "Camera Flash.wav",
            soundSrc: "sound-effects/03_click_hanh_dong/Camera Flash.wav",
            soundDb: "-8 dB",
            imgSrc: "images/text3d/style_14.png",
            sampleText: "GIẢM 50% DUY NHẤT HÔM NAY"
        },
        {
            id: 15,
            code: "[CYAN TƯƠNG LAI]",
            name: "Công Nghệ & Hạ Tầng",
            preset: "My presets15",
            cat: "chuyencanh",
            group: "Chuyển Cảnh Du Lịch",
            styleFit: "Tiến độ cao tốc, Sân bay, Cầu cảng, Công nghệ AI mới, Giải pháp tự động hóa tương lai",
            editSection: "Cắt cảnh flycam tiến độ công trường thi công, Giới thiệu bước nhảy vọt công nghệ",
            editTiming: "🚀 Tiến Độ Công Trình / Công Nghệ AI",
            timingColor: "cyan",
            soundName: "Quick Whoosh.wav",
            soundSrc: "sound-effects/01_whoosh_chuyen_canh/Quick Whoosh.wav",
            soundDb: "-6 dB",
            imgSrc: "images/text3d/style_15.png",
            sampleText: "CÔNG NGHỆ ĐỘT PHÁ TƯƠNG LAI"
        },
        {
            id: 16,
            code: "[VÀNG CHAMPAGNE]",
            name: "An Tâm & Outro",
            preset: "My presets16",
            cat: "cta",
            group: "Kêu Gọi CTA",
            styleFit: "Chính sách mua trả góp 0%, Giải pháp an tâm, Tư vấn tài chính gia đình, Kết thúc clip",
            editSection: "3 - 5 giây kết thúc video (Outro): Cam kết chính sách bảo hành, Lời chào cảm ơn",
            editTiming: "🏁 3-5s Kết Video (Outro / Cam Kết)",
            timingColor: "emerald",
            soundName: "Take it Easy.wav",
            soundSrc: "sound-effects/02_hit_diem_nhan/Take it Easy.wav",
            soundDb: "-7 dB",
            imgSrc: "images/text3d/style_16.png",
            sampleText: "CAM KẾT BẢO HÀNH TRỌN ĐỜI"
        }
    ];

    // 2. DATA: 21 SOUND EFFECTS (ĐẦY ĐỦ THÔNG TIN THƯ MỤC TRÊN MÁY TÍNH)
    const SFX_DATA = [
        // FOLDER 01: 01_whoosh_chuyen_canh (Xanh Dương - Blue)
        { 
            id: 1, 
            cat: "whoosh", 
            catName: "Chuyển Cảnh", 
            group: "01_whoosh_chuyen_canh", 
            name: "Clean Whoosh", 
            file: "Clean Whoosh.wav", 
            src: "sound-effects/01_whoosh_chuyen_canh/Clean Whoosh.wav", 
            folder: "sound-effects/01_whoosh_chuyen_canh",
            folderName: "01_whoosh_chuyen_canh",
            absPath: "/Users/phuongpham/Downloads/Web/Công Việc Hằng Ngày/sound-effects/01_whoosh_chuyen_canh/Clean Whoosh.wav",
            dur: "1.8s", 
            gain: "-6 dB", 
            color: "blue" 
        },
        { 
            id: 2, 
            cat: "whoosh", 
            catName: "Chuyển Cảnh", 
            group: "01_whoosh_chuyen_canh", 
            name: "Deep Low Whoosh", 
            file: "Deep Low Whoosh.wav", 
            src: "sound-effects/01_whoosh_chuyen_canh/Deep Low Whoosh.wav", 
            folder: "sound-effects/01_whoosh_chuyen_canh",
            folderName: "01_whoosh_chuyen_canh",
            absPath: "/Users/phuongpham/Downloads/Web/Công Việc Hằng Ngày/sound-effects/01_whoosh_chuyen_canh/Deep Low Whoosh.wav",
            dur: "2.3s", 
            gain: "-5 dB", 
            color: "blue" 
        },
        { 
            id: 3, 
            cat: "whoosh", 
            catName: "Chuyển Cảnh", 
            group: "01_whoosh_chuyen_canh", 
            name: "Hard Whoosh2", 
            file: "Hard Whoosh2.wav", 
            src: "sound-effects/01_whoosh_chuyen_canh/Hard Whoosh2.wav", 
            folder: "sound-effects/01_whoosh_chuyen_canh",
            folderName: "01_whoosh_chuyen_canh",
            absPath: "/Users/phuongpham/Downloads/Web/Công Việc Hằng Ngày/sound-effects/01_whoosh_chuyen_canh/Hard Whoosh2.wav",
            dur: "2.1s", 
            gain: "-6 dB", 
            color: "blue" 
        },
        { 
            id: 4, 
            cat: "whoosh", 
            catName: "Chuyển Cảnh", 
            group: "01_whoosh_chuyen_canh", 
            name: "Long Cinema Whoosh", 
            file: "Long Cinema Whoosh.wav", 
            src: "sound-effects/01_whoosh_chuyen_canh/Long Cinema Whoosh.wav", 
            folder: "sound-effects/01_whoosh_chuyen_canh",
            folderName: "01_whoosh_chuyen_canh",
            absPath: "/Users/phuongpham/Downloads/Web/Công Việc Hằng Ngày/sound-effects/01_whoosh_chuyen_canh/Long Cinema Whoosh.wav",
            dur: "5.0s", 
            gain: "-8 dB", 
            color: "blue" 
        },
        { 
            id: 5, 
            cat: "whoosh", 
            catName: "Chuyển Cảnh", 
            group: "01_whoosh_chuyen_canh", 
            name: "Quick Whoosh", 
            file: "Quick Whoosh.wav", 
            src: "sound-effects/01_whoosh_chuyen_canh/Quick Whoosh.wav", 
            folder: "sound-effects/01_whoosh_chuyen_canh",
            folderName: "01_whoosh_chuyen_canh",
            absPath: "/Users/phuongpham/Downloads/Web/Công Việc Hằng Ngày/sound-effects/01_whoosh_chuyen_canh/Quick Whoosh.wav",
            dur: "2.1s", 
            gain: "-6 dB", 
            color: "blue" 
        },
        { 
            id: 6, 
            cat: "whoosh", 
            catName: "Chuyển Cảnh", 
            group: "01_whoosh_chuyen_canh", 
            name: "Whoosh Impact", 
            file: "Whoosh Impact.wav", 
            src: "sound-effects/01_whoosh_chuyen_canh/Whoosh Impact.wav", 
            folder: "sound-effects/01_whoosh_chuyen_canh",
            folderName: "01_whoosh_chuyen_canh",
            absPath: "/Users/phuongpham/Downloads/Web/Công Việc Hằng Ngày/sound-effects/01_whoosh_chuyen_canh/Whoosh Impact.wav",
            dur: "5.3s", 
            gain: "-4 dB", 
            color: "blue" 
        },

        // FOLDER 02: 02_hit_diem_nhan (Đỏ - Red)
        { 
            id: 7, 
            cat: "hit", 
            catName: "Điểm Nhấn", 
            group: "02_hit_diem_nhan", 
            name: "Bass Clap", 
            file: "Bass Clap.wav", 
            src: "sound-effects/02_hit_diem_nhan/Bass Clap.wav", 
            folder: "sound-effects/02_hit_diem_nhan",
            folderName: "02_hit_diem_nhan",
            absPath: "/Users/phuongpham/Downloads/Web/Công Việc Hằng Ngày/sound-effects/02_hit_diem_nhan/Bass Clap.wav",
            dur: "4.7s", 
            gain: "-5 dB", 
            color: "red" 
        },
        { 
            id: 8, 
            cat: "hit", 
            catName: "Điểm Nhấn", 
            group: "02_hit_diem_nhan", 
            name: "Slow Hit", 
            file: "Slow Hit.wav", 
            src: "sound-effects/02_hit_diem_nhan/Slow Hit.wav", 
            folder: "sound-effects/02_hit_diem_nhan",
            folderName: "02_hit_diem_nhan",
            absPath: "/Users/phuongpham/Downloads/Web/Công Việc Hằng Ngày/sound-effects/02_hit_diem_nhan/Slow Hit.wav",
            dur: "4.9s", 
            gain: "-6 dB", 
            color: "red" 
        },
        { 
            id: 9, 
            cat: "hit", 
            catName: "Điểm Nhấn", 
            group: "02_hit_diem_nhan", 
            name: "Subtle Hit", 
            file: "Subtle Hit.wav", 
            src: "sound-effects/02_hit_diem_nhan/Subtle Hit.wav", 
            folder: "sound-effects/02_hit_diem_nhan",
            folderName: "02_hit_diem_nhan",
            absPath: "/Users/phuongpham/Downloads/Web/Công Việc Hằng Ngày/sound-effects/02_hit_diem_nhan/Subtle Hit.wav",
            dur: "2.4s", 
            gain: "-8 dB", 
            color: "red" 
        },
        { 
            id: 10, 
            cat: "hit", 
            catName: "Điểm Nhấn", 
            group: "02_hit_diem_nhan", 
            name: "Sun Ray", 
            file: "Sun Ray.wav", 
            src: "sound-effects/02_hit_diem_nhan/Sun Ray.wav", 
            folder: "sound-effects/02_hit_diem_nhan",
            folderName: "02_hit_diem_nhan",
            absPath: "/Users/phuongpham/Downloads/Web/Công Việc Hằng Ngày/sound-effects/02_hit_diem_nhan/Sun Ray.wav",
            dur: "1.3s", 
            gain: "-6 dB", 
            color: "red" 
        },
        { 
            id: 11, 
            cat: "hit", 
            catName: "Điểm Nhấn", 
            group: "02_hit_diem_nhan", 
            name: "Take it Easy", 
            file: "Take it Easy.wav", 
            src: "sound-effects/02_hit_diem_nhan/Take it Easy.wav", 
            folder: "sound-effects/02_hit_diem_nhan",
            folderName: "02_hit_diem_nhan",
            absPath: "/Users/phuongpham/Downloads/Web/Công Việc Hằng Ngày/sound-effects/02_hit_diem_nhan/Take it Easy.wav",
            dur: "5.2s", 
            gain: "-7 dB", 
            color: "red" 
        },

        // FOLDER 03: 03_click_hanh_dong (Xanh Lá - Green)
        { 
            id: 12, 
            cat: "click", 
            catName: "Click Hành Động", 
            group: "03_click_hanh_dong", 
            name: "Camera Flash", 
            file: "Camera Flash.wav", 
            src: "sound-effects/03_click_hanh_dong/Camera Flash.wav", 
            folder: "sound-effects/03_click_hanh_dong",
            folderName: "03_click_hanh_dong",
            absPath: "/Users/phuongpham/Downloads/Web/Công Việc Hằng Ngày/sound-effects/03_click_hanh_dong/Camera Flash.wav",
            dur: "1.8s", 
            gain: "-8 dB", 
            color: "green" 
        },
        { 
            id: 13, 
            cat: "click", 
            catName: "Click Hành Động", 
            group: "03_click_hanh_dong", 
            name: "Pop Flash", 
            file: "Pop Flash.wav", 
            src: "sound-effects/03_click_hanh_dong/Pop Flash.wav", 
            folder: "sound-effects/03_click_hanh_dong",
            folderName: "03_click_hanh_dong",
            absPath: "/Users/phuongpham/Downloads/Web/Công Việc Hằng Ngày/sound-effects/03_click_hanh_dong/Pop Flash.wav",
            dur: "1.1s", 
            gain: "-9 dB", 
            color: "green" 
        },
        { 
            id: 14, 
            cat: "click", 
            catName: "Click Hành Động", 
            group: "03_click_hanh_dong", 
            name: "Sequence Click", 
            file: "Sequence Click.wav", 
            src: "sound-effects/03_click_hanh_dong/Sequence Click.wav", 
            folder: "sound-effects/03_click_hanh_dong",
            folderName: "03_click_hanh_dong",
            absPath: "/Users/phuongpham/Downloads/Web/Công Việc Hằng Ngày/sound-effects/03_click_hanh_dong/Sequence Click.wav",
            dur: "3.0s", 
            gain: "-10 dB", 
            color: "green" 
        },
        { 
            id: 15, 
            cat: "click", 
            catName: "Click Hành Động", 
            group: "03_click_hanh_dong", 
            name: "Switch Click", 
            file: "Switch.wav", 
            src: "sound-effects/03_click_hanh_dong/Switch.wav", 
            folder: "sound-effects/03_click_hanh_dong",
            folderName: "03_click_hanh_dong",
            absPath: "/Users/phuongpham/Downloads/Web/Công Việc Hằng Ngày/sound-effects/03_click_hanh_dong/Switch.wav",
            dur: "0.3s", 
            gain: "-10 dB", 
            color: "green" 
        },
        { 
            id: 16, 
            cat: "click", 
            catName: "Click Hành Động", 
            group: "03_click_hanh_dong", 
            name: "Touch Screen", 
            file: "Touch Screen Click.wav", 
            src: "sound-effects/03_click_hanh_dong/Touch Screen Click.wav", 
            folder: "sound-effects/03_click_hanh_dong",
            folderName: "03_click_hanh_dong",
            absPath: "/Users/phuongpham/Downloads/Web/Công Việc Hằng Ngày/sound-effects/03_click_hanh_dong/Touch Screen Click.wav",
            dur: "2.5s", 
            gain: "-10 dB", 
            color: "green" 
        },

        // FOLDER 04: 04_riser_kich_tinh (Tím - Purple)
        { 
            id: 17, 
            cat: "riser", 
            catName: "Kịch Tính", 
            group: "04_riser_kich_tinh", 
            name: "Riser 1", 
            file: "Riser 1.wav", 
            src: "sound-effects/04_riser_kich_tinh/Riser 1.wav", 
            folder: "sound-effects/04_riser_kich_tinh",
            folderName: "04_riser_kich_tinh",
            absPath: "/Users/phuongpham/Downloads/Web/Công Việc Hằng Ngày/sound-effects/04_riser_kich_tinh/Riser 1.wav",
            dur: "9.4s", 
            gain: "-5 dB", 
            color: "purple" 
        },
        { 
            id: 18, 
            cat: "riser", 
            catName: "Kịch Tính", 
            group: "04_riser_kich_tinh", 
            name: "Riser 2", 
            file: "Riser 2.wav", 
            src: "sound-effects/04_riser_kich_tinh/Riser 2.wav", 
            folder: "sound-effects/04_riser_kich_tinh",
            folderName: "04_riser_kich_tinh",
            absPath: "/Users/phuongpham/Downloads/Web/Công Việc Hằng Ngày/sound-effects/04_riser_kich_tinh/Riser 2.wav",
            dur: "6.1s", 
            gain: "-5 dB", 
            color: "purple" 
        },
        { 
            id: 19, 
            cat: "riser", 
            catName: "Kịch Tính", 
            group: "04_riser_kich_tinh", 
            name: "Riser 3", 
            file: "Riser 3.wav", 
            src: "sound-effects/04_riser_kich_tinh/Riser 3.wav", 
            folder: "sound-effects/04_riser_kich_tinh",
            folderName: "04_riser_kich_tinh",
            absPath: "/Users/phuongpham/Downloads/Web/Công Việc Hằng Ngày/sound-effects/04_riser_kich_tinh/Riser 3.wav",
            dur: "8.0s", 
            gain: "-5 dB", 
            color: "purple" 
        },

        // FOLDER 05: 05_glitch_bien_cang (Vàng - Yellow)
        { 
            id: 20, 
            cat: "meme", 
            catName: "Meme", 
            group: "05_glitch_bien_cang", 
            name: "Ding Idea", 
            file: "ding.wav", 
            src: "sound-effects/05_glitch_bien_cang/ding.wav", 
            folder: "sound-effects/05_glitch_bien_cang",
            folderName: "05_glitch_bien_cang",
            absPath: "/Users/phuongpham/Downloads/Web/Công Việc Hằng Ngày/sound-effects/05_glitch_bien_cang/ding.wav",
            dur: "1.4s", 
            gain: "-9 dB", 
            color: "yellow" 
        },
        { 
            id: 21, 
            cat: "meme", 
            catName: "Biến Căng & Meme", 
            group: "05_glitch_bien_cang", 
            name: "Vine Boom", 
            file: "vine-boom.wav", 
            src: "sound-effects/05_glitch_bien_cang/vine-boom.wav", 
            folder: "sound-effects/05_glitch_bien_cang",
            folderName: "05_glitch_bien_cang",
            absPath: "/Users/phuongpham/Downloads/Web/Công Việc Hằng Ngày/sound-effects/05_glitch_bien_cang/vine-boom.wav",
            dur: "1.2s", 
            gain: "-4 dB", 
            color: "yellow" 
        }
    ];

    // State
    const EditorState = {
        activeTab: 'text3d', // 'text3d', 'sfx', 'bgm'
        textCols: 1, // 1: 1 Cột Ảnh To Rõ (default), 2: 2 Cột
        textCatFilter: 'all',
        customTexts: {}, // id -> text
        textSearch: '',
        sfxCatFilter: 'all',
        sfxSearch: '',
        sfxFavorites: new Set(),
        sfxViewMode: 'grid', // 'grid' (3D Buttons) | 'list' (Detail Cards)
        audioPlayer: new Audio(),
        currentPlayingSFXId: null,
        currentPlayingSoundBtn: null
    };

    // Load & Save SFX Favorites từ localStorage
    function loadSfxFavorites() {
        try {
            const raw = localStorage.getItem('sfx_favorites_editor');
            if (raw) {
                EditorState.sfxFavorites = new Set(JSON.parse(raw));
            }
        } catch(e) {
            console.error('Lỗi load sfx favorites:', e);
        }
    }

    function saveSfxFavorites() {
        try {
            localStorage.setItem('sfx_favorites_editor', JSON.stringify([...EditorState.sfxFavorites]));
        } catch(e) {
            console.error('Lỗi save sfx favorites:', e);
        }
    }

    // Toggle Thả Tim Lưu Sound Thích
    function toggleSfxFavorite(event, id) {
        if (event) event.stopPropagation();
        id = Number(id);
        const isFav = EditorState.sfxFavorites.has(id);
        if (isFav) {
            EditorState.sfxFavorites.delete(id);
            showMiniNotify('💔 Đã bỏ khỏi Sound yêu thích');
        } else {
            EditorState.sfxFavorites.add(id);
            showMiniNotify('❤️ Đã lưu vào Sound yêu thích!');
        }
        saveSfxFavorites();
        updateSfxFavoriteBadges();

        // Cập nhật giao diện nút tim
        const heartBtn = document.getElementById(`sfx-heart-${id}`);
        const listHeartBtn = document.getElementById(`sfx-list-heart-${id}`);
        const newFav = EditorState.sfxFavorites.has(id);
        if (heartBtn) {
            heartBtn.classList.toggle('favorited', newFav);
            heartBtn.innerHTML = `<i class="${newFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>`;
        }
        if (listHeartBtn) {
            listHeartBtn.classList.toggle('favorited', newFav);
            listHeartBtn.innerHTML = `<i class="${newFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>`;
        }

        // Nếu đang ở tab Yêu Thích thì render lại
        if (EditorState.sfxCatFilter === 'FAVORITES') {
            renderSFXGrid();
        }
    }

    function updateSfxFavoriteBadges() {
        const count = EditorState.sfxFavorites.size;
        const b = document.getElementById('sfxBottomFavCountBadge');
        if (b) b.textContent = count;
        const topFavBadge = document.getElementById('sfxTopFavBadge');
        if (topFavBadge) topFavBadge.textContent = count;
    }

    // Modal Truy Vết Vị Trí Sound & Thư Mục Trên Máy
    function openSfxLocationModal(event, id) {
        if (event) event.stopPropagation();
        id = Number(id);
        const sound = SFX_DATA.find(s => s.id === id);
        if (!sound) return;

        const modal = document.getElementById('sbLocationModal');
        if (!modal) return;

        const catEl = document.getElementById('sbModalCategory');
        const titleEl = document.getElementById('sbModalTitle');
        const authorEl = document.getElementById('sbModalAuthor');
        const durEl = document.getElementById('sbModalDuration');
        const folderEl = document.getElementById('sbModalFolder');
        const absPathInput = document.getElementById('sbModalAbsPath');
        const cmdFlagInput = document.getElementById('sbModalCommandFlag');
        const tiktokBtn = document.getElementById('sbModalTiktokLink');
        const playBtn = document.getElementById('sbModalPlayBtn');

        if (catEl) catEl.textContent = sound.folderName || sound.group;
        if (titleEl) titleEl.textContent = sound.name;
        if (authorEl) authorEl.textContent = `Gain: ${sound.gain} • Format: WAV 48kHz Stereo`;
        if (durEl) durEl.textContent = `${sound.dur} (${sound.gain})`;
        if (folderEl) folderEl.textContent = sound.folder;
        if (absPathInput) absPathInput.value = sound.absPath;
        if (cmdFlagInput) cmdFlagInput.value = `Chèn sound '${sound.file}' (${sound.gain})`;
        if (tiktokBtn) tiktokBtn.classList.add('hidden');
        if (playBtn) {
            playBtn.setAttribute('onclick', `togglePlaySFX(${sound.id})`);
            playBtn.innerHTML = '<i class="fa-solid fa-play"></i> <span>Nghe thử SFX ngay</span>';
        }

        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    loadSfxFavorites();

    // Khởi tạo text mặc định
    TEXT3D_DATA.forEach(item => {
        EditorState.customTexts[item.id] = item.sampleText;
    });

    function getTimingBadgeClass(color) {
        switch(color) {
            case 'red': return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
            case 'emerald': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
            case 'amber': return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
            case 'yellow': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
            case 'cyan': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
            case 'blue': return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
            case 'purple': return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
            case 'fuchsia': return 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40';
            case 'pink': return 'bg-pink-500/20 text-pink-300 border-pink-500/40';
            case 'sky': return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
            case 'orange': return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
            default: return 'bg-slate-800 text-slate-300 border-slate-700';
        }
    }

    function filterText3DCategory(catKey) {
        EditorState.textCatFilter = catKey;
        document.querySelectorAll('.text3d-cat-chip').forEach(chip => {
            const isMatch = chip.dataset.cat === catKey;
            chip.classList.toggle('active', isMatch);
            if (isMatch) {
                chip.classList.add('bg-cyan-500', 'text-white', 'border-cyan-400', 'shadow-md');
                chip.classList.remove('bg-slate-800', 'text-slate-300', 'border-slate-700');
            } else {
                chip.classList.remove('bg-cyan-500', 'text-white', 'border-cyan-400', 'shadow-md');
                chip.classList.add('bg-slate-800', 'text-slate-300', 'border-slate-700');
            }
        });
        renderText3DGrid();
    }

    // ==========================================
    // AUDIO ENGINE
    // ==========================================
    function stopAllAudio() {
        EditorState.audioPlayer.pause();
        EditorState.audioPlayer.currentTime = 0;
        
        // Reset SFX 3D Buttons & List Cards
        if (EditorState.currentPlayingSFXId) {
            const w = document.getElementById(`sfx-wrapper-${EditorState.currentPlayingSFXId}`);
            const b = document.getElementById(`sfx-btn-${EditorState.currentPlayingSFXId}`);
            const it = document.getElementById(`sfx-item-${EditorState.currentPlayingSFXId}`);
            const lc = document.getElementById(`sfx-list-card-${EditorState.currentPlayingSFXId}`);
            const li = document.getElementById(`sfx-list-icon-${EditorState.currentPlayingSFXId}`);
            if (w) w.classList.remove('is-playing');
            if (b) b.classList.remove('playing');
            if (it) it.classList.remove('is-active-item');
            if (lc) lc.classList.remove('is-playing');
            if (li) li.className = 'fa-solid fa-play';
            EditorState.currentPlayingSFXId = null;
        }

        // Reset Text 3D Sound Button
        if (EditorState.currentPlayingSoundBtn) {
            EditorState.currentPlayingSoundBtn.classList.remove('playing', '!bg-rose-500', '!text-white');
            EditorState.currentPlayingSoundBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i> <span>Sound</span>`;
            EditorState.currentPlayingSoundBtn = null;
        }
    }

    // Toggle phát âm thanh SFX (dành cho cả Nút 3D và List card)
    function togglePlaySFX(id) {
        const item = SFX_DATA.find(x => x.id === id);
        if (!item) return;

        // Nếu đang phát chính sound này -> dừng lại
        if (EditorState.currentPlayingSFXId === id && !EditorState.audioPlayer.paused) {
            stopAllAudio();
            return;
        }

        // Dừng âm thanh khác (bao gồm cả BGM cũ)
        stopAllAudio();
        if (window.stopSoundboardAudio) window.stopSoundboardAudio();

        EditorState.currentPlayingSFXId = id;
        const wrapper = document.getElementById(`sfx-wrapper-${id}`);
        const btn = document.getElementById(`sfx-btn-${id}`);
        const itemEl = document.getElementById(`sfx-item-${id}`);
        const listCard = document.getElementById(`sfx-list-card-${id}`);
        const listIcon = document.getElementById(`sfx-list-icon-${id}`);

        EditorState.audioPlayer.src = encodeURI(item.src);
        EditorState.audioPlayer.play().then(() => {
            if (wrapper) wrapper.classList.add('is-playing');
            if (btn) btn.classList.add('playing');
            if (itemEl) itemEl.classList.add('is-active-item');
            if (listCard) listCard.classList.add('is-playing');
            if (listIcon) listIcon.className = 'fa-solid fa-pause';
            showMiniNotify(`Đang phát: ${item.name} (${item.dur})`);
        }).catch(err => {
            console.error('Audio play error:', err);
            stopAllAudio();
        });

        EditorState.audioPlayer.onended = () => {
            stopAllAudio();
        };
    }

    // Phát âm thanh trên thẻ Text 3D
    function playEditorSound(src, name, btn) {
        if (EditorState.currentPlayingSoundBtn === btn && !EditorState.audioPlayer.paused) {
            stopAllAudio();
            return;
        }

        stopAllAudio();
        if (window.stopSoundboardAudio) window.stopSoundboardAudio();

        EditorState.currentPlayingSoundBtn = btn;
        EditorState.audioPlayer.src = encodeURI(src);
        EditorState.audioPlayer.play().then(() => {
            btn.classList.add('playing', '!bg-rose-500', '!text-white');
            btn.innerHTML = `<i class="fa-solid fa-stop"></i> <span>Dừng</span>`;
            showMiniNotify(`Đang phát: ${name}`);
        }).catch(err => {
            console.error('Audio play error:', err);
            stopAllAudio();
        });

        EditorState.audioPlayer.onended = () => {
            stopAllAudio();
        };
    }

    function showMiniNotify(text) {
        const existing = document.getElementById('editorMiniToast');
        if (existing) existing.remove();
        
        const toast = document.createElement('div');
        toast.id = 'editorMiniToast';
        toast.className = 'fixed bottom-20 right-6 z-50 bg-slate-900/95 border border-cyan-500/50 text-cyan-300 font-bold text-xs py-2 px-3.5 rounded-xl shadow-2xl flex items-center gap-2 backdrop-blur-md animate-bounce';
        toast.innerHTML = `<i class="fa-solid fa-volume-high text-cyan-400"></i> <span>${escapeHtml(text)}</span>`;
        document.body.appendChild(toast);
        setTimeout(() => { if (toast.parentNode) toast.remove(); }, 2000);
    }

    // ==========================================
    // PHÓNG TO / MỞ RỘNG TOÀN MÀN HÌNH (WIDESCREEN)
    // ==========================================
    function toggleEditorAppWidth() {
        const wrapper = document.getElementById('appCardWrapper');
        const icon = document.getElementById('iconExpandEditor');
        if (!wrapper) return;
        const isExpanded = wrapper.classList.contains('!max-w-5xl') || wrapper.classList.contains('max-w-5xl');
        if (isExpanded) {
            wrapper.classList.remove('!max-w-5xl', 'max-w-5xl');
            wrapper.classList.add('max-w-xl');
            if (icon) icon.className = 'fa-solid fa-up-right-and-down-left-from-center text-sm';
            showMiniNotify('Đã thu gọn khung nhìn');
        } else {
            wrapper.classList.remove('max-w-xl');
            wrapper.classList.add('!max-w-5xl', 'max-w-5xl');
            if (icon) icon.className = 'fa-solid fa-down-left-and-up-right-to-center text-sm';
            showMiniNotify('Đã mở rộng toàn màn hình (Ảnh siêu to HD)');
        }
    }

    // ==========================================
    // CHUYỂN ĐỔI 3 SUB-TABS CHÍNH
    // ==========================================
    function switchEditorTab(tab) {
        EditorState.activeTab = tab;
        stopAllAudio();
        if (window.stopSoundboardAudio) window.stopSoundboardAudio();

        // Cập nhật tab buttons
        document.querySelectorAll('.editor-main-tab').forEach(b => {
            b.classList.remove('active', 'bg-cyan-500', 'text-white', 'shadow-lg', 'shadow-cyan-500/25');
            b.classList.add('bg-slate-800', 'text-slate-300');
        });
        const activeBtn = document.getElementById(`tabBtn_${tab}`);
        if (activeBtn) {
            activeBtn.classList.add('active', 'bg-cyan-500', 'text-white', 'shadow-lg', 'shadow-cyan-500/25');
            activeBtn.classList.remove('bg-slate-800', 'text-slate-300');
        }

        // Ẩn/Hiện Sections
        const secText3D = document.getElementById('editorSubView_text3d');
        const secSFX = document.getElementById('editorSubView_sfx');
        const secBGM = document.getElementById('editorSubView_bgm');
        const bottomBar = document.getElementById('sbBottomStyleBar');
        const bgmSliderTrack = document.getElementById('sbBottomSliderTrack');
        const sfxSliderTrack = document.getElementById('sfxBottomSliderTrack');

        if (secText3D) secText3D.classList.toggle('hidden', tab !== 'text3d');
        if (secSFX) secSFX.classList.toggle('hidden', tab !== 'sfx');
        if (secBGM) secBGM.classList.toggle('hidden', tab !== 'bgm');

        // Điều khiển thanh Bottom Slider Bar:
        // Tab 1 (text3d): Ẩn hoàn toàn để không che ảnh to rõ
        // Tab 2 (sfx): Hiện thanh bottom slider với các Style của SFX
        // Tab 3 (bgm): Hiện thanh bottom slider với các Style của BGM
        if (bottomBar) {
            if (tab === 'text3d') {
                bottomBar.classList.add('hidden');
                bottomBar.style.display = 'none';
            } else if (tab === 'sfx') {
                bottomBar.classList.remove('hidden');
                bottomBar.style.display = '';
                if (sfxSliderTrack) sfxSliderTrack.classList.remove('hidden');
                if (bgmSliderTrack) bgmSliderTrack.classList.add('hidden');
            } else if (tab === 'bgm') {
                bottomBar.classList.remove('hidden');
                bottomBar.style.display = '';
                if (sfxSliderTrack) sfxSliderTrack.classList.add('hidden');
                if (bgmSliderTrack) bgmSliderTrack.classList.remove('hidden');
            }
        }

        if (tab === 'text3d') renderText3DGrid();
        if (tab === 'sfx') renderSFXGrid();
    }

    // ==========================================
    // PHẦN 1: RENDER TEXT 3D (ẢNH SIÊU TO RÕ NÉT - 1 CỘT MẶC ĐỊNH)
    // ==========================================
    function toggleText3dCols() {
        EditorState.textCols = (EditorState.textCols === 1) ? 2 : 1;
        const lbl = document.getElementById('txtColsLabel');
        if (lbl) lbl.textContent = (EditorState.textCols === 1) ? '1 Cột (Ảnh To Rõ)' : '2 Cột Gọn';
        renderText3DGrid();
    }

    function renderText3DGrid() {
        const container = document.getElementById('text3dGridContainer');
        if (!container) return;

        let filtered = TEXT3D_DATA.filter(item => {
            // Lọc theo Category chip nếu có
            if (EditorState.textCatFilter !== 'all' && item.cat !== EditorState.textCatFilter) {
                return false;
            }
            // Lọc theo từ khóa tìm kiếm
            const q = EditorState.textSearch.toLowerCase();
            if (!q) return true;
            return item.code.toLowerCase().includes(q) 
                || item.name.toLowerCase().includes(q) 
                || item.preset.toLowerCase().includes(q)
                || (item.styleFit && item.styleFit.toLowerCase().includes(q))
                || (item.editSection && item.editSection.toLowerCase().includes(q))
                || (item.editTiming && item.editTiming.toLowerCase().includes(q))
                || (item.group && item.group.toLowerCase().includes(q));
        });

        const badge = document.getElementById('text3dCountBadge');
        if (badge) badge.innerText = `${filtered.length} / ${TEXT3D_DATA.length} style`;

        // Chuyển đổi class lưới: 1 Cột (mặc định để ảnh to rõ) hoặc 2 Cột
        container.className = (EditorState.textCols === 1) 
            ? 'grid grid-cols-1 gap-5' 
            : 'grid grid-cols-1 sm:grid-cols-2 gap-4';

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="col-span-full py-12 text-center text-slate-400 bg-slate-900/60 rounded-3xl border border-slate-800 p-6">
                    <i class="fa-solid fa-magnifying-glass text-3xl mb-3 text-cyan-500/50"></i>
                    <p class="font-bold text-sm text-slate-200">Không tìm thấy style chữ 3D phù hợp</p>
                    <p class="text-xs text-slate-400 mt-1">Thử chọn chip "Tất cả" hoặc gõ từ khóa khác (vd: resort, hook, drama, biển, sốc...)</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(item => {
            const timingBadgeClass = getTimingBadgeClass(item.timingColor);
            const commandStr = `Chèn ${item.code} chữ '${item.sampleText}'`;

            return `
            <div class="bg-slate-900 border border-slate-800 hover:border-cyan-500/70 rounded-3xl p-4 sm:p-5 shadow-2xl transition-all duration-200" id="textCard_${item.id}">
                <!-- 1. HÌNH ẢNH SIÊU TO RÕ NÉT (16:9 FULL WIDTH, BẤM PHÓNG TO FULL HD) -->
                <div class="relative w-full aspect-[16/9] bg-black rounded-2xl overflow-hidden border border-slate-700/80 mb-3.5 group cursor-pointer shadow-inner" 
                     onclick="openTextLightbox('${item.imgSrc}', '${escapeJsString(item.name)}', '${escapeJsString(item.code)}')"
                     title="Bấm để phóng to xem Full HD">
                    <img src="${item.imgSrc}" alt="${item.name}" 
                         class="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                         onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'500\\' height=\\'280\\' fill=\\'%231e293b\\'><rect width=\\'100%\\' height=\\'100%\\'/><text x=\\'50%\\' y=\\'50%\\' fill=\\'%2364748b\\' text-anchor=\\'middle\\'>${item.name}</text></svg>'">
                    <div class="absolute bottom-2.5 right-2.5 px-3 py-1 rounded-xl bg-black/85 text-xs text-white/95 font-mono font-bold border border-white/20 backdrop-blur-md">
                        ${item.preset}
                    </div>
                    <div class="absolute top-2.5 left-2.5 px-3 py-1 rounded-xl bg-cyan-500/25 text-cyan-300 font-mono font-black text-xs sm:text-sm border border-cyan-500/40 backdrop-blur-md">
                        ${item.code}
                    </div>
                </div>

                <!-- 2. TÊN STYLE + BADGE VỊ TRÍ ĐOẠN EDIT -->
                <div class="flex items-start justify-between gap-3 mb-3">
                    <div>
                        <div class="flex items-center gap-2 mb-1">
                            <span class="text-xs font-mono font-black px-2 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">${item.code}</span>
                            <span class="text-xs font-mono font-bold text-slate-400">${item.preset}</span>
                        </div>
                        <h3 class="text-lg sm:text-xl font-black text-white leading-tight">${item.name}</h3>
                    </div>
                    <span class="px-3 py-1.5 rounded-xl text-xs font-black border shrink-0 ${timingBadgeClass} shadow-sm">
                        ${item.editTiming}
                    </span>
                </div>

                <!-- 3. HAI KHỐI NỔI BẬT: HỢP STYLE CLIP & PHỤC VỤ ĐOẠN NÀO CỦA EDIT -->
                <div class="space-y-2.5 mb-3.5">
                    <!-- KHỐI 1: HỢP STYLE CLIP -->
                    <div class="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-500/50 rounded-2xl p-3 sm:p-3.5 shadow-lg">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="w-6 h-6 rounded-lg bg-indigo-500/25 text-indigo-300 flex items-center justify-center text-xs shrink-0 border border-indigo-500/40 shadow-sm">
                                <i class="fa-solid fa-palette"></i>
                            </span>
                            <span class="text-[11px] font-black uppercase tracking-wider text-indigo-300">🎨 HỢP STYLE CLIP:</span>
                        </div>
                        <p class="text-xs sm:text-sm font-bold text-slate-100 pl-8 leading-snug">
                            ${item.styleFit}
                        </p>
                    </div>

                    <!-- KHỐI 2: PHỤC VỤ ĐOẠN NÀO CỦA EDIT -->
                    <div class="bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900 border border-amber-500/50 rounded-2xl p-3 sm:p-3.5 shadow-lg">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="w-6 h-6 rounded-lg bg-amber-500/25 text-amber-300 flex items-center justify-center text-xs shrink-0 border border-amber-500/40 shadow-sm">
                                <i class="fa-solid fa-film"></i>
                            </span>
                            <span class="text-[11px] font-black uppercase tracking-wider text-amber-300">🎬 PHỤC VỤ ĐOẠN EDIT:</span>
                        </div>
                        <p class="text-xs sm:text-sm font-bold text-amber-200 pl-8 leading-snug">
                            ${item.editSection}
                        </p>
                    </div>
                </div>

                <!-- 4. THAO TÁC NHANH: NÚT CHÉP LỆNH KỊCH BẢN & NÚT NGHE SOUND ĐI KÈM -->
                <div class="flex items-center gap-2 pt-2 border-t border-slate-800">
                    <button onclick="copyCommand('${escapeJsString(commandStr)}', this)" 
                            class="flex-1 py-2.5 px-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95"
                            title="Chép lệnh: ${commandStr}">
                        <i class="fa-solid fa-copy"></i>
                        <span>Chép Lệnh: ${item.code}</span>
                    </button>
                    <button onclick="playEditorSound('${item.soundSrc}', '${escapeJsString(item.soundName)}', this)" 
                            class="py-2.5 px-3.5 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer shrink-0" 
                            title="Nghe SFX đi kèm: ${item.soundName} (${item.soundDb})">
                        <i class="fa-solid fa-volume-high"></i>
                        <span>SFX (${item.soundDb})</span>
                    </button>
                </div>
            </div>
            `;
        }).join("");
    }

    // ==========================================
    // PHẦN 2: SOUND EFFECT (LỰA CHỌN STYLE CHUẨN NHẠC NỀN)
    // ==========================================
    const SFX_CAT_MAP = {
        'all': { icon: '🌐', name: 'Tất cả' },
        'FAVORITES': { icon: '❤️', name: 'Yêu Thích' },
        'whoosh': { icon: '💨', name: '01_whoosh (Chuyển Cảnh)' },
        'hit': { icon: '🎯', name: '02_hit (Điểm Nhấn)' },
        'click': { icon: '🖱️', name: '03_click (Hành Động)' },
        'riser': { icon: '📈', name: '04_riser (Kịch Tính)' },
        'meme': { icon: '🎭', name: '05_glitch (Biến Căng / Meme)' }
    };

    function filterSFXCategory(catKey, btn) {
        EditorState.sfxCatFilter = catKey;

        // Cập nhật tab active trên thanh trượt bottom slider
        document.querySelectorAll('.sfx-bottom-tab').forEach(t => {
            const isMatch = t.dataset.cat === catKey;
            t.classList.toggle('active', isMatch);
        });

        // Cập nhật tab active trên thanh chip ở trên
        document.querySelectorAll('.sfx-cat-chip').forEach(c => {
            const isMatch = c.dataset.cat === catKey;
            c.classList.toggle('active', isMatch);
            if (isMatch) {
                c.classList.add('bg-cyan-500', 'text-white', 'border-cyan-400', 'shadow-sm');
                c.classList.remove('bg-slate-800', 'text-slate-300', 'border-slate-700');
            } else {
                c.classList.remove('bg-cyan-500', 'text-white', 'border-cyan-400', 'shadow-sm');
                c.classList.add('bg-slate-800', 'text-slate-300', 'border-slate-700');
            }
        });

        // Cuộn tab đang chọn vào giữa
        const activeTab = document.querySelector(`.sfx-bottom-tab[data-cat="${catKey}"]`);
        if (activeTab) {
            activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }

        renderSFXGrid();
    }

    function setSfxViewMode(mode) {
        EditorState.sfxViewMode = mode;
        const btnGrid = document.getElementById('sfxBtnViewGrid');
        const btnList = document.getElementById('sfxBtnViewList');
        if (btnGrid) btnGrid.classList.toggle('active', mode === 'grid');
        if (btnList) btnList.classList.toggle('active', mode === 'list');
        renderSFXGrid();
    }

    function toggleSfxSearchPanel(forceOpen) {
        const panel = document.getElementById('sfxSearchPanel');
        const btn = document.getElementById('sfxBtnToggleSearch');
        const input = document.getElementById('sfxSearchInput');
        if (!panel) return;

        const willOpen = (typeof forceOpen === 'boolean') ? forceOpen : panel.classList.contains('hidden');
        if (willOpen) {
            panel.classList.remove('hidden');
            if (btn) btn.classList.add('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/50');
            if (input) setTimeout(() => input.focus(), 60);
        } else {
            panel.classList.add('hidden');
            if (btn && !EditorState.sfxSearch) btn.classList.remove('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/50');
        }
    }

    function clearSfxSearch() {
        const input = document.getElementById('sfxSearchInput');
        if (input) {
            input.value = '';
            input.focus();
        }
        handleSFXSearch('');
    }

    function handleSFXSearch(query) {
        EditorState.sfxSearch = (query || '').trim().toLowerCase();
        renderSFXGrid();
    }

    function renderSFXGrid() {
        const container = document.getElementById('sfxGridContainer');
        if (!container) return;

        let filtered = SFX_DATA.filter(item => {
            // Lọc theo Category hoặc Yêu Thích
            let matchCat = true;
            if (EditorState.sfxCatFilter === 'FAVORITES') {
                matchCat = EditorState.sfxFavorites.has(item.id);
            } else if (EditorState.sfxCatFilter !== 'all') {
                matchCat = (item.cat === EditorState.sfxCatFilter);
            }

            // Lọc theo từ khóa tìm kiếm (tên sound, file, folder, folderName, group, gain)
            const q = EditorState.sfxSearch;
            let matchSearch = true;
            if (q) {
                const searchStr = `${item.name} ${item.group} ${item.file} ${item.folder} ${item.folderName} ${item.catName} ${item.gain}`.toLowerCase();
                matchSearch = searchStr.includes(q);
            }

            return matchCat && matchSearch;
        });

        // Cập nhật Badge thể loại đang chọn (y hệt Nhạc Nền)
        const catInfo = SFX_CAT_MAP[EditorState.sfxCatFilter] || { icon: '🎵', name: EditorState.sfxCatFilter };
        const iconEl = document.getElementById('sfxActiveCatIcon');
        const nameEl = document.getElementById('sfxActiveCatName');
        const countEl = document.getElementById('sfxActiveCatCount');
        const resCountEl = document.getElementById('sfxFilterResultCount');
        if (iconEl) iconEl.textContent = EditorState.sfxSearch ? '🔍' : catInfo.icon;
        if (nameEl) nameEl.textContent = EditorState.sfxSearch ? `Tìm "${EditorState.sfxSearch}"` : catInfo.name;
        if (countEl) countEl.textContent = filtered.length;
        if (resCountEl) resCountEl.textContent = `${filtered.length} / ${SFX_DATA.length} sound`;

        if (filtered.length === 0) {
            container.className = 'w-full py-16 text-center text-gray-400';
            if (EditorState.sfxCatFilter === 'FAVORITES') {
                container.innerHTML = `
                    <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-2xl text-rose-500">
                        <i class="fa-solid fa-heart-crack"></i>
                    </div>
                    <p class="font-bold text-gray-300">Chưa có Sound Effect nào được thả tim</p>
                    <p class="text-xs text-gray-500 mt-1">Bấm biểu tượng <i class="fa-regular fa-heart text-rose-400"></i> trên bất kỳ sound nào để lưu vào danh sách yêu thích!</p>
                `;
            } else {
                container.innerHTML = `
                    <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-800/80 flex items-center justify-center text-2xl text-gray-500">
                        <i class="fa-solid fa-music-slash"></i>
                    </div>
                    <p class="font-bold text-gray-300">Không tìm thấy sound nào phù hợp</p>
                    <p class="text-xs text-gray-500 mt-1">Hãy thử tìm từ khoá khác hoặc chọn thư mục (01_whoosh, 02_hit, click...)</p>
                `;
            }
            return;
        }

        // ==========================================
        // CHẾ ĐỘ 1: BÀN PHÍM NÚT 3D (MYINSTANTS PAD)
        // ==========================================
        if (EditorState.sfxViewMode === 'grid') {
            container.className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 pt-2 pb-16';
            container.innerHTML = filtered.map(item => {
                const isPlaying = EditorState.currentPlayingSFXId === item.id;
                const isFav = EditorState.sfxFavorites.has(item.id);
                const colorClass = item.color || 'blue';

                return `
                <div class="sb-item ${isPlaying ? 'is-active-item' : ''}" id="sfx-item-${item.id}">
                    <!-- 3D PUSH BUTTON (MYINSTANTS STYLE) -->
                    <div class="sb-button-wrapper ${isPlaying ? 'is-playing' : ''}" 
                         id="sfx-wrapper-${item.id}"
                         onclick="togglePlaySFX(${item.id})"
                         title="Nhấp để nghe: ${item.name} (${item.dur})">
                        <button class="sb-btn ${colorClass} ${isPlaying ? 'playing' : ''}" 
                                id="sfx-btn-${item.id}">
                        </button>
                    </div>

                    <!-- TÊN SOUND EFFECT (Click mở modal truy vết vị trí & thư mục) -->
                    <div class="sb-title" 
                         onclick="openSfxLocationModal(event, ${item.id})"
                         title="${item.name} (${item.dur} • Thư mục: ${item.folder})">
                        ${item.name}
                    </div>

                    <!-- ACTION BUTTONS: [❤️ Thả tim] [📁 Truy vết thư mục] [📋 Sao chép tên file] -->
                    <div class="sb-actions">
                        <!-- THẢ TIM LƯU SOUND THÍCH -->
                        <button class="sb-act-btn sb-act-heart ${isFav ? 'favorited' : ''}" 
                                id="sfx-heart-${item.id}"
                                onclick="toggleSfxFavorite(event, ${item.id})"
                                title="${isFav ? 'Bỏ thích' : 'Thả tim để lưu vào Yêu Thích'}">
                            <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                        </button>

                        <!-- TRUY VẾT VỊ TRÍ THƯ MỤC TRÊN MÁY -->
                        <button class="sb-act-btn sb-act-link" 
                                onclick="openSfxLocationModal(event, ${item.id})"
                                title="Truy vết thư mục: ${item.folder}">
                            <i class="fa-solid fa-folder-open"></i>
                        </button>

                        <!-- SAO CHÉP TÊN FILE -->
                        <button class="sb-act-btn sb-act-share" 
                                onclick="copyFileName('${escapeJsString(item.file)}', this)"
                                title="Sao chép tên file: ${item.file}">
                            <i class="fa-solid fa-copy"></i>
                        </button>
                    </div>

                    <!-- THÔNG TIN GAIN & FOLDER VIẾT TẮT -->
                    <div class="flex items-center justify-center gap-1.5 mt-1.5">
                        <span class="text-[9.5px] font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20" title="Mức Gain khuyến nghị">
                            ${item.gain}
                        </span>
                        <span class="text-[9px] font-mono text-slate-400 truncate max-w-[85px]" title="Thư mục: ${item.folder}">
                            ${item.dur}
                        </span>
                    </div>
                </div>
                `;
            }).join("");
        } 
        // ==========================================
        // CHẾ ĐỘ 2: THẺ DANH SÁCH CHI TIẾT (LIST CARDS)
        // ==========================================
        else {
            container.className = 'grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2 pb-16';
            container.innerHTML = filtered.map(item => {
                const isPlaying = EditorState.currentPlayingSFXId === item.id;
                const isFav = EditorState.sfxFavorites.has(item.id);
                const colorClass = item.color || 'blue';

                return `
                <div class="sb-list-card ${isPlaying ? 'is-playing' : ''}" id="sfx-list-card-${item.id}">
                    <!-- Nút Play Tròn To -->
                    <div class="sb-button-wrapper !w-12 !h-12 !p-1.5 flex-shrink-0" onclick="togglePlaySFX(${item.id})">
                        <button class="sb-btn ${colorClass} ${isPlaying ? 'playing' : ''} flex items-center justify-center text-white text-xs">
                            <i id="sfx-list-icon-${item.id}" class="fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}"></i>
                        </button>
                    </div>

                    <!-- Thông tin Sound -->
                    <div class="flex-1 min-w-0 pr-2">
                        <div class="text-xs font-bold text-white truncate cursor-pointer hover:text-cyan-400" 
                             onclick="openSfxLocationModal(event, ${item.id})"
                             title="${item.name} - Bấm để xem vị trí file & thư mục">
                            ${item.name}
                        </div>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-[10px] font-semibold text-slate-400 truncate max-w-[130px]" title="Thư mục: ${item.folder}">
                                <i class="fa-solid fa-folder-open text-amber-400 text-[9px] mr-0.5"></i> ${item.folderName}
                            </span>
                            <span class="text-[9.5px] font-bold px-1.5 py-0.2 rounded-md bg-slate-800 text-cyan-400 border border-slate-700">
                                ${item.dur}
                            </span>
                            <span class="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30">
                                ${item.gain}
                            </span>
                        </div>
                    </div>

                    <!-- Nút Thao tác -->
                    <div class="flex items-center gap-1.5 flex-shrink-0">
                        <!-- Chép tên file -->
                        <button onclick="copyFileName('${escapeJsString(item.file)}', this)" 
                                class="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-cyan-400 flex items-center justify-center text-xs transition border border-slate-700 cursor-pointer" 
                                title="Sao chép tên file: ${item.file}">
                            <i class="fa-solid fa-copy text-[10px]"></i>
                        </button>

                        <!-- Thả tim -->
                        <button class="sb-act-btn sb-act-heart ${isFav ? 'favorited' : ''}" 
                                id="sfx-list-heart-${item.id}"
                                onclick="toggleSfxFavorite(event, ${item.id})"
                                title="${isFav ? 'Bỏ thích' : 'Thả tim'}">
                            <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                        </button>

                        <!-- Truy vết folder -->
                        <button class="sb-act-btn sb-act-link" 
                                onclick="openSfxLocationModal(event, ${item.id})"
                                title="Truy vết thư mục: ${item.folder}">
                            <i class="fa-solid fa-folder-open"></i>
                        </button>
                    </div>
                </div>
                `;
            }).join("");
        }
    }

    // ==========================================
    // HELPER FUNCTIONS & EVENTS
    // ==========================================
    function escapeHtml(str) {
        return (str || '').replace(/[&<>"']/g, function(m) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
        });
    }

    function escapeJsString(str) {
        return (str || '').replace(/'/g, "\\'").replace(/"/g, '\\"');
    }

    function updateSingleText(id, value) {
        EditorState.customTexts[id] = value;
        const item = TEXT3D_DATA.find(x => x.id === id);
        if (item) {
            const commandStr = `Chèn ${item.code} chữ '${value}'`;
            const card = document.getElementById(`textCard_${id}`);
            if (card) {
                const copyBtn = card.querySelector('button[onclick*="copyCommand"]');
                if (copyBtn) {
                    copyBtn.setAttribute('onclick', `copyCommand('${escapeJsString(commandStr)}', this)`);
                }
            }
        }
    }

    function copyCommand(text, btn) {
        navigator.clipboard.writeText(text).then(() => {
            const oldHTML = btn.innerHTML;
            btn.innerHTML = `<i class="fa-solid fa-check text-xs"></i> <span>Đã chép lệnh!</span>`;
            btn.classList.add('!bg-emerald-600');
            setTimeout(() => {
                btn.innerHTML = oldHTML;
                btn.classList.remove('!bg-emerald-600');
            }, 1200);
        });
    }

    function copyFileName(name, btn) {
        navigator.clipboard.writeText(name).then(() => {
            showMiniNotify(`Đã chép: ${name}`);
        });
    }

    function handleTextSearch(query) {
        EditorState.textSearch = query;
        renderText3DGrid();
    }

    // Modal xem ảnh Text 3D phóng to
    function openTextLightbox(src, name, code) {
        let modal = document.getElementById('text3dLightboxModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'text3dLightboxModal';
            modal.className = 'fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 cursor-pointer select-none';
            modal.onclick = () => modal.classList.add('hidden');
            modal.innerHTML = `
                <div class="relative max-w-4xl w-full flex flex-col items-center" onclick="event.stopPropagation()">
                    <div class="flex items-center justify-between w-full mb-3 text-white px-1">
                        <div class="flex items-center gap-2">
                            <span id="text3dModalTitle" class="text-base sm:text-lg font-black"></span>
                            <span id="text3dModalCode" class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"></span>
                        </div>
                        <button onclick="document.getElementById('text3dLightboxModal').classList.add('hidden')" class="w-9 h-9 rounded-xl bg-white/10 hover:bg-rose-600 text-white flex items-center justify-center transition cursor-pointer text-sm font-bold">✕</button>
                    </div>
                    <img id="text3dModalImg" src="" alt="Text 3D" class="w-full max-h-[82vh] object-contain rounded-2xl border border-slate-700 shadow-2xl bg-black/80">
                </div>
            `;
            document.body.appendChild(modal);
        }
        document.getElementById('text3dModalTitle').innerText = name;
        document.getElementById('text3dModalCode').innerText = code;
        document.getElementById('text3dModalImg').src = src;
        modal.classList.remove('hidden');
    }

    // Scroll bottom slider bar (hỗ trợ cả SFX và BGM track)
    const origScrollSbBottomSlider = window.scrollSbBottomSlider;
    window.scrollSbBottomSlider = function(offset) {
        const sfxTrack = document.getElementById('sfxBottomSliderTrack');
        const bgmTrack = document.getElementById('sbBottomSliderTrack');
        const activeTrack = (sfxTrack && !sfxTrack.classList.contains('hidden')) ? sfxTrack : bgmTrack;
        if (activeTrack) {
            activeTrack.scrollBy({ left: offset, behavior: 'smooth' });
        } else if (origScrollSbBottomSlider) {
            origScrollSbBottomSlider(offset);
        }
    };

    // Expose functions globally
    window.switchEditorTab = switchEditorTab;
    window.togglePlaySFX = togglePlaySFX;
    window.playEditorSound = playEditorSound;
    window.stopAllEditorAudio = stopAllAudio;
    window.stopEditorSound = stopAllAudio;
    window.updateSingleText = updateSingleText;
    window.copyCommand = copyCommand;
    window.copyFileName = copyFileName;
    window.handleTextSearch = handleTextSearch;
    window.toggleText3dCols = toggleText3dCols;
    window.toggleEditorAppWidth = toggleEditorAppWidth;
    window.openTextLightbox = openTextLightbox;
    window.filterSFXCategory = filterSFXCategory;
    window.setSfxViewMode = setSfxViewMode;
    window.toggleSfxSearchPanel = toggleSfxSearchPanel;
    window.clearSfxSearch = clearSfxSearch;
    window.handleSFXSearch = handleSFXSearch;
    window.filterText3DCategory = filterText3DCategory;
    window.renderText3DGrid = renderText3DGrid;
    window.renderSFXGrid = renderSFXGrid;
    window.toggleSfxFavorite = toggleSfxFavorite;
    window.openSfxLocationModal = openSfxLocationModal;
    window.loadSfxFavorites = loadSfxFavorites;

    // Wrap stopSoundboardAudio to also stop SFX
    const origStopSoundboardAudio = window.stopSoundboardAudio;
    window.stopSoundboardAudio = function() {
        stopAllAudio();
        if (origStopSoundboardAudio) origStopSoundboardAudio();
    };

    // Override updateSbBottomBarVisibility
    const origUpdateSbBottomBarVisibility = window.updateSbBottomBarVisibility;
    window.updateSbBottomBarVisibility = function(show) {
        const bottomBar = document.getElementById('sbBottomStyleBar');
        const sfxSliderTrack = document.getElementById('sfxBottomSliderTrack');
        const bgmSliderTrack = document.getElementById('sbBottomSliderTrack');

        if (bottomBar) {
            if (!show || EditorState.activeTab === 'text3d') {
                bottomBar.classList.add('hidden');
                bottomBar.style.display = 'none';
            } else {
                bottomBar.classList.remove('hidden');
                bottomBar.style.display = '';
                if (EditorState.activeTab === 'sfx') {
                    if (sfxSliderTrack) sfxSliderTrack.classList.remove('hidden');
                    if (bgmSliderTrack) bgmSliderTrack.classList.add('hidden');
                } else if (EditorState.activeTab === 'bgm') {
                    if (sfxSliderTrack) sfxSliderTrack.classList.add('hidden');
                    if (bgmSliderTrack) bgmSliderTrack.classList.remove('hidden');
                }
            }
        }
        if (origUpdateSbBottomBarVisibility) {
            origUpdateSbBottomBarVisibility(show && (EditorState.activeTab === 'bgm' || EditorState.activeTab === 'sfx'));
        }
    };

    // Init on load
    function initEditorResources() {
        loadSfxFavorites();
        updateSfxFavoriteBadges();
        renderText3DGrid();
        renderSFXGrid();
        switchEditorTab('text3d');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEditorResources);
    } else {
        initEditorResources();
    }
})();
