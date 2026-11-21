import { useCart } from '../context/CartContext.jsx';

export default function Toast() {
  const { msg } = useCart();
  return <div id="toast" className={msg ? 'on' : ''} role="status">{msg}</div>;
}
