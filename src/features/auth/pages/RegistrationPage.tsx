import RegistrationForm from "@/features/auth/components/RegistrationForm";
import { useRegister } from "@/features/auth/hooks/useRegister";

const RegistrationPage = () => {
  const { handleRegister, registrationError } = useRegister();

  return (
    <div className="container py-5" style={{ maxWidth: 500 }}>
      <h1 className="text-center mb-4">Ticketing System</h1>
      <RegistrationForm onRegister={handleRegister} />
      {registrationError && (
        <div className="alert alert-danger mt-3 text-center" role="alert">
          {registrationError}
        </div>
      )}
    </div>
  );
};

export default RegistrationPage;