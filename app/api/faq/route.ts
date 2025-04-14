import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "../auth/db";
import { MAX, NVarChar } from "mssql";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  try {
    const pool = await getConnection();
    const result = await pool?.request();
    const query =
      "INSERT INTO FAQ (title, description) VALUES (@title, @description)";
    result?.input("title", NVarChar(50), title);
    result?.input("description", NVarChar(MAX), description);
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
    const query = "SELECT * FROM FAQ";
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
    const { FaqKey, Title, Description } = await req.json(); // Supongamos que se envían los campos a actualizar
    const pool = await getConnection();
    const query = `
      UPDATE FAQ
      SET title = @title, content = @content
      WHERE FaqKey = @FaqKey
    `;

    const result = await pool?.query(query);

    return NextResponse.json({ message: `Registro con ID ${FaqKey} actualizado exitosamente.` });
  } catch (err) {
    console.error("Error al actualizar el registro:", err);
    return NextResponse.json(
      { error: "Error al actualizar el registro de la base de datos" },
      { status: 500 }
    );
  }
}