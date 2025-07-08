import { 
    FaApple,
  FaChartPie, 
  FaGooglePlay, 
  FaUserDoctor 
} from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { IoMdHome, IoMdSettings } from "react-icons/io";
import { LuHistory } from "react-icons/lu";
import { MdLocationOn, MdPeopleAlt } from "react-icons/md";
import { TbRibbonHealth } from "react-icons/tb";
import { NavLink } from 'react-router';

interface MenuItem {
    key: string;
    name: string;
    icon: React.ReactNode;
    path: string;
}

const Sidebar: React.FC = () => {
    const menuItems: MenuItem[] = [
        { key: 'patients', name: 'Patients', icon: <MdPeopleAlt size={20} />, path: '/patients' },
        { key: 'overview', name: 'Overview', icon: <FaChartPie size={20} />, path: '/overview' },
        { key: 'map', name: 'Map', icon: <MdLocationOn size={20} />, path: '/map' },
        { key: 'departments', name: 'Departments', icon: <IoMdHome size={20} />, path: '/departments' },
        { key: 'doctors', name: 'Doctors', icon: <FaUserDoctor size={20} />, path: '/doctors' },
        { key: 'history', name: 'History', icon: <LuHistory size={20} />, path: '/history' },
        { key: 'settings', name: 'Settings', icon: <IoMdSettings size={20} />, path: '/settings' },
    ];

    return (
        <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
            {/* Logo */}
            <div className="p-5">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <TbRibbonHealth className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-semibold text-gray-800">H-care</span>
                </div>
            </div>

            {/* Register Patient Button */}
            <div className="p-4">
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                    <FiPlus className="w-4 h-4" />
                    <span>Register patient</span>
                </button>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 px-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.key}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => 
                                    `w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-left ${
                                        isActive 
                                            ? 'bg-purple-100 text-purple-700 border-l-4 border-purple-700' 
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                            >
                                <span className="flex-shrink-0">{item.icon}</span>
                                <span className="font-medium">{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Mobile App Section */}
            <div className="p-4 border-t border-gray-200">
                <div className="text-center">
                    <p className="text-sm font-medium text-gray-800 mb-2">Get mobile app</p>
                    <div className="flex justify-center space-x-2">
                        <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                            <span className="text-white text-xs">
                                <FaGooglePlay />
                            </span>
                        </div>
                        <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center">
                            <span className="text-white text-xs">
                                <FaApple />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;