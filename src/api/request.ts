import axios from 'axios';
import { message } from 'antd';

export interface ApiResult<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
});

request.interceptors.response.use(
  (response) => {
    const result = response.data as ApiResult;
    if (result && typeof result.success === 'boolean') {
      if (!result.success) {
        message.error(result.message || '请求失败');
        return Promise.reject(new Error(result.message || '请求失败'));
      }
      return result.data as never;
    }
    return response.data;
  },
  (error) => {
    const msg = error?.response?.data?.message || error?.message || '网络异常';
    message.error(msg);
    return Promise.reject(error);
  },
);

export default request;
