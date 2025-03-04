import { connectDB } from "../../lib/db";
import sql from "mssql";

export default async function handler(req, res) {
  const db = await connectDB();

  try {
    if (req.method === "GET") {
      const result = await db.request().query("SELECT * FROM usuario");
      return res.status(200).json(result.recordset);
    }

    if (req.method === "POST") {
      const { nombre, apellido, cargo, ciudad, negocio, telefono } = req.body;
      await db
        .request()
        .input("nombre", sql.NVarChar, nombre)
        .input("apellido", sql.NVarChar, apellido)
        .input("cargo", sql.NVarChar, cargo)
        .input("ciudad", sql.NVarChar, ciudad)
        .input("negocio", sql.NVarChar, negocio)
        .input("telefono", sql.NVarChar, telefono)
        .query(
          "INSERT INTO usuarios (nombre, apellido, cargo, ciudad, negocio, telefono) VALUES (@nombre, @apellido, @cargo, @ciudad, @negocio, @telefono)"
        );
      return res.status(201).json({ message: "Usuario creado" });
    }

    if (req.method === "PUT") {
      const { id, nombre, apellido, cargo, ciudad, negocio, telefono } =
        req.body;
      await db
        .request()
        .input("id", sql.Int, id)
        .input("nombre", sql.NVarChar, nombre)
        .input("apellido", sql.NVarChar, apellido)
        .input("cargo", sql.NVarChar, cargo)
        .input("ciudad", sql.NVarChar, ciudad)
        .input("negocio", sql.NVarChar, negocio)
        .input("telefono", sql.NVarChar, telefono)
        .query(
          "UPDATE usuarios SET nombre=@nombre, apellido=@apellido, cargo=@cargo, ciudad=@ciudad, negocio=@negocio, telefono=@telefono WHERE id=@id"
        );
      return res.status(200).json({ message: "Usuario actualizado" });
    }

    if (req.method === "DELETE") {
      const { id } = req.body;
      await db
        .request()
        .input("id", sql.Int, id)
        .query("DELETE FROM usuario WHERE id=@id");
      return res.status(200).json({ message: "Usuario eliminado" });
    }

    return res.status(405).json({ message: "Método no permitido" });
  } catch (error) {
    console.error("❌ Error en la API:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
