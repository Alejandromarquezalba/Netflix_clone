import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import { NextAuthOptions } from "next-auth"; 

export const authOptions: NextAuthOptions = { 
    adapter: PrismaAdapter(db),
    providers: [], 
    callbacks: {
        session({ session, user }) {
        session.user.id = user.id;
        return session;
        },
    },
};