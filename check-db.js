const mysql = require("mysql2/promise");
require("dotenv").config({ path: ".env.local" });

async function check() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    ssl: { rejectUnauthorized: false },
  });

  console.log("✅ Connected to database!");

  const [rows] = await connection.query(
    "SELECT * FROM contacts ORDER BY created_at DESC LIMIT 5"
  );
  console.log("Contacts:", rows);

  await connection.end();
}

check().catch((err) => {
 console.error("❌ Connection failed:", err);
});