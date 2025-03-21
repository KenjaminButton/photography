import { db } from './config';

// Create posts table
const createPostsTable = `
  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content JSON,
    image_url TEXT,
    status TEXT DEFAULT 'draft',
    published_at INTEGER,
    created_at INTEGER DEFAULT (unixepoch()),
    updated_at INTEGER DEFAULT (unixepoch())
  )
`;

// Create images table
const createImagesTable = `
  CREATE TABLE IF NOT EXISTS images (
    id TEXT PRIMARY KEY,
    post_id TEXT,
    url TEXT NOT NULL,
    public_id TEXT NOT NULL,
    created_at INTEGER DEFAULT (unixepoch()),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
  )
`;

// Add image_url column to posts table if it doesn't exist
const addImageUrlColumn = `ALTER TABLE posts ADD COLUMN image_url TEXT`;

export async function initializeSchema() {
  try {
    // Create tables
    await db.execute(createPostsTable);
    await db.execute(createImagesTable);
    
    // Add image_url column if it doesn't exist
    try {
      await db.execute(addImageUrlColumn);
    } catch {
      // Column might already exist, which is fine
      console.log('Note: image_url column might already exist');
    }
    
    // Create index on posts.slug
    await db.execute('CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug)');
    
    // Create index on images.post_id
    await db.execute('CREATE INDEX IF NOT EXISTS idx_images_post_id ON images(post_id)');
    
    return true;
  } catch (err) {
    console.error('Failed to initialize schema:', err);
    return false;
  }
}

initializeSchema();