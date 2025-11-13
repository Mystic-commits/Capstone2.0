import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 8080;
const allowedOrigins = process.env.CORS_ORIGIN?.split(',').map(origin => origin.trim()).filter(Boolean) ?? ['http://localhost:5173'];
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
	console.warn('⚠️  JWT_SECRET is not set. Set it in your environment before deploying.');
}

const sanitizeUser = ({ password, ...user }) => user;

const signToken = (user) => {
	if (!JWT_SECRET) throw new Error('JWT secret not configured');
	return jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
};

const requireAuth = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization || '';
		if (!authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
		const token = authHeader.split(' ')[1];
		const payload = jwt.verify(token, JWT_SECRET);
		const user = await prisma.user.findUnique({
			where: { id: payload.sub },
			select: { id: true, email: true, name: true, role: true, createdAt: true, updatedAt: true }
		});
		if (!user) return res.status(401).json({ error: 'Unauthorized' });
		req.user = user;
		next();
	} catch (error) {
		return res.status(401).json({ error: 'Unauthorized' });
	}
};

const requireRole = (role) => (req, res, next) => {
	if (!req.user || req.user.role !== role) {
		return res.status(403).json({ error: 'Forbidden' });
	}
	next();
};

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
	res.json({ ok: true, service: 'rentease-backend', timestamp: new Date().toISOString() });
});

app.post('/api/auth/signup', async (req, res, next) => {
	try {
		const { email, password, name, role = 'tenant' } = req.body;
		if (!email || !password) {
			return res.status(400).json({ error: 'Email and password are required' });
		}
		const normalizedEmail = String(email).toLowerCase();
		const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
		if (existing) {
			return res.status(409).json({ error: 'Email already registered' });
		}
		const hashed = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: {
				email: normalizedEmail,
				password: hashed,
				name,
				role: role === 'landlord' ? 'landlord' : 'tenant'
			}
		});
		const token = signToken(user);
		res.status(201).json({ token, user: sanitizeUser(user) });
	} catch (error) {
		next(error);
	}
});

app.post('/api/auth/login', async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ error: 'Email and password are required' });
		}
		const normalizedEmail = String(email).toLowerCase();
		const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
		if (!user) {
			return res.status(401).json({ error: 'Invalid credentials' });
		}
		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			return res.status(401).json({ error: 'Invalid credentials' });
		}
		const token = signToken(user);
		res.json({ token, user: sanitizeUser(user) });
	} catch (error) {
		next(error);
	}
});

app.get('/api/auth/me', requireAuth, (req, res) => {
	res.json({ user: req.user });
});

app.get('/api/properties', async (_req, res, next) => {
	try {
		const properties = await prisma.property.findMany({
			orderBy: { createdAt: 'desc' },
			include: {
				owner: { select: { id: true, email: true, name: true } },
				requests: { select: { id: true, status: true } }
			}
		});
		res.json({ data: properties });
	} catch (error) {
		next(error);
	}
});

app.post('/api/properties', requireAuth, requireRole('landlord'), async (req, res, next) => {
	try {
		const { title, city, type, description, price } = req.body;
		const property = await prisma.property.create({
			data: {
				title,
				city,
				type,
				description,
				price: Number(price ?? 0),
				ownerId: req.user.id
			}
		});
		res.status(201).json(property);
	} catch (error) {
		next(error);
	}
});

app.post('/api/rent/request', requireAuth, requireRole('tenant'), async (req, res, next) => {
	try {
		const { propertyId } = req.body;
		const request = await prisma.rentRequest.create({
			data: {
				propertyId,
				tenantId: req.user.id,
				status: 'pending'
			}
		});
		res.status(201).json(request);
	} catch (error) {
		next(error);
	}
});

app.post('/api/rent/approve', requireAuth, requireRole('landlord'), async (req, res, next) => {
	try {
		const { requestId } = req.body;
		const request = await prisma.rentRequest.update({
			where: { id: requestId },
			data: { status: 'approved' },
			include: { property: true, tenant: true }
		});

		const agreement = await prisma.agreement.create({
			data: {
				requestId: request.id,
				content: `Agreement for ${request.property.title}`,
				hash: null,
				landlordId: req.user.id
			}
		});

		res.json({ request, agreement });
	} catch (error) {
		next(error);
	}
});

app.use((err, _req, res, _next) => {
	console.error(err);
	res.status(500).json({ error: err.message ?? 'Internal Server Error' });
});

app.listen(PORT, () => {
	console.log(`RentEase backend listening on http://localhost:${PORT}`);
});

