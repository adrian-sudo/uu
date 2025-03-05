// lib/db.js
import sql from "mssql";

const config = {
  server: "localhost\\SQLEXPRESS", // localhost
  database: "Inventario",
  options: {
    trustedConnection: true,
    encrypt: false,
    trustServerCertificate: true,
  },
};

export async function connectToDatabase() {
  try {
    await sql.connect(config);
    console.log("Conexión a la base de datos exitosa");
    return sql;
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    throw error;
  }
}
