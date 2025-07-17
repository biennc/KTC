import Image from "next/image"
import { maxHeaderSize } from "http"

export default function PromotionalBanner() {
  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden mb-8">
      {/* <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700"> */}
        {/* <div className="flex items-center h-full px-8"> */}
          {/* <div className="flex-1">
            <div className="bg-yellow-400 text-black px-3 py-1 rounded text-sm font-bold inline-block mb-4">
              PHỤ KIỆN VƯỢT TRỘI
            </div>
            <div className="text-white text-4xl font-bold mb-4">SONY</div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
              <div className="bg-orange-400 p-4 rounded-lg">
                <div className="font-bold">Tặng LOA ULT FIELD 1 TRỊ GIÁ</div>
                <div className="text-md font-bold">2,990,000 VNĐ</div>
              </div>

              <div className="bg-orange-400 p-4 rounded-lg">
                <div className="font-bold">Tặng</div>
                <div className="text-lg font-bold">ÁO</div>
                <div className="text-lg font-bold">KHOÁC M6</div>
                <div className="text-sm">Khi đăng ký tài khoản My SONY</div>
              </div>

              <div className="space-y-2">
                <div className="bg-orange-400 p-2 rounded">
                  <div className="text-sm">Bảo hành HÃNG</div>
                  <div className="font-bold">12 THÁNG</div>
                  <div className="text-xs">+ 6 tháng khi đăng ký tài khoản My SONY</div>
                </div>
                <div className="bg-orange-400 p-2 rounded">
                  <div className="text-sm">Trả chậm</div>
                  <div className="font-bold text-2xl">0%</div>
                </div>
                <div className="bg-orange-400 p-2 rounded">
                  <div className="text-sm">Giảm giá lên đời</div>
                  <div className="font-bold">1 TRIỆU</div>
                  <div className="text-xs">Đổi sản phẩm</div>
                </div>
              </div>
            </div>
          </div> */}

          <div className="flex-1 flex justify-end">
            <Image
              src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/52/b1/52b1bb50bff9caa98ee302e4151a6fd1.png"
              alt="big banner"
              width={maxHeaderSize}
              height={260}
              className="object-contain"
            />
          </div>
        {/* </div> */}
      {/* </div> */}
    </div>
  )
}
