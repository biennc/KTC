import React from 'react';
import { getAllProducts } from '../services/product.services';
import { useCartStore, type Product } from '../stores/useCartStore';

export default function Products() {
  // Zustand
  const { addToCart } = useCartStore((state) => state);

  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();

      setProducts(response.data);
    };

    fetchProducts();
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.discount}</td>
              <td>
                <button
                  onClick={() => {
                    // Add to cart logic here
                    addToCart(product, 1);
                  }}
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}