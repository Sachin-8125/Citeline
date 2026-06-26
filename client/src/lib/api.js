import axios from 'axios';

let accessToken = null;
let refreshRequest = null;

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true
});

export function setAccessToken(token){
  accessToken = token;
}

export function getAccessToken(){
  return accessToken;
}

async function refreshAccessToken(){
  if(!refreshRequest){
    refreshRequest = api.post('/auth/refresh')
    .then((response) => {
      setAccessToken(response.data.accessToken);
      return response.data.accessToken;
    })
    .catch(() => {
      setAccessToken(null);
      return null;
    })
    .finally(() => {
      refreshRequest = null;
    })
  }
  return refreshRequest;
}

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const responseStatus = error.response?.status;
    const requestConfig = error.config;
    const requestUrl = requestConfig?.url || '';
    const isAuthRoute =
      requestUrl.includes('/auth/login') ||
      requestUrl.includes('/auth/register') ||
      requestUrl.includes('/auth/refresh') ||
      requestUrl.includes('/auth/logout');

    if (responseStatus === 401 && requestConfig && !requestConfig._retry && !isAuthRoute) {
      requestConfig._retry = true;
      const nextToken = await refreshAccessToken();

      if (nextToken) {
        requestConfig.headers = requestConfig.headers ?? {};
        requestConfig.headers.Authorization = `Bearer ${nextToken}`;
        return api(requestConfig);
      }
    }

    return Promise.reject(error);
  }
);