import type { Meta, StoryObj } from "@storybook/react";
import ConfirmModal from "@/components/shared/ConfirmModal";
import ConfirmationProvider, {
  useConfirmation,
} from "@/context/ConfirmationContext";
import { useEffect } from "react";

function ConfirmModalWithTrigger({
  category,
}: {
  category: "danger" | "warning" | "info" | "success";
}) {
  const { confirm } = useConfirmation();

  useEffect(() => {
    confirm({
      title: "¿Estás seguro?",
      description: "Esta acción no se puede deshacer.",
      category,
    });
  }, []);

  return <ConfirmModal />;
}

const meta: Meta = {
  title: "UI/ConfirmModal",
  decorators: [
    (Story) => (
      <ConfirmationProvider>
        <Story />
      </ConfirmationProvider>
    ),
  ],
};

export default meta;

export const Danger: StoryObj = {
  render: () => <ConfirmModalWithTrigger category="danger" />,
};

export const Warning: StoryObj = {
  render: () => <ConfirmModalWithTrigger category="warning" />,
};

export const Info: StoryObj = {
  render: () => <ConfirmModalWithTrigger category="info" />,
};

export const Success: StoryObj = {
  render: () => <ConfirmModalWithTrigger category="success" />,
};
