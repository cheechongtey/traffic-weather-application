import NextAuth from 'next-auth';

const handler = NextAuth({
  providers: [],
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
});

export { handler as GET, handler as POST };
