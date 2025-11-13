import { useParams, Link } from 'react-router-dom';

export default function Property() {
	const { id } = useParams();
	return (
		<section className="property">
			<header className="cluster">
				<h2>Property #{id}</h2>
				<Link to="/listings" className="button ghost">Back</Link>
			</header>
			<div className="property-sheet">
				<div className="img-sim"></div>
				<div className="details">
					<h3>Prime location. Clean lines. Honest price.</h3>
					<p className="muted">This is a mock detail page wired to routing. Connect to backend next.</p>
					<div className="cta">
						<Link to="/dashboard" className="button primary">Request to Rent</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

