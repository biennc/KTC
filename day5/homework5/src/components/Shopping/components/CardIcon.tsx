import React, { useState } from 'react';
import styles from './CartIcon.module.css';
import CartDropdown from './CardDropdown';
import { useCart } from './../contexts/useCart';

const CartIcon: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <div className={styles.cartContainer}>
      <button 
        className={styles.cartIcon} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Shopping Cart"
      >
        🛒
        {totalItems > 0 && (
          <span className={styles.badge}>{totalItems}</span>
        )}
      </button>
      
      {isOpen && <CartDropdown onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default CartIcon;