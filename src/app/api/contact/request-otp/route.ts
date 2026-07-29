import { NextResponse } from "next/server";
import { validateContactPayload } from "@/lib/contact-validation";
import { createOtp } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    console.log("ENV CHECK:", {
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      UPSTASH_REDIS_REST_URL: !!process.env.UPSTASH_REDIS_REST_URL,
      UPSTASH_REDIS_REST_TOKEN: !!process.env.UPSTASH_REDIS_REST_TOKEN,
      CONTACT_EMAIL: !!process.env.CONTACT_EMAIL,
      EMAIL_FROM: !!process.env.EMAIL_FROM,
    });

    const body = await req.json();

    const validation = validateContactPayload(body);

    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.errors,
        },
        { status: 400 },
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    const email = body.email.trim().toLowerCase();

    console.log("STEP 1: Validation passed");

    console.log("STEP 2: Checking rate limit");

    const emailLimit = await rateLimit(
      `request-otp:email:${email}`,
      3,
      300,
    );

    const ipLimit = await rateLimit(
      `request-otp:ip:${ip}`,
      5,
      300,
    );

    console.log("STEP 3: Rate limit result", {
      email: emailLimit.success,
      ip: ipLimit.success,
    });

    if (!emailLimit.success || !ipLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
        },
        { status: 429 },
      );
    }

    console.log("STEP 4: Creating OTP");

    const { verificationId, otp } = await createOtp({
      name: body.name.trim(),
      email,
      subject: body.subject.trim(),
      message: body.message.trim(),
    });

    console.log("STEP 5: OTP created");

    console.log("STEP 6: Sending OTP email");

    const emailResult = await sendOtpEmail(
      email,
      otp,
      body.name.trim(),
    );

    console.log("STEP 7: Email result", {
      success: emailResult.success,
      error: emailResult.success ? undefined : emailResult.error,
    });

    if (!emailResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: emailResult.error,
        },
        { status: 500 },
      );
    }

    console.log("STEP 8: Request completed");

    return NextResponse.json({
      success: true,
      verificationId,
    });
  } catch (error) {
    console.error("REQUEST OTP ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again.",
      },
      { status: 500 },
    );
  }
}