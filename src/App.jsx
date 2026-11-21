import { useEffect } from 'react';
import { useRoute } from './router.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Toast from './components/Toast.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import FAQ from './pages/FAQ.jsx';
import Terms from './pages/Terms.jsx';
import Privacy from './pages/Privacy.jsx';
import Login from './pages/Login.jsx';

const PAGES = { home: Home, shop: Shop, about: About, contact: Contact, faq: FAQ, terms: Terms, privacy: Privacy, login: Login };
const TITLES = { home: 'Home', shop: 'Shop', about: 'About', contact: 'Contact', faq: 'FAQ', terms: 'Terms & Conditions', privacy: 'Privacy Policy', login: 'Sign in' };
const FONT_STYLESHEET = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap';

export default function App() {
  const route = useRoute();
  const Page = PAGES[route];
  useEffect(() => { document.title = TITLES[route] + ' – GadgetHub'; }, [route]);
  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = FONT_STYLESHEET;
    document.head.append(fontLink);
    return () => fontLink.remove();
  }, []);
  return (
    <>
      <Navbar route={route} />
      <main><Page /></main>
      <Footer />
      <CartDrawer />
      <Toast />
    </>
  );
}
