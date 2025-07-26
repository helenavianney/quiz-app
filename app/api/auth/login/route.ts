import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = loginSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password } = validationResult.data;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        is_admin: true,
        created_at: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email salah" },
        { status: 401 }
      );
    }

    console.log("Input password:", password);
    console.log("Stored hash:", user.password);
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid Password" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        message: "Login berhasil",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          is_admin: user.is_admin,
          created_at: user.created_at
        },
        redirectTo: user.is_admin ? "/admin" : "/quiz"
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}