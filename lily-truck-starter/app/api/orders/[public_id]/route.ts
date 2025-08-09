import { NextResponse } from "next/server";
export async function GET(_: Request, { params }: { params: { public_id: string } }) {
  // Mock order for demo
  const now = new Date();
  return NextResponse.json({
    public_id: params.public_id,
    status: "received",
    timeline: [
      { status: "received", at: now.toISOString() }
    ]
  });
}
