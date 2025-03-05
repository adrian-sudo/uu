import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import sql from "mssql";

// GET: Obtener todos los usuarios
export async function GET() {
  try {
    const db = await connectDB();
    const result = await db.request().query("SELECT * FROM usuario");
    return NextResponse.json(result.recordset, { status: 200 });
  } catch (error) {
    console.error("❌ Error en la API (GET):", error);
    return NextResponse.json(
      { message: "Error al obtener los usuarios" },
      { status: 500 }
    );
  }
}

// POST: Crear un nuevo usuario
export async function POST(req) {
  try {
    const db = await connectDB();
    const { nombre, apellido, cargo, ciudad, negocio, telefono } =
      await req.json();

    // Validación básica
    if (!nombre || !apellido || !cargo || !ciudad || !negocio || !telefono) {
      return NextResponse.json(
        { message: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    await db
      .request()
      .input("nombre", sql.NVarChar, nombre)
      .input("apellido", sql.NVarChar, apellido)
      .input("cargo", sql.NVarChar, cargo)
      .input("ciudad", sql.NVarChar, ciudad)
      .input("negocio", sql.NVarChar, negocio)
      .input("telefono", sql.NVarChar, telefono)
      .query(
        "INSERT INTO usuario (nombre, apellido, cargo, ciudad, negocio, telefono) VALUES (@nombre, @apellido, @cargo, @ciudad, @negocio, @telefono)"
      );

    return NextResponse.json({ message: "Usuario creado" }, { status: 201 });
  } catch (error) {
    console.error("❌ Error en la API (POST):", error);
    return NextResponse.json(
      { message: "Error al crear el usuario" },
      { status: 500 }
    );
  }
}
