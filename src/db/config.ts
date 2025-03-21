// This is a simple configuration file that:

// 1. Imports the createClient function from @libsql/client
// 2. Provides a test function to verify our connection
// 3. Re-exports db for use in other files

import { createClient } from "@libsql/client";
import { config } from 'dotenv';
import path from 'path';

// Load environment variables
const envPath = path.resolve(process.cwd(), '.env.local');
config({ path: envPath });

// Initialize database
const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

// Debug: Print exact values (but mask most of auth token)
console.log('Database config:', {
  url,
  authToken: authToken ? `${authToken.slice(0, 10)}...` : undefined
});

if (!url) {
  throw new Error("TURSO_DATABASE_URL is not set");
}

if (!authToken) {
  throw new Error("TURSO_AUTH_TOKEN is not set");
}

// Create client with only remote connection
export const db = createClient({
  url: `libsql://${url.replace('https://', '')}`,
  authToken
});

// Test the database connection
export async function testConnection() {
  try {
    const result = await db.execute("SELECT 1");
    console.log('Database connected:', result);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}