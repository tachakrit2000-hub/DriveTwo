# DriveTwo (Next.js Starter)

สตาร์ทเตอร์เว็บข่าว/รีวิวรถ สไตล์ Carwow ด้วย Next.js 14 + Tailwind

## วิธีเริ่มต้น (นักพัฒนา)
```bash
npm install
npm run dev
```

## Deploy บน Vercel (แนะนำ)
1. สร้าง GitHub repo แล้วอัปโหลดโปรเจกต์นี้
2. ไปที่ https://vercel.com > New Project > Import จาก GitHub
3. เลือก Framework = Next.js (Vercel จะจับอัตโนมัติ) แล้วกด Deploy
4. เพิ่มโดเมนของคุณใน Project > Settings > Domains และตั้งค่า DNS

## โครงสร้างเทมเพลต
- หน้าเดียว (app/page.tsx) รวมส่วน: ข่าว, รีวิว, EV, ติดต่อเรา
- ใช้ภาพตัวอย่างจาก Unsplash (แก้ไขตามต้องการ)
