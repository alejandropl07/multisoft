import { NextResponse, NextRequest } from "next/server";
import { getConnection } from "../../auth/db"; // Asegúrate de usar tu configuración de base de datos

export async function GET(req:NextRequest, { params }:any) {
  try {
    const { id } = params; // Obtén el ID dinámico de la URL
    const pool = await getConnection(); // Conexión a la base de datos

    // Consulta SQL con el parámetro dinámico
    const query = `SELECT * FROM ValuesTable WHERE ValueKey = ${id}`;
    const result = await pool?.query(query);

    if (!result?.recordset || result.recordset.length === 0) {
      return NextResponse.json(
        { error: "No se encontró el blog con el ID proporcionado." },
        { status: 404 }
      );
    }

    return NextResponse.json(result.recordset[0]); // Devuelve el registro encontrado como JSON
  } catch (err) {
    console.error("Error al obtener el blog por ID:", err);
    return NextResponse.json(
      { error: "Error al obtener el blog por ID de la base de datos." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }:any) {
  try {
    const { id } = params; // Obtén el ID dinámico de la URL
    const pool = await getConnection();
    const query = `DELETE FROM ValuesTable WHERE ValueKey = ${id}`;

    const result = await pool?.query(query);

    return NextResponse.json({ message: `Registro con ID ${id} eliminado exitosamente.` });
  } catch (err) {
    console.error("Error al eliminar el registro:", err);
    return NextResponse.json(
      { error: "Error al eliminar el registro de la base de datos" },
      { status: 500 }
    );
  }
}
