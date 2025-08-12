import 'next-auth';
import { User as PrismaUser } from "@prisma/client";

declare module 'next-auth' {
    interface User extends Partial<Omit<PrismaUser, "password">> {
        id: string;
        name?: string | null;
        email: string;
        role?: string;
        accessToken?: string;
    }
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            role?: string;
            } & DefaultSession["user"];
            accessToken?: string;
        }
    interface JWT {
        id: string;
        name?: string | null;
        email?: string | null;
        role?: string;
        accessToken?: string;
    }
}