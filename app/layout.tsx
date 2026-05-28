import type { Metadata } from "next";
import "./globals.css";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "PE Tracker · Российский рынок Private Equity и M&A",
  description:
    "Аналитический центр сделок российского рынка Private Equity и M&A: мультипликаторы по секторам, последние сделки, новости в реальном времени.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <div className="min-h-screen flex flex-col">
          <TopBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
