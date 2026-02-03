import { AuthLayout } from "@/shared/layouts/AuthLayout";
import { RegistrationForm } from "@/features/auth/components/RegistrationForm";
import { useRegister } from "@/features/auth/hooks/useRegister";

export const RegistrationPage = () => {
  const { handleRegister, registrationError } = useRegister();

  return (
    <AuthLayout>
      <RegistrationForm onRegister={handleRegister} />
      {registrationError && (
        <div className="alert alert-danger mt-3 text-center" role="alert">
          {registrationError}
        </div>
      )}
    </AuthLayout>
  );
};
