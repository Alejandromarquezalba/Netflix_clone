import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth";

const { handlers } = NextAuth(authConfig); // handlers para GET/POST

export const { GET, POST } = handlers; // Exporta directamente