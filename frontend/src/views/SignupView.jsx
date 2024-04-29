import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../components/SignupForm';

function SignupView() {
    const navigate = useNavigate();
    const [signupSuccess, setSignupSuccess] = useState(false);

    const handleSignupSuccess = () => {
        setSignupSuccess(true);
        // Redirect after a short delay or on a user action
        setTimeout(() => {
            navigate('/login');
        }, 2000); // 2 seconds delay
    };

    return (
        <div style={{ margin: 'auto', width: '300px', padding: '20px', textAlign: 'center' }}>
            <h1>Signup</h1>
            {signupSuccess ? (
                <p>Signup successful! Redirecting to login...</p>
            ) : (
                <SignupForm onSignupSuccess={handleSignupSuccess} />
            )}
        </div>
    );
}

export default SignupView;
