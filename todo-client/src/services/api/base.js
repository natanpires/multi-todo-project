import axios from 'axios';

import { getToken } from '../../utils/auth';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Client-Device': 'browser',
};

const callApiBase = (call) => {
  let {
    endpoint,
    headers,
    method = 'GET',
    token = getToken() || '',
    params = {},
    data = {},
    showJSON = false,
    showConsoleLog = false,
    title = '',
  } = call;

  // Config Headers
  headers = { ...headers, ...defaultHeaders };
  // Auth BEARER
  if (token) headers['x-access-token'] = token;
  // Helpers for Debug
  if (showJSON) console.log(`[${title} - CALL API JSON DATA]`, JSON.stringify(data));
  if (showConsoleLog) {
    console.log(`[${title} - CALL API COMPLETE]`, {
      headers,
      method,
      endpoint,
      params,
      data,
    });
  }

  const apiBase = axios.create({
    baseURL: 'http://localhost:5050/api',
  });

  apiBase.interceptors.response.use(
    (response) => {
      if (showConsoleLog) console.log(`${title} - RESPONSE`, response);
      return response;
    },
    async (error) => {
      if (showConsoleLog) console.error(`${title} - ERROR`, error);
      return Promise.reject(error);
    }
  );

  if (method === 'GET' || method === 'DELETE') {
    return apiBase(endpoint, {
      params: { ...params },
      headers,
      method,
    });
  }

  return apiBase(endpoint, {
    headers,
    method,
    data,
  });
};

export default callApiBase;
export { callApiBase };
