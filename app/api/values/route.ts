import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "../auth/db";
import { pipeline } from "stream";
import { promisify } from "util";
import fs from "fs";
import { MAX, NVarChar } from "mssql";

const pump = promisify(pipeline);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const file = formData.get("image") as Blob | any;

  const nameImage = `${Date.now()}_${file.name}`;
  const image_url = `uploads/${nameImage}`;
  const image_url_public = `public/uploads/${nameImage}`;

  await pump(file.stream(), fs.createWriteStream(image_url_public));

  try {
    const pool = await getConnection();
    const result = await pool?.request();
    const query =
      "INSERT INTO ValuesTable (title, description, image_url) VALUES (@title, @description, @image_url)";
    result?.input("title", NVarChar(50), title);
    result?.input("description", NVarChar(MAX), description);
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
    const query = "SELECT * FROM ValuesTable";
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
