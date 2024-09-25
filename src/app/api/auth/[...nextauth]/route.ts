import NextAuth from "next-auth/next";
import { AuthOprions } from '@/lib/auth';

const handler = NextAuth(AuthOprions);

export { handler as GET, handler as POST };