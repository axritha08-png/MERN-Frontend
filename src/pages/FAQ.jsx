import { useState } from 'react';
import { Link } from '../router.jsx';

const QS = [
  ['How long does delivery take?', 'Most orders arrive in 2–5 business days. Delivery is free on orders above ₹999.'],
  ['What is your return policy?', 'You can return any product within 7 days of delivery if it is unused and in its original packaging.'],
  ['Are the products genuine?', 'Yes. Every product comes from authorised distributors and carries a 1-year warranty.'],
  ['Which payment methods do you accept?', 'UPI, credit and debit cards, net banking and cash on delivery.'],
  ['How do I track my order?', 'Sign in and open your orders, or email support@gadgethub.in with your order number.'],
  ['How do refunds work?', 'Refunds go back to your original payment method within 5–7 business days after we receive the item.'],
  ['How do I claim warranty?', 'Contact support with your order number and a short description of the issue. We’ll guide you through repair or replacement.'],
  ['Is my personal data safe?', 'We only collect what we need and never sell it. Read our Privacy Policy for details.'],
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="pg">
      <div className="shophead">
        <div>
          <h1 style={{ fontSize: 'clamp(30px,4vw,44px)' }}>Frequently asked questions</h1>
          <p>Quick answers to the things people ask us most.</p>
        </div>
        <Link to="contact" className="btn ghost">Still need help?</Link>
      </div>
      <div className="qas">
        {QS.map(([q, a], i) => (
          <div className="qa" key={q}>
            <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              {q}<span>{open === i ? '−' : '+'}</span>
            </button>
            {open === i && <p>{a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
