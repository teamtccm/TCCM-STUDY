/**
 * NEU Handwritten Notes & Solutions Viewer
 * Quản lý hiển thị bài giải viết tay phong cách sinh viên NEU
 */

const NEU_PAGES = [
    {
        id: "bai1_trang1",
        bai: 1,
        trang: 1,
        title: "Bài 1 - Trang 1: Quy mô & Lực lượng Sản xuất Trực tiếp",
        badge: "Bài 1 • Trang 1/2",
        blurredSrc: "images/bai_giai_neu/01_Bai_1_Trang_1.jpg",
        sharpSrc: "images/bai_giai_neu/Ban_Goc_Net/01_Bai_1_Trang_1.jpg",
        tag: "Quy mô lao động",
        description: "Bổ sung cột so sánh tuyệt đối & tương đối; sửa 'Công nghiệp' thành 'Công nhân (SXTT)' và 'Nhân viên gián tiếp' thành 'Nhân viên trực tiếp'.",
        academicHighlights: [
            { label: "Tổng lao động", value: "KH: 1.150 ng ➔ TT: 1.250 ng (Δ: +100 ng, +8,70%)" },
            { label: "Công nhân SXTT", value: "KH: 900 ng (78,26%) ➔ TT: 980 ng (78,40%) | Δ: +80 ng (+8,89%, +0,14% tỷ trọng)" },
            { label: "NV trực tiếp khác", value: "KH: 50 ng (4,35%) ➔ TT: 55 ng (4,40%) | Δ: +5 ng (+10,00%, +0,05% tỷ trọng)" },
            { label: "Đặc điểm trình bày", value: "Lời dẫn súc tích, bám sát từng vạch kẻ ngang của vở thật, mực bút bi xanh tím tự nhiên." }
        ]
    },
    {
        id: "bai1_trang2",
        bai: 1,
        trang: 2,
        title: "Bài 1 - Trang 2: Bộ máy Quản lý Gián tiếp & Phân tích Cơ cấu",
        badge: "Bài 1 • Trang 2/2",
        blurredSrc: "images/bai_giai_neu/02_Bai_1_Trang_2.jpg",
        sharpSrc: "images/bai_giai_neu/Ban_Goc_Net/02_Bai_1_Trang_2.jpg",
        tag: "Bộ máy gián tiếp",
        description: "Tính toán cán bộ lãnh đạo, nhân viên chuyên môn, phục vụ và phân tích sâu cơ cấu chuyển dịch lao động theo chuẩn học thuật NEU.",
        academicHighlights: [
            { label: "Cán bộ lãnh đạo", value: "KH: 40 ng (3,48%) ➔ TT: 42 ng (3,36%) | Δ: +2 ng (+5,00%, giảm -0,12% tỷ trọng)" },
            { label: "NV Chuyên môn NV", value: "KH: 130 ng (11,30%) ➔ TT: 141 ng (11,28%) | Δ: +11 ng (+8,46%, -0,02% tỷ trọng)" },
            { label: "Nhân viên phục vụ", value: "KH: 30 ng (2,61%) ➔ TT: 32 ng (2,56%) | Δ: +2 ng (+6,67%, -0,05% tỷ trọng)" },
            { label: "Phân tích bản chất", value: "Tỷ trọng trực tiếp tăng từ 82,61% lên 82,80%. Bộ máy gián tiếp tinh gọn, tăng chậm hơn tốc độ mở rộng sản xuất." }
        ]
    },
    {
        id: "bai2_trang1",
        bai: 2,
        trang: 1,
        title: "Bài 2 - Trang 1: Cơ cấu Trình độ & Phân bổ Phòng ban (Đã sửa số)",
        badge: "Bài 2 • Trang 1/2",
        blurredSrc: "images/bai_giai_neu/03_Bai_2_Trang_1.jpg",
        sharpSrc: "images/bai_giai_neu/Ban_Goc_Net/03_Bai_2_Trang_1.jpg",
        tag: "Trình độ học vấn",
        description: "Bảng số liệu phân bổ phòng ban chuẩn đã sửa khớp tổng 38 nhân sự (Ban GĐ: 3, TCHC: 8, KHĐT: 6, TCKT: 7, KTKCS: 6, P.KD: 8).",
        academicHighlights: [
            { label: "Tổng nhân sự", value: "38 người (100%)" },
            { label: "Trên Đại học", value: "3 người (7,89%)" },
            { label: "Đại học", value: "15 người (39,47%)" },
            { label: "Cao đẳng / Trung cấp", value: "12 người (31,58%)" },
            { label: "Lao động phổ thông", value: "8 người (21,05%)" }
        ]
    },
    {
        id: "bai2_trang2",
        bai: 2,
        trang: 2,
        title: "Bài 2 - Trang 2: Phân tích Chức năng Phòng ban & Đề xuất Job-fit",
        badge: "Bài 2 • Trang 2/2",
        blurredSrc: "images/bai_giai_neu/04_Bai_2_Trang_2.jpg",
        sharpSrc: "images/bai_giai_neu/Ban_Goc_Net/04_Bai_2_Trang_2.jpg",
        tag: "Tối ưu định biên",
        description: "Phân tích chuyên sâu mức độ tương thích giữa bằng cấp và vị trí công tác; chỉ rõ điểm bất hợp lý và giải pháp điều chuyển, đào tạo.",
        academicHighlights: [
            { label: "Đánh giá Job-fit", value: "Ban GĐ & KHĐT đạt chuẩn cao; TCHC và PKD còn tồn đọng lao động phổ thông chưa phù hợp tính chất nghiệp vụ." },
            { label: "Khuyến nghị NEU", value: "Quy hoạch lại vị trí việc làm, tinh giảm hoặc điều chuyển lao động phổ thông, đào tạo chuẩn hóa chứng chỉ nghề." }
        ]
    },
    {
        id: "bai3_trang1",
        bai: 3,
        trang: 1,
        title: "Bài 3 - Trang 1: Phân tích Hiệu quả Sử dụng Lao động trong Doanh thu",
        badge: "Bài 3 • Trang 1/2",
        blurredSrc: "images/bai_giai_neu/05_Bai_3_Trang_1.jpg",
        sharpSrc: "images/bai_giai_neu/Ban_Goc_Net/05_Bai_3_Trang_1.jpg",
        tag: "Hiệu quả lao động",
        description: "Hoàn thiện bảng phân tích đã sửa lỗi in sai của đề bài (sách in nhầm 49.00 thành 49.000 trđ, chênh lệch -10.000 thành -1.000 trđ); phân tích mức độ ảnh hưởng của quy mô L và hiệu quả H.",
        academicHighlights: [
            { label: "Tổng doanh thu (ΣDT)", value: "Gốc: 50.000 trđ ➔ NC: 49.000 trđ (Δ: -1.000 trđ, đạt 98%, -2%)" },
            { label: "Tổng lao động (L)", value: "Gốc: 80 ng ➔ NC: 80 ng (ΔL = 0 ng, 100%) | Ảnh hưởng tới DT: 0 trđ" },
            { label: "Hiệu quả sử dụng LĐ (H)", value: "Gốc: 625 trđ/ng ➔ NC: 612,5 trđ/ng (ΔH = -12,5 trđ/ng, 98%) | Ảnh hưởng tới DT: -1.000 trđ (-2%)" },
            { label: "Đánh giá bản chất", value: "Doanh thu giảm 100% do năng suất lao động thụt lùi (chiều sâu giảm), lãng phí thời gian hữu ích." }
        ]
    },
    {
        id: "bai3_trang2",
        bai: 3,
        trang: 2,
        title: "Bài 3 - Trang 2: 5 Nguyên nhân & 5 Giải pháp Nâng cao Hiệu quả LĐ",
        badge: "Bài 3 • Trang 2/2",
        blurredSrc: "images/bai_giai_neu/06_Bai_3_Trang_2.jpg",
        sharpSrc: "images/bai_giai_neu/Ban_Goc_Net/06_Bai_3_Trang_2.jpg",
        tag: "Nguyên nhân & Giải pháp",
        description: "Hệ thống hóa 5 nhóm nguyên nhân cốt lõi (Trình độ, Quy trình, Lương thưởng, Công nghệ, Thị trường) và 5 nhóm giải pháp đồng bộ chuẩn NEU.",
        academicHighlights: [
            { label: "5 Nguyên nhân chính", value: "Thiếu đào tạo kỹ năng; lãng phí thời gian chết; lương thưởng cào bằng; công nghệ gián đoạn; sức mua sụt giảm." },
            { label: "5 Giải pháp khắc phục", value: "Bồi dưỡng chuyên môn kỹ năng số; tối ưu workflow định mức; áp dụng lương 3P gắn KPI; nâng cấp hệ thống phần mềm; đẩy mạnh marketing mở rộng thị trường." }
        ]
    }
];

