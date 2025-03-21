import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with our environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload an image and return the URL and public ID
export async function uploadImage(file: Buffer) {
  try {
    // Convert buffer to base64
    const base64Data = file.toString('base64');
    const dataURI = `data:image/jpeg;base64,${base64Data}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'blog-images', // All blog images will go in this folder
      resource_type: 'auto', // Automatically detect file type
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
}

// Delete an image by its public ID
export async function deleteImage(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
}
