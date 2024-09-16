import NextAuth, { NextAuthOptions } from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from 'next-auth/providers/linkedin';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
  FacebookProviderOption,
  GoogleProviderOption,
  LinkedInProviderOption,
  NextAuthCallback,
} from '@/lib/social-login-providers';
import { credProviderAuthorizeService } from '@/db/user/user.service';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
  },
  session: {
    maxAge: 1 * 24 * 60 * 60
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        return credProviderAuthorizeService(credentials);
      },
    }),
    GoogleProvider(GoogleProviderOption),
    FacebookProvider(FacebookProviderOption),
    LinkedInProvider(LinkedInProviderOption),
  ],
  callbacks: {
    async signIn({ profile, account, user, credentials }) {
      try {
        if (!credentials) {
          if (!profile?.email) throw new Error('Email is not registered');
          NextAuthCallback(account, user, profile);
        }
        return true;
      } catch (error) {
        console.log({ error });
        throw error;
      }
    },
    session: ({ session, token, user }) => {
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
