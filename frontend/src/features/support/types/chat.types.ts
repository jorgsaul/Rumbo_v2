export interface Opcion {
  id: string;
  label: string;
}

export interface MensajeFAQ {
  role: "bot" | "user";
  texto: string;
  opciones?: Opcion[];
  sinRespuesta?: boolean;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  adminReply?: string;
  createdAt: string;
}