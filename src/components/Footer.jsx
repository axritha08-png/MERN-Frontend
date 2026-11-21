import { Link } from '../router.jsx';

const FOOT_LINKS = [['terms', 'Terms & Conditions'], ['privacy', 'Privacy Policy'], ['faq', 'FAQ'], ['contact', 'Contact']];

export default function Footer() {
  return (
    <footer className="slim">
      <div className="wrap">
        <span>© 2026 GadgetHub. All rights reserved.</span>
        <div className="links">
          {FOOT_LINKS.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}
        </div>
      </div>
    </footer>
  );
}
