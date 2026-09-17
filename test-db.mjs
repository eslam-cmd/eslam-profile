import { Pool } from "pg";
import { config } from "dotenv";
config({ path: ".env.local" });

console.log("DATABASE_URL present:", !!process.env.DATABASE_URL);
console.log("First 30 chars:", process.env.DATABASE_URL?.substring(0, 30));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

try {
  const r = await pool.query("SELECT NOW() AS now");
  console.log("✅ DB Connected:", r.rows[0].now);

  const tables = await pool.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name",
  );
  console.log(
    "📋 Tables:",
    tables.rows.map((t) => t.table_name),
  );

  const vCount = await pool.query("SELECT COUNT(*) AS c FROM visitors");
  const mCount = await pool.query("SELECT COUNT(*) AS c FROM messages");
  console.log("👥 Visitors:", vCount.rows[0].c);
  console.log("💬 Messages:", mCount.rows[0].c);
} catch (err) {
  console.error("❌ DB Error:", err.message);
  console.error("Full error:", err);
} finally {
  await pool.end();
  process.exit(0);
}
