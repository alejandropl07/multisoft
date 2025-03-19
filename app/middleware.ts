import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your_jwt_secret';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  // Define las rutas públicas
  const publicRoutes = ['/login'];

  // Permite el acceso a las rutas públicas sin autenticación
  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Verifica el token para las rutas privadas
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    jwt.verify(token, secret);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/blog-admin', '/about-admin', '/private/*'], // Define tus rutas privadas
};