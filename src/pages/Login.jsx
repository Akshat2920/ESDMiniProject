import { loginUser } from '../utils/httputil';
import React, { useState } from 'react';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await loginUser(email, password); // Call the utility function
      onLogin(data); // Pass the token or user data to the parent component
    } catch (error) {
      setError(error.message); // Display the error message
    }
  };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ paddingTop: '1%' }}>
            <div className="card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h3 className="text-center mb-4">Sign In</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Sign In</button>
                    </div>
                    <div className="text-center mt-3">
                        <a href="#" className="text-decoration-none">Forgot password?</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;