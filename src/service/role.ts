import { resource, role, roleListFilter } from '@/entities/role';
import { del, get, post, put } from '.';
import { listData } from '@/entities';

export const addRole = (params: Partial<role>) => {
  return post<void>('/role', params);
};
export const editRole = (params: Partial<role> & { id: number }) => {
  return put<void>('/role', params);
};
export const getRoleList = (params: roleListFilter) => {
  return get<listData<role>>('/role/list', params);
};
export const deleteRole = (id: number) => {
  return del<void>(`/role/${id}`);
};
export const getAllResources = () => {
  return get<resource>('/role/resources');
};
