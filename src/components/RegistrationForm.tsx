import React, { useState } from "react";

type RegistrationFormProps = {
  onRegister: (
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
  ) => void;
};

export function RegistrationForm({ onRegister }: RegistrationFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(firstName, lastName, email, username, password);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-center mb-4">Register</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label"></label>
                  <input
                    id="firstName"
                    type="text"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label"></label>
                  <input
                    id="lastName"
                    type="text"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label"></label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label"></label>
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
                  <label htmlFor="password" className="form-label"></label>
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
                  Register
                </button>
              </form>
              <a href="/" className="d-block text-center mt-3">
                Already have an account? Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;