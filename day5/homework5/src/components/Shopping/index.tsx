import React, { createContext, useContext, useState, type ReactNode } from 'react';
// import './Shopping.css';
import { PiCarrotDuotone } from 'react-icons/pi';
import { CiCircleRemove } from 'react-icons/ci';
// Types
interface Product {
  id: number;
  name: string;
  price: number;
  image?: string; // Optional image property
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// Product data
const products: Product[] = [
  { id: 1, name: "Knorr Demiglace Sauce Powder 1kg", price: 315000, image: "https://www.unileverfoodsolutions.com.vn/dam/global-ufs/mcos/sea/vietnam/custom/product-images/1-en-1053256/Bot-xot-nau-demi-glace-knorr-1kg-2.jpg/_jcr_content/renditions/cq5dam.web.640.640.jpeg" },
  { id: 2, name: "Kikkoman Soy Sauce 1L", price: 180000, image: 'https://shop.annam-gourmet.com/pub/media/catalog/product/cache/ee0af4cad0f3673c5271df64bd520339/i/t/item_F101856_16d4.jpg' },
  { id: 3, name: "Do Luong Rice Paper (5 pcs)", price: 25000, image: 'https://lh3.googleusercontent.com/q9JW0H9vfT9C087YRleVY2vftv3wOdSst28SvgCFfiempG5SiYKKxCOXB0WuzFfJ3t6lGWpMGF7oCQ7fGuHPA-Fq3gEVWZU' },
  { id: 4, name: "Lea & Perrins Worcestershire Sauce 290ml", price: 150000, image: 'https://product.hstatic.net/1000282430/product/lea-and-perrins-worcestershire-sauce-290g_75b7081d08a1452ca9c88be11cd00b20_master.jpg' },
  { id: 5, name: "Thuan Phat Dipping Sauce", price: 22000, image: 'https://hongphatfood.com/wp-content/uploads/2023/07/thuan-phat-40n-610ml6.webp' },
  { id: 6, name: "Premium Fish Sauce 500ml", price: 85000, image: 'https://cholimexfood.com.vn/wp-content/uploads/2019/12/MAM-CAO-DAM-35-500.jpg' },
  { id: 7, name: "Oyster Sauce 340g", price: 45000, image: 'https://whim.com.mv/web/image/product.template/3536/image_1024?unique=39e9d13' },
  { id: 8, name: "Sesame Oil 250ml", price: 120000, image: 'https://naturallyvietnam.com/wp-content/uploads/2022/10/dau-me-vang.png' },
];

// Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Utility function to format price
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
};

// Product Card Component
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();

  const cartItem = cartItems.find(item => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleIncrease = () => {
    if (quantity === 0) {
      addToCart(product);
    } else {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  return (
    <div className="product-card">
      <h3 className="product-name">{product.name}</h3>
      {product.image ? (
        <img src={product.image} alt={product.name} className="product-image" />
      ) : (<PiCarrotDuotone className='product-image' />
      )}
      <div className="product-price">{formatPrice(product.price)}</div>

      <div className="quantity-controls">
        <button
          onClick={handleDecrease}
          disabled={quantity === 0}
          className={`quantity-btn ${quantity === 0 ? 'disabled' : ''}`}
        >
          -
        </button>

        <span className="quantity-display">{quantity}</span>

        <button
          onClick={handleIncrease}
          className="quantity-btn increase"
        >
          +
        </button>
      </div>

      {quantity === 0 && (
        <button
          onClick={() => addToCart(product)}
          className="add-to-cart-btn"
        >
          Thêm vào giỏ hàng
        </button>
      )}
    </div>
  );
};

// Cart Icon Component
const CartIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <button onClick={onClick} className="cart-icon">
      🛒
      {totalItems > 0 && (
        <span className="cart-badge">{totalItems}</span>
      )}
    </button>
  );
};

// Cart Dropdown Component
const CartDropdown: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      <div className="cart-dropdown">
        <div className="cart-header">
          Giỏ hàng của bạn
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            Giỏ hàng trống
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.product.id} className="cart-item">
                  <div className="cart-item-image">{item.product.image ? (
                    <img src={item.product.image} alt={item.product.name}/>
                  ) : (<PiCarrotDuotone/>
                  )}</div>
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.product.name}</div>
                    <div className="cart-item-price">
                      {formatPrice(item.product.price)} × {item.quantity}
                    </div>
                  </div>

                  <div className="cart-item-controls">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="cart-quantity-btn"
                    >
                      -
                    </button>

                    <span className="cart-quantity-display">{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="cart-quantity-btn increase"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="remove-btn"
                    >
                      <CiCircleRemove />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Tổng cộng:</span>
                <span className="total-price">{formatPrice(getTotalPrice())}</span>
              </div>

              <button className="view-cart-btn">
                Xem giỏ hàng
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

// Product Grid Component
const ProductGrid: React.FC = () => {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

// Header Component
const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">Big Market</div>
        <h1 className="page-title">Thực phẩm khô</h1>
      </div>

      <div className="header-right">
        <CartIcon onClick={() => setIsCartOpen(!isCartOpen)} />
        <CartDropdown
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      </div>
    </header>
  );
};

// Main Shopping Component
const Shopping = () => {
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <ProductGrid />
        </main>
      </div>

    </CartProvider>
  );
};

export default Shopping;