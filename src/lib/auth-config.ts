import Credentials from 'next-auth/providers/credentials';
import { validateEmail } from './auth';

export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { email, password } = credentials;

        if (!validateEmail(email)) {
          return null;
        }

        // TODO: Query database for user with password verification
        // For MVP: mock user, later connect to Prisma
        const mockUser = {
          id: '1',
          email,
          name: 'Test User',
        };

        return mockUser;
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
};
