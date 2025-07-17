export default function PromotionalSection() {
  return (
    <div className="bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Khuyến mãi Online</h2>

        <div className="flex gap-4 mb-6">
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
            FLASH SALE
            <div className="text-sm font-normal">GIÁ SỐC</div>
          </div>
          <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold">
            ONLINE ONLY
            <div className="text-sm font-normal">GIẢM ĐẾN 35%</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <div className="text-center">
            <div className="text-lg font-semibold">Điện Thoại</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">Apple</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">Laptop</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">Phụ Kiện</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">Đồng Hồ</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">PC, Máy in</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-orange-400 text-white p-4 rounded-lg text-center">
            <div className="font-bold">Sắp diễn ra</div>
            <div className="text-2xl font-bold">09:00</div>
          </div>
          <div className="bg-gray-200 text-gray-700 p-4 rounded-lg text-center">
            <div className="font-bold">Sắp diễn ra</div>
            <div className="text-2xl font-bold">12:00</div>
          </div>
          <div className="bg-gray-200 text-gray-700 p-4 rounded-lg text-center">
            <div className="font-bold">Sắp diễn ra</div>
            <div className="text-2xl font-bold">15:00</div>
          </div>
          <div className="bg-gray-200 text-gray-700 p-4 rounded-lg text-center">
            <div className="font-bold">Sắp diễn ra</div>
            <div className="text-2xl font-bold">18:00</div>
          </div>
        </div>
      </div>
    </div>
  )
}
