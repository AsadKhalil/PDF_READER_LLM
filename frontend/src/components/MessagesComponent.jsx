import React, { useEffect, useState } from 'react';
import { fetchChatMessages } from '../api/AuthService';

function MessagesComponent({ chatId }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token'); // Retrieve the token

    useEffect(() => {
        if (!token) {
            console.error('No token found!');
            setLoading(false);
            return;
        }

        const getMessages = async () => {
            try {
                const chatMessages = await fetchChatMessages(token, chatId);
                setMessages(chatMessages);
            } catch (error) {
                console.error('Failed to load messages:', error);
            } finally {
                setLoading(false);
            }
        };

        getMessages();
    }, [chatId, token]);

    if (loading) {
        return <div>Loading messages...</div>;
    }

    return (
        <div style={{ padding: '20px', maxHeight: '400px', overflowY: 'auto' }}>
            <h3>Messages for Chat {chatId}</h3>
            {messages.length > 0 ? (
                <ul>
                    {messages.map((message) => (
                        <li key={message.id}>
                            <p>{message.text}</p>
                            <small>Sent on: {new Date(message.created_at).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No messages found.</p>
            )}
        </div>
    );
}

export default MessagesComponent;
