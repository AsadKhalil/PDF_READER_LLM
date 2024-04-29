import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../api/AuthService';

function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const userData = { email, password, first_name: firstName, last_name: lastName };
            await signup(userData);
            alert('Signup successful');
            navigate('/login'); // Optionally redirect on successful signup
        } catch (error) {
            alert('Signup failed: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                required
                style={{ padding: '8px', fontSize: '16px' }}
            />
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                required
                style={{ padding: '8px', fontSize: '16px' }}
            />
            <button type="submit" style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>Signup</button>
            <p style={{ marginTop: '10px', textAlign: 'center' }}>
                Already have an account? <Link to="/login" style={{ color: 'blue' }}>Login here</Link>
            </p>
        </form>
    );
}

export default SignupForm;
