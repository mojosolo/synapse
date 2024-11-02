import { NextResponse } from "next/server";

let contextData: any = {};

export function GET() {
  return NextResponse.json({ contextData });
}

export async function POST(request: Request) {
  const newData = await request.json();
  contextData = { ...contextData, ...newData };
  return NextResponse.json({ status: "success", contextData });
} 