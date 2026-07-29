import { NextResponse } from "next/server";
import { resendOtp } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const { verificationId } = await req.json();

    if (!verificationId || typeof verificationId !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid verification ID." },
        { status: 400 },
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const ipLimit = await rateLimit(`resend-otp:ip:${ip}`, 5, 300);
    if (!ipLimit.success) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const result = await resendOtp(verificationId);
    if (!result.success || !result.otp || !result.email) {
      return NextResponse.json(
        { success: false, error: result.error ?? "Failed to resend code." },
        { status: 400 },
      );
    }

    const emailResult = await sendOtpEmail(result.email, result.otp, result.name ?? "");
    if (!emailResult.success) {
      return NextResponse.json(
        { success: false, error: emailResult.error },
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
