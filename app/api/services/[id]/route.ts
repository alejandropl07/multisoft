import { NextResponse, NextRequest } from "next/server";
import { getConnection } from "../../auth/db"; // Asegúrate de usar tu configuración de base de datos
import cloudinary from "@/config/cloudinary";

export async function GET(req: NextRequest, { params }: any) {
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

export async function DELETE(req: NextRequest, { params }: any) {
  try {
    const { id } = params; // Obtén el ID dinámico de la URL
    const pool = await getConnection();
    const query = `DELETE FROM Service WHERE ServiceKey = ${id}`;

    const result = await pool?.query(query);

    return NextResponse.json({
      message: `Registro con ID ${id} eliminado exitosamente.`,
    });
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
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const file = formData.get("image") as Blob | any;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Subir la imagen a Cloudinary como stream
    const uploadResult: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { folder: "uploads" }, // Cambia el folder según tu preferencia
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(buffer); // Enviar el buffer como stream
    });

    const image_url = uploadResult.secure_url; // URL pública de la imagen subida

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

    const query = `UPDATE SERVICE SET title = '${title}', description = '${description}', image_url = '${image_url}' WHERE ServiceKey = ${ServiceKey}`;

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
