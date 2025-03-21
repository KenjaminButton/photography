import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { validateEmail, validatePassword } from '@/lib/auth-utils';

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    }
  }

  interface User {
    id: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
  }
}

// Extend the built-in JWT types
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter both email and password');
        }

        // Validate email
        if (!validateEmail(credentials.email)) {
          throw new Error('Invalid email or password');
        }

        // Get hashed password from env
        const hashedPassword = process.env.ADMIN_PASSWORD;
        if (!hashedPassword) {
          throw new Error('Server configuration error');
        }

        // Validate password
        const isValid = await validatePassword(
          credentials.password,
          hashedPassword
        );

        if (!isValid) {
          throw new Error('Invalid email or password');
        }

        // Return minimal user object
        return {
          id: '1',
          email: process.env.ADMIN_EMAIL,
          name: 'Admin'
        };
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
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
