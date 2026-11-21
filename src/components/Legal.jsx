import { useState } from 'react';

export default function Legal({ title, updated, sections }) {
  const [i, setI] = useState(0);
  const s = sections[i];
  return (
    <div className="pg">
      <div>
        <h1 style={{ fontSize: 'clamp(30px,4vw,44px)' }}>{title}</h1>
        <p>Last updated {updated}. This is sample text written for a student project, not legal advice.</p>
      </div>
      <div className="legal">
        <div className="side" role="tablist">
          {sections.map((x, k) => (
            <button key={x.t} className={k === i ? 'on' : ''} onClick={() => setI(k)}>{k + 1}. {x.t}</button>
          ))}
        </div>
        <div className="body">
          <h2>{i + 1}. {s.t}</h2>
          {s.p.map((para, k) => <p key={k}>{para}</p>)}
          <div className="nav2">
            <button className="btn ghost" disabled={i === 0} onClick={() => setI(i - 1)}>← Previous</button>
            <button className="btn" disabled={i === sections.length - 1} onClick={() => setI(i + 1)}>Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
