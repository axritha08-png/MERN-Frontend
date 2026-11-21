import { useState } from 'react';
import { Link, go } from '../router.jsx';
import { Icon } from './Art.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const NAV_LINKS = [['home', 'Home'], ['shop', 'Shop'], ['about', 'About'], ['contact', 'Contact'], ['faq', 'FAQ']];

export default function Navbar({ route }) {
  const { count, setOpen, toast } = useCart();
  const { user, logout } = useAuth();
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

  const flip = () => {
    document.documentElement.setAttribute('data-theme', dark ? 'light' : 'dark');
    setDark(!dark);
  };
  const signOut = async () => {
    try {
      await logout();
      toast('You’ve been signed out');
      go('home');
    } catch (error) {
      toast(`Could not sign out: ${error.message}`);
    }
  };

  return (
    <header>
      <div className="wrap">
        <Link to="home" className="logo"><span className="mk"><Icon name="bolt" size={22} /></span>GadgetHub</Link>
        <nav aria-label="Main">
          {NAV_LINKS.map(([to, label]) => (
            <Link key={to} to={to} className={route === to ? 'on' : ''}>{label}</Link>
          ))}
        </nav>
        <button className="theme" onClick={flip} aria-label="Toggle dark mode"><Icon name="moon" size={18} /></button>
        {user ? (
          <div className="ub">
            <span className="av">{user.name.charAt(0).toUpperCase()}</span>
            <span id="uname">{user.name.split(' ')[0]}</span>
            <button id="logout" onClick={signOut}>Logout</button>
          </div>
        ) : (
          <Link to="login" className="btn nb">Login</Link>
        )}
        <button className="cartbtn" onClick={() => setOpen(true)}>
          <Icon name="cart" size={18} />Cart<b>{count}</b>
        </button>
      </div>
    </header>
  );
}
