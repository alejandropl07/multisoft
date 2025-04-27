import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "../auth/db";
import { pipeline } from "stream";
import { promisify } from "util";
import { MAX, NVarChar } from "mssql";
import cloudinary from "../../../config/cloudinary"; // Ruta al archivo de configuración

const pump = promisify(pipeline);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const address = formData.get("address") as string;
  const file = formData.get("image") as Blob | any;

  try {
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
    const result = await pool?.request();
    const query =
      "INSERT INTO Partner (address, image_url) VALUES (@address, @image_url)";
    result?.input("address", NVarChar(50), address);
    result?.input("image_url", NVarChar(MAX), image_url);
    await result?.query(query);

    return NextResponse.json({ message: "Imagen cargada exitosamente" });
  } catch (err) {
    console.error("Error al insertar datos en la base de datos:", err);
    return NextResponse.json(
      { error: "Error al insertar datos en la base de datos" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const pool = await getConnection();
    const query = "SELECT * FROM Partner";
    const result = await pool?.query(query);

    return NextResponse.json(result?.recordset);
  } catch (err) {
    console.error("Error al obtener datos de la base de datos:", err);
    return NextResponse.json(
      { error: "Error al obtener datos de la base de datos" },
      { status: 500 }
    );
  }
}
