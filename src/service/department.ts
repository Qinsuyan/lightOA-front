import { listData, listFilter } from '@/entities';
import { del, get, post, put } from '.';
import { department } from '@/entities/department';

export const getDepartmentList = (params: listFilter) => {
  return get<listData<department>>('/department/list', params);
};
export const editDepartment = (params: Partial<department> & { id: number }) => {
  return put<void>('/department', params);
};
export const addDepartment = (params: Partial<department>) => {
  return post<void>('/department', params);
};
export const deleteDepartment = (id: number) => {
  return del<void>(`/department/${id}`);
};
