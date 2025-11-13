import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const config = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAyUyqn3xVeY2QhsH8gsago8LOphUBsp3w",
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "rentease-1ccf0.firebaseapp.com",
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "rentease-1ccf0",
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "rentease-1ccf0.firebasestorage.app",
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "37529507271",
	appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:37529507271:web:fd3114743787ee544cb5e2",
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-HKSJ74TE3N"
};

export const app = initializeApp(config);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export let analytics = null;
isSupported().then((ok) => { if (ok) analytics = getAnalytics(app); }).catch(() => {});


