import { Link, useSearchParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useAuth } from '../lib/auth.jsx';
import { RentAPI } from '../lib/api.jsx';

const MOCK = [
	{ id: 'p-1001', title: 'Sunny Loft in Midtown', city: 'NYC', type: 'Loft', price: 3400 },
	{ id: 'p-1002', title: 'Cozy Studio near River', city: 'Chicago', type: 'Studio', price: 1400 },
	{ id: 'p-1003', title: 'Garden Flat', city: 'Portland', type: 'Apartment', price: 2200 }
];

export default function Listings() {
	const [params, setParams] = useSearchParams();
	const { role } = useAuth() || {};
	const [notice, setNotice] = useState('');
	const q = params.get('q') || '';
	const city = params.get('city') || '';
	const type = params.get('type') || '';

	const filtered = useMemo(() => {
		return MOCK.filter(p => {
			const matchesQ = q ? p.title.toLowerCase().includes(q.toLowerCase()) : true;
			const matchesCity = city ? p.city === city : true;
			const matchesType = type ? p.type === type : true;
			return matchesQ && matchesCity && matchesType;
		});
	}, [q, city, type]);

	function onInputChange(key, value) {
		const next = new URLSearchParams(params);
		if (!value) next.delete(key);
		else next.set(key, value);
		setParams(next, { replace: true });
	}

	return (
		<section className="listings">
			<header className="cluster">
				<h2>Listings</h2>
				<div className="filters">
					<input
						placeholder="Search"
						value={q}
						onChange={e => onInputChange('q', e.target.value)}
					/>
					<select value={city} onChange={e => onInputChange('city', e.target.value)}>
						<option value="">City</option>
						<option>NYC</option>
						<option>Chicago</option>
						<option>Portland</option>
					</select>
					<select value={type} onChange={e => onInputChange('type', e.target.value)}>
						<option value="">Type</option>
						<option>Loft</option>
						<option>Studio</option>
						<option>Apartment</option>
					</select>
				</div>
			</header>
			{notice ? <div className="notice success">{notice}</div> : null}
			<ul className="grid">
				{filtered.map(p => (
					<li key={p.id} className="card pop">
						<div className="card-head">
							<h3>{p.title}</h3>
							<span className="chip">${p.price}</span>
						</div>
						<p className="muted">{p.city} • {p.type}</p>
						<div className="card-actions">
							<Link to={`/properties/${p.id}`} className="button inline">View</Link>
							{role === 'tenant' ? (
								<button
									className="button inline ghost"
									onClick={async () => {
										try {
											await RentAPI.request(p.id, role);
											setNotice('Request sent');
											setTimeout(() => setNotice(''), 2500);
										} catch (e) {
											setNotice('Failed to send request');
											setTimeout(() => setNotice(''), 2500);
										}
									}}
								>
									Request
								</button>
							) : (
								<Link to={role ? '/dashboard' : '/signin'} className="button inline ghost">
									{role ? 'Open Console' : 'Sign in to Request'}
								</Link>
							)}
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}

