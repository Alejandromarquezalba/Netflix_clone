import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

interface Credentials {
    email?: string;
    password?: string;
}

const handler = NextAuth({
    providers: [
        CredentialsProvider({
        name: 'Credentials',
        credentials: {
            email: { label: 'Email', type: 'text' },
            password: { label: 'Password', type: 'password' }
        },

//AUTORIZACION
    async authorize(credentials: Credentials) {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                email: credentials?.email,
                password: credentials?.password,
            });

            if (!response.data?.user) { 
                throw new Error("Usuario no encontrado en la respuesta");
            }

            return response.data.user;
        } catch (error: any) {
            console.error('Error en authorize:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Error de autenticación'); 
        }
    },


        }),
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }: { token: any; user?: any }) {
        if (user) {

            token.email = user.email;
            token.name = user.name;

        }
        return token;
        },
        async session({ session, token }: { session: any; token: any }) {
        if (token) {

            session.user.email = token.email as string;
            session.user.name = token.name as string;

        }
        return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };