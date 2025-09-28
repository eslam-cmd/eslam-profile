import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, rating, comment } = await req.json();

  if (!rating || !comment) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const result = await pool.query(
    "INSERT INTO feedbacks (name, rating, comment) VALUES ($1, $2, $3) RETURNING *",
    [name, rating, comment]
  );

  return NextResponse.json(result.rows[0]);
}

export async function GET() {
  const result = await pool.query("SELECT * FROM feedbacks ORDER BY id DESC");
  return NextResponse.json(result.rows);
}
