import React, { useEffect, useState } from 'react'

interface ProductPageProps {
    products?: IProduct[];
    categoryId?: number;
}

const url = 'https://api.escuelajs.co/api/v1/products'

interface IProduct {
    id: number,
    title: string,
    price: number,
    description: string,
    category: {
        id: number,
        name: string,
    };
    images: string[];
}

export default function ProductPage({ products }: ProductPageProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageProducts, setPageProducts] = useState<IProduct[]>([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [loading, setLoading] = useState(false);
    const PRODUCTS_PER_PAGE = 4;

    // If products are passed as prop, use client-side pagination
    const useClientPagination = typeof products !== 'undefined';
    const totalPages = useClientPagination
        ? Math.ceil((products?.length ?? 0) / PRODUCTS_PER_PAGE)
        : Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

    useEffect(() => {
        if (useClientPagination) {
            // Slice products for current page
            const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
            const end = start + PRODUCTS_PER_PAGE;
            setPageProducts(products?.slice(start, end) ?? []);
            setTotalProducts(products?.length ?? 0);
        } else {
            // Server-side pagination
            const fetchPage = async () => {
                setLoading(true);
                try {
                    let fetchUrl = `${url}?offset=${(currentPage - 1) * PRODUCTS_PER_PAGE}&limit=${PRODUCTS_PER_PAGE}`;
                    const res = await fetch(fetchUrl);
                    const data = await res.json();
                    setPageProducts(data);
                    // Get total count (API does not provide, so fetch all for count)
                    const countRes = await fetch(url);
                    const countData = await countRes.json();
                    setTotalProducts(countData.length);
                } catch (e) {
                    setPageProducts([]);
                    console.log(e);
                    
                }
                setLoading(false);
            };
            fetchPage();
        }
    }, [products, currentPage, useClientPagination]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Danh sách sản phẩm</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 min-h-[300px]">
                {loading ? (
                    <div className="col-span-full text-center py-10">Đang tải sản phẩm...</div>
                ) : (
                    pageProducts?.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow p-3 flex flex-col items-center relative group border border-gray-200">
                            <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">-6%</span>
                            <img src={product.images[0]} alt={product.title} className="w-28 h-28 object-contain mb-2" />
                            <div className="text-sm font-semibold text-gray-800 text-center min-h-[48px]">{product.title}</div>
                            <div className="mt-2 flex flex-col items-center">
                                <span className="text-red-600 font-bold text-lg">{product.price.toLocaleString('vi-VN')}đ</span>
                                {/* Old price example, static for now */}
                                <span className="text-gray-400 text-sm line-through">1.111.111đ</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            className={`w-8 h-8 rounded border text-orange-500 font-bold ${page === currentPage ? 'bg-red-500 text-white' : 'bg-white hover:bg-orange-100'}`}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}