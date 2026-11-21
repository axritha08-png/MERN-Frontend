import { Link } from '../router.jsx';
import { Art } from '../components/Art.jsx';

const OFFERS = [
  ['o1', 'Flat 20% off phones', 'On selected smartphones this week.', 'PHONE20'],
  ['o2', 'Buy 2, save ₹1,000', 'On any two accessories.', 'COMBO1000'],
  ['o3', 'Student discount', 'Extra 10% off laptops with a student ID.', 'STUDENT10'],
];

export default function Home() {
  return (
    <div className="pg home">
      <div className="hero2">
        <div>
          <span className="pill">New arrivals 2026</span>
          <h1>Tech worth owning, at prices you’ll <em>love</em>.</h1>
          <p>Smartphones, laptops, wearables and audio from top brands. Genuine products, a 1-year warranty and free delivery across India.</p>
          <div className="row">
            <Link to="shop" className="btn">Shop now</Link>
            <Link to="about" className="btn ghost">Our story</Link>
          </div>
          <div className="stats">
            <div><b>10K+</b><span>Happy customers</span></div>
            <div><b>500+</b><span>Products</span></div>
            <div><b>4.8★</b><span>Average rating</span></div>
          </div>
        </div>
        <div className="stage" role="img" aria-label="Featured headphones">
          <div className="disc" />
          <div className="main"><Art name="audio" size={260} /></div>
          <div className="float" style={{ top: '8%', right: 0 }}>BassPods ANC<small>₹4,999</small></div>
          <div className="float" style={{ bottom: '10%', left: '-2%' }}>★ 4.9 rating<small>342 reviews</small></div>
        </div>
      </div>
      <div className="offers2">
        {OFFERS.map(([cls, t, d, code]) => (
          <div className={'offer ' + cls} key={code}><h3>{t}</h3><p>{d}</p><code>{code}</code></div>
        ))}
      </div>
    </div>
  );
}
