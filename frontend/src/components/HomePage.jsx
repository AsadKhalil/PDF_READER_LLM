import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatListComponent from './ChatListComponent';
import SendMessageComponent from './SendMessageComponent'; 
import MessagesComponent from './MessagesComponent';

function HomePage() {
    const navigate = useNavigate();
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [refreshMessages, setRefreshMessages] = useState(false);

    const handleSelectChat = (chatId) => {
        setSelectedChatId(chatId);
        setRefreshMessages((prev) => !prev);
    };

    const handleNewChat = () => {
        setSelectedChatId(null); // Reset the selected chat ID which will clear the MessagesComponent
    };
    const handleSendMessage = (newChatId) => {
        if (newChatId) {
            setSelectedChatId(newChatId); // Update the selected chat ID with the new one
            setRefreshMessages((prev) => !prev); // Trigger a refresh to load new messages
        }
    };

    // const handleSendMessage = () => {
    //     // Trigger message refresh by toggling the refreshMessages state
    //     setRefreshMessages((prev) => !prev);
    // };
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <ChatListComponent onSelectChat={handleSelectChat} />
            <div style={{
                flex: '3 1 auto',
                textAlign: 'center', 
                padding: '20px',
                overflowY: 'auto'
            }}>
                <h1>Welcome Home!</h1>
                <button onClick={handleNewChat} style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    marginBottom: '20px', // Add space between buttons
                }}>New Chat</button>
                <button onClick={handleLogout} style={{
                    position: 'absolute', // Position the logout button absolutely
                    top: '20px', // Distance from the top
                    right: '20px', // Distance from the right
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px'
                }}>Logout</button>
                {selectedChatId && <MessagesComponent chatId={selectedChatId} key={refreshMessages ? 'refresh' : 'static'} />}
            </div>
            <SendMessageComponent 
                    chatId={selectedChatId} 
                    onMessageSent={handleSendMessage} 
                />
        </div>
    );
}

export default HomePage;

