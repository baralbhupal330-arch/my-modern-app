import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { hashPassword, verifyPassword, validateEmail } from './auth';

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) {
          return null;
        }

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
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAuthPage = nextUrl.pathname.startsWith('/(auth)');

      if (isOnAuthPage) {
        return !isLoggedIn;
      }

      return isLoggedIn || nextUrl.pathname === '/';
    },
  },
} satisfies NextAuthConfig;
