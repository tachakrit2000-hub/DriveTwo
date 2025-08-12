'use client';

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Car, Zap, Newspaper, Star, Mail, SlidersHorizontal } from "lucide-react";

type Review = {
  id: number; brand: string; model: string; price: number; zeroTo100: number; range: number | null; type: "ICE" | "Hybrid" | "EV"; 
  pros: string[]; cons: string[]; image: string;
};

const NEWS = [
  { id: 1, title: "เปิดตัว Toyota Camry ใหม่ในไทย", date: "2025-08-05", image: "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1200&auto=format&fit=crop", tag: "ข่าวรถยนต์" },
  { id: 2, title: "รีวิว BYD Seal Performance ระยะทางไกล คุ้มไหม", date: "2025-08-02", image: "https://images.unsplash.com/photo-1549921296-3ecfbcab7db1?q=80&w=1200&auto=format&fit=crop", tag: "รีวิว" },
  { id: 3, title: "ราคา Tesla Model 3 ปรับลงอีกในไตรมาส 3", date: "2025-07-28", image: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=1200&auto=format&fit=crop", tag: "ไฟฟ้า" },
];

const REVIEWS: Review[] = [
  { id: 1, brand: "Toyota", model: "Yaris ATIV", price: 549000, zeroTo100: 12.5, range: null, type: "ICE", pros: ["ประหยัดน้ำมัน","ศูนย์บริการเยอะ","อะไหล่ถูก"], cons: ["อัตราเร่งกลางๆ","วัสดุบางจุดธรรมดา","เสียงลมบ้าง"], image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200&auto=format&fit=crop" },
  { id: 2, brand: "BYD", model: "Atto 3", price: 1099000, zeroTo100: 7.3, range: 420, type: "EV", pros: ["ออปชั่นแน่น","วิ่งเงียบ","ค่าซ่อมต่ำ"], cons: ["ช่วงล่างนิ่ม","ศูนย์บริการกำลังขยาย","ราคาขายต่อยังนิ่ง"], image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1200&auto=format&fit=crop" },
  { id: 3, brand: "Honda", model: "Civic e:HEV", price: 1249000, zeroTo100: 7.8, range: null, type: "Hybrid", pros: ["แรงบิดทันใจ","อัตราสิ้นเปลืองดี","ขับสนุก"], cons: ["ราคาสูง","รอรถบ้าง","ยางติดรถกลางๆ"], image: "https://images.unsplash.com/photo-1549921296-3ecfbcab7db1?q=80&w=1200&auto=format&fit=crop" },
  { id: 4, brand: "Tesla", model: "Model 3 RWD", price: 1399000, zeroTo100: 6.1, range: 513, type: "EV", pros: ["ซอฟต์แวร์ดี","เร่งแรง","ชาร์จเร็วง่าย"], cons: ["ช่วงล่างแข็ง","บริการหลังการขายวิจารณ์ได้","ประกอบบางจุด"], image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1200&auto=format&fit=crop" },
];

const EV_CATEGORIES = [
  { key: "cheap", label: "ถูกที่สุด" },
  { key: "china", label: "จีน" },
  { key: "europe", label: "ยุโรป" },
  { key: "sport", label: "สปอร์ต" },
  { key: "longrange", label: "ระยะทางไกลที่สุด" },
  { key: "new", label: "ใหม่ล่าสุด" },
];

function classNames(...xs: (string | false | null | undefined)[]) { return xs.filter(Boolean).join(" "); }

function Section({ children, className }: { children: React.ReactNode, className?: string }) {
  return <section className={classNames("max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", className)}>{children}</section>;
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl shadow-sm border border-gray-200 overflow-hidden bg-white">{children}</div>;
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium">{children}</span>;
}

export default function Page() {
  const [q, setQ] = useState("");
  const [typeFilter, setTypeFilter] = useState<"All" | "ICE" | "Hybrid" | "EV">("All");
  const [sortKey, setSortKey] = useState("new");

  const filtered = useMemo(() => {
    const byQ = REVIEWS.filter(r => `${r.brand} ${r.model}`.toLowerCase().includes(q.toLowerCase()));
    const byType = typeFilter === "All" ? byQ : byQ.filter(r => r.type === typeFilter);
    const sorted = [...byType].sort((a,b) => {
      if (sortKey === "new") return b.id - a.id;
      if (sortKey === "priceAsc") return a.price - b.price;
      if (sortKey === "priceDesc") return b.price - a.price;
      if (sortKey === "speed") return a.zeroTo100 - b.zeroTo100;
      if (sortKey === "range") return (b.range ?? -1) - (a.range ?? -1);
      return 0;
    });
    return sorted;
  }, [q, typeFilter, sortKey]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
        <Section className="py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Car className="w-6 h-6" />
            <span className="font-bold text-lg">DriveTwo</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#home" className="hover:opacity-70">หน้าแรก</a>
            <a href="#news" className="hover:opacity-70">ข่าวรถยนต์</a>
            <a href="#reviews" className="hover:opacity-70">รีวิวรถยนต์</a>
            <a href="#ev" className="hover:opacity-70">รถไฟฟ้า</a>
            <a href="#contact" className="hover:opacity-70">ติดต่อเรา</a>
          </nav>
        </Section>
      </header>

      <Section className="pt-10 pb-6" id="home">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <div>
            <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}} className="text-3xl md:text-5xl font-extrabold tracking-tight">
              ข่าวรถยนต์ & รีวิวแบบอ่านง่าย
            </motion.h1>
            <p className="mt-4 text-gray-600 leading-relaxed">
              สร้างด้วย Next.js + Tailwind — พร้อมตัวอย่าง <b>ข่าว</b>, <b>รีวิว</b>, และหมวด <b>รถไฟฟ้า</b> พร้อมค้นหา/กรองเบื้องต้น
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center gap-2 border rounded-2xl px-3 py-2 bg-white shadow-sm w-full md:w-2/3">
                <Search className="w-4 h-4" />
                <input value={q} onChange={e=>setQ(e.target.value)} placeholder="ค้นหายี่ห้อ/รุ่น (เช่น Tesla, Yaris)" className="w-full outline-none text-sm bg-transparent" />
              </div>
              <button onClick={()=>{ setQ(''); setTypeFilter('All'); setSortKey('new'); }} className="text-sm px-4 py-2 rounded-xl border hover:bg-gray-50">ล้างตัวกรอง</button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              {(["All","ICE","Hybrid","EV"] as const).map(t => (
                <button key={t} onClick={()=>setTypeFilter(t)} className={classNames("px-3 py-1 rounded-full border", typeFilter===t && "bg-gray-900 text-white")}>{t}</button>
              ))}
              <div className="ml-auto flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                <select value={sortKey} onChange={e=>setSortKey(e.target.value)} className="px-3 py-1 rounded-full border bg-white">
                  <option value="new">ใหม่ล่าสุด</option>
                  <option value="priceAsc">ราคาต่ำ→สูง</option>
                  <option value="priceDesc">ราคาสูง→ต่ำ</option>
                  <option value="speed">0–100 เร็ว→ช้า</option>
                  <option value="range">ระยะทางไกล→สั้น (EV)</option>
                </select>
              </div>
            </div>
          </div>

          <Card>
            <div className="aspect-video w-full bg-gray-200 overflow-hidden relative">
              <Image src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop" alt="hero" fill className="object-cover" />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600">ตัวอย่างภาพเฮดไลน์</p>
              <h3 className="text-lg font-semibold">รวมข่าว/รีวิวยอดนิยมประจำสัปดาห์</h3>
            </div>
          </Card>
        </div>
      </Section>

      <Section id="news" className="py-8">
        <div className="flex items-center gap-2 mb-4">
          <Newspaper className="w-5 h-5" />
          <h2 className="text-2xl font-bold">ข่าวรถยนต์</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEWS.map(n => (
            <Card key={n.id}>
              <div className="aspect-video bg-gray-100 relative">
                <Image src={n.image} alt={n.title} fill className="object-cover" />
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <Tag>{n.tag}</Tag>
                  <span className="text-xs text-gray-500">{n.date}</span>
                </div>
                <h3 className="font-semibold leading-snug">{n.title}</h3>
                <a className="text-sm underline" href="#">อ่านต่อ</a>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="reviews" className="py-8">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5" />
          <h2 className="text-2xl font-bold">รีวิวรถยนต์</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(r => (
            <Card key={r.id}>
              <div className="aspect-[16/10] bg-gray-100 relative">
                <Image src={r.image} alt={`${r.brand} ${r.model}`} fill className="object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{r.brand}</span>
                  <Tag>{r.type}</Tag>
                </div>
                <h3 className="font-semibold mt-1">{r.brand} {r.model}</h3>
                <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                  <div className="rounded-xl bg-gray-50 p-2">
                    <div className="text-gray-500">ราคา</div>
                    <div className="font-semibold">{r.price.toLocaleString()} บาท</div>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-2">
                    <div className="text-gray-500">0–100</div>
                    <div className="font-semibold">{r.zeroTo100}s</div>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-2">
                    <div className="text-gray-500">ระยะทาง</div>
                    <div className="font-semibold">{r.range ? `${r.range} กม.` : "—"}</div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-xs text-gray-600">3 ข้อดี</div>
                  <ul className="list-disc pl-5 text-sm">
                    {r.pros.slice(0,3).map((p,i)=>(<li key={i}>{p}</li>))}
                  </ul>
                </div>
                <div className="mt-2">
                  <div className="text-xs text-gray-600">3 ข้อสังเกต</div>
                  <ul className="list-disc pl-5 text-sm">
                    {r.cons.slice(0,3).map((c,i)=>(<li key={i}>{c}</li>))}
                  </ul>
                </div>
                <a className="mt-3 inline-block text-sm underline" href="#">อ่านรีวิวฉบับเต็ม</a>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="ev" className="py-8">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5" />
          <h2 className="text-2xl font-bold">รถไฟฟ้า (EV)</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          {EV_CATEGORIES.map(cat => (
            <button key={cat.key} className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-50 text-sm">{cat.label}</button>
          ))}
        </div>
        <Card>
          <div className="p-4 text-sm text-gray-600">
            โซนนี้ไว้จัดอันดับ เช่น "ถูกสุด", "ยุโรป", "สปอร์ต", "ระยะไกลสุด" ฯลฯ — ตอนโปรดักชันค่อยผูกฐานข้อมูลจริง
          </div>
        </Card>
      </Section>

      <Section id="contact" className="py-12">
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-5 h-5" />
              <h2 className="text-2xl font-bold">ติดต่อเรา / ลงโฆษณา / เชิญรีวิว</h2>
            </div>
            <form onSubmit={(e)=>{e.preventDefault(); alert("เดโม่: ส่งข้อความเรียบร้อย");}} className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm">ชื่อ</label>
                <input required className="mt-1 w-full border rounded-xl px-3 py-2" placeholder="ชื่อของคุณ" />
              </div>
              <div>
                <label className="text-sm">อีเมล</label>
                <input type="email" required className="mt-1 w-full border rounded-xl px-3 py-2" placeholder="you@email.com" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm">ข้อความ</label>
                <textarea required className="mt-1 w-full border rounded-2xl px-3 py-2 min-h-[120px]" placeholder="ต้องการลงโฆษณา/รีวิวรุ่น..." />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="px-5 py-2 rounded-2xl bg-black text-white">ส่งข้อความ</button>
              </div>
            </form>
          </div>
        </Card>
      </Section>

      <footer className="mt-10 border-t">
        <Section className="py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} DriveTwo — สร้างด้วย Next.js (สตาร์ทเตอร์)
        </Section>
      </footer>
    </div>
  );
}
