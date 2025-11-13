import { useAuth } from '../lib/auth.jsx';
import { useState } from 'react';
import { PropertiesAPI } from '../lib/api.jsx';

export default function CreateProperty() {
	const { role } = useAuth() || {};
	const [title, setTitle] = useState('');
	const [city, setCity] = useState('');
	const [type, setType] = useState('Apartment');
	const [price, setPrice] = useState(1500);
	const [notice, setNotice] = useState('');

	if (role !== 'landlord') {
		return (
			<section className="shell-pad">
				<h2>Create Property</h2>
				<p className="muted">Sign in as a landlord to create listings.</p>
			</section>
		);
	}

	async function submit(e) {
		e.preventDefault();
		try {
			await PropertiesAPI.create({ title, city, type, price: Number(price) }, role);
			setNotice('Property created');
			setTitle('');
			setCity('');
			setType('Apartment');
			setPrice(1500);
			setTimeout(() => setNotice(''), 2500);
		} catch {
			setNotice('Failed to create');
			setTimeout(() => setNotice(''), 2500);
		}
	}

	return (
		<section className="shell-pad">
			<h2>New Listing</h2>
			<form className="card" onSubmit={submit}>
				<label>
					<span>Title</span>
					<input value={title} onChange={e => setTitle(e.target.value)} placeholder="Minimal Duplex" />
				</label>
				<label>
					<span>City</span>
					<input value={city} onChange={e => setCity(e.target.value)} placeholder="NYC" />
				</label>
				<label>
					<span>Type</span>
					<select value={type} onChange={e => setType(e.target.value)}>
						<option>Apartment</option>
						<option>Loft</option>
						<option>Studio</option>
					</select>
				</label>
				<label>
					<span>Price</span>
					<input type="number" value={price} onChange={e => setPrice(e.target.value)} />
				</label>
				<button className="button primary">Create</button>
				{notice ? <div className="notice success">{notice}</div> : null}
			</form>
		</section>
	);
}


