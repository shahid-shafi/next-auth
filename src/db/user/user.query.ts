import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

type TCreateUser = 'name' | 'email' | 'password';

export const createUserQuery = (data: Pick<User, TCreateUser>) => {
  return prisma.user.create({ data });
}

export const getUserByEmailQuery = async (email: string | undefined) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const getUserByIdQuery = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export const getUserByUserNameQuery = (username: string) => {
  return prisma.user.findUnique({
    where: { username },
  });
}
