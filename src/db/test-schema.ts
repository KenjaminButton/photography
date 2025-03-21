import { db } from './config';
import { initializeSchema } from './schema';

console.log('Testing schema initialization...');

async function testSchema() {
    try {
        // Initialize the schema
        const success = await initializeSchema();
        
        if (!success) {
            console.error('❌ Failed to initialize schema');
            return;
        }

        // Verify tables exist
        const result = await db.execute(`
            SELECT name 
            FROM sqlite_master 
            WHERE type='table' AND (name='posts' OR name='images')
        `);
        
        const tables = result.rows.map(row => row.name);
        console.log('✅ Created tables:', tables);

        // Test creating a post
        await db.execute(`
            INSERT INTO posts (id, title, slug, content) 
            VALUES (?, ?, ?, ?)
        `, ['test-post', 'Test Post', 'test-post', JSON.stringify({ body: 'Test content' })]);

        console.log('✅ Test post created successfully');

        // Clean up test data
        await db.execute('DELETE FROM posts WHERE id = ?', ['test-post']);
        
        console.log('✅ Schema test completed successfully');
    } catch (error) {
        console.error('❌ Schema test failed:', error);
    }
}

testSchema().catch(console.error);