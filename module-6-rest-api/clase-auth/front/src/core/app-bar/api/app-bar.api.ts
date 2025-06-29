import { headerConstants, setHeader } from '#core/api';
import axios from 'axios';

const url = '/api/security/logout';

export const logout = async (): Promise<boolean> => {
  await axios.post(url);
  /**
   * Quitar el token de autenticación del header.
   */
  setHeader(headerConstants.authorization, '');

  return true;
};
