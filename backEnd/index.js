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

app.get('/', (req, res) => {
  res.send('Is the server still running?')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})