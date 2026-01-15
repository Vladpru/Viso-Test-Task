import axios, { CreateAxiosDefaults } from 'axios';

import { SERVER_URL } from '../config/api.config';
import { getContentType } from './api.helper';

const options: CreateAxiosDefaults = {
  baseURL: SERVER_URL,
  headers: getContentType(),
  withCredentials: true,
};

export const appApi = axios.create(options);

