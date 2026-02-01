import { useLogin } from "@/features/auth/hooks/useLogin.ts";
import { LoginForm } from "@/features/components/LoginForm.tsx";

export function LogInPage() {
  const { handleLogin, loginError, isLoading } = useLogin();

  return (
    <div className="container py-5" style={{ maxWidth: 500 }}>
      <h1 className="text-center mb-4">Ticketing System</h1>
      <LoginForm onLogin={handleLogin} isLoading={isLoading} />
      {loginError && (
        <div className="alert alert-danger mt-3 text-center" role="alert">
          {loginError}
        </div>
      )}
    </div>
  );
}
