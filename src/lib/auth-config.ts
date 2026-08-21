import Credentials from 'next-auth/providers/credentials';
import { hashPassword, verifyPassword, validateEmail } from './auth';

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

        // TODO: Query database for user
        // For now, mock user
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
};
