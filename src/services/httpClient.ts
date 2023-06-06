import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;
if (!baseURL) throw new Error('в .env укажите VITE_API_BASE_URL');

export const httpClient = axios.create({ baseURL });
