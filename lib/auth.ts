import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import type { NextAuthConfig } from "next-auth"; // <-- Nuevo tipo

export const authConfig: NextAuthConfig = { // <-- Usa NextAuthConfig
    adapter: PrismaAdapter(db),
    providers: [], // Añade tus proveedores aquí
    callbacks: {
        session({ session, user }) {
        session.user.id = user.id;
        return session;
        },
    },
};