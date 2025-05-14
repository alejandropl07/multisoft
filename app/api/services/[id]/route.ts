import { NextResponse, NextRequest } from "next/server";
import { getConnection } from "../../auth/db"; // Asegúrate de usar tu configuración de base de datos

export async function GET(req:NextRequest, { params }:any) {
  try {
    const { id } = params; // Obtén el ID dinámico de la URL
    const pool = await getConnection(); // Conexión a la base de datos

    // Consulta SQL con el parámetro dinámico
    const query = `SELECT * FROM Service WHERE ServiceKey = ${id}`;
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
    const query = `DELETE FROM Service WHERE ServiceKey = ${id}`;

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
    const formData = await req.formData();
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const image = formData.get("image") as string
    const pool = await getConnection();

    // Extraer ID desde la URL (suponiendo formato /api/services/:id)
    const { pathname } = req.nextUrl;
    const idMatch = pathname.match(/\/api\/services\/(\d+)/);
    const ServiceKey = idMatch ? idMatch[1] : null;

    if (!ServiceKey) {
      return NextResponse.json(
        { error: "ServiceKey es requerido en la URL" },
        { status: 400 }
      );
    }

    const query = `UPDATE SERVICE SET title = '${title}', description = '${description}', image_url = '${image}' WHERE ServiceKey = ${ServiceKey}`;

    const result = await pool?.query(query);

    return NextResponse.json({
      message: `Registro con ServiceKey ${ServiceKey} actualizado exitosamente.`,
    });
  } catch (err) {
    console.error("Error al actualizar el registro:", err);
    return NextResponse.json(
      { error: "Error al actualizar el registro de la base de datos" },
      { status: 500 }
    );
  }
}