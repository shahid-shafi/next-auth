import { TSessionTokenCookie } from '@/types/types';
import { User, getServerSession } from 'next-auth';
import { cookies } from 'next/headers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const session = async ({ session, token }: any) => {
  console.log({ session, token });
  session.user.id = token.id;
  session.user.tenant = token.tenant;
  return session;
};

export const getUserSession = async (): Promise<User> => {
  const authUserSession = await getServerSession({
    callbacks: {
      session,
    },
  });
  return authUserSession?.user;
};

export const getSessionToken = () => {
  const cookieStore = cookies();
  const sessionTokenCookie: TSessionTokenCookie = cookieStore?.get(
    'next-auth.session-token'
  ) || { value: null };
  return sessionTokenCookie?.value;
};
