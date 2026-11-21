import { useState } from 'react';
import { go } from '../router.jsx';
import { Icon } from '../components/Art.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { RULES, EMAIL, checks, allOk, strength } from '../utils/password.js';

function Tx({ id, label, value, onChange, err, type = 'text', ph, auto }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={value} placeholder={ph} autoComplete={auto} aria-invalid={!!err} onChange={(e) => onChange(e.target.value)} />
      {err && <div className="err">{err}</div>}
    </div>
  );
}

function Pw({ id, label, value, onChange, err, ph, auto }) {
  const [show, setShow] = useState(false);
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="pw">
        <input id={id} type={show ? 'text' : 'password'} value={value} placeholder={ph} autoComplete={auto} aria-invalid={!!err} onChange={(e) => onChange(e.target.value)} />
        <button type="button" className="eye" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}>{show ? 'Hide' : 'Show'}</button>
      </div>
      {err && <div className="err">{err}</div>}
    </div>
  );
}

const BENEFITS = [['truck', 'Faster checkout and order tracking'], ['tag', 'Exclusive member-only offers'], ['shield', 'Warranty and returns in one place'], ['lock', 'Your password is never stored in plain text']];
const BLANK = { name: '', email: '', pw: '', cf: '', terms: false, remember: false };

export default function Login() {
  const { login, signup } = useAuth();
  const { toast } = useCart();
  const [mode, setMode] = useState('in');
  const [f, setF] = useState(BLANK);
  const [errs, setErrs] = useState({});
  const [msg, setMsg] = useState('');
  const [ok, setOk] = useState('');
  const [busy, setBusy] = useState(false);

  const set = (k) => (v) => { setF((x) => ({ ...x, [k]: v })); setErrs((x) => ({ ...x, [k]: '' })); setMsg(''); };
  const switchTo = (m) => { setMode(m); setErrs({}); setMsg(''); setOk(''); };

  const c = checks(f.pw, f.name, f.email);
  const lv = strength(c, f.pw);

  const signIn = async (e) => {
    e.preventDefault();
    const em = f.email.trim().toLowerCase();
    const er = {};
    if (!EMAIL.test(em)) er.email = 'Enter a valid email address.';
    if (!f.pw) er.pw = 'Enter your password.';
    setErrs(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    const r = await login(em, f.pw, f.remember);
    setBusy(false);
    if (!r.ok) return setMsg(r.error);
    toast('Welcome back, ' + r.name.split(' ')[0] + '!');
    go('home');
  };

  const signUp = async (e) => {
    e.preventDefault();
    const nm = f.name.trim(), em = f.email.trim().toLowerCase();
    const er = {};
    if (!/^[\p{L}][\p{L} .'’-]+$/u.test(nm)) er.name = 'Enter your full name (letters only).';
    if (!EMAIL.test(em)) er.email = 'Enter a valid email address.';
    if (!allOk(checks(f.pw, nm, em))) er.pw = 'Your password doesn’t meet all the requirements.';
    if (!f.cf || f.cf !== f.pw) er.cf = 'Passwords don’t match.';
    if (!f.terms) er.terms = 'Please accept the terms to continue.';
    setErrs(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    const r = await signup(nm, em, f.pw);
    setBusy(false);
    if (!r.ok) return setErrs({ email: r.error });
    toast('Account created. Welcome, ' + nm.split(' ')[0] + '!');
    go('home');
  };

  const reset = (e) => {
    e.preventDefault();
    const em = f.email.trim();
    if (!EMAIL.test(em)) return setErrs({ email: 'Enter a valid email address.' });
    setOk('If an account exists for ' + em + ', a reset link will be sent. (Demo: no email is actually sent.)');
  };

  return (
    <div className="pg authpg">
      <div className="authgrid">
        <div className="authside">
          <span className="pill">Member benefits</span>
          <h2>Welcome to GadgetHub</h2>
          <p>Sign in to track orders, save your wishlist and check out faster.</p>
          <ul>{BENEFITS.map(([ic, t]) => <li key={t}><i><Icon name={ic} size={22} /></i>{t}</li>)}</ul>
        </div>
        <div className="authcard">
          <div className="tabs" role="tablist">
            <button type="button" role="tab" className={mode === 'in' ? 'on' : ''} onClick={() => switchTo('in')}>Sign in</button>
            <button type="button" role="tab" className={mode === 'up' ? 'on' : ''} onClick={() => switchTo('up')}>Create account</button>
          </div>

          {mode === 'in' && (
            <form onSubmit={signIn} noValidate>
              <h3 className="ft">Sign in to your account</h3>
              {msg && <div className="ferr" role="alert">{msg}</div>}
              <Tx id="in-email" label="Email address" type="email" ph="you@example.com" auto="email" value={f.email} onChange={set('email')} err={errs.email} />
              <Pw id="in-pw" label="Password" ph="Enter your password" auto="current-password" value={f.pw} onChange={set('pw')} err={errs.pw} />
              <div className="between">
                <label className="chk"><input type="checkbox" checked={f.remember} onChange={(e) => set('remember')(e.target.checked)} /> Remember me</label>
                <button type="button" className="lnk" onClick={() => switchTo('for')}>Forgot password?</button>
              </div>
              <button className="btn full" disabled={busy}>{busy ? 'Please wait…' : 'Sign in'}</button>
              <p className="sw">New to GadgetHub? <button type="button" className="lnk" onClick={() => switchTo('up')}>Create an account</button></p>
            </form>
          )}

          {mode === 'up' && (
            <form onSubmit={signUp} noValidate>
              <h3 className="ft">Create your account</h3>
              <div className="two-f">
                <Tx id="up-name" label="Full name" ph="Your full name" auto="name" value={f.name} onChange={set('name')} err={errs.name} />
                <Tx id="up-email" label="Email address" type="email" ph="you@example.com" auto="email" value={f.email} onChange={set('email')} err={errs.email} />
              </div>
              <div className="two-f">
                <Pw id="up-pw" label="Password" ph="Create a password" auto="new-password" value={f.pw} onChange={set('pw')} err={errs.pw} />
                <Pw id="up-cf" label="Confirm password" ph="Re-enter password" auto="new-password" value={f.cf} onChange={set('cf')} err={errs.cf} />
              </div>
              <div className="meter"><div id="meter" className={'m' + lv} style={{ width: lv * 25 + '%' }} /></div>
              <div id="mlabel" aria-live="polite">{f.pw ? 'Password strength: ' + ['', 'Weak', 'Fair', 'Good', 'Strong'][lv] : ''}</div>
              <ul className="rules" aria-label="Password requirements">
                {RULES.map(([k, t]) => <li key={k} className={c[k] ? 'ok' : ''} style={k === 'safe' ? { gridColumn: '1/-1' } : null}>{c[k] ? '✓ ' : '○ '}{t}</li>)}
              </ul>
              <div className="field">
                <label className="chk"><input type="checkbox" checked={f.terms} onChange={(e) => set('terms')(e.target.checked)} /> I agree to the <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a></label>
                {errs.terms && <div className="err">{errs.terms}</div>}
              </div>
              <button className="btn full" disabled={busy}>{busy ? 'Please wait…' : 'Create account'}</button>
            </form>
          )}

          {mode === 'for' && (
            <form onSubmit={reset} noValidate>
              <h3 className="ft">Reset your password</h3>
              <p style={{ marginBottom: 16 }}>Enter your email and we’ll send you a link to reset your password.</p>
              {ok && <div className="ferr ok2" role="status">{ok}</div>}
              <Tx id="fo-email" label="Email address" type="email" ph="you@example.com" auto="email" value={f.email} onChange={set('email')} err={errs.email} />
              <button className="btn full">Send reset link</button>
              <p className="sw"><button type="button" className="lnk" onClick={() => switchTo('in')}>← Back to sign in</button></p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
