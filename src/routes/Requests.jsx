import { useState } from 'react';
import { useAuth } from '../lib/auth.jsx';
import { RentAPI } from '../lib/api.jsx';

export default function Requests() {
	const { role } = useAuth() || {};
	const [notice, setNotice] = useState('');

	if (role !== 'tenant') {
		return (
			<section className="shell-pad">
				<h2>Requests</h2>
				<p className="muted">Sign in as a tenant to view your requests.</p>
			</section>
		);
	}

	return (
		<section className="shell-pad">
			<h2>My Requests</h2>
			<p className="muted">Demo actions with mock API.</p>
			<button
				className="button inline"
				onClick={async () => {
					try {
						await RentAPI.request('p-1001', role);
						setNotice('Request sent');
						setTimeout(() => setNotice(''), 2500);
					} catch {
						setNotice('Failed to send request');
						setTimeout(() => setNotice(''), 2500);
					}
				}}
			>
				Request Demo Property
			</button>
			{notice ? <div className="notice success">{notice}</div> : null}
		</section>
	);
}


