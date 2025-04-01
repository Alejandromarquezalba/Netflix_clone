import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await db.user.create({
        data: { email, password: hashedPassword },
        });

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
        { error: "Error al registrar" },
        { status: 500 }
        );
    }
}

