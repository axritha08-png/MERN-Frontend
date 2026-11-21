import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { apiFetch } from '../api.js';
import { useAuth } from './AuthContext.jsx';

const CartCtx = createContext();
export const useCart = () => useContext(CartCtx);

const readGuestCart = () => {
  try { return JSON.parse(localStorage.getItem('gh-cart')) || {}; } catch { return {}; }
};

export function CartProvider({ children }) {
  const { user, loading: authLoading } = useAuth();
  const [cart, setCart] = useState(readGuestCart);
  const [cartOwner, setCartOwner] = useState(null);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState('');
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const saveQueue = useRef(Promise.resolve());

  const toast = useCallback((m) => { setMsg(m); setTimeout(() => setMsg(''), 2000); }, []);

  useEffect(() => {
    let active = true;
    apiFetch('/api/products')
      .then(({ products: catalog }) => { if (active) setProducts(catalog); })
      .catch((error) => { if (active) setProductsError(error.message); })
      .finally(() => { if (active) setProductsLoading(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (authLoading) return undefined;
    let active = true;
    setCartOwner(null);

    if (!user) {
      setCartOwner('guest');
      return () => { active = false; };
    }

    const loadCart = async () => {
      try {
        const { items: savedItems } = await apiFetch('/api/cart');
        const merged = {};
        savedItems.forEach(({ productId, quantity }) => { merged[productId] = quantity; });
        Object.entries(cart).forEach(([id, quantity]) => {
          merged[id] = Math.min(99, (merged[id] || 0) + quantity);
        });
        await apiFetch('/api/cart', {
          method: 'PUT',
          body: JSON.stringify({
            items: Object.entries(merged).filter(([, quantity]) => quantity > 0)
              .map(([productId, quantity]) => ({ productId: Number(productId), quantity })),
          }),
        });
        if (active) {
          setCart(merged);
          setCartOwner(user.id);
          localStorage.removeItem('gh-cart');
        }
      } catch (error) {
        if (active) toast(`Could not load your saved cart: ${error.message}`);
      }
    };

    loadCart();
    return () => { active = false; };
  }, [user, authLoading]);

  useEffect(() => {
    if (authLoading || cartOwner !== 'guest') return;
    try { localStorage.setItem('gh-cart', JSON.stringify(cart)); } catch (error) {
      console.error('Could not save the guest cart:', error);
    }
  }, [cart, cartOwner, authLoading]);

  useEffect(() => {
    if (authLoading || !user || cartOwner !== user.id) return;
    const items = Object.entries(cart).filter(([, quantity]) => quantity > 0)
      .map(([productId, quantity]) => ({ productId: Number(productId), quantity }));
    saveQueue.current = saveQueue.current
      .catch(() => {})
      .then(() => apiFetch('/api/cart', { method: 'PUT', body: JSON.stringify({ items }) }))
      .catch((error) => toast(`Could not save your cart: ${error.message}`));
  }, [cart, cartOwner, user, authLoading, toast]);

  const add = (id) => {
    setCart((current) => ({ ...current, [id]: Math.min(99, (current[id] || 0) + 1) }));
    toast('Added to cart');
  };
  const change = (id, d) => setCart((c) => {
    const n = { ...c, [id]: (c[id] || 0) + d };
    if (n[id] <= 0) delete n[id];
    return n;
  });
  const clear = () => setCart({});

  const placeOrder = async () => {
    await saveQueue.current;
    const result = await apiFetch('/api/orders', { method: 'POST' });
    setCart({});
    return result.order;
  };

  const items = Object.keys(cart).map((id) => ({ p: products.find((x) => x.id === Number(id)), q: cart[id] })).filter((i) => i.p);
  const count = items.reduce((a, i) => a + i.q, 0);
  const total = items.reduce((a, i) => a + i.q * i.p.price, 0);

  return (
    <CartCtx.Provider value={{ items, count, total, products, productsLoading, productsError, add, change, clear, placeOrder, open, setOpen, toast, msg }}>
      {children}
    </CartCtx.Provider>
  );
}
