import Header from "@/components/header"
import PromotionalSection from "@/components/promotional-section"
import PromotionalBanner from "@/components/promotional-banner"
import ProductListing from "@/components/product-listing"

export default function Home() {
  return (
    <div className="flex flex-row min-h-screen bg-gray-50">
      <Header />

      {/* Add top padding to account for fixed header */}
      <main className="pt-32">
        <PromotionalSection />

        <div className="max-w-7xl mx-auto px-4 py-8">
          <PromotionalBanner />

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Sản phẩm nổi bật</h2>
            <ProductListing />
          </div>

          {/* Recently viewed section */}
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Sản phẩm đã xem</h2>
              <button className="text-blue-600 hover:underline text-sm">Xóa lịch sử</button>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-gray-500 text-center py-8">Chưa có sản phẩm nào được xem gần đây</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
