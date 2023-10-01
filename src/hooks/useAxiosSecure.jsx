import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

// Create an Axios instance with a base URL
const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000/', // Replace with your API base URL
});

const useAxiosSecure = () => {
    const { logOut } = useAuth(); 
    const navigate = useNavigate();


    // Add a request interceptor to inject the authorization header
    axiosSecure.interceptors.request.use(
        (config) => {
            // Get the token from local storage
            const token = localStorage.getItem('access-token');

            // Add the token to the request headers
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Add a response interceptor to handle 401 and 403 responses
    axiosSecure.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                // Handle 401 and 403 responses here
                // Log out the user and redirect to the login page
                await logOut();
                navigate('/login'); // Redirect to your login page
            }

            return Promise.reject(error);
        }
    );
    // [logOut, navigate, axiosSecure]

    return [axiosSecure]; // Return the Axios instance
};

export default useAxiosSecure;
