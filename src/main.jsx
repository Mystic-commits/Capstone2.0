import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
const Home = lazy(() => import('./routes/Home.jsx'));
const Listings = lazy(() => import('./routes/Listings.jsx'));
const Property = lazy(() => import('./routes/Property.jsx'));
const Dashboard = lazy(() => import('./routes/Dashboard.jsx'));
const SignIn = lazy(() => import('./routes/SignIn.jsx'));
const SignUp = lazy(() => import('./routes/SignUp.jsx'));
const NotFound = lazy(() => import('./routes/NotFound.jsx'));
const Requests = lazy(() => import('./routes/Requests.jsx'));
const CreateProperty = lazy(() => import('./routes/CreateProperty.jsx'));
import ErrorBoundary from './routes/_ErrorBoundary.jsx';
import { AuthProvider } from './lib/auth.jsx';
import './styles.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorBoundary />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'listings', element: <Listings /> },
			{ path: 'properties/:id', element: <Property /> },
			{ path: 'dashboard', element: <Dashboard /> },
			{ path: 'requests', element: <Requests /> },
			{ path: 'create', element: <CreateProperty /> },
			{ path: 'signin', element: <SignIn /> },
			{ path: 'signup', element: <SignUp /> },
			{ path: '*', element: <NotFound /> }
		]
	}
]);

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<Suspense fallback={<div className="shell" style={{ padding: '36px 0' }}><p className="muted">Loading…</p></div>}>
				<RouterProvider router={router} />
			</Suspense>
		</AuthProvider>
	</React.StrictMode>
);

