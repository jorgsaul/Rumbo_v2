const WEBHOOK = process.env.NEXT_PUBLIC_CHAT_WEBHOOK!;

export async function iniciarFAQ() {
  const res = await fetch(WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ agente: 'faq', action: 'start' }),
  });
  return res.json();
}

export async function enviarOpcionFAQ(boton: string) {
  const res = await fetch(WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ agente: 'faq', boton }),
  });
  return res.json();
}