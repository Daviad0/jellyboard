// use axios

import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000'
});

export const apiGet = async (path, token) => {
    const response = await api.get(path, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const apiPost = async (path, body, token) => {
    const response = await api.post(path, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}