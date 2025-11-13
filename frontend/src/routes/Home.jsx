import { Link } from 'react-router-dom';

export default function Home() {
	return (
		<section className="home">
			<div className="hero-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1600&auto=format&fit=crop)' }}>
				<div className="overlay">
					<div className="hero-inner">
						<h2>
							Landmark rentals, trusted agreements.
						</h2>
						<p>
							Beautifully presented listings for premium developments. Streamlined requests. Approvals that move. Agreements that endure.
						</p>
						<div className="cta">
							<Link to="/listings" className="button primary">Explore Listings</Link>
							<Link to="/signup" className="button ghost">Get Started</Link>
						</div>
					</div>
				</div>
			</div>
			<section className="shell features">
				<h2>Precision built for modern developments</h2>
				<ul className="feature-grid">
					<li className="feature">
						<h3>For Builders</h3>
						<p className="muted">A refined console to publish, update, and approve with confidence.</p>
					</li>
					<li className="feature">
						<h3>For Tenants</h3>
						<p className="muted">Search by city, price, and type. Request in seconds. Track status clearly.</p>
					</li>
					<li className="feature">
						<h3>For Everyone</h3>
						<p className="muted">A consistent, elegant experience that favors clarity over clutter.</p>
					</li>
				</ul>
			</section>
			<section className="shell gallery">
				<h3 className="gallery-heading">Residences presented with editorial clarity</h3>
				<ul className="gallery-grid">
					<li className="gallery-tile" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1529429612777-3b8ff09f71e1?q=80&w=1200&auto=format&fit=crop)' }}></li>
					<li className="gallery-tile" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1507944929098-00f7dca80a3d?q=80&w=1200&auto=format&fit=crop)' }}></li>
					<li className="gallery-tile" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop)' }}></li>
				</ul>
			</section>
			<section className="shell stats">
				<div className="stats-wrap">
					<div className="stat">
						<h4>12</h4>
						<p className="muted">Premium developments onboarded and managed today.</p>
					</div>
					<div className="stat">
						<h4>3.5h</h4>
						<p className="muted">Average time from tenant request to landlord approval.</p>
					</div>
					<div className="stat">
						<h4>100%</h4>
						<p className="muted">Agreement templates prepared for blockchain verification.</p>
					</div>
				</div>
			</section>
			<section className="testimonial">
				<blockquote>
					“RentEase delivers the polish our brand demands. Listings feel custom-designed, renter requests stay organized, and agreements are a breeze. It’s become the standard for our leasing team.”
					<cite>Alexandra Pierce — Managing Director, Skyline Estates</cite>
				</blockquote>
			</section>
			<section className="final-cta">
				<div className="panel">
					<h3>Ready to present your properties differently?</h3>
					<p>Spin up your landlord console, import your listings, and invite tenants to a focused experience.</p>
					<div className="cta" style={{ justifySelf: 'center' }}>
						<Link to="/signup" className="button primary">Create account</Link>
						<Link to="/listings" className="button">View demo listings</Link>
					</div>
				</div>
			</section>
		</section>
	);
}

