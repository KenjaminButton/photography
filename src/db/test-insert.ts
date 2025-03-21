import { db } from './config';
import crypto from 'crypto';

console.log('Testing data insertion...');

// Insert a test post
const postId = crypto.randomUUID();
const postResult = db.prepare(`
    INSERT INTO posts (id, title, slug, status)
    VALUES (?, ?, ?, ?)
`).run(postId, 'Test Post', 'test-post', 'draft');

// Insert a test image linked to the post
const imageResult = db.prepare(`
    INSERT INTO images (id, cloudinary_id, url, secure_url, post_id)
    VALUES (?, ?, ?, ?, ?)
`).run(
    crypto.randomUUID(),
    'test_cloud_id',
    'http://example.com/test.jpg',
    'https://example.com/test.jpg',
    postId
);

// Verify the data
const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(postId);
const images = db.prepare('SELECT * FROM images WHERE post_id = ?').all(postId);

console.log('Inserted post:', post);
console.log('Linked images:', images);