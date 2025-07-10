import React from 'react';
import styles from './CartDropdown.module.css';
import type { CartItem } from '../types/Product';
import { useCart } from './../contexts/useCart';

const CartDropdown: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { cartItems, removeFromCart, totalPrice } = useCart();

  return (
    <div className={styles.dropdown} onClick={e => e.stopPropagation()}>
      <div className={styles.dropdownHeader}>
        <h3>Your Cart</h3>
        <button onClick={onClose} className={styles.closeButton}>×</button>
      </div>
      
      <div className={styles.cartItems}>
        {cartItems.length === 0 ? (
          <p className={styles.emptyCart}>Your cart is empty</p>
        ) : (
          cartItems.map((item: CartItem) => (
            <div key={item.product.id} className={styles.cartItem}>
              <div className={styles.itemInfo}>
                <h4>{item.product.name}</h4>
                <p>
                  {item.product.price.toLocaleString('vi-VN')} ₫ × {item.quantity}
                </p>
                <p className={styles.itemTotal}>
                  Total: {(item.product.price * item.quantity).toLocaleString('vi-VN')} ₫
                </p>
              </div>
              <button 
                onClick={() => removeFromCart(item.product.id)}
                className={styles.removeButton}
                aria-label="Remove"
              >
                ❌
              </button>
            </div>
          ))
        )}
      </div>
      
      {cartItems.length > 0 && (
        <div className={styles.cartFooter}>
          <div className={styles.total}>
            Total: {totalPrice.toLocaleString('vi-VN')} ₫
          </div>
          <button className={styles.viewCartButton}>
            View Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;