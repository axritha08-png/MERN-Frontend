import { useState } from 'react';
import { Art } from './Art.jsx';
import { go } from '../router.jsx';
import { inr } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function CartDrawer() {
  const { items, total, change, placeOrder, open, setOpen, toast } = useCart();
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);

  const checkout = async () => {
    if (!items.length) return toast('Your cart is empty');
    if (!user) { setOpen(false); toast('Please sign in to checkout'); return go('login'); }
    setBusy(true);
    try {
      await placeOrder();
      setOpen(false);
      toast('Order placed! Thank you for shopping.');
    } catch (error) {
      toast(`Could not place your order: ${error.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className={'shade' + (open ? ' on' : '')} onClick={() => setOpen(false)} />
      <aside id="drawer" className={open ? 'on' : ''} aria-label="Shopping cart">
        <header>
          <h3>Your cart</h3>
          <button className="theme" onClick={() => setOpen(false)} aria-label="Close cart">✕</button>
        </header>
        <div id="items">
          {items.length === 0 && <p style={{ padding: '40px 0', textAlign: 'center' }}>Your cart is empty.<br />Add a gadget to get started.</p>}
          {items.map(({ p, q }) => (
            <div className="li" key={p.id}>
              <div className="e"><Art name={p.art} size={38} /></div>
              <div className="t"><b>{p.name}</b><br /><small>{inr(p.price)}</small></div>
              <div className="qty">
                <button onClick={() => change(p.id, -1)} aria-label="Decrease">−</button>{q}
                <button onClick={() => change(p.id, 1)} aria-label="Increase">+</button>
              </div>
            </div>
          ))}
        </div>
        <div className="foot">
          <div className="tot"><span>Total</span><span>{inr(total)}</span></div>
          <button className="btn" style={{ width: '100%' }} onClick={checkout} disabled={busy}>{busy ? 'Please wait…' : 'Checkout'}</button>
        </div>
      </aside>
    </>
  );
}
