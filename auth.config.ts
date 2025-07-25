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