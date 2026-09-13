const mysql = require("mysql2/promise");
require("dotenv").config({ path: ".env.local" });

async function createTable() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      ssl: { rejectUnauthorized: false }
    });

    await connection.query(
      "CREATE TABLE IF NOT EXISTS donations (" +
      "id INT AUTO_INCREMENT PRIMARY KEY, " +
      "donor_name VARCHAR(255) NOT NULL, " +
      "donor_email VARCHAR(255) NOT NULL, " +
      "donor_phone VARCHAR(20), " +
      "amount DECIMAL(10,2) NOT NULL, " +
      "payment_method VARCHAR(50) NOT NULL, " +
      "transaction_ref VARCHAR(100), " +
      "status VARCHAR(20) DEFAULT 'Pending', " +
      "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
      ")"
    );

    console.log("Table created successfully!");
    await connection.end();
  } catch (error) {
    console.log("Error:", error.message);
  }
}

createTable();
