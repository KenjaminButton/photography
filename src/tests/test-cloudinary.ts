import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function testCloudinaryConnection() {
  try {
    // Try to get account details
    const result = await cloudinary.api.ping();
    console.log('✅ Successfully connected to Cloudinary!');
    
    // Get account usage info
    const usage = await cloudinary.api.usage();
    console.log('Account details:', {
      plan: usage.plan,
      credits: usage.credits,
      storage: usage.storage
    });

  } catch (error) {
    console.error('❌ Failed to connect to Cloudinary:', error);
    // Log environment variables (safely)
    console.log('Environment check:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? '✓' : '✗',
      api_key: process.env.CLOUDINARY_API_KEY ? '✓' : '✗',
      api_secret: process.env.CLOUDINARY_API_SECRET ? '✓' : '✗'
    });
  }
}

testCloudinaryConnection();
