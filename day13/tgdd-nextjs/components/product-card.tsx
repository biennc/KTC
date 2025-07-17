import type { Product } from "@/lib/types"
import SafeImage from "./safe-image"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price * 1000) // Multiply by 1000 to simulate realistic Vietnamese prices
  }

  return (
    <div className="group hover:shadow-lg transition-shadow duration-200 cursor-pointer bg-white rounded-lg border border-gray-200">
      <div className="p-4">
        <div className="relative aspect-square mb-3 overflow-hidden rounded-lg bg-gray-100">
          <SafeImage
            src={product.images[0] || "/placeholder.svg?height=200&width=200"}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {/* Promotional badge */}
          <div className="absolute top-2 left-2">
            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded">GIẢM SỐC</div>
          </div>
        </div>

        <h3 className="font-medium text-sm mb-2 line-clamp-2 min-h-[2.5rem]">{product.title}</h3>

        <div className="space-y-1">
          <div className="text-red-600 font-bold text-lg">{formatPrice(product.price)}</div>
          <div className="text-gray-500 text-sm line-through">{formatPrice(product.price * 1.2)}</div>
        </div>

        <div className="mt-2 text-xs text-gray-600">{product.category.name}</div>
      </div>
    </div>
  )
}
