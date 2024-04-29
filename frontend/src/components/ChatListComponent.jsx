import React, { useEffect, useState } from 'react';
import { fetchChats } from '../api/AuthService';
import PropTypes from 'prop-types'; 

function ChatListComponent({ onSelectChat }) {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleChatClick = (chatId) => {
        onSelectChat(chatId); // Trigger the callback with the selected chat ID
    };
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found!');
            setLoading(false);
            return;
        }

        fetchChats(token)
            .then(data => {
                if (data && Array.isArray(data)) {
                    setChats(data);
                } else {
                    setChats([]);
                    console.warn('Unexpected data structure:', data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to load chats:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{
            flex: '1 1 auto',
            padding: '20px',
            background: '#333', // Dark background for the sidebar
            color: 'white', // Text color
            height: '100vh', // Full view height
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
            overflowY: 'auto',
            width: '300px' // Sidebar width
        }}>
            <h2>Chats</h2>
            {loading ? <p>Loading...</p> : (
                chats.length > 0 ? (
                    <ul style={{ listStyle: 'none', padding: '0' }}>
                        {chats.map(chat => (
                            <li key={chat.id} style={{ marginBottom: '15px', cursor: 'pointer' }} onClick={() => handleChatClick(chat.id)}>
                                <strong>Chat {chat.id}</strong>
                                <p>{chat.messages.length > 0
                                    ? `${chat.messages[0].text.substring(0, 20)}${chat.messages[0].text.length > 20 ? "..." : ""}`
                                    : "No messages in this chat."}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : <p>No chats to display.</p>
            )}
        </div>
    );
}

// PropTypes for the ChatListComponent
ChatListComponent.propTypes = {
    onSelectChat: PropTypes.func.isRequired,
};
export default ChatListComponent;
