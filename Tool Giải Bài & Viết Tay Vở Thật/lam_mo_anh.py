#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Tool Làm Mờ Nhẹ Ảnh Chữ Viết Tay Giống Camera Thật (NEU Style)
Công thức: cv2.GaussianBlur(img, (ksize, ksize), sigma)
Chuẩn độ mờ camera điện thoại: ksize=9, sigma=2.5
"""

import os
import sys
import cv2

def blur_image(input_path, output_path, ksize=9, sigma=2.5):
    if not os.path.exists(input_path):
        print(f"❌ Không tìm thấy file: {input_path}")
        return False
    
    img = cv2.imread(input_path)
    if img is None:
        print(f"❌ Không thể đọc ảnh: {input_path}")
        return False
    
    # Đảm bảo ksize là số lẻ
    if ksize % 2 == 0:
        ksize += 1
        
    blurred = cv2.GaussianBlur(img, (ksize, ksize), sigma)
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    cv2.imwrite(output_path, blurred, [cv2.IMWRITE_JPEG_QUALITY, 95])
    print(f"✅ Đã làm mờ ({ksize}x{ksize}, sigma={sigma}): {output_path}")
    return True

def process_all_sharp_images(base_dir=None):
    if base_dir is None:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        
    sharp_dir = os.path.join(base_dir, "Ban_Goc_Net")
    if not os.path.exists(sharp_dir):
        print(f"❌ Thư mục {sharp_dir} không tồn tại!")
        return
        
    files = sorted([f for f in os.listdir(sharp_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))])
    if not files:
        print(f"⚠️ Không có file ảnh nào trong {sharp_dir}")
        return
        
    for fname in files:
        inp = os.path.join(sharp_dir, fname)
        outp = os.path.join(base_dir, fname)
        blur_image(inp, outp, ksize=9, sigma=2.5)

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    if len(sys.argv) > 1:
        # Nếu truyền file cụ thể
        target = sys.argv[1]
        out = sys.argv[2] if len(sys.argv) > 2 else f"blurred_{os.path.basename(target)}"
        sig = float(sys.argv[3]) if len(sys.argv) > 3 else 2.5
        blur_image(target, out, 9, sig)
    else:
        # Tự động quét và làm mờ tất cả trong Ban_Goc_Net
        print("🚀 Đang làm mờ tất cả ảnh từ Ban_Goc_Net/ ra thư mục chính...")
        process_all_sharp_images(current_dir)
        print("🎉 Hoàn tất!")
