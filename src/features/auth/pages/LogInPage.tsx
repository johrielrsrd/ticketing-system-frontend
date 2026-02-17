import { AuthLayout } from "@/shared/layouts/AuthLayout";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { useLogin } from "@/features/auth/hooks/useLogin.ts";

export const LogInPage = () => {
  const { handleLogin, loginError, isLoginLoading } = useLogin();

  return (
    <AuthLayout>
      <LoginForm onLogin={handleLogin} isLoginLoading={isLoginLoading} />
      {loginError && (
        <div className="alert alert-danger mt-3 text-center" role="alert">
          {loginError}
        </div>
      )}
    </AuthLayout>
  );
};
