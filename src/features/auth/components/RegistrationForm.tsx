import { useState, type FormEvent } from 'react';

interface RegistrationFormProps {
  onRegister: (
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
  ) => Promise<void>;
  error?: string;
  success?: string;
}

export const RegistrationForm = ({ onRegister, error, success }: RegistrationFormProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onRegister(firstName, lastName, email, username, password);
    } finally {
      setIsSubmitting(false);
    }
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
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    id="username"
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <button 
                  className="btn btn-primary w-100" 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                </button>
              </form>
              {error && (
                <div className="alert alert-danger mt-3 text-center" role="alert">
                  {error}
                </div>
              )}
              {success && (
                <div className="alert alert-success mt-3 text-center" role="alert">
                  {success}
                </div>
              )}
              <a href="/" className="d-block text-center mt-3">
                Already have an account? Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
