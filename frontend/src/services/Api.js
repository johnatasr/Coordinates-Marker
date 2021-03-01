import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/markers/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

export default axiosInstance