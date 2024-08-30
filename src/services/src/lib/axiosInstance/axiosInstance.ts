import axios from 'axios';
import {
  BASE_URL,
  REQUEST_HEADERS,
  REQUEST_TIMEOUT,
} from '@vidoso-fe-task/constants';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: REQUEST_HEADERS,
});
