import bcrypt from 'bcryptjs';

export const validateEmail = (email: string) => {
  const trimmedEmail = email.trim();
  return trimmedEmail === process.env.ADMIN_EMAIL;
};

export const validatePassword = async (password: string, hashedPassword: string) => {
  const trimmedPassword = password.trim();
  return await bcrypt.compare(trimmedPassword, hashedPassword);
};
