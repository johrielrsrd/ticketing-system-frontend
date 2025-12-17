import React, { useState } from "react";

type LoginFormProps = {
  onLogin: (username: string, password: string) => void;
};

export function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4 p-md-5">
        <div className="text-center mb-4">
          <h2 className="h4 mb-1">Log In</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>
        </form>
        <hr className="my-4" />
        <a href="/register" className="d-block text-center text-decoration-none">
          Don&apos;t have an account? <span className="fw-semibold">Register</span>
        </a>
      </div>
    </div>
  );
}

export default LoginForm;