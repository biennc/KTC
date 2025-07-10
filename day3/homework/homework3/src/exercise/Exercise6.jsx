import { FaBell } from 'react-icons/fa';

 const Exercise6 = () => (
    <div className="bg-gray-800 min-h-screen p-4 flex items-center justify-center">
      <div className="max-w-sm mx-auto bg-gray-200 rounded-2xl p-6">
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <div className="text-lg font-semibold">Nike store</div>
                  <div className="text-sm text-gray-500">6 months of promotions</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">-27.50</div>
                <div className="text-xs text-gray-400">11:00 AM</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FaBell className="w-6 h-6 text-gray-600" />
                <div>
                  <div className="text-sm font-medium">All your notifications are</div>
                  <div className="text-sm font-medium">well turned on</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-6 bg-black rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                </div>
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

export default Exercise6