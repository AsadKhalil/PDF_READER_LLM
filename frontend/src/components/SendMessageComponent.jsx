import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; // for prop type validation

const API_URL = import.meta.env.VITE_BACKEND_URL;
const token = localStorage.getItem('token'); // Retrieve the token

function SendMessageComponent({ chatId, onMessageSent }) {
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    // const [chatId, setChatId] = useState('1'); // Default to '1', can be dynamic based on selected chat

    const sendMessage = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('text', text);
        formData.append('chat_id', chatId);
        if (file) {
            formData.append('file', file);
        }

        try {
            const response = await axios.post(`${API_URL}/api/v1/messages/`, formData, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            // Clear the inputs after a successful send
            setText('');
            setFile(null);
            onMessageSent(response.data.chat_id);
            // Handle post-send success, such as updating the chat view
        } catch (error) {
            console.error('Failed to send message:', error);
        }
        // onMessageSent();
    };

    const handleSendMessage = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token'); // retrieve the stored token
        try {
            await sendMessage(token, chatId, text, file);
            // Handle success - clear inputs, close modal, refresh messages, etc.
        } catch (error) {
            // Handle errors - show error message to the user, etc.
        }
    };
    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            padding: '10px',
            background: '#fff',
            boxShadow: '0px -4px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <form onSubmit={sendMessage} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message..."
                    style={{ padding: '10px', fontSize: '16px', marginRight: '10px', flexGrow: 1 }}
                />
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}
                />
                <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>Send</button>
            </form>
        </div>
    );
}

SendMessageComponent.propTypes = {
    chatId: PropTypes.number, // assuming chatId is a number
    onMessageSent: PropTypes.func.isRequired,
};
export default SendMessageComponent;
