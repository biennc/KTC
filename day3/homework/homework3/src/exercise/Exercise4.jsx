import { FaCamera, FaPhone } from 'react-icons/fa';

  const Exercise4 = () => (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-sm mx-auto bg-white rounded-2xl p-6 border-2 border-blue-300">
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-dashed border-gray-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center overflow-hidden">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">Y</span>
                  </div>
                </div>
                <div>
                  <div className="text-lg font-semibold">Yolanda</div>
                  <div className="text-sm text-gray-500">Web Development</div>
                </div>
              </div>
              <FaCamera className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Maria */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-dashed border-gray-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">M</span>
                  </div>
                </div>
                <div>
                  <div className="text-lg font-semibold">Maria</div>
                </div>
              </div>
              <FaPhone className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

export default Exercise4

