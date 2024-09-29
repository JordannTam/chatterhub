import { db } from "@/lib/db"; // Ensure you import your db connection here

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await db.query('SELECT NOW()');
    return NextResponse.json({ message: 'Connection successful', timestamp: result.rows[0].now },  { status: 500 });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    return NextResponse.json({ message: 'Database connection failed'});
  }
}
