import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';

export async function isAdmin(): Promise<boolean> {
  const session = await getServerSession();
  return session?.user?.email === process.env.ADMIN_EMAIL;
}

export async function requireAdmin(): Promise<boolean> {
  return isAdmin();
}

// Helper for API routes that need admin protection
export async function withAdmin<T>(handler: () => Promise<T>): Promise<T> {
  const authorized = await isAdmin();
  if (!authorized) {
    throw new Error('Unauthorized');
  }
  return handler();
}

// Helper to get request method and validate it
export function validateMethod(req: NextRequest, allowedMethods: string[]): void {
  const method = req.method.toUpperCase();
  if (!allowedMethods.includes(method)) {
    throw new Error(`Method ${method} not allowed`);
  }
}