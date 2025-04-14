import { NextResponse, NextRequest } from "next/server";
import { getConnection } from "../../auth/db"; // Asegúrate de usar tu configuración de base de datos

export async function GET(req:NextRequest, { params }:any) {
  try {
    const { id } = params; // Obtén el ID dinámico de la URL
    const pool = await getConnection(); // Conexión a la base de datos

    // Consulta SQL con el parámetro dinámico
    const query = `SELECT * FROM FAQ WHERE FaqKey = ${id}`;
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
    const query = `DELETE FROM FAQ WHERE FaqKey = ${id}`;

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



export async function PUT(req: NextRequest) {
  try {
    const { Title, Description } = await req.json(); // Ahora solo obtenemos el título y descripción del cuerpo de la solicitud
    const pool = await getConnection();

    // Extraemos BlogKey directamente desde los parámetros de la URL
    const { searchParams } = new URL(req.url);
    const BlogKey = searchParams.get('BlogKey');

    if (!BlogKey) {
      return NextResponse.json(
        { error: "BlogKey es requerido en la URL" },
        { status: 400 }
      );
    }

    const query = `
      UPDATE FAQ
      SET title = ${Title}, Description = ${Description}
      WHERE BlogKey = ${BlogKey}
    `;

    const result = await pool?.query(query);

    return NextResponse.json({
      message: `Registro con BlogKey ${BlogKey} actualizado exitosamente.`,
    });
  } catch (err) {
    console.error("Error al actualizar el registro:", err);
    return NextResponse.json(
      { error: "Error al actualizar el registro de la base de datos" },
      { status: 500 }
    );
  }
}
