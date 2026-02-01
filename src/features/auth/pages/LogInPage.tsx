import AuthLayout from "@/shared/layouts/AuthLayout";
import LoginForm from "@/features/auth/components/LoginForm";
import { useLogin } from "@/features/auth/hooks/useLogin.ts";

const LogInPage = () => {
  const { handleLogin, loginError, isLoading } = useLogin();

  return (
    <AuthLayout>
      <LoginForm onLogin={handleLogin} isLoading={isLoading} />
      {loginError && (
        <div className="alert alert-danger mt-3 text-center" role="alert">
          {loginError}
        </div>
      )}
    </AuthLayout>
  );
};

export default LogInPage;
