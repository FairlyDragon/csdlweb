import axios from "axios";

const AUTH_URL = "http://127.0.0.1:8000/auth";

const authService = {
    signup: async (userData) => {
        try {
            console.log('Signup request data:', userData);
            
            const response = await axios.post(`${AUTH_URL}/signup`, {
                email: userData.email,
                password: userData.password,
                role: userData.role
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            console.log('Signup successful:', response.data);
            return response.data;
        } catch (error) {
            if (!error.response) {
                console.error('No response from server');
                throw new Error('Cannot connect to server. Please check if the server is running.');
            }
            console.error('Signup error:', error);
            throw error;
        }
    },

    login: async (credentials) => {
        try {
            const formData = new URLSearchParams();
            formData.append('username', credentials.username);
            formData.append('password', credentials.password);

            const response = await axios.post(`${AUTH_URL}/login`, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.data.access_token) {
                localStorage.setItem('user', JSON.stringify({
                    email: credentials.username,
                    token: response.data.access_token,
                    role: response.data.role,
                    id: response.data.id
                }));
            }

            return response.data;
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('user');
        window.location.href = '/';
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    isAuthenticated: () => {
        const user = authService.getCurrentUser();
        return !!user && !!user.token;
    }
};

export default authService;