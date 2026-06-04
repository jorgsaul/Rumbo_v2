import { NextRequest, NextResponse } from "next/server";
import handleFAQ from "@/features/support/components/FAQLocal";

const N8N_WEBHOOK =
  process.env.N8N_WEBHOOK_URL ?? "https://mythicc.app.n8n.cloud/webhook/faq-bot";
const TIMEOUT_MS = 25_000;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown> | undefined;

  try {
    body = await req.json();
  } catch (e) {
    console.error("[/api/chat] req.json() falló:", e);
    return NextResponse.json(
      { error: "Cuerpo de la petición inválido" },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object" || Object.keys(body).length === 0) {
    return NextResponse.json({ error: "Body vacío" }, { status: 400 });
  }

  if (body.agente === "asistente" && !body.mensaje) {
    return NextResponse.json(
      { mensaje: "No se recibió ningún mensaje." },
      { status: 400 },
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text().catch(() => "sin detalle");
      console.error(`[/api/chat] n8n respondió ${res.status}: ${errText}`);
      throw new Error(`n8n Error: ${res.status}`);
    }

    const text = await res.text();

    if (!text?.trim()) {
      throw new Error("n8n devolvió respuesta vacía");
    }

    let data: Record<string, unknown>;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`JSON inválido de n8n: ${text.slice(0, 120)}`);
    }

    if (!data || Object.keys(data).length === 0) {
      throw new Error("n8n devolvió objeto vacío {}");
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    clearTimeout(timeoutId);

    const isTimeout = error instanceof Error && error.name === "AbortError";

    console.error(`[/api/chat] ${isTimeout ? "TIMEOUT" : "Error"}:`, error);

    if (body?.agente === "asistente") {
      const msg = isTimeout
        ? "Atlas tardó demasiado en responder. Intenta de nuevo en un momento. ⏱️"
        : "No pude conectar con Atlas. Intenta de nuevo en un momento.";
      return NextResponse.json({ mensaje: msg }, { status: 200 });
    }

    return handleFAQ(body ?? {});
  }
}
