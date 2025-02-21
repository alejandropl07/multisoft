import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { verifyPassword } from '@/src/lib/auth/verifyPassword';
import { getConnection } from '@/app/api/auth/db';
import sql from 'mssql';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  const { email, password } = await req.json();

  try {
    const pool = await getConnection();
    const result = await pool?.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT Password FROM Users WHERE Email = @Email');

    if (result?.recordset.length === 0) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const user = result?.recordset[0];
    const isValid = await verifyPassword(password, user.Password);

    if (!isValid) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const token = jwt.sign({ email }, 'your_jwt_secret', { expiresIn: '1h' });

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}

