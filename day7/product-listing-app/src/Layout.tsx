import { BrowserRouter, Routes, Route, NavLink } from 'react-router';
import Page404 from './Page404';
import HomePage from './home/HomePage';
import BlogPage from './blog/BlogPage';
import LoginPage from './auth/LoginPage';
import ProductPage from './product/ProductPage';
import CategoryPage from './category/CategoryPage';
import CustomerPage from './customer/CustomerPage';
import { HiMiniShoppingCart } from 'react-icons/hi2';

type Props = {};

export default function Layout(props: Props) {
    return (
        <BrowserRouter>
            <header className="bg-red-500 py-3 px-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Magazines</h2>
                <nav className="flex items-center gap-6">
                    <NavLink to="/" className={({ isActive }: { isActive: boolean }) => isActive ? "font-bold text-black" : "text-white/90 hover:text-white"} end>
                        Home
                    </NavLink>
                    <div className="relative group">
                        <NavLink to="/blog" className={({ isActive }: { isActive: boolean }) => isActive ? "font-bold text-black" : "text-white/90 hover:text-white"}>
                            Blog <span className="align-super">▼</span>
                        </NavLink>
                        {/* Dropdown */}
                    </div>
                    <NavLink to="/category" className={({ isActive }: { isActive: boolean }) => isActive ? "font-bold text-black" : "text-white/90 hover:text-white"}>
                        Category
                    </NavLink>
                    <NavLink to="/product" className={({ isActive }: { isActive: boolean }) => isActive ? "font-bold text-black" : "text-white/90 hover:text-white"}>
                        Product
                    </NavLink>
                    <NavLink to="/login" className={({ isActive }: { isActive: boolean }) => isActive ? "font-bold text-black" : "text-white/90 hover:text-white"}>
                        Login
                    </NavLink>
                    <NavLink to="/customer" className={({ isActive }: { isActive: boolean }) => isActive ? "font-bold text-black" : "text-white/90 hover:text-white"}>
                        Customer
                    </NavLink>
                    
                    <div className="ml-4 flex items-center bg-white/90 rounded px-2 py-1">
                        <span className="material-icons text-orange-500 mr-1" style={{ fontSize: 20 }}><HiMiniShoppingCart />
                        </span>
                        <span className="text-orange-500 font-bold">0</span>
                    </div>
                </nav>
            </header>
            <main className="p-4">
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/blog' element={<BlogPage />} />
                    <Route path='/category' element={<CategoryPage />} />
                    <Route path='/product' element={<ProductPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/customer' element={<CustomerPage />} />
                    <Route path='*' element={<Page404 />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}