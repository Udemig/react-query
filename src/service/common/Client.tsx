import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 100000,
  timeoutErrorMessage: 'Api Erişim Yok!',
});

function getToken() {
  return 'sdlkfsdşfksd,ş,hfsdıu08u odığfjğpdspjfsdpjıfdjspo';
}

client.interceptors.request.use(
  async req => {
    const token = getToken();

    if (token) {
      req.headers.Authorization = 'Bearer ' + token;
    }

    console.log('Request', req);

    return req;
  },
  error => {
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  response => {
    console.log('Response', response);
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);
