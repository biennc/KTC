import { NextResponse } from "next/server"

// Fallback product data in case the external API fails
const fallbackProducts = [
  {
    id: 1,
    title: "Samsung Galaxy A16 8GB/128GB",
    slug: "samsung-galaxy-a16",
    price: 150,
    description: "Điện thoại Samsung Galaxy A16 với màn hình lớn, camera chất lượng cao và hiệu năng mượt mà.",
    category: {
      id: 1,
      name: "Điện thoại",
      slug: "dien-thoai",
      image: "/placeholder.svg?height=100&width=100",
      creationAt: "2025-01-01T00:00:00.000Z",
      updatedAt: "2025-01-01T00:00:00.000Z",
    },
    images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    creationAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    title: "iPhone 15 Pro Max 256GB",
    slug: "iphone-15-pro-max",
    price: 1200,
    description: "iPhone 15 Pro Max với chip A17 Pro, camera 48MP và thiết kế titanium cao cấp.",
    category: {
      id: 1,
      name: "Điện thoại",
      slug: "dien-thoai",
      image: "/placeholder.svg?height=100&width=100",
      creationAt: "2025-01-01T00:00:00.000Z",
      updatedAt: "2025-01-01T00:00:00.000Z",
    },
    images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    creationAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: 3,
    title: "MacBook Air M3 13 inch",
    slug: "macbook-air-m3",
    price: 1100,
    description: "MacBook Air M3 với hiệu năng vượt trội, pin lâu và thiết kế siêu mỏng nhẹ.",
    category: {
      id: 2,
      name: "Laptop",
      slug: "laptop",
      image: "/placeholder.svg?height=100&width=100",
      creationAt: "2025-01-01T00:00:00.000Z",
      updatedAt: "2025-01-01T00:00:00.000Z",
    },
    images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    creationAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
]

export async function GET() {
  return NextResponse.json({
    products: fallbackProducts,
    total: fallbackProducts.length,
  })
}