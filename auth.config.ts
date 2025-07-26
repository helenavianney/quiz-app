import type { NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';
import { z } from 'zod'
import { prisma } from '@/app/lib/prisma'
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      // After Google login, redirect based on user role
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl + '/quiz';
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.is_admin = token.is_admin as boolean;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.is_admin = user.is_admin;
      }
      return token;
    },
  },
  providers: [
    Google({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    Credentials({
        name: 'credentials',
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            const schema = z.object({
                email: z.string().email(),
                password: z.string().min(6),
            });

            const { email, password } = schema.parse(credentials);

            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) throw new Error('User Not Found');

            const passwordsMatch = await bcrypt.compare(password, user.password);

            if (!passwordsMatch) throw new Error('Invalid Password');

            return {
            id: user.id,
            name: user.name,
            email: user.email,
            is_admin: user.is_admin,
            };
        },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};