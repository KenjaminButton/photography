import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('=== Auth Debug ===');
        console.log('Attempting login with:', credentials?.email);
        
        // TEMPORARY: Using plain text comparison for testing
        if (
          credentials?.email === process.env.ADMIN_EMAIL &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          console.log('Login successful');
          return {
            id: '1',
            email: process.env.ADMIN_EMAIL,
            name: 'Admin'
          };
        }

        console.log('Login failed');
        console.log('Expected:', {
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD
        });
        console.log('Received:', {
          email: credentials?.email,
          password: credentials?.password
        });

        throw new Error('Invalid credentials');
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
