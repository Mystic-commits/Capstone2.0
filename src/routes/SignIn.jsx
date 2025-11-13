import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../lib/auth.jsx';
import { useState } from 'react';

export default function SignIn() {
	const { signinWithEmail } = useAuth();
	const nav = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState('tenant');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	async function submit(e) {
		e.preventDefault();
		setLoading(true);
		setError('');
		try {
			await signinWithEmail(email, password, role);
			nav('/dashboard');
		} catch (err) {
			setError(err.message || 'Sign in failed');
		} finally {
			setLoading(false);
		}
	}

	return (
		<section className="auth themed-auth">
			<div className="auth-grid shell">
				<div className="auth-hero">
					<h2>
						<span className="stroke">Enter</span> the console.
					</h2>
					<p className="muted">Authenticate to manage listings, requests, and agreements.</p>
					<div className="auth-art">
						<div className="block block-a"></div>
						<div className="block block-b"></div>
						<div className="block block-c"></div>
					</div>
				</div>
				<form className="auth-card" onSubmit={submit}>
					<h3>Sign in</h3>
					<label>
						<span>Email</span>
						<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
					</label>
					<label>
						<span>Password</span>
						<input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
					</label>
					<label>
						<span>Role</span>
						<select value={role} onChange={e => setRole(e.target.value)}>
							<option value="tenant">Tenant</option>
							<option value="landlord">Landlord</option>
						</select>
					</label>
					<button className="button primary" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
					{error ? <div className="notice error">{error}</div> : null}
					<p className="muted small">No account? <Link to="/signup">Create one</Link></p>
				</form>
			</div>
		</section>
	);
}


