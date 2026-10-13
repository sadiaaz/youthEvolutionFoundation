require("dotenv").config({ path: ".env.local" });
const mysql = require("mysql2/promise");

async function run() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    ssl: { rejectUnauthorized: false },
  });

  await conn.query(`
    CREATE TABLE IF NOT EXISTS volunteers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) NOT NULL,
      phone VARCHAR(30) NOT NULL DEFAULT '',
      interest VARCHAR(100) NOT NULL DEFAULT '',
      message TEXT NULL,
      status ENUM('Pending','Approved','Rejected') NOT NULL DEFAULT 'Pending',
      reviewed_at TIMESTAMP NULL DEFAULT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  const [cols] = await conn.query(
    "SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'volunteers'",
    [process.env.DB_NAME]
  );
  const have = new Set(cols.map((c) => c.COLUMN_NAME.toLowerCase()));

  const wanted = {
    phone: "VARCHAR(30) NOT NULL DEFAULT ''",
    interest: "VARCHAR(100) NOT NULL DEFAULT ''",
    message: "TEXT NULL",
    status: "ENUM('Pending','Approved','Rejected') NOT NULL DEFAULT 'Pending'",
    reviewed_at: "TIMESTAMP NULL DEFAULT NULL",
    created_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
    updated_at:
      "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
  };

  for (const [name, def] of Object.entries(wanted)) {
    if (!have.has(name)) {
      await conn.query(`ALTER TABLE volunteers ADD COLUMN \`${name}\` ${def}`);
      console.log("Added column:", name);
    }
  }

  await conn.query(
    "UPDATE volunteers SET status = 'Pending' WHERE status IS NULL OR LOWER(status) NOT IN ('pending','approved','rejected')"
  );
  await conn.query(
    "ALTER TABLE volunteers MODIFY COLUMN status ENUM('Pending','Approved','Rejected') NOT NULL DEFAULT 'Pending'"
  );
  await conn.query("ALTER TABLE volunteers MODIFY COLUMN message TEXT NULL");

  for (const sql of [
    "CREATE INDEX idx_volunteers_status ON volunteers (status)",
    "CREATE INDEX idx_volunteers_created ON volunteers (created_at)",
    "CREATE INDEX idx_volunteers_email ON volunteers (email)",
  ]) {
    try {
      await conn.query(sql);
    } catch (e) {
      /* index pehle se hai */
    }
  }

  console.log("✅ volunteers table ready");
  await conn.end();
}

run().catch((e) => {
  console.error("❌ Migration failed:", e);
  process.exit(1);
});