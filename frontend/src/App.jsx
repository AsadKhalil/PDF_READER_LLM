import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginView from './views/LoginView';
import SignupView from './views/SignupView';
import HomePage from './views/HomePageView'; // Import HomePage

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginView />} />
                <Route path="/signup" element={<SignupView />} />
                <Route path="/home" element={<HomePage />} /> 
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
