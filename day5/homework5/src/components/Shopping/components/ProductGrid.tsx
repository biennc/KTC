import React from 'react';
import styles from './ProductGrid.module.css';
import ProductCard from './ProductCard';
import type { Product } from '../types/Product';

const ProductGrid: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className={styles.productGrid}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;