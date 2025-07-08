import React, { useEffect, useState } from 'react'


interface ProductPageProps {
    products?: IProduct[];
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
    }
    images: [string]
}

export default function ProductPage({ products }: ProductPageProps) {
    // If products prop is not provided, fetch all products (for direct navigation to /product)
    const [allProducts, setAllProducts] = useState<IProduct[]>([]);
    const showProducts = products ?? allProducts;

    useEffect(() => {
        if (products) return;
        const ProductsData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) return;
                const data = await response.json();
                setAllProducts(data);
            } catch (error) {
                console.log(error);
            }
        };
        ProductsData();
    }, [products]);

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Danh sách sản phẩm</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {showProducts?.map((product) => (
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
                ))}
            </div>
        </div>
    );
}