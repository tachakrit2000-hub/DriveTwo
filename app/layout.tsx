export const metadata = {
  title: "DriveTwo – ข่าวและรีวิวรถ",
  description: "สตาร์ทเตอร์ Next.js สไตล์ Carwow สำหรับข่าวและรีวิวรถ",
};

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
