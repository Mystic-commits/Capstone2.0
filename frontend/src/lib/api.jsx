const API_BASE = import.meta.env.VITE_API_BASE || '';

export async function apiRequest(path, { method = 'GET', body, role } = {}) {
	// Graceful no-backend mode: if no API base is set, short-circuit with a mock
	if (!API_BASE) {
		// Minimal mocks for current UI flows
		if (path.startsWith('/api/auth/login')) {
			const role = body?.firebaseToken === 'landlord' ? 'landlord' : 'tenant';
			return Promise.resolve({ user: { id: 'u-demo', role }, token: `demo.${role}.${Date.now()}` });
		}
		if (path.startsWith('/api/properties') && method === 'POST') {
			return Promise.resolve({ id: `p-${Math.floor(Math.random() * 1e6)}`, ...body });
		}
		if (path.startsWith('/api/rent/request') && method === 'POST') {
			return Promise.resolve({ id: `r-${Math.floor(Math.random() * 1e6)}`, status: 'pending' });
		}
		if (path.startsWith('/api/rent/approve') && method === 'POST') {
			return Promise.resolve({ request: { id: 'r-demo', status: 'approved' }, agreement: { id: `a-${Math.floor(Math.random() * 1e6)}` } });
		}
		throw new Error('API not configured (set VITE_API_BASE) and no mock available for this path');
	}

	const res = await fetch(`${API_BASE}${path}`, {
		method,
		headers: {
			'Content-Type': 'application/json',
			...(role ? { 'x-demo-role': role } : {})
		},
		body: body ? JSON.stringify(body) : undefined
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(text || `HTTP ${res.status}`);
	}
	return res.json();
}

export const AuthAPI = {
	login(firebaseToken) {
		return apiRequest('/api/auth/login', { method: 'POST', body: { firebaseToken } });
	}
};

export const PropertiesAPI = {
	list(query = '') {
		const qs = typeof query === 'string' ? query : new URLSearchParams(query).toString();
		return apiRequest(`/api/properties${qs ? `?${qs}` : ''}`);
	},
	create(data, role) {
		return apiRequest('/api/properties', { method: 'POST', body: data, role });
	}
};

export const RentAPI = {
	request(propertyId, role) {
		return apiRequest(`/api/rent/request/${propertyId}`, { method: 'POST', role });
	},
	approve(requestId, role) {
		return apiRequest(`/api/rent/approve/${requestId}`, { method: 'POST', role });
	}
};


