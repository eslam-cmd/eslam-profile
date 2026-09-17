import { Pool } from "pg";

// Singleton pool لتجنّب فتح اتصالات متعددة في dev mode
let pool;

if (!global._pgPool) {
  global._pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes("sslmode=require")
      ? { rejectUnauthorized: false }
      : false,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });
}
pool = global._pgPool;

/**
 * حفظ أو تحديث بيانات زائر
 */
export async function upsertVisitor(visitorId, deviceInfo, ip, userAgent) {
  const query = `
    INSERT INTO visitors (
      visitor_id, ip_address, os, os_version,
      browser, browser_version, device_type,
      screen_resolution, language, timezone, user_agent
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    ON CONFLICT (visitor_id) DO UPDATE SET
      last_seen         = NOW(),
      visit_count       = visitors.visit_count + 1,
      ip_address        = EXCLUDED.ip_address,
      os                = EXCLUDED.os,
      os_version        = EXCLUDED.os_version,
      browser           = EXCLUDED.browser,
      browser_version   = EXCLUDED.browser_version,
      device_type       = EXCLUDED.device_type,
      screen_resolution = EXCLUDED.screen_resolution,
      language          = EXCLUDED.language,
      timezone          = EXCLUDED.timezone,
      user_agent        = EXCLUDED.user_agent
    RETURNING id;
  `;

  const values = [
    visitorId,
    ip || null,
    deviceInfo?.os || null,
    deviceInfo?.osVersion || null,
    deviceInfo?.browser || null,
    deviceInfo?.browserVersion || null,
    deviceInfo?.deviceType || null,
    deviceInfo?.screen || null,
    deviceInfo?.language || null,
    deviceInfo?.timezone || null,
    userAgent || null,
  ];

  const result = await pool.query(query, values);
  return result.rows[0].id;
}

/**
 * حفظ رسالة
 */
export async function saveMessage({
  visitorUuid,
  conversationId,
  role,
  content,
  language,
}) {
  const query = `
    INSERT INTO messages (visitor_id, conversation_id, role, content, language)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, created_at;
  `;
  const result = await pool.query(query, [
    visitorUuid,
    conversationId,
    role,
    content,
    language || null,
  ]);
  return result.rows[0];
}

/**
 * استرجاع آخر N رسالة للزائر (للسياق)
 */
export async function getRecentHistory(visitorUuid, limit = 6) {
  const query = `
    SELECT role, content, created_at
    FROM messages
    WHERE visitor_id = $1
    ORDER BY created_at DESC
    LIMIT $2;
  `;
  const result = await pool.query(query, [visitorUuid, limit]);
  return result.rows.reverse();
}

/**
 * استرجاع محادثة الزائر الكاملة
 */
export async function getFullHistory(visitorId, limit = 30) {
  const visitorQuery = `SELECT id FROM visitors WHERE visitor_id = $1 LIMIT 1;`;
  const visitorResult = await pool.query(visitorQuery, [visitorId]);

  if (visitorResult.rows.length === 0) return [];

  const messagesQuery = `
    SELECT role, content, created_at
    FROM messages
    WHERE visitor_id = $1
    ORDER BY created_at ASC
    LIMIT $2;
  `;
  const result = await pool.query(messagesQuery, [
    visitorResult.rows[0].id,
    limit,
  ]);

  return result.rows.map((m) => ({
    role: m.role,
    text: m.content,
    createdAt: m.created_at,
  }));
}

export { pool };
