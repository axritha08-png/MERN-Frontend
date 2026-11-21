export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const COMMON = ['password', 'passw0rd', '12345678', '123456789', 'qwerty', 'admin123', 'letmein', 'welcome1', 'iloveyou', 'abc12345', 'gadgethub'];

export const RULES = [
  ['len', '8 to 64 characters'],
  ['upper', 'One uppercase letter (A–Z)'],
  ['lower', 'One lowercase letter (a–z)'],
  ['num', 'One number (0–9)'],
  ['special', 'One special character (! @ # $ %)'],
  ['space', 'No spaces'],
  ['safe', 'Not a common password, and no part of your name or email'],
];

export function checks(pw, name = '', email = '') {
  const low = pw.toLowerCase();
  const tokens = name.toLowerCase().split(/\s+/).concat([email.split('@')[0].toLowerCase()]);
  const bad = tokens.some((t) => t.length >= 3 && low.includes(t)) || COMMON.some((c) => low.includes(c));
  return {
    len: pw.length >= 8 && pw.length <= 64,
    upper: /[A-Z]/.test(pw),
    lower: /[a-z]/.test(pw),
    num: /\d/.test(pw),
    special: /[^A-Za-z0-9\s]/.test(pw),
    space: pw.length > 0 && !/\s/.test(pw),
    safe: pw.length > 0 && !bad,
  };
}
export const allOk = (c) => Object.values(c).every(Boolean);
export function strength(c, pw) {
  const n = Object.values(c).filter(Boolean).length;
  return !pw ? 0 : n <= 3 ? 1 : n <= 5 ? 2 : n <= 6 ? 3 : 4;
}

