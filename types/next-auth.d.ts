import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      is_admin: boolean;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    is_admin: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    is_admin: boolean;
  }
}