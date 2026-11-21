import Legal from '../components/Legal.jsx';

const TERMS = [
  { t: 'Acceptance of terms', p: ['By visiting or buying from GadgetHub you agree to these Terms and Conditions. If you do not agree, please do not use the website.', 'We may update these terms from time to time. Continued use of the site after a change means you accept the new terms.'] },
  { t: 'Your account', p: ['You must provide accurate information when you create an account and keep your password confidential.', 'You are responsible for all activity under your account. Tell us immediately if you suspect unauthorised use.'] },
  { t: 'Orders and pricing', p: ['All prices are in Indian rupees (₹) and include applicable taxes unless stated otherwise. We may cancel an order if a price was listed in error.', 'An order is confirmed only when we send you a confirmation message.'] },
  { t: 'Shipping and delivery', p: ['Delivery times are estimates, usually 2–5 business days. Orders above ₹999 ship free.', 'Risk of loss passes to you once the courier delivers the package to your address.'] },
  { t: 'Returns and refunds', p: ['You may return unused products in original packaging within 7 days of delivery. Refunds are made to the original payment method within 5–7 business days.', 'Products damaged by misuse are not eligible for return.'] },
  { t: 'Warranty', p: ['Products carry a 1-year manufacturer or store warranty against defects. Warranty does not cover accidental damage, water damage or unauthorised repairs.'] },
  { t: 'Acceptable use', p: ['You agree not to misuse the site, attempt to break its security, scrape its content or use it for unlawful activity.'] },
  { t: 'Limitation of liability', p: ['To the extent permitted by law, GadgetHub is not liable for indirect or consequential losses arising from use of the site or products.', 'Nothing in these terms limits your rights under Indian consumer protection law.'] },
  { t: 'Governing law', p: ['These terms are governed by the laws of India. Disputes are subject to the courts of Punjab, India.'] },
  { t: 'Contact us', p: ['Questions about these terms? Email support@gadgethub.in or call +91 98765 43210.'] },
];

export default function Terms() {
  return <Legal title="Terms & Conditions" updated="19 November 2026" sections={TERMS} />;
}
