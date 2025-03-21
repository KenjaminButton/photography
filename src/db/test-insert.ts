import { db } from './config';
import crypto from 'crypto';

console.log('Testing data insertion...');

// Insert a test post
const postId = crypto.randomUUID();
db.execute({
  sql: `INSERT INTO posts (id, title, slug, status) VALUES (?, ?, ?, ?)`,
  args: [postId, 'Test Post', 'test-post', 'draft']
});

// Insert a test image linked to the post
db.execute({
  sql: `INSERT INTO images (id, url, public_id, post_id) VALUES (?, ?, ?, ?)`,
  args: [
    crypto.randomUUID(),
    'https://example.com/test.jpg',
    'test_public_id',
    postId
  ]
});

console.log('Test data inserted successfully');