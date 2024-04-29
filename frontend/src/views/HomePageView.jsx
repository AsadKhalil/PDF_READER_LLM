import React from 'react';
import HomePage from '../components/HomePage';
import ChatListComponent from '../components/ChatListComponent';

function HomePageView() {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
           
            <HomePage />
        </div>
    );
}

export default HomePageView;
