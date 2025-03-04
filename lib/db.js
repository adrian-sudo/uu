import sql from "mssql";

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export async function connectDB() {
  try {
    if (!global.db) {
      global.db = await sql.connect(config);
    }
    return global.db;
  } catch (error) {
    console.error("Error conectando a la base de datos:", error);
  }
}
