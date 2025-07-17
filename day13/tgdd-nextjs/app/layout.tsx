import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Thế Giới Di Động - Điện thoại, Laptop, Tablet, Phụ kiện chính hãng",
  description:
    "Thế Giới Di Động - Chuỗi cửa hàng bán lẻ điện thoại di động, smartphone, máy tính bảng, laptop, phụ kiện, smartwatch, đồng hồ chính hãng mới nhất, giá tốt, dịch vụ khách hàng được yêu thích nhất VN",
  keywords: "điện thoại, smartphone, laptop, tablet, phụ kiện, đồng hồ thông minh",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
