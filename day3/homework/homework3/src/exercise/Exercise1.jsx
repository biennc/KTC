import React from 'react'
import { FaApple } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

  const Exercise1 = () => (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center p-4">
      <div className="bg-gray-200 rounded-3xl p-8 w-full max-w-sm">
        <div className="space-y-4">
          <button className="w-full bg-black text-white rounded-full py-4 px-6 flex items-center justify-between text-sm font-medium">
            Get started
            <span>→</span>
          </button>
          
          <button className="w-full bg-black text-white rounded-full py-4 px-6 flex items-center justify-center text-sm font-medium">
            <FaApple className="w-5 h-5 mr-3" />
            Continue with Apple
          </button>
          
          <button className="w-full bg-white border-2 border-gray-300 rounded-full py-4 px-6 flex items-center justify-center text-sm font-medium text-gray-700">
            <FaGoogle className="w-5 h-5 mr-3" />
            Continue with Google
          </button>
          
          <button className="w-full bg-white border-2 border-gray-300 rounded-full py-4 px-6 flex items-center justify-center text-sm font-medium text-gray-700">
            <FaFacebookF className="w-5 h-5 mr-3" />
            Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  );

export default Exercise1