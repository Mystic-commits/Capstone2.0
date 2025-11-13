import { Link } from 'react-router-dom';

export default function NotFound() {
	return (
		<section className="shell-pad">
			<h2>Page not found</h2>
			<p className="muted">The page you’re looking for doesn’t exist.</p>
			<Link className="button" to="/">Go home</Link>
		</section>
	);
}


