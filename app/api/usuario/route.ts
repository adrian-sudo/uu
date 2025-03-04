import { NextRequest, NextResponse } from 'next/server';
const { connectDB } = require("../../../lib/db.js");
const sql = require("mssql");

export async function GET(req: NextRequest) {
  const db = await connectDB();
  try {
    const result = await db.request().query("SELECT * FROM usuario");
    return NextResponse.json(result.recordset, { status: 200 });
  } catch (error) {
    console.error("❌ Error en la API:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const db = await connectDB();
  const { nombre, apellido, cargo, ciudad, negocio, telefono } = await req.json();
  try {
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
    console.error("❌ Error en la API:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const db = await connectDB();
  const { id, nombre, apellido, cargo, ciudad, negocio, telefono } = await req.json();
  try {
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
        "UPDATE usuario SET nombre=@nombre, apellido=@apellido, cargo=@cargo, ciudad=@ciudad, negocio=@negocio, telefono=@telefono WHERE id=@id"
      );
    return NextResponse.json({ message: "Usuario actualizado" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error en la API:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const db = await connectDB();
  const { id } = await req.json();
  try {
    await db
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM usuario WHERE id=@id");
    return NextResponse.json({ message: "Usuario eliminado" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error en la API:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}