import { maxHeaderSize } from "http"
import { Search, User, ShoppingCart, MapPin, ChevronDown } from "lucide-react"
import Image from "next/image"

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-400">
      {/* Top promotional banner */}
 <Image
      src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/bd/26/bd260331dfc577627b0c955e027cdaba.png"
      className="max-w-full h-auto"
      width={maxHeaderSize}
      height={60}
      alt="top banner"
      loading="lazy"
    />
      {/* Main header */}
      <div className="bg-yellow-400 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              {/* <div className="w-6 h-6 bg-yellow-400 rounded-full"></div> */}
            </div>
            <span className="font-bold text-black text-lg">thegioididong</span>
            <span className="text-xs text-black">.com</span>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Bạn tìm gì..."
              className="w-full pl-4 pr-10 py-2 rounded-full border-0 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-4">
            <button className="text-black hover:bg-yellow-500 flex items-center gap-2 px-3 py-2 rounded transition-colors">
              <User className="w-4 h-4" />
              <span className="hidden md:inline">Đăng nhập</span>
            </button>

            <button className="text-black hover:bg-yellow-500 flex items-center gap-2 px-3 py-2 rounded transition-colors">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden md:inline">Giỏ hàng</span>
            </button>

            <button className="text-black hover:bg-yellow-500 flex items-center gap-2 px-3 py-2 rounded transition-colors">
              <MapPin className="w-4 h-4" />
              <span className="hidden md:inline">Hồ Chí Minh</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Category navigation */}
      <div className="bg-yellow-400 border-t border-yellow-500 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center gap-6 text-sm">
          <button className="text-black hover:bg-yellow-500 flex items-center gap-2 px-3 py-2 rounded transition-colors">
            📱 Điện thoại
          </button>
          <button className="text-black hover:bg-yellow-500 flex items-center gap-2 px-3 py-2 rounded transition-colors">
            💻 Laptop
          </button>
          <button className="text-black hover:bg-yellow-500 flex items-center gap-2 px-3 py-2 rounded transition-colors">
            🎧 Phụ kiện
            <ChevronDown className="w-3 h-3" />
          </button>
          <button className="text-black hover:bg-yellow-500 px-3 py-2 rounded transition-colors">⌚ Smartwatch</button>
          <button className="text-black hover:bg-yellow-500 px-3 py-2 rounded transition-colors">🕐 Đồng hồ</button>
          <button className="text-black hover:bg-yellow-500 px-3 py-2 rounded transition-colors">📱 Tablet</button>
          <button className="text-black hover:bg-yellow-500 flex items-center gap-2 px-3 py-2 rounded transition-colors">
            🖥️ Máy cũ, Thu cũ
            <ChevronDown className="w-3 h-3" />
          </button>
          <button className="text-black hover:bg-yellow-500 flex items-center gap-2 px-3 py-2 rounded transition-colors">
            🖥️ Màn hình, Máy in
            <ChevronDown className="w-3 h-3" />
          </button>
          <button className="text-black hover:bg-yellow-500 flex items-center gap-2 px-3 py-2 rounded transition-colors">
            💳 Sim, Thẻ cào
            <ChevronDown className="w-3 h-3" />
          </button>
          <button className="text-black hover:bg-yellow-500 flex items-center gap-2 px-3 py-2 rounded transition-colors">
            🏪 Dịch vụ tiện ích
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  )
}
