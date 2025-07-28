import NextAuth from "next-auth";
import { authOptions } from "@/auth.config";

const handler = NextAuth(authOptions);
console.log("Callback URL:", process.env.NEXTAUTH_URL);

export { handler as GET, handler as POST };