let neuCurrentTab = "all"; // 'all', 'bai1', 'bai2', 'bai3'
let neuCurrentMode = "blurred"; // 'blurred' (chụp camera), 'sharp' (nét HD)
let neuActiveLightboxIndex = 0;

function initNeuHandwritten() {
    renderNeuHandwritten();
}

function setNeuTab(tab) {
    neuCurrentTab = tab;
    // Cập nhật style nút tab
    const tabs = ["all", "bai1", "bai2", "bai3"];
    tabs.forEach(t => {
        const btn = document.getElementById(`neuTabBtn_${t}`);
        if (btn) {
            if (t === tab) {
                btn.className = "px-4 py-2 rounded-xl font-black text-xs transition bg-indigo-600 text-white shadow-md shadow-indigo-300";
            } else {
                btn.className = "px-4 py-2 rounded-xl font-bold text-xs transition bg-gray-100 hover:bg-gray-200 text-gray-700";
            }
        }
    });
    renderNeuHandwritten();
}

function setNeuMode(mode) {
    neuCurrentMode = mode;
    const btnBlurred = document.getElementById("neuModeBtn_blurred");
    const btnSharp = document.getElementById("neuModeBtn_sharp");
    
    if (btnBlurred && btnSharp) {
        if (mode === "blurred") {
            btnBlurred.className = "px-3 py-1.5 rounded-lg text-xs font-black bg-white text-indigo-700 shadow-sm";
            btnSharp.className = "px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 hover:text-gray-900";
        } else {
            btnSharp.className = "px-3 py-1.5 rounded-lg text-xs font-black bg-white text-indigo-700 shadow-sm";
            btnBlurred.className = "px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 hover:text-gray-900";
        }
    }
    renderNeuHandwritten();
}

