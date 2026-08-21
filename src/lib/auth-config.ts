import Credentials from 'next-auth/providers/credentials';
import { validateEmail, verifyPassword } from './auth';

export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        const { email, password } = credentials;

        if (!validateEmail(email)) {
          throw new Error('Invalid email format');
        }

        try {
          // Import Prisma here to defer connection until runtime
          const { prisma } = await import('./db');

          // Query database for user
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            throw new Error('No user found with this email');
          }

          // Verify password
          const passwordValid = await verifyPassword(password, user.password);

          if (!passwordValid) {
            throw new Error('Invalid password');
          }

          // Return user object for session
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
