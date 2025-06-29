import axios from 'axios';
import { setHeader, headerConstants } from '#core/api';
import { UserSession } from './login.api-model';

const url = '/api/security/login';

export const isValidLogin = async (
  user: string,
  password: string
): Promise<UserSession> => {
  const { data } = await axios.post<UserSession>(
    url,
    { user, password }
    // { withCredentials: true }
  );
  /**
   * Traer el token de la respuesta del backend.
   */
  setHeader(headerConstants.authorization, data.token);
  return data;
};
