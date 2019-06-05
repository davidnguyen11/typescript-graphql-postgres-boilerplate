const { Pool } = require('pg');
require('dotenv').config();

export function connect() {
  return new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
}
