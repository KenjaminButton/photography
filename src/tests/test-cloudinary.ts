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
    await cloudinary.api.ping();
    console.log('✅ Successfully connected to Cloudinary!');
    
    // Get account usage info
    const usage = await cloudinary.api.usage();
    console.log('📊 Account Usage:', {
      plan: usage.plan,
      credits: usage.credits,
      bandwidth: usage.bandwidth,
      storage: usage.storage,
      requests: usage.requests
    });
    
    return true;
  } catch (err) {
    console.error('❌ Failed to connect to Cloudinary:', err);
    return false;
  }
}

testCloudinaryConnection();
