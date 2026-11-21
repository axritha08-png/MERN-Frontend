import { useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { CATS } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';

export default function Shop() {
  const { products, productsLoading, productsError } = useCart();
  const [cat, setCat] = useState('All');
  const list = products.filter((p) => cat === 'All' || p.cat === cat);
  return (
    <div className="pg shop">
      <div className="shophead">
        <div><h2 style={{ marginBottom: 0 }}>Shop gadgets</h2><p>{list.length} products · free delivery above ₹999</p></div>
        <div className="filters">
          {CATS.map((c) => <button key={c} className={'chip' + (c === cat ? ' on' : '')} onClick={() => setCat(c)}>{c}</button>)}
        </div>
      </div>
      {productsLoading && <p role="status">Loading products…</p>}
      {productsError && <p className="ferr" role="alert">Could not load products: {productsError}</p>}
      {!productsLoading && !productsError && list.length === 0 && <p>No products found in this category.</p>}
      {!productsLoading && !productsError && <div className="grid products">
        {list.map((p) => <ProductCard key={p.id} p={p} size={70} />)}
      </div>}
    </div>
  );
}
