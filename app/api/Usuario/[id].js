import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import sql from "mssql";

// PUT: Actualizar un usuario por ID
export async function PUT(req, { params }) {
  try {
    const db = await connectDB();
    const { id } = params; // Obtener el ID de la URL
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

    return NextResponse.json(
      { message: "Usuario actualizado" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error en la API (PUT):", error);
    return NextResponse.json(
      { message: "Error al actualizar el usuario" },
      { status: 500 }
    );
  }
}

// DELETE: Eliminar un usuario por ID
export async function DELETE(req, { params }) {
  try {
    const db = await connectDB();
    const { id } = params; // Obtener el ID de la URL

    await db
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM usuario WHERE id=@id");

    return NextResponse.json({ message: "Usuario eliminado" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error en la API (DELETE):", error);
    return NextResponse.json(
      { message: "Error al eliminar el usuario" },
      { status: 500 }
    );
  }
}
