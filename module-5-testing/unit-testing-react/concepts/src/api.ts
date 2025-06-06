import Axios, { AxiosError } from 'axios';
import { Member } from './api-model';

const url = 'https://api.github.com/orgs/lemoncode/members';

export const getMembers = (): Promise<Member[]> =>
  Axios.get(url)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      switch (error.response.status) {
        case 403:
          throw 'Too much Github API calls!';
        case 503:
          throw 'Unavailable service';
      }
    });

import { Credential, User } from './model';

// TODO: Implement real login method on backend server
export const login = (credential: Credential): Promise<User> => {
  return Promise.reject('Pending to implement');
};
