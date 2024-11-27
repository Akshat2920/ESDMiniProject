import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed using: npm install axios

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            // Replace with your actual API call for login
            const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
                email: email,
                password: password,
            });
    
            // Assuming a 200 status and a returned JWT token if successful
            if (response.status === 200 && response.data) {
                onLogin(response.data); // Pass the token to the parent component
            } else {
                //setError(response.data.message || 'Incorrect ID or password');
                setError('Incorrect ID or password');
            }
        } catch (error) {
            setError('Incorrect ID or password');
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