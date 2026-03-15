import type { Meta, StoryObj } from "@storybook/react";
import AvisoToast from "@/components/shared/AvisoToast";

const meta: Meta<typeof AvisoToast> = {
  title: "UI/AvisoToast",
  component: AvisoToast,
  tags: ["autodocs"],
  args: {
    title: "Título del aviso",
    description: "Descripción del aviso aquí.",
    onClose: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof AvisoToast>;

export const Info: Story = {
  args: { category: "info" },
};

export const Success: Story = {
  args: { category: "success" },
};

export const Warning: Story = {
  args: { category: "warning" },
};

export const Danger: Story = {
  args: { category: "danger" },
};

export const SinBotonCerrar: Story = {
  args: { category: "info", onClose: undefined },
};

export const SoloTitulo: Story = {
  args: { category: "success", description: "" },
};
