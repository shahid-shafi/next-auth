import bcrypt from 'bcrypt';

export const comparePasswords = async (password: string, dbPassword: string) => {
  return await bcrypt.compare(password, dbPassword);
}

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 5)
}