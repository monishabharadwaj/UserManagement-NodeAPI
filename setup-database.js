const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
    let connection;
    
    try {
        console.log('Connecting to MySQL database...');
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'Root@password',
            database: process.env.DB_NAME || 'usermanagement',
            multipleStatements: true // Allow multiple SQL statements
        });

        console.log('✓ Connected to database:', process.env.DB_NAME);

        // Read the SQL file
        const sqlFile = path.join(__dirname, 'database', 'init.sql');
        const sql = fs.readFileSync(sqlFile, 'utf8');

        console.log('Creating tables...');
        
        // Execute the SQL script statement-by-statement so the script is idempotent
        const statements = sql
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length);

        console.log(`Running ${statements.length} SQL statements...`);

        for (const stmt of statements) {
            try {
                await connection.query(stmt);
            } catch (err) {
                // Ignore duplicate index errors so setup is safe to re-run
                if (err.code === 'ER_DUP_KEYNAME' || /Duplicate key name/i.test(err.message)) {
                    console.warn('Warning: duplicate key or index exists — skipping statement');
                    continue;
                }
                // For other errors rethrow so they can be diagnosed
                throw err;
            }
        }

        console.log('✓ Tables and indexes created (or already existed)');

        // Verify tables were created
        const [tables] = await connection.execute('SHOW TABLES');
        console.log('\nTables in database:');
        tables.forEach(table => {
            console.log(`  - ${Object.values(table)[0]}`);
        });

        console.log('\n✓ Database setup complete!');
        console.log('You can now start the server with: npm start or npm run dev');

    } catch (error) {
        console.error('\n✗ Error setting up database:');
        console.error('  Message:', error.message);
        
        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('\n  → Check your MySQL username and password in .env file');
        } else if (error.code === 'ER_BAD_DB_ERROR') {
            console.error('\n  → Database does not exist. Create it first:');
            console.error(`     CREATE DATABASE ${process.env.DB_NAME};`);
        } else if (error.code === 'ECONNREFUSED') {
            console.error('\n  → Cannot connect to MySQL. Make sure MySQL is running.');
        }
        
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
            console.log('\nConnection closed.');
        }
    }
}

setupDatabase();
