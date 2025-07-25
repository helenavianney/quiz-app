import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name?: string | null;
      email?: string | null;
      is_admin: boolean;
    };
  }

  interface User {
    id: number;
    name?: string | null;
    email?: string | null;
    is_admin: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    is_admin: boolean;
  }
}