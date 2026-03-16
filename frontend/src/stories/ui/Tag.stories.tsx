import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "@/components/ui/Tag";

const meta: Meta<typeof Tag> = {
  title: "UI/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "success", "info", "warning", "danger", "neutral"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Primary: Story = {
  args: { label: "Orientación", variant: "primary" },
};

export const Success: Story = {
  args: { label: "Mi historia", variant: "success" },
};

export const Info: Story = {
  args: { label: "Recursos", variant: "info" },
};

export const Warning: Story = {
  args: { label: "Duda", variant: "warning" },
};

export const Danger: Story = {
  args: { label: "Urgente", variant: "danger" },
};

export const Neutral: Story = {
  args: { label: "Otro", variant: "neutral" },
};

export const Todas: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag label="Orientación" variant="primary" />
      <Tag label="Mi historia" variant="success" />
      <Tag label="Recursos" variant="info" />
      <Tag label="Duda" variant="warning" />
      <Tag label="Urgente" variant="danger" />
      <Tag label="Otro" variant="neutral" />
    </div>
  ),
};
