import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login?error=Google login dibatalkan`);
    }

    if (!code) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login?error=Kode otorisasi tidak ditemukan`);
    }

    // Exchange code for access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.GOOGLE_REDIRECT_URI || `${process.env.NEXTAUTH_URL}/api/auth/google/callback`,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login?error=Gagal mendapatkan token Google`);
    }

    // Get user info from Google
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const googleUser = await userResponse.json();

    if (!userResponse.ok) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login?error=Gagal mendapatkan info pengguna Google`);
    }

    // Check if user exists or create new user
    let user = await prisma.user.findUnique({
      where: { email: googleUser.email },
    });

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          name: googleUser.name,
          email: googleUser.email,
          password: "", // Empty password for Google users
          is_admin: false,
          created_at: new Date(),
        },
      });
    }

    // Redirect to quiz page with success
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/quiz?message=Login berhasil`);
  } catch (error) {
    console.error("Google OAuth callback error:", error);
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login?error=Terjadi kesalahan saat login dengan Google`);
  }
}