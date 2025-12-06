import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

export const runtime = "nodejs";

const waitlistSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  email: z.string().email("Enter a valid email address."),
  spendFocus: z.string().min(1, "Let us know your optimisation focus."),
  notes: z.string().max(1000).optional().or(z.literal("")),
  optIn: z.boolean().refine((value) => value === true, {
    message: "Please confirm you want to receive updates.",
  }),
});

type WaitlistPayload = z.infer<typeof waitlistSchema>;

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

    const payload: WaitlistPayload = parsed.data;

    const resendKey = process.env.RESEND_API_KEY;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseTable = process.env.SUPABASE_WAITLIST_TABLE || "waitlist_signups";
    const alertEmail = process.env.WAITLIST_ALERT_EMAIL;

    if (!resendKey) {
      console.error("Waitlist submission blocked: RESEND_API_KEY is not configured.");
      return NextResponse.json(
        {
          message:
            "Our confirmation email service is not configured. Please try again soon while we finish setup.",
        },
        { status: 500 },
      );
    }

    let emailResult: "sent" | "skipped" | "failed" = "skipped";
    const smsResult: "sent" | "skipped" | "failed" = "skipped";
    let supabaseResult: "synced" | "skipped" | "failed" = "skipped";
    let alertResult: "sent" | "skipped" | "failed" = "skipped";

    // Check for duplicate email FIRST before sending any emails
    if (supabaseUrl && supabaseServiceKey && supabaseTable) {
      try {
        const supabaseResponse = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/${encodeURIComponent(supabaseTable)}`, {
          method: "POST",
          headers: {
            apikey: supabaseServiceKey,
            Authorization: `Bearer ${supabaseServiceKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            full_name: payload.fullName,
            email: payload.email,
            spend_focus: payload.spendFocus,
            notes: payload.notes ?? "",
            opt_in: payload.optIn,
            joined_at: new Date().toISOString(),
          }),
        });

        if (!supabaseResponse.ok) {
          const errorText = await supabaseResponse.text();
          
          // Check if it's a duplicate email error
          if (errorText.includes("duplicate key") || errorText.includes("unique constraint")) {
            return NextResponse.json(
              {
                message: "Good news—you're already on the waitlist! Check your email for confirmation.",
              },
              { status: 400 },
            );
          }
          
          throw new Error(errorText || `Supabase sync failed with status ${supabaseResponse.status}`);
        }
        
        supabaseResult = "synced";
      } catch (error: unknown) {
        console.error("Failed to sync waitlist to Supabase", error);
        supabaseResult = "failed";
      }
    }

    // Only send emails if the signup was successful (not a duplicate)
    const tasks: Array<Promise<void>> = [];

    if (resendKey) {
      const resend = new Resend(resendKey);
      tasks.push(
        resend.emails
          .send({
            from: "TapRight <info@tapright.app>",
            to: payload.email,
            subject: "You're on the TapRight waitlist ✅",
            text: [
              `Hi ${payload.fullName.split(" ")[0] || "there"},`,
              "",
              "Thanks for joining the TapRight early access list.",
              "We're building the fastest way to decide which credit card earns the most for every purchase you make.",
              "",
              "What's next?",
              "• We'll review your details and prioritise access as we open up beta cohorts.",
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

    // SMS sending removed - phone number field no longer collected

    if (resendKey && alertEmail) {
      const resend = new Resend(resendKey);
      tasks.push(
        resend.emails
          .send({
            from: "TapRight <info@tapright.app>",
            to: alertEmail,
            subject: `New waitlist signup — ${payload.fullName}`,
            text: [
              `Name: ${payload.fullName}`,
              `Email: ${payload.email}`,
              `Spend focus: ${payload.spendFocus}`,
              `Notes: ${payload.notes || "—"}`,
              `Opted in: ${payload.optIn ? "Yes" : "No"}`,
              `Joined at: ${new Date().toISOString()}`,
            ].join("\n"),
          })
          .then(() => {
            alertResult = "sent";
          })
          .catch((error: unknown) => {
            console.error("Failed to send internal waitlist alert", error);
            alertResult = "failed";
          }),
      );
    }

    if (tasks.length > 0) {
      await Promise.allSettled(tasks);
    }

    console.info("New waitlist signup", {
      ...payload,
      timestamp: new Date().toISOString(),
      emailResult,
      smsResult,
      supabaseResult,
      alertResult,
    });

    return NextResponse.json({
      message:
        "Great news—you're in! Check your inbox in a few minutes for your welcome note.",
      emailResult,
      smsResult,
      supabaseResult,
      alertResult,
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

