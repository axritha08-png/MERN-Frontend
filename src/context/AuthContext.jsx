import { createContext, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../api.js';

const AuthCtx = createContext();
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    apiFetch('/api/auth/me')
      .then(({ user: currentUser }) => { if (active) setUser(currentUser); })
      .catch((error) => {
        if (error.status !== 401) console.error('Could not restore the sign-in session:', error);
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const login = async (email, pw, remember) => {
    try {
      const { user: signedInUser } = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password: pw, remember }),
      });
      setUser(signedInUser);
      return { ok: true, name: signedInUser.name };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  };

  const signup = async (name, email, pw) => {
    try {
      const { user: signedUpUser } = await apiFetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password: pw }),
      });
      setUser(signedUpUser);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  };

  const logout = async () => {
    await apiFetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
  };

  return <AuthCtx.Provider value={{ user, loading, login, signup, logout }}>{children}</AuthCtx.Provider>;
}
