import { NextRequest, NextResponse } from "next/server";
import handleFAQ from "@/features/support/components/FAQLocal";

const N8N_WEBHOOK = "https://numevn.app.n8n.cloud/webhook/botsop";

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();

    const res = await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("n8n Error");

    const data = await res.json();

    if (!data || Object.keys(data).length === 0) {
      throw new Error("empty response");
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log("error on bot");
    return handleFAQ(body ?? {});
  }
}
