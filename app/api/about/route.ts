import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "../auth/db";
import { pipeline } from "stream";
import { promisify } from "util";
import fs from "fs";
import { MAX, NVarChar } from "mssql";

const pump = promisify(pipeline);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const mission = formData.get("mission") as string;
  const vision = formData.get("vision") as string;
  const purpose = formData.get("purpose") as string;

  try {
    const pool = await getConnection();
    const result = await pool?.request();
    const query =
      "INSERT INTO About (mission, vision, purpose) VALUES (@mission, @vision, @purpose)";
    result?.input("mission", NVarChar(MAX), mission);
    result?.input("vision", NVarChar(MAX), vision);
    result?.input("purpose", NVarChar(MAX), purpose);
    await result?.query(query);

    return NextResponse.json({ message: "Datos guardados exitosamente" });
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
    const query = "SELECT * FROM About";
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
