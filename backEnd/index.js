import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg'; 
import dotenv from 'dotenv';

const { Pool } = pkg;

const app = express();
const port = 4000;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});


async function initDatabase() {
    try {

        const checkTableExists = await pool.query(`
            SELECT EXISTS (
                SELECT 1 
                FROM information_schema.tables 
                WHERE table_name = 'student_data_table'
            );
        `);

        
        if (!checkTableExists.rows[0].exists) {
            await pool.query('DROP TABLE IF EXISTS "public"."student_data_table";');
            await pool.query(`
                CREATE TABLE "public"."student_data_table" (
                    "student_id" SERIAL PRIMARY KEY,
                    "student_name" VARCHAR(100) NOT NULL,
                    "student_score" INT NOT NULL
                );
            `);
            await pool.query(`
                INSERT INTO "public"."student_data_table" (student_name, student_score)
                VALUES 
                    ('John Doe', 90),
                    ('Jane Smith', 85),
                    ('Alice Johnson', 92),
                    ('Bob Brown', 78);
            `);
            console.log('Database initialized with sample data.');
        } else {
            console.log('Table already exists. No need to initialize.');
        }
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

app.get('/test-database', async (req, res) => {
    try {
        await initDatabase(); 

        const result = await pool.query('SELECT * FROM "public"."student_data_table";');
        
  
        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.send('No data found in the student_data_table.');
        }
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).send('Error querying the database');
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
