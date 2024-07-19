import { withAuth } from 'next-auth/middleware';

export default withAuth({
    pages: {
        signIn: '/login'
    }
})

export const config = {
    matcher: [
        // '/',
        // '/exercises/:path*',
        // '/history',
        // '/measures',
        // '/profile/:path*',
        // '/program/:path*',
        // '/routines/:path*',
        // '/settings/:path*',
        // '/workout/:path*'
    ]
}