function renderNeuHandwritten() {
    const container = document.getElementById("neuCardsContainer");
    if (!container) return;

    let filtered = NEU_PAGES;
    if (neuCurrentTab === "bai1") {
        filtered = NEU_PAGES.filter(p => p.bai === 1);
    } else if (neuCurrentTab === "bai2") {
        filtered = NEU_PAGES.filter(p => p.bai === 2);
    } else if (neuCurrentTab === "bai3") {
        filtered = NEU_PAGES.filter(p => p.bai === 3);
    }

    let html = "";
    filtered.forEach((page, idx) => {
        const imgSrc = neuCurrentMode === "blurred" ? page.blurredSrc : page.sharpSrc;
        const modeBadge = neuCurrentMode === "blurred" 
            ? `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-100 text-amber-800 border border-amber-300"><i class="fa-solid fa-camera"></i> Mờ camera thật</span>`
            : `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300"><i class="fa-solid fa-sparkles"></i> Bản gốc nét HD</span>`;

        const globalIndex = NEU_PAGES.findIndex(p => p.id === page.id);

        html += `
        <div class="bg-white rounded-3xl p-5 shadow-xl border border-gray-100 flex flex-col lg:flex-row gap-6 transition hover:shadow-2xl">
            <!-- Vùng hiển thị ảnh vở thật -->
            <div class="lg:w-1/2 flex flex-col items-center">
                <div class="relative group w-full bg-slate-900 rounded-2xl overflow-hidden shadow-inner cursor-pointer" onclick="openNeuLightbox(${globalIndex})">
                    <img src="${imgSrc}" alt="${page.title}" class="w-full h-auto max-h-[560px] object-contain mx-auto transition-transform duration-300 group-hover:scale-[1.02]">
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                        <span class="px-4 py-2 rounded-xl bg-white text-gray-950 font-black text-xs shadow-lg flex items-center gap-2">
                            <i class="fa-solid fa-magnifying-glass-plus"></i> Nhấp để phóng to
                        </span>
                    </div>
                    <div class="absolute top-3 left-3">
                        <span class="px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white font-mono font-bold text-xs border border-white/20">
                            ${page.badge}
                        </span>
                    </div>
                </div>

                <!-- Thanh công cụ nhanh bên dưới ảnh -->
                <div class="w-full flex items-center justify-between gap-2 mt-3 pt-2 border-t border-gray-100">
                    <div class="text-[11px] text-gray-400 font-bold">
                        <i class="fa-solid fa-file-image mr-1"></i> ${imgSrc.split('/').pop()}
                    </div>
                    <div class="flex items-center gap-2">
                        <button onclick="openNeuLightbox(${globalIndex})" class="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold flex items-center gap-1.5 transition">
                            <i class="fa-solid fa-expand text-[10px]"></i> Xem đầy đủ
                        </button>
                        <a href="${imgSrc}" download="${imgSrc.split('/').pop()}" class="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center gap-1.5 transition">
                            <i class="fa-solid fa-download text-[10px]"></i> Tải về
                        </a>
                    </div>
                </div>
            </div>

            <!-- Vùng giải thích học thuật NEU & số liệu phân tích -->
            <div class="lg:w-1/2 flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between gap-2 mb-2 flex-wrap">
                        <span class="px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                            <i class="fa-solid fa-graduation-cap mr-1"></i> ${page.tag}
                        </span>
                        ${modeBadge}
                    </div>

                    <h3 class="text-xl font-black text-gray-900 leading-snug mb-2">${page.title}</h3>
                    <p class="text-xs text-gray-600 mb-4 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-200">
                        <i class="fa-solid fa-circle-info text-indigo-500 mr-1"></i> <b>Nội dung đã sửa:</b> ${page.description}
                    </p>

                    <!-- Danh sách số liệu học thuật -->
                    <div class="space-y-2 mb-4">
                        ${page.academicHighlights.map(h => `
                            <div class="p-2.5 rounded-xl bg-gray-50 border border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                                <span class="font-bold text-gray-700 flex items-center gap-1.5">
                                    <i class="fa-solid fa-check text-emerald-600 text-[10px]"></i> ${h.label}:
                                </span>
                                <span class="font-mono font-black text-indigo-900 text-right sm:text-left">${h.value}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>

                <!-- Footer của card: Quy tắc NEU Style -->
                <div class="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-[11px] text-amber-900">
                    <div class="font-black flex items-center gap-1.5 mb-1 text-amber-950">
                        <i class="fa-solid fa-pen-nib"></i> Đặc thù kỹ thuật NEU:
                    </div>
                    <div>Chân chữ nằm trực tiếp trên vạch kẻ ngang của vở thật, mực xanh tím lực ấn không đều, làm mờ quang học Gaussian $\\sigma=2.5$ tái hiện chính xác góc chụp camera điện thoại sinh viên.</div>
                </div>
            </div>
        </div>
        `;
    });

    container.innerHTML = html;
}

// Lightbox Modal
function openNeuLightbox(index) {
    neuActiveLightboxIndex = index;
    const modal = document.getElementById("neuLightboxModal");
    if (!modal) return;
    updateNeuLightboxContent();
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function closeNeuLightbox() {
    const modal = document.getElementById("neuLightboxModal");
    if (!modal) return;
    modal.classList.add("hidden");
    document.body.style.overflow = "";
}

function prevNeuLightbox() {
    if (neuActiveLightboxIndex > 0) {
        neuActiveLightboxIndex--;
    } else {
        neuActiveLightboxIndex = NEU_PAGES.length - 1;
    }
    updateNeuLightboxContent();
}

function nextNeuLightbox() {
    if (neuActiveLightboxIndex < NEU_PAGES.length - 1) {
        neuActiveLightboxIndex++;
    } else {
        neuActiveLightboxIndex = 0;
    }
    updateNeuLightboxContent();
}

function toggleNeuLightboxMode() {
    neuCurrentMode = neuCurrentMode === "blurred" ? "sharp" : "blurred";
    setNeuMode(neuCurrentMode);
    updateNeuLightboxContent();
}

function updateNeuLightboxContent() {
    const page = NEU_PAGES[neuActiveLightboxIndex];
    if (!page) return;

    const imgSrc = neuCurrentMode === "blurred" ? page.blurredSrc : page.sharpSrc;
    const imgElem = document.getElementById("neuLightboxImg");
    const titleElem = document.getElementById("neuLightboxTitle");
    const subElem = document.getElementById("neuLightboxSubtitle");
    const countElem = document.getElementById("neuLightboxCounter");
    const downloadElem = document.getElementById("neuLightboxDownloadBtn");
    const modeBadgeElem = document.getElementById("neuLightboxModeBadge");

    if (imgElem) imgElem.src = imgSrc;
    if (titleElem) titleElem.innerText = page.title;
    if (subElem) subElem.innerText = page.description;
    if (countElem) countElem.innerText = `Trang ${neuActiveLightboxIndex + 1} / ${NEU_PAGES.length}`;
    if (downloadElem) {
        downloadElem.href = imgSrc;
        downloadElem.setAttribute("download", imgSrc.split('/').pop());
    }
    if (modeBadgeElem) {
        modeBadgeElem.innerHTML = neuCurrentMode === "blurred" 
            ? `<i class="fa-solid fa-camera mr-1"></i> Mờ Camera` 
            : `<i class="fa-solid fa-sparkles mr-1"></i> Nét Gốc HD`;
    }
}

// Bắt phím ESC và phím mũi tên để chuyển trang trong Lightbox
document.addEventListener("keydown", function(e) {
    const modal = document.getElementById("neuLightboxModal");
    if (!modal || modal.classList.contains("hidden")) return;

    if (e.key === "Escape") {
        closeNeuLightbox();
    } else if (e.key === "ArrowLeft") {
        prevNeuLightbox();
    } else if (e.key === "ArrowRight") {
        nextNeuLightbox();
    }
});

// Tự động khởi tạo khi DOM tải xong
document.addEventListener("DOMContentLoaded", () => {
    initNeuHandwritten();
});
