import axios from 'axios';
import { API_URL } from './Config';

export const Api = () => {
    const token = localStorage.token;
    const apiAxios = axios.create({
        baseURL: API_URL+'/api',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return apiAxios;
};