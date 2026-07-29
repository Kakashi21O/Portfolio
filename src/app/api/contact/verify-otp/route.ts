import { NextResponse } from "next/server";
import { verifyOtp } from "@/lib/otp";
import { sendContactMessage } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const { verificationId, otp } = await req.json();

    if (!verificationId || typeof verificationId !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid verification ID." },
        { status: 400 },
      );
    }
    if (!otp || typeof otp !== "string" || !/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 6-digit code." },
        { status: 400 },
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const ipLimit = await rateLimit(`verify-otp:ip:${ip}`, 10, 300);
    if (!ipLimit.success) {
      return NextResponse.json(
        { success: false, error: "Too many attempts. Please try again later." },
        { status: 429 },
      );
    }

    const result = await verifyOtp(verificationId, otp);
    if (!result.valid) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 },
      );
    }

    if (!result.contactPayload) {
      return NextResponse.json(
        { success: false, error: "Contact data not found." },
        { status: 500 },
      );
    }

    const now = new Date().toISOString();
    const sendResult = await sendContactMessage(result.contactPayload, now);
    if (!sendResult.success) {
      return NextResponse.json(
        { success: false, error: sendResult.error },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
