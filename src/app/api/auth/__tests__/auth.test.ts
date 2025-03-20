import { describe, it, expect, beforeEach } from 'vitest';
import { validateEmail, validatePassword } from '../[...nextauth]/route';
import bcrypt from 'bcryptjs';

describe('Auth Validation', () => {
  let hashedPassword: string;

  beforeEach(async () => {
    // Create a test password hash
    hashedPassword = await bcrypt.hash('testPassword123', 10);
    process.env.ADMIN_EMAIL = 'admin@test.com';
    process.env.ADMIN_PASSWORD = hashedPassword;
  });

  describe('Email Validation', () => {
    it('should validate correct email', () => {
      expect(validateEmail('admin@test.com')).toBe(true);
    });

    it('should validate email with whitespace', () => {
      expect(validateEmail('  admin@test.com  ')).toBe(true);
    });

    it('should reject incorrect email', () => {
      expect(validateEmail('wrong@email.com')).toBe(false);
    });
  });

  describe('Password Validation', () => {
    it('should validate correct password', async () => {
      const isValid = await validatePassword('testPassword123', hashedPassword);
      expect(isValid).toBe(true);
    });

    it('should validate password with whitespace', async () => {
      const isValid = await validatePassword('  testPassword123  ', hashedPassword);
      expect(isValid).toBe(true);
    });

    it('should reject incorrect password', async () => {
      const isValid = await validatePassword('wrongPassword', hashedPassword);
      expect(isValid).toBe(false);
    });
  });
});
