import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface Product {
    id: number;
    title: string;
    price: number;
    discount?: number;
}

interface CartItem {
    product: Product;
    quantity: number;
}

interface ShoppingCartState {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<ShoppingCartState>() (
    devtools(
        persist((set, get) => {
            return {
                items: [],
                addToCart: (product: Product, quantity: number) => {
                    set((state) => {
                        const existingItem = state.items.find((item) => item.product.id === product.id);
                        if (existingItem) {
                            existingItem.quantity += quantity;
                        } else {
                            state.items.push({ product, quantity });
                        }
                        return {items: [...state.items]};
                    });
            },

            removeFromCart: (productId: number) => {
                set((state) => {
                    const updatedItems = state.items.filter((item) => item.product.id !== productId);
                    return { items: updatedItems };
                });
            },
            decreaseQuantity: (productId: number) => {
                set((state) => {
                    const item = state.items.find((item) => item.product.id === productId);
                    if (item && item.quantity >= 1) {
                        // disable decrease if quantity is 0
                        item.quantity -= 1;
                    }
                    return { items: [...state.items] };
                });
            },
            increaseQuantity: (productId: number) => {
                set((state) => {
                    const item = state.items.find((item) => item.product.id === productId);
                    if (item) {
                        item.quantity += 1;
                    }
                    return { items: [...state.items] };
                });
            },
            clearCart: () => {
                set({ items: [] });
            },
            // 
            }
        })
    )
)