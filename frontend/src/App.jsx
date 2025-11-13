import { Outlet, NavLink, Link } from 'react-router-dom';
import { useAuth } from './lib/auth.jsx';

export default function App() {
	const auth = useAuth();
	return (
		<div className="re-app">
			<header className="re-header">
				<nav className="re-nav shell">
					<div className="nav-left brand">
						<span className="badge">RE+</span>
						<span><NavLink to="/">Home</NavLink></span>
					</div>
					<ul className="nav-center">
						<li><NavLink to="/listings">Listings</NavLink></li>
					</ul>
					<div className="nav-right">
						{auth?.role === 'tenant' ? <NavLink to="/requests">Requests</NavLink> : null}
						{auth?.role === 'landlord' ? <NavLink to="/create">Create</NavLink> : null}
						<NavLink to="/dashboard">Dashboard</NavLink>
						{auth?.user ? (
							<button className="button inline ghost" onClick={() => auth.signout()}>Sign out</button>
						) : (
							<Link to="/signin" className="button inline">Sign in</Link>
						)}
					</div>
				</nav>
			</header>
			<main className="shell">
				<Outlet />
			</main>
			<footer className="re-footer shell">
				<p>© {new Date().getFullYear()} RentEase — Authentic Agreements, Zero Doubt.</p>
			</footer>
		</div>
	);
}

