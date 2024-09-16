import { User } from '@prisma/client';
import { createUserQuery, getUserByEmailQuery } from './user.query';
import { comparePasswords, hashPassword } from '@/lib/password';
type TCreateUser = 'name' | 'email' | 'password';

export const createUserService = async (data: Pick<User, TCreateUser>) => {
  const { password, email, name } = data;
  const hashedPassword = await hashPassword(password);
  return await createUserQuery({ name, email, password: hashedPassword });
};

export async function credProviderAuthorizeService(
  credentials: Record<'email' | 'password', string> | undefined
) {
  try {
    const user = await getUserByEmailQuery(credentials?.email);
    if (user && credentials?.password) {
      const isValid = await comparePasswords(credentials.password, user.password);
      if (isValid) {
        const { id, name, email } = user;
        return { id, name, email };
      }
    }
    return null;
  } catch (error) {
    console.log("TryCatchError: ", error)
    throw error;
  }
}
