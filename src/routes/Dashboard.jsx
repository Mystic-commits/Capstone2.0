import { useAuth } from '../lib/auth.jsx';
import { useState } from 'react';
import { PropertiesAPI, RentAPI } from '../lib/api.jsx';

export default function Dashboard() {
	const { role } = useAuth() || {};
	const [notice, setNotice] = useState('');

	if (!role) {
		return (
			<section className="dashboard">
				<header className="cluster">
					<h2>Console</h2>
					<p className="muted">Please sign in to view your console.</p>
				</header>
			</section>
		);
	}

	if (role === 'tenant') {
		return (
			<section className="dashboard">
				<header className="cluster">
					<h2>Tenant Console</h2>
					<p className="muted">Track your requests and agreements.</p>
				</header>
				{notice ? <div className="notice success">{notice}</div> : null}
				<div className="panel-grid">
					<div className="panel">
						<h3>My Requests</h3>
						<ul className="mono">
							<li>Example: r-302 — p-1001 — pending</li>
						</ul>
					</div>
					<div className="panel">
						<h3>Agreements</h3>
						<p className="muted">Generated after approvals. Blockchain hash storage planned.</p>
					</div>
				</div>
			</section>
		);
	}

	// Landlord view
	return (
		<section className="dashboard">
			<header className="cluster">
				<h2>Landlord Console</h2>
				<p className="muted">Manage properties, requests, and agreements.</p>
			</header>
			{notice ? <div className="notice success">{notice}</div> : null}
			<div className="panel-grid">
				<div className="panel">
					<h3>My Properties</h3>
					<button
						className="button inline"
						onClick={async () => {
							try {
								await PropertiesAPI.create(
									{ title: 'New Listing', city: 'NYC', type: 'Apartment', price: 1800 },
									role
								);
								setNotice('Property created');
								setTimeout(() => setNotice(''), 2500);
							} catch {
								setNotice('Failed to create property');
								setTimeout(() => setNotice(''), 2500);
							}
						}}
					>
						Add Quick Listing
					</button>
					<ul className="mono">
						<li>p-1001 — Sunny Loft in Midtown</li>
					</ul>
				</div>
				<div className="panel">
					<h3>Incoming Requests</h3>
					<button
						className="button inline ghost"
						onClick={async () => {
							try {
								// demo: approve a fake request id
								await RentAPI.approve('r-302', role);
								setNotice('Request approved, agreement generated');
								setTimeout(() => setNotice(''), 2500);
							} catch {
								setNotice('Failed to approve request');
								setTimeout(() => setNotice(''), 2500);
							}
						}}
					>
						Approve Example
					</button>
					<ul className="mono">
						<li>r-302 — p-1001 — pending</li>
					</ul>
				</div>
				<div className="panel">
					<h3>Agreements</h3>
					<p className="muted">Agreements appear after approval. Hashing to Polygon planned.</p>
				</div>
			</div>
		</section>
	);
}

