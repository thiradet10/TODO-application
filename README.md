# 📝 Next.js Todo List Application

แอปพลิเคชันจัดการรายการงาน (Todo List) ที่สร้างด้วย **Next.js (App Router)**, **TypeScript** และ **Tailwind CSS** มาพร้อมระบบจัดเก็บข้อมูลบน `localStorage` และอินเทอร์เฟซที่ใช้งานง่าย ทันสมัย

---

## ✨ ฟีเจอร์หลัก (Features)

* ➕ **เพิ่มรายการงาน:** ระบุหัวข้องานพร้อมกำหนดเวลาส่ง (Due Date) ได้
* 💾 **บันทึกข้อมูลอัตโนมัติ:** บันทึกข้อมูลลงใน `localStorage` ข้อมูลไม่หายเมื่อรีเฟรชหน้าเว็บ
* ✅ **จัดการสถานะ:** สลับสถานะระหว่าง "ทำแล้ว" และ "ยังไม่ได้ทำ" (พร้อมเอฟเฟกต์ ขีดฆ่า/สีจาง)
* 🏷️ **จัดหมวดหมู่ (Filtering):** กรองดูรายการตามหมวดหมู่ได้:
  * ทั้งหมด (All)
  * ยังไม่ได้ทำ (Pending)
  * ทำแล้ว (Completed)
* ✏️ **แก้ไขและลบ:** แก้ไขชื่อ/วันกำหนดส่ง หรือลบรายการที่ไม่ต้องการได้ทันที
* 📱 **Responsive Design:** แสดงผลสวยงามทั้งบนมือถือ แท็บเล็ต และคอมพิวเตอร์

---

## 👨‍💻 ผู้จัดทำ (Developer)
ชื่อ-นามสกุล: นาย ธีรเดช ประสารสุข

รหัสนักศึกษา: 673450195-4

Email: thiradet.pr@kkumail.com

---
## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
├── app/
│   ├── _components/
│   │   └── todoitem.tsx    # Component แสดงผล/จัดการแต่ละรายการ Todo
│   ├── globals.css         # Custom CSS Classes & Tailwind Configuration
│   ├── layout.tsx          # Root Layout
│   └── page.tsx            # หน้าหลักและ Logic การจัดการ State / LocalStorage
├── types/
│   └── iTodo.ts            # TypeScript Interface สำหรับโครงสร้างข้อมูล Todo
├── package.json
└── README.md
