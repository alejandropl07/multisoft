import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "../auth/db";
// import upload from "@/src/lib/upload";
import { pipeline } from "stream";
import { promisify } from "util";
import fs from "fs";
// import path from "path";
import { MAX, NVarChar } from "mssql";

const pump = promisify(pipeline);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const writtenBy = formData.get("writtenBy") as string;
  const file = formData.get("image") as Blob | any;

  // const nameImage = `${Date.now()}_${file.name}`;
  // const image_url = `uploads/${nameImage}`;
  // const image_url_public = `public/uploads/${nameImage}`;

  // await pump(file.stream(), fs.createWriteStream(image_url_public));

  try {
    const pool = await getConnection();
    const result = await pool?.request();
    const query =
      "INSERT INTO Blogs (title, description, image_url, date, writtenBy) VALUES (@title, @description, @image_url, @date, @writtenBy)";
    result?.input("title", NVarChar(50), title);
    result?.input("description", NVarChar(MAX), description);
    result?.input("image_url", NVarChar(MAX), "");
    result?.input("date", NVarChar(MAX), date);
    result?.input("writtenBy", NVarChar(50), writtenBy);
    await result?.query(query);

    return NextResponse.json({ message: "Imagen cargada exitosamente" });
  } catch (err) {
    console.log(err);
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
    const query = "SELECT * FROM Blogs";
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


export async function PUT(req: NextRequest) {
  try {
    const { BlogKey, title, content } = await req.json(); // Supongamos que se envían los campos a actualizar
    const pool = await getConnection();
    const query = `
      UPDATE Blogs
      SET title = @title, content = @content
      WHERE BlogKey = @BlogKey
    `;

    const result = await pool?.query(query);

    return NextResponse.json({ message: `Registro con ID ${BlogKey} actualizado exitosamente.` });
  } catch (err) {
    console.error("Error al actualizar el registro:", err);
    return NextResponse.json(
      { error: "Error al actualizar el registro de la base de datos" },
      { status: 500 }
    );
  }
}
