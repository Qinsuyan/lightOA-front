import { baseResponse, pageFilter } from '@/entities';
import { request } from '@umijs/max';
import { isArray } from 'lodash';

const baseUrl = '/api';
export type paramsType = { [key: string]: any };
export function post<T = undefined>(url: string, params: paramsType): Promise<baseResponse<T>> {
  return request(baseUrl + url, {
    method: 'POST',
    data: params,
  });
}
export function get<T = undefined>(url: string, params?: paramsType): Promise<baseResponse<T>> {
  return request(baseUrl + url, {
    method: 'GET',
    params,
    paramsSerializer: (params) => {
      let res = '';
      for (let i in params) {
        if (isArray(params[i])) {
          params[i].forEach((e: any) => {
            if (e !== null && e !== undefined) {
              res += `${i}=${e}&`;
            }
          });
        } else {
          if (params[i] !== null && params[i] !== undefined) {
            res += `${i}=${params[i]}&`;
          }
        }
      }
      return res.slice(0, -1);
    },
  });
}
export function put<T = undefined>(url: string, params: paramsType): Promise<baseResponse<T>> {
  return request(baseUrl + url, {
    method: 'PUT',
    data: params,
  });
}
export function del<T = undefined>(url: string, params?: paramsType): Promise<baseResponse<T>> {
  return request(baseUrl + url, {
    method: 'DELETE',
    params,
  });
}

export function callProTableData<T>(
  service: (params: any) => Promise<baseResponse<{ list: T[]; total: number }>>,
  onFail?: (m: string) => void,
) {
  return (params: pageFilter, sorter = {}, filter = {}) => {
    const { index, size, ...rest } = params;
    return service({
      index,
      size,
      ...rest,
      ...getProSorter(sorter),
      ...filter,
    }).then(({ code, msg, data }) => {
      if (code !== 0 && onFail) {
        onFail(msg);
      }
      const { list, total } = data || {};
      return {
        data: list,
        total,
        success: code === 0,
      };
    });
  };
}
function getProSorter(sorter: { [key: string]: 'descend' | 'ascend' | undefined }) {
  const field = Object.keys(sorter)[0];
  return field
    ? {
        [`${field}Order`]: sorter[field],
      }
    : {};
}
export const downloadFile = (url: string, filename?: string) => {
  fetch(url)
    .then((res) => ({ blob: res.blob(), headers: res.headers }))
    .then((data) => {
      data.blob.then((bl) => {
        const a = window.document.createElement('a');
        const downUrl = window.URL.createObjectURL(bl);
        const cd =
          data.headers.get('content-disposition') || data.headers.get('Content-Disposition');
        const name = filename || cd!.split('filename=')[1];
        a.href = downUrl;
        a.download = `${decodeURI(name)}`;
        a.click();
        window.URL.revokeObjectURL(downUrl);
      });
    });
};
