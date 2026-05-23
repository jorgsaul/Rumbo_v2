import type { RespuestaAtlas } from "../types/chat.types";

const WEBHOOK = "/api/chat";

export async function enviarMensajeAtlas(
  mensaje: string,
  userId: string
): Promise<RespuestaAtlas> {
  const res = await fetch(WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      agente: "asistente",
      mensaje,
      user_id: userId,
    }),
  });

  if (!res.ok) throw new Error("Error " + res.status);
  return res.json();
}