import { deleteStorageItem, getStorageItem } from "@/utils/storage";
import axios from "axios";
import { router } from "expo-router";

const apiClient = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api`,  // Base URL for your API
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,  // Optional: set a timeout limit for requests (10 seconds in this example)
});

apiClient.interceptors.request.use(
    async (config) => {
        const token = await getStorageItem('authToken'); // or any other method for storing token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle authentication errors
apiClient.interceptors.response.use(
    (response) => {
        // If the response is successful, just return it
        return response;
    },
    (error) => {
        console.log("error",error);
        
        // If the error is related to authentication (e.g., 401 Unauthorized)
        if (error.response && error.response.status === 401) {
            // Handle unauthenticated status (e.g., log out the user)
            handleLogout();
        }
        // You can also return a rejected promise to propagate the error
        return Promise.reject(error);
    }
);

const handleLogout = () => {
    deleteStorageItem('authToken')
    router.dismissAll();
    router.replace("/")
};

export default apiClient;