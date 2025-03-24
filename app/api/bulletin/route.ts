import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "../auth/db";
import fs from "fs";
import { MAX, NVarChar } from "mssql";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = formData.get("email") as string;

  try {
    const pool = await getConnection();
    const result = await pool?.request();
    const query =
      "INSERT INTO Bulletin (email) VALUES (@email)";
    result?.input("email", NVarChar(50), email);
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
    const query = "SELECT * FROM Bulletin";
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