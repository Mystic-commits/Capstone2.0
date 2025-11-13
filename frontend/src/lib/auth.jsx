import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(() => {
		try { const raw = localStorage.getItem('re_user'); return raw ? JSON.parse(raw) : null; } catch { return null; }
	});
	const [role, setRole] = useState(() => localStorage.getItem('re_role') || null);
	const [ready, setReady] = useState(true);

	useEffect(() => { setReady(true); }, []);

	function persistRole(next) {
		setRole(next);
		try { next ? localStorage.setItem('re_role', next) : localStorage.removeItem('re_role'); } catch {}
	}

	async function signinWithEmail(email, _password, nextRole) {
		const mockUser = { uid: `u-${btoa(email).slice(0,8)}`, email };
		setUser(mockUser);
		localStorage.setItem('re_user', JSON.stringify(mockUser));
		if (nextRole) persistRole(nextRole);
	}
	async function signupWithEmail(email, _password, nextRole) {
		const mockUser = { uid: `u-${btoa(email).slice(0,8)}`, email };
		setUser(mockUser);
		localStorage.setItem('re_user', JSON.stringify(mockUser));
		if (nextRole) persistRole(nextRole);
	}
	async function signinWithGoogle(nextRole) {
		// placeholder noop in mock mode
		const mockUser = { uid: `u-google`, email: 'google@example.com' };
		setUser(mockUser);
		localStorage.setItem('re_user', JSON.stringify(mockUser));
		if (nextRole) persistRole(nextRole);
	}
	async function signout() {
		setUser(null);
		localStorage.removeItem('re_user');
		persistRole(null);
	}

	const value = useMemo(() => ({
		user,
		role,
		ready,
		signinWithEmail,
		signupWithEmail,
		signinWithGoogle,
		signout,
		setRole: persistRole
	}), [user, role, ready]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}


