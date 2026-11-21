const STATS = [['10K+', 'Happy customers'], ['500+', 'Products'], ['50+', 'Brands'], ['4.8★', 'Average rating']];
const VALUES = ['Quality', 'Trust', 'Innovation', 'Customer first'];

export default function About() {
  return (
    <div className="pg about">
      <div>
        <span className="pill">Our story</span>
        <h1>Honest tech, fair prices, real support.</h1>
        <p>GadgetHub started with a simple idea: buying tech should be easy, honest and affordable. We sell phones, laptops, wearables, audio gear and accessories from trusted brands, backed by fast delivery and a 1-year warranty.</p>
        <div className="mv">
          <div className="tile"><h3>Our mission</h3><p>Make the latest gadgets accessible to every student and professional at fair prices.</p></div>
          <div className="tile"><h3>Our vision</h3><p>Become the most trusted online destination for consumer electronics in India.</p></div>
        </div>
        <div className="vals">{VALUES.map((v) => <span key={v}>{v}</span>)}</div>
      </div>
      <div className="tiles">
        {STATS.map(([n, l]) => <div className="tile" key={l}><b>{n}</b>{l}</div>)}
      </div>
    </div>
  );
}
