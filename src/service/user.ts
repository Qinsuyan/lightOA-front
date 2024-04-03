import { loginPack, userToken } from '@/entities/user';
import { post, get } from '.';

export const userLogin = (payload: loginPack) => {
  return post<userToken>('/token', payload);
};
export const userLogout = () => {
  return get<void>('/token');
};
