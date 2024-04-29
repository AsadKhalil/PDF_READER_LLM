import React from 'react';
import LoginForm from '../components/LoginForm';

function LoginView() {
    return (
        <div style={{ margin: 'auto', width: '300px', padding: '20px' }}>
            <h2>Login</h2>
            <LoginForm />
        </div>
    );
}

export default LoginView;
