import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';



const handler = NextAuth({
    providers: [
        /* Aquí podnría el google provider si lo usara
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        */
        CredentialsProvider({
        name: 'Credentials',
        credentials: {
            email: { label: 'Email', type: 'text' },
            password: { label: 'Password', type: 'password' }
        },

        

//AUTORIZACION
    async authorize(credentials) {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
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
        maxAge: 60 * 60, //duracion de la sesion 1 hora
        //updateAge: 30 * 30 // para refrescar la sesión cada 30 minutos
    },
    callbacks: {
        async jwt({ token, user }: { token: any; user?: any }) {
        if (user) {
            token.id = user.id; //
            token.email = user.email;
            token.name = user.name;
            token.role = user.role; //
            token.accessToken = user.accessToken; //
        }
        return token;
        },
        async session({ session, token }: { session: any; token: any }) {
        if (token) {

            session.user.id = token.id as string; //
            session.user.email = token.email as string;
            session.user.name = token.name as string;
            session.user.role = token.role as string; //ID y ROLE 
            session.accessToken = token.accessToken as string;
        }
        return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };