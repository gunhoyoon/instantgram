import { NextResponse } from "next/server";

export async function GET() {
  // JSON 형식으로 응답을 반환합니다.
  return NextResponse.json("hello");
}
