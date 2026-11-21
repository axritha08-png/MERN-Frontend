import { useState, useEffect } from 'react';

export const ROUTES = ['home', 'shop', 'about', 'contact', 'faq', 'terms', 'privacy', 'login'];
const current = () => {
  const h = location.hash.slice(1);
  return ROUTES.includes(h) ? h : 'home';
};

export function useRoute() {
  const [route, setRoute] = useState(current);
  useEffect(() => {
    const onChange = () => setRoute(current());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

export const go = (page) => { location.hash = page; };

export function Link({ to, className = '', children, ...rest }) {
  return <a href={'#' + to} className={className} {...rest}>{children}</a>;
}
