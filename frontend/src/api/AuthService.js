import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/signup/`, userData);
        return response.data;
    } catch (error) {
        console.error('Signup error:', error.response);
        throw error.response.data;
    }
};

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/login/`, credentials);
        // Assuming the API correctly returns a token in the response
        if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);  // Storing the token
            return response.data; // Returning the whole response data or just the token as needed
        } else {
            // Handle the case where the token is not in the response
            throw new Error('Token not found in response');
        }
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        // Throwing a more generic error or the specific error message depending on your error handling strategy
        throw new Error(error.response ? error.response.data : 'An error occurred during login');
    }
};


export const fetchChats = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/chats/`, {
            headers: { 'Authorization': `Token ${token}` }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching chats:', error.response);
        throw error.response.data;
    }
};

export const sendMessage = async (token, chatId, text, file) => {
    const formData = new FormData();
    console.log(chatId, text, file);
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
        return response.data; // return the response data for further processing
    } catch (error) {
        console.error('Error sending message:', error.response ? error.response.data : error.message);
        throw error; // re-throw the error for the calling component to handle
    }
};

// ...other imports and code...

export const fetchChatMessages = async (token, chatId) => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/chats/${chatId}/`, {
            headers: { 'Authorization': `Token ${token}` }
        });
        return response.data.messages; // Assuming the API returns a "messages" array
    } catch (error) {
        console.error('Error fetching chat messages:', error.response ? error.response.data : error.message);
        throw error; // re-throw the error for the calling component to handle
    }
};
