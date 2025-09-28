import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // من Neon
  ssl: { rejectUnauthorized: false },
});

export default pool;