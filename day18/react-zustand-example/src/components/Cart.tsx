import { useCartStore } from '../stores/useCartStore';

export default function Cart() {
  const { items } = useCartStore((state) => state);
  // const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  let total = 0;
  items.forEach((item) => {
    total += item.product.price * item.quantity;
  });

  return <div>Total: {total}</div>;
}