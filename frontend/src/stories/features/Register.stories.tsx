import type { Meta, StoryObj } from "@storybook/react";
import AuthRegisterLayout from "@/features/auth/layout";
import { useRegisterStore } from "@/features/auth/hooks/useRegisterStore";

// Helper para setear el step
function RegisterWithStep({ step }: { step: string }) {
  const { setStep } = useRegisterStore();
  setStep(step as any);
  return <AuthRegisterLayout />;
}

const meta: Meta = {
  title: "Auth/RegisterLayout",
  decorators: [
    (Story) => (
      <div className="max-w-md mx-auto p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Paso1: StoryObj = {
  render: () => <RegisterWithStep step="Step1" />,
};

export const Paso2: StoryObj = {
  render: () => <RegisterWithStep step="Step2" />,
};

export const Paso3: StoryObj = {
  render: () => <RegisterWithStep step="Step3" />,
};

export const Paso4: StoryObj = {
  render: () => <RegisterWithStep step="Step4" />,
};
