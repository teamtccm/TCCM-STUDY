# Tool Giải Bài & Viết Tay Vở Thật (Chuẩn Phong Cách NEU)

Hệ thống tài liệu, công cụ và bộ ảnh giải bài tập Quản Trị Nhân Lực / Kinh Tế theo phong cách chữ viết tay sinh viên trường Đại học Kinh tế Quốc dân (NEU).

---

## 📁 Cấu Trúc Thư Mục

- **`01_Bai_1_Trang_1.jpg`**: Bài 1 Trang 1 (Phân tích Quy mô & Lực lượng sản xuất trực tiếp - bản mờ camera thật).
- **`02_Bai_1_Trang_2.jpg`**: Bài 1 Trang 2 (Bộ máy quản lý gián tiếp, tỷ trọng & Phân tích cơ cấu).
- **`03_Bai_2_Trang_1.jpg`**: Bài 2 Trang 1 (Phân bổ phòng ban đã sửa số & Học vấn).
- **`04_Bai_2_Trang_2.jpg`**: Bài 2 Trang 2 (Phân tích chức năng, thừa thiếu biên chế & Chuẩn hóa Job-fit).
- **`05_Bai_3_Trang_1.jpg`**: Bài 3 Trang 1 (Phân tích Hiệu quả sử dụng lao động trong Doanh thu - sửa lỗi in sai đề bài).
- **`06_Bai_3_Trang_2.jpg`**: Bài 3 Trang 2 (5 Nhóm nguyên nhân & 5 Nhóm giải pháp nâng cao hiệu quả lao động).
- **`Ban_Goc_Net/`**: Chứa toàn bộ 6 ảnh bài giải phiên bản nét căng (HD gốc).
- **`Mau_Vo_Trang/`**: Chứa ảnh chụp vở kẻ ngang trắng gốc dùng để tổng hợp chữ viết.
- **`De_Bai_Goc/`**: Ảnh chụp đề bài gốc.
- **`lam_mo_anh.py`**: Script Python làm mờ chuẩn độ phân giải camera điện thoại (`cv2.GaussianBlur` $9\times 9, \sigma=2.5$).
- **`1_Mo_Thu_Muc_Anh.command`**: Bấm đúp để mở nhanh thư mục ảnh trên Mac.
- **`2_Chay_Lam_Mo_Tat_Ca_Anh.command`**: Bấm đúp để tự động làm mờ toàn bộ ảnh trong `Ban_Goc_Net/`.

---

## 🎯 Quy Tắc & Bí Kíp Giải Bài Viết Tay NEU

1. **Bám sát dòng kẻ vở (Line Binding)**:
   - Dòng chữ phải bám chuẩn vào đường kẻ in của vở thật.
   - Chân chữ (baseline) nằm trực tiếp trên vạch kẻ, phần đuôi rơi (g, y, p, q) thò nhẹ xuống dưới vạch.
   - Mỗi dòng kẻ in tương ứng 1 dòng chữ, không được lệch lơ lửng hay viết chéo qua nhiều dòng.

2. **Cách trình bày học thuật NEU**:
   - Đi thẳng vào tính toán, không chép lại đề.
   - Lời dẫn thật ngắn gọn, súc tích (1 câu dẫn).
   - Công thức + Phép tính + Kết quả gom chung 1 dòng để tiết kiệm diện tích.
   - Thêm cột so sánh tuyệt đối ($\Delta = \text{Thực tế} - \text{Kế hoạch}$) và tương đối ($\% = \frac{\Delta}{\text{Kế hoạch}} \times 100\%$).
   - Tập trung vào **phân tích bản chất kinh tế**, không nhận xét chung chung sáo rỗng.

3. **Kỹ thuật AI Synthesis**:
   - Chỉ truyền **1 ảnh duy nhất** (`ImagePaths: [blank_notebook.jpg]`). Tuyệt đối không truyền ảnh mẫu chữ vì AI sẽ tái tạo lại cả trang vở, làm sai màu giấy và lò xo.
   - Sau khi tạo ảnh, chạy script làm mờ Gaussian ($\sigma = 2.5$) để biến ảnh AI sắc nét phi thực tế thành ảnh chụp camera điện thoại học sinh thật 100%.
