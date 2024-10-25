// kani inyong main sa backend
import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg'; 
import dotenv from 'dotenv';

const { Pool } = pkg;

const app = express()
const port = 4000;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

// Function to initialize the database and insert sample data
async function initDatabase() {
  try {
      // Drop the table if it exists
      await pool.query('DROP TABLE IF EXISTS "public"."student_data_table";');
      
      // Create the student_data_table
      await pool.query(`
          CREATE TABLE "public"."student_data_table" (
              "student_id" SERIAL PRIMARY KEY,
              "student_name" VARCHAR(100) NOT NULL,
              "student_score" INT NOT NULL
          );
      `);
      
      // Insert sample data
      await pool.query(`
          INSERT INTO "public"."student_data_table" (student_name, student_score)
          VALUES 
              ('John Doe', 90),
              ('Jane Smith', 85),
              ('Alice Johnson', 92),
              ('Bob Brown', 78);
      `);
      
      // Fetch and print the data to the console
      const result = await pool.query('SELECT * FROM "public"."student_data_table";');
      console.log('Sample data inserted:', result.rows);
  } catch (error) {
      console.error('Error initializing database:', error);
  }
}

// Call the initDatabase function directly to set up the database on server start
initDatabase();

// Define the endpoint
app.get('/', (req, res) => {
  res.send('Database initialized and data inserted. Check your console for the data.');
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
