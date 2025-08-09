import { NextResponse } from "next/server";
export async function POST() {
  // TODO: parse Stripe event, update order + award loyalty points
  return NextResponse.json({ ok: true });
}
