import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  removeItem: (id: number | string) => void;
  updateQuantity: (id: number | string, qty: number) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: Omit<CartItem, 'quantity'>, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + qty } : i));
      }
      return [...prev, { ...item, quantity: qty }];
    });
  };

  const removeItem = (id: number | string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: number | string, qty: number) => {
    // Update quantity, then remove items with quantity <= 0
    setItems((prev) => {
      const updated = prev.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(0, qty) } : i
      );
      return updated.filter(i => i.quantity > 0);
    });
  };

  const clear = () => setItems([]);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.quantity * i.price, 0);

  return (
export function useCartContext() {
  const cartContext = useContext(CartContext);
  if (!cartContext) throw new Error('useCartContext must be used within a CartProvider');
  return cartContext;
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartContext must be used within a CartProvider');
  return ctx;
}

export default CartContext;
