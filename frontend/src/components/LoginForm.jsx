import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/AuthService'; 

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const credentials = { email, password };
            const data = await login(credentials);
            console.log(data); // Log the successful login data
            navigate('/home'); // Redirect to Home Page after successful login
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed: ' + error.message); // Displaying the error message
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                style={{ padding: '8px', fontSize: '16px' }}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                style={{ padding: '8px', fontSize: '16px' }}
            />
            <button type="submit" style={{ padding: '10px', fontSize: '16px' }}>Login</button>
        </form>
    );
}

export default LoginForm;
