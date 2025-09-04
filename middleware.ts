import { withAuth } from "next-auth/middleware";

const protectedRoutes = [
    "/movies",        
    "/series",
    "/profile",    
    "/favorites",   
];

export default withAuth(
    function middleware(req) {
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));
                if (!isProtectedRoute) {
                    return true;
                }
                return !!token;
            },
        },
        pages: {
            signIn: '/login',
        }
    }
);

export const config = {
    matcher: [
    "/movies/:path*",    
    "/series/:path*",
    "/profile/:path*",
    "/favorites/:path*",
    ],
};