import { useState } from 'react';
import { Icon } from '../components/Art.jsx';
import { apiFetch } from '../api.js';

const INFO = [
  ['mail', 'Email', 'Replies within 24 hours', [['mailto:hello@gadgethub.in', 'hello@gadgethub.in'], ['mailto:support@gadgethub.in', 'support@gadgethub.in']]],
  ['phone', 'Phone', 'Mon–Sun, 9 AM – 9 PM IST', [['tel:+919876543210', '+91 98765 43210'], ['tel:+911800123456', '1800 123 456 (toll-free)']]],
  ['chat', 'WhatsApp', 'Order updates and quick help', [['https://wa.me/919876543210', '+91 98765 43210']]],
  ['pin', 'Visit us', 'GadgetHub Store', [['', 'Phagwara, Punjab 144401, India']]],
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    const form = e.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    try {
      await apiFetch('/api/contact', { method: 'POST', body: JSON.stringify(fields) });
      form.reset();
      setSent(true);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="pg contact">
      <div>
        <h1 style={{ fontSize: 'clamp(30px,4vw,44px)', marginBottom: 6 }}>Contact &amp; support</h1>
        <p style={{ marginBottom: 20 }}>We’re here every day. Pick the way that suits you best.</p>
        <div className="grid cinfo">
          {INFO.map(([ic, t, sub, links]) => (
            <div className="cc" key={t}>
              <i><Icon name={ic} size={24} /></i>
              <h3>{t}</h3><p style={{ fontSize: 13 }}>{sub}</p>
              {links.map(([href, label]) => href ? <div key={label}><a href={href}>{label}</a></div> : <div key={label}>{label}</div>)}
            </div>
          ))}
        </div>
      </div>
      <div className="authcard">
        <h3 className="ft">Send us a message</h3>
        {sent && <div className="ferr ok2" role="status">Message sent. We’ll reply within 24 hours.</div>}
        {error && <div className="ferr" role="alert">{error}</div>}
        <form className="fld" onSubmit={submit}>
          <input required placeholder="Your name" aria-label="Name" />
          <input type="email" required placeholder="Email address" aria-label="Email" />
          <select aria-label="Topic"><option>Order status</option><option>Returns and refunds</option><option>Warranty claim</option><option>Payment issue</option><option>Something else</option></select>
          <textarea rows="4" required placeholder="How can we help?" aria-label="Message" />
          <button className="btn" disabled={busy}>{busy ? 'Sending…' : 'Send message'}</button>
        </form>
      </div>
    </div>
  );
}
