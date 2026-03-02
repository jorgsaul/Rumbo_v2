import AuthRegisterLayout from "@/features/auth/layout";
import Card from "@/components/ui/Card";

export default function RegisterPage() {
  return (
    <Card shadow="md" rounded="xl" border="light" className="w-full max-w-md">
      <AuthRegisterLayout />
    </Card>
  );
}
