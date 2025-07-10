import { CiSearch } from "react-icons/ci";
import { FaPhoneSquare } from "react-icons/fa";
import { MdPlaylistAddCheck } from "react-icons/md";

const Exercise2 = () => (
  <div className="bg-gray-100 min-h-screen p-4">
    <div className="max-w-sm mx-auto bg-white rounded-2xl p-6 border-2 border-blue-300">
      <div className="space-y-4">
        <div className="relative">
          <CiSearch className="absolute left-3 top-3 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            className="w-[85%] pl-10 pr-4 py-3 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <CiSearch className="absolute left-3 top-3 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-[85%] pl-10 pr-4 py-3 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <CiSearch className="absolute left-3 top-3 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Textfield"
            className="w-[85%] pl-10 pr-4 py-3 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <CiSearch className="absolute left-3 top-3 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search in the web"
            className="w-[77%] pl-10 pr-12 py-3 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute right-3 top-2 transform -translate-y-1/2">
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
              <MdPlaylistAddCheck className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="relative">
          <CiSearch className="absolute left-3 top-3 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search crypto"
            className="w-[77%] pl-10 pr-12 py-3 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute right-3 top-2 transform -translate-y-1/2">
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs">≡</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Phone number"
            className="w-[77%] pl-10 pr-12 py-3 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute right-3 top-2 transform -translate-y-1/2">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <FaPhoneSquare className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        <div className="relative">
          <CiSearch className="absolute left-3 top-3 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search in the web"
            className="w-[77%] pl-10 pr-12 py-3 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute right-3 top-2 transform -translate-y-1/2">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <MdPlaylistAddCheck className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Exercise2;