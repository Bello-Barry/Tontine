import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Définir les chemins publics et protégés
  const isPublicPath = path === '/login' || path === '/register';
  const auth = getAuth();

  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (isPublicPath && user) {
        // Si l'utilisateur est connecté et essaie d'accéder aux pages publiques
        resolve(NextResponse.redirect(new URL('/dashboard', request.url)));
      }

      if (!isPublicPath && !user) {
        // Si l'utilisateur n'est pas connecté et essaie d'accéder aux pages protégées
        resolve(NextResponse.redirect(new URL('/login', request.url)));
      }

      resolve(NextResponse.next());
    });
  });
}

// Configurer les chemins qui déclenchent le middleware
export const config = {
  matcher: [
    '/login',
    '/register',
    '/dashboard/:path*',
    '/profile',
  ],
};
