import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/src/lib/auth/hashPassword';
import { getConnection } from '@/app/api/auth/db';
import sql from 'mssql';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  const { email, password } = await req.json();

  try {
    const hashedPassword = await hashPassword(password);
    const pool = await getConnection();
    await pool?.request()
      .input('email', sql.NVarChar, email)
      .input('password', sql.NVarChar, hashedPassword)
      .query('INSERT INTO Users (Email, Password) VALUES (@Email, @Password)');

    return NextResponse.json({ message: 'User created!' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}
