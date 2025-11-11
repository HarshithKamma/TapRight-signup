import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseTable = process.env.SUPABASE_WAITLIST_TABLE || "waitlist_signups";

  if (!supabaseUrl || !supabaseServiceKey || !supabaseTable) {
    console.error("Waitlist stats requested but Supabase environment variables are missing.");
    return NextResponse.json(
      {
        message: "Waitlist storage is not configured. Add Supabase credentials to access stats.",
      },
      { status: 500 },
    );
  }

  try {
    const statsResponse = await fetch(
      `${supabaseUrl.replace(/\/$/, "")}/rest/v1/${encodeURIComponent(
        supabaseTable,
      )}?select=id`,
      {
        method: "GET",
        headers: {
          apikey: supabaseServiceKey,
          Authorization: `Bearer ${supabaseServiceKey}`,
          Prefer: "count=exact",
          Range: "0-0",
        },
      },
    );

    if (!statsResponse.ok) {
      const text = await statsResponse.text();
      throw new Error(text || `Supabase stats query failed with status ${statsResponse.status}`);
    }

    const contentRange = statsResponse.headers.get("content-range") ?? "";
    const totalPart = contentRange.split("/")[1];
    const total = totalPart ? Number(totalPart) : Number.NaN;

    if (!Number.isFinite(total)) {
      throw new Error(`Unable to parse waitlist count from content-range header: "${contentRange}"`);
    }

    return NextResponse.json({ count: total });
  } catch (error) {
    console.error("Failed to load waitlist stats", error);
    return NextResponse.json(
      {
        message: "Unable to load waitlist stats right now. Please try again later.",
      },
      { status: 500 },
    );
  }
}


