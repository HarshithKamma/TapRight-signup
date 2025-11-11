import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import twilio from "twilio";

export const runtime = "nodejs";

const waitlistSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  email: z.string().email("Enter a valid email address."),
  phoneNumber: z
    .string()
    .min(8, "Add a valid phone number with country code.")
    .max(32, "Phone numbers should be shorter than 32 characters."),
  spendFocus: z.string().min(1, "Let us know your optimisation focus."),
  notes: z.string().max(1000).optional().or(z.literal("")),
  optIn: z.boolean().refine((value) => value === true, {
    message: "Please confirm you want to receive updates.",
  }),
});

type WaitlistPayload = z.infer<typeof waitlistSchema>;

function normalizePhone(phone: string) {
  const trimmed = phone.trim();
  if (!trimmed.startsWith("+")) {
    const digits = trimmed.replace(/\D/g, "");
    return digits ? `+${digits}` : trimmed;
  }
  return trimmed.replace(/\s+/g, "");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = waitlistSchema.safeParse({
      ...body,
      optIn: body?.optIn === true || body?.optIn === "true",
    });

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const errors: Partial<Record<keyof WaitlistPayload, string>> = {};

      Object.entries(fieldErrors).forEach(([field, messages]) => {
        if (messages && messages.length > 0) {
          errors[field as keyof WaitlistPayload] = messages[0];
        }
      });

      return NextResponse.json(
        {
          message: "Validation failed. Please review the highlighted fields.",
          errors,
        },
        { status: 400 },
      );
    }

    const payload: WaitlistPayload = {
      ...parsed.data,
      phoneNumber: normalizePhone(parsed.data.phoneNumber),
    };

    const resendKey = process.env.RESEND_API_KEY;
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioFrom = process.env.TWILIO_FROM_PHONE;

    let emailResult: "sent" | "skipped" | "failed" = "skipped";
    let smsResult: "sent" | "skipped" | "failed" = "skipped";

    const tasks: Array<Promise<void>> = [];

    if (resendKey) {
      const resend = new Resend(resendKey);
      tasks.push(
        resend.emails
          .send({
            from: "TapRight Waitlist <waitlist@tapright.ai>",
            to: payload.email,
            subject: "You're on the TapRight waitlist ✅",
            text: [
              `Hi ${payload.fullName.split(" ")[0] || "there"},`,
              "",
              "Thanks for joining the TapRight early access list.",
              "We’re building the fastest way to decide which credit card earns the most for every purchase you make.",
              "",
              "What’s next?",
              "• We’ll review your details and prioritise access as we open up beta cohorts.",
              "• Expect a deeper onboarding guide soon—tailored to your card goals.",
              "",
              "In the meantime, feel free to reply to this email with any specific challenges you want TapRight to solve.",
              "",
              "Talk soon,",
              "The TapRight Crew",
            ].join("\n"),
          })
          .then(() => {
            emailResult = "sent";
          })
          .catch((error: unknown) => {
            console.error("Failed to send waitlist email", error);
            emailResult = "failed";
          }),
      );
    }

    if (twilioSid && twilioToken && twilioFrom) {
      const client = twilio(twilioSid, twilioToken);
      tasks.push(
        client.messages
          .create({
            from: twilioFrom,
            to: payload.phoneNumber,
            body: `TapRight: Thanks for joining the waitlist, ${payload.fullName}! We'll text you the moment early access opens.`,
          })
          .then(() => {
            smsResult = "sent";
          })
          .catch((error: unknown) => {
            console.error("Failed to send waitlist SMS", error);
            smsResult = "failed";
          }),
      );
    }

    if (tasks.length > 0) {
      await Promise.allSettled(tasks);
    }

    console.info("New waitlist signup", {
      ...payload,
      phoneNumber: payload.phoneNumber.replace(/.(?=.{4})/g, "*"),
      timestamp: new Date().toISOString(),
      emailResult,
      smsResult,
    });

    return NextResponse.json({
      message:
        "You are on the list! Expect a welcome email with your access timeline soon.",
      emailResult,
      smsResult,
    });
  } catch (error) {
    console.error("Unexpected waitlist error", error);
    return NextResponse.json(
      {
        message:
          "We couldn’t process your request right now. Please try again in a moment.",
      },
      { status: 500 },
    );
  }
}

