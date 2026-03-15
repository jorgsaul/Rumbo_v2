import type { Meta, StoryObj } from "@storybook/react";
import TicketCard from "@/features/support/components/TicketCard";

const meta: Meta<typeof TicketCard> = {
  title: "Support/TicketCard",
  component: TicketCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TicketCard>;

const base = {
  id: "1",
  title: "No puedo acceder a mi cuenta",
  description:
    "Intento iniciar sesión pero me dice que mis credenciales son incorrectas.",
  category: "BUG" as const,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const Abierto: Story = {
  args: { ticket: { ...base, status: "OPEN", adminReply: null } },
};

export const EnRevision: Story = {
  args: { ticket: { ...base, status: "IN_REVIEW", adminReply: null } },
};

export const Resuelto: Story = {
  args: {
    ticket: {
      ...base,
      status: "RESOLVED",
      adminReply: "Hemos revisado tu caso y restablecido tu acceso.",
    },
  },
};

export const ConRespuesta: Story = {
  args: {
    ticket: {
      ...base,
      status: "IN_REVIEW",
      adminReply: "Estamos revisando tu caso, te responderemos pronto.",
    },
  },
};
