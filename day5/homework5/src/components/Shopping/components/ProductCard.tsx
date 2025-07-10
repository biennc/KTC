import React from 'react';
import styles from './ProductCard.module.css';
import type { Product } from '../types/Product';
import { useCart } from './../contexts/useCart';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { cartItems, updateQuantity } = useCart();
  
  const cartItem = cartItems.find(item => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className={styles.productCard}>
      <h3 className={styles.productName}>{product.name}</h3>
      <p className={styles.productPrice}>
        {product.price.toLocaleString('vi-VN')} ₫
      </p>
      
      <div className={styles.quantityControl}>
        <button 
          className={styles.quantityButton} 
          onClick={() => updateQuantity(product.id, quantity - 1)}
          disabled={quantity === 0}
        >
          -
        </button>
        <span className={styles.quantity}>{quantity}</span>
        <button 
          className={styles.quantityButton} 
          onClick={() => updateQuantity(product.id, quantity + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductCard;