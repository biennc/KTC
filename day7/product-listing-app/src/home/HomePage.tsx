import React, { useState, useEffect } from 'react';
import ProductPage from '../product/ProductPage';
import CategoryPage from '../category/CategoryPage';

export default function HomePage() {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (categoryIds: number[]) => {
    setLoading(true);
    try {
      let url = 'https://api.escuelajs.co/api/v1/products';
      if (categoryIds.length === 1) {
        url += `/?categoryId=${categoryIds[0]}`;
      }
      const res = await fetch(url);
      let data = await res.json();
      if (categoryIds.length > 1) {
        data = data.filter((p: any) => categoryIds.includes(p.category.id));
      }
      setProducts(data);
    } catch (e) {
      setProducts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(selectedCategories);
  }, [selectedCategories]);

  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    setSelectedCategories(prev =>
      checked ? [...prev, categoryId] : prev.filter(id => id !== categoryId)
    );
  };

  return (
    <div className="flex gap-4">
      <CategoryPage selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange} />
      {/* <div className="flex-1">
        {loading ? (
          <div className="text-center py-10">Đang tải sản phẩm...</div>
        ) : (
          <ProductPage products={products} />
        )}
      </div> */}
    </div>
  );
}