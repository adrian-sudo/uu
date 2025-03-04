const sql = require("mssql");

const config = {
  user: process.env.DB_USER || "WillAdmin",
  password: process.env.DB_PASSWORD || "1067594899",
  server: process.env.DB_SERVER || "localhost",
  database: process.env.DB_DATABASE || "Inventario",
  // port: parseInt(process.env.DB_PORT, 10) || 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

async function connectDB() {
  try {
    if (!global.db) {
      global.db = await sql.connect(config);
    }
    return global.db;
  } catch (error) {
    console.error("Error conectando a la base de datos:", error);
  }
}

module.exports = { connectDB };
