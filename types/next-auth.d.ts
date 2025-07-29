import 'next-auth';
import { User as PrismaUser } from "@prisma/client";

declare module 'next-auth' {
    interface User extends Omit<PrismaUser, "password"> {}
    interface Session {
        user: {
        id: string;
        name?: string;
        email: string;
        role: string;
        } 
    }

    interface User {
        id: string;
        name: string;
        email: string;
        role: string;
    }

    interface JWT {
        id: string;
        name: string;
        email: string;
        role: string;
    }
}