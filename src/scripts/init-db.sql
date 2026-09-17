-- ═══════════════════════════════════════════
-- جدول الزوار
-- ═══════════════════════════════════════════
CREATE TABLE IF NOT EXISTS visitors (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id        VARCHAR(255) UNIQUE NOT NULL,
  first_seen        TIMESTAMP DEFAULT NOW(),
  last_seen         TIMESTAMP DEFAULT NOW(),
  visit_count       INTEGER DEFAULT 1,
  ip_address        VARCHAR(45),
  os                VARCHAR(50),
  os_version        VARCHAR(50),
  browser           VARCHAR(50),
  browser_version   VARCHAR(50),
  device_type       VARCHAR(20),
  screen_resolution VARCHAR(20),
  language          VARCHAR(10),
  timezone          VARCHAR(50),
  user_agent        TEXT,
  notes             TEXT
);

CREATE INDEX IF NOT EXISTS idx_visitors_visitor_id
  ON visitors(visitor_id);
CREATE INDEX IF NOT EXISTS idx_visitors_last_seen
  ON visitors(last_seen DESC);

-- ═══════════════════════════════════════════
-- جدول الرسائل
-- ═══════════════════════════════════════════
CREATE TABLE IF NOT EXISTS messages (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id        UUID NOT NULL REFERENCES visitors(id) ON DELETE CASCADE,
  conversation_id   UUID NOT NULL,
  role              VARCHAR(10) NOT NULL CHECK (role IN ('user', 'model')),
  content           TEXT NOT NULL,
  created_at        TIMESTAMP DEFAULT NOW(),
  tokens_used       INTEGER,
  language          VARCHAR(5),
  metadata          JSONB
);

CREATE INDEX IF NOT EXISTS idx_messages_visitor_id
  ON messages(visitor_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id
  ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at
  ON messages(created_at DESC);