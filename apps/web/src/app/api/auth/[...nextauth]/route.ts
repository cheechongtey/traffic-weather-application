import NextAuth from 'next-auth';

const handler = NextAuth({
  providers: [],
  secret: process.env.NEXTAUTH_SECRET as string,
});

export { handler as GET, handler as POST };
