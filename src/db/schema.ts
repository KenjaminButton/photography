import { db } from './config';

// Create posts table
const createPostsTable = `
  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content JSON,
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
    cloudinary_id TEXT NOT NULL,
    url TEXT NOT NULL,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL,
    format TEXT NOT NULL,
    post_id TEXT,
    created_at INTEGER DEFAULT (unixepoch()),
    updated_at INTEGER DEFAULT (unixepoch()),
    FOREIGN KEY (post_id) REFERENCES posts(id)
  )
`;

export async function initializeSchema() {
  try {
    // Create tables
    await db.execute(createPostsTable);
    await db.execute(createImagesTable);
    
    // Create index on posts.slug
    await db.execute('CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug)');
    
    // Create index on images.post_id
    await db.execute('CREATE INDEX IF NOT EXISTS idx_images_post_id ON images(post_id)');
    
    return true;
  } catch (error) {
    console.error('Failed to initialize schema:', error);
    return false;
  }
}