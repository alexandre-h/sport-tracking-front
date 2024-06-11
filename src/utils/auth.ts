import axios from 'axios';
import { getToken, removeToken } from '../services/token.service';

export const checkTokenValidity = async (): Promise<boolean> => {
  const token = getToken();
  if (!token) return false;
  try {
    const response = await axios.post(
      'http://localhost:3000//auth/check_token',
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.valid;
  } catch (error) {
    removeToken();
    return false;
  }
};
