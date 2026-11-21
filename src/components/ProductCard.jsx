import { Art } from './Art.jsx';
import { inr } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';

export default function ProductCard({ p, size = 92 }) {
  const { add } = useCart();
  const filled = Math.round(p.rating);
  return (
    <article className="prod">
      {p.tag && <span className="tag">{p.tag}</span>}
      <div className="pic"><Art name={p.art} size={size} /></div>
      <div className="info">
        <span className="brand">{p.brand} · {p.cat}</span>
        <h3>{p.name}</h3>
        <div className="stars">{'★'.repeat(filled) + '☆'.repeat(5 - filled)}<span>{p.rating} ({p.reviews})</span></div>
        <div className="price">{inr(p.price)}<s>{inr(p.old)}</s></div>
        <button className="btn sm" onClick={() => add(p.id)}>Add to cart</button>
      </div>
    </article>
  );
}
