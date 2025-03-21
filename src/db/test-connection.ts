import { db } from './config';

console.log('Testing database connection...');

async function test() {
    try {
        // Create a test table
        await db.execute(`
            CREATE TABLE IF NOT EXISTS turso_test (
                id INTEGER PRIMARY KEY,
                test_at INTEGER DEFAULT (unixepoch())
            )
        `);
        
        // Insert a test row
        await db.execute(`INSERT INTO turso_test (id) VALUES (1)`);
        
        // Read it back
        const result = await db.execute(`SELECT * FROM turso_test`);
        console.log('✅ Test table created and data inserted:', result.rows[0]);
        
        // Clean up
        await db.execute(`DROP TABLE turso_test`);
        console.log('✅ Test table cleaned up');
        
        console.log('✅ Successfully connected to Turso database');
    } catch (error) {
        console.error('❌ Connection test failed with error:', error);
    }
    console.log('Connection test complete.');
}

test().catch(console.error);