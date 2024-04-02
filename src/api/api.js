import axios from 'axios';

const token = localStorage.getItem('token');
export const instance = axios.create({
    baseURL: 'http://ec2-44-199-92-143.compute-1.amazonaws.com/api/',
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=UTF-8',
    },
});

const responseBody = (response) => {
    if (response.data) {
        return response.data;
    }
    return response;
};

export const requests = {

    get: (url) => instance.get(url).then(responseBody),

    post: (url, body) => instance.post(url, body).then(responseBody),

    put: (url, body) => instance.put(url, body).then(responseBody),

    putCode: (url, body) => instance.put(url, body).then(responseBody),

    delete: (url) => instance.delete(url).then(responseBody),

    patch: (url, body) => instance.patch(url, body).then(responseBody),

};
