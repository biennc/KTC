import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Get user roles from token
    const userRoles = token.roles || [];
    const roleNames = userRoles.map((role: any) =>
      typeof role === 'string' ? role : role?.name
    ).filter(Boolean);

    // Define protected routes and their required roles
    const protectedRoutes: Record<string, string[]> = {
      '/users': ['Administrators'],
      '/settings': ['Administrators'],
      '/tasks/create': ['Administrators', 'Managers'],
      '/tasks/edit': ['Administrators', 'Managers'],
      '/tasks/delete': ['Administrators'],
    };

    // Check if current path requires specific roles
    for (const [route, requiredRoles] of Object.entries(protectedRoutes)) {
      if (pathname.startsWith(route)) {
        const hasAccess = roleNames.some((role: string) =>
          requiredRoles.includes(role)
        );

        if (!hasAccess) {
          // Redirect to unauthorized page or dashboard
          return NextResponse.redirect(new URL('/dashboard?error=unauthorized', req.url));
        }
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/tasks/:path*',
    '/users/:path*',
    '/settings/:path*',
    '/profile/:path*'
  ],
};