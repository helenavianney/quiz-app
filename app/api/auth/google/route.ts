import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Google OAuth configuration
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${process.env.NEXTAUTH_URL}/api/auth/google/callback`;

  if (!googleClientId) {
    return NextResponse.json(
      { error: "Google OAuth tidak dikonfigurasi" },
      { status: 500 }
    );
  }

  // Google OAuth URL
  const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  googleAuthUrl.searchParams.set("client_id", googleClientId);
  googleAuthUrl.searchParams.set("redirect_uri", redirectUri);
  googleAuthUrl.searchParams.set("response_type", "code");
  googleAuthUrl.searchParams.set("scope", "openid email profile");
  googleAuthUrl.searchParams.set("access_type", "offline");

  return NextResponse.redirect(googleAuthUrl.toString());
}