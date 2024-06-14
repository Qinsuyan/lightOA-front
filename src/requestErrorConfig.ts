import type { AxiosResponse, RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message } from 'antd';
import { baseResponse, responsePromptType } from './entities';
import { KEY_USER_INFO } from './entities/localNames';
import { getObjectFromLocalStorage } from './utils';
import { userToken } from './entities/user';
/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */

export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res: baseResponse<any>) => {
      if (res.code !== 0) {
        const error: any = new Error(res.msg);
        error.name = 'BizError';
        error.info = { msg: res.msg, prompt: res.prompt };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) {
        throw error;
      }
      if (error.name === 'BizError') {
        if (error.info) {
          const info: Partial<baseResponse<void>> = error.info;
          if (info.prompt) {
            switch (info.prompt) {
              case responsePromptType.err:
                message.error(info.msg);
                break;
              case responsePromptType.warn:
                message.warning(info.msg);
                break;
              case responsePromptType.info:
                message.info(info.msg);
                break;
            }
          }
        }
      } else if (error.response) {
        // Axios 的错误
        if (error.response.data.msg) {
          message.error('操作失败：' + error.response.data.msg);
        } else {
          message.error('操作失败');
        }
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('None response! Please retry.');
      } else {
        // 发送请求时出了点问题
        message.error('Request error, please retry.');
      }
    },
  },
  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      if (window.location.href.indexOf('/login') > -1) {
        return config;
      }
      const userInfo = getObjectFromLocalStorage<userToken>(KEY_USER_INFO);
      if (userInfo?.token) {
        config.headers!['LTOAToken'] = userInfo.token;
        return config;
      } else {
        if (config.url!.indexOf('/login') > -1) {
          return config;
        }
        window.location.replace('/login');
        return config;
      }
    },
  ],
  // 响应拦截器
  responseInterceptors: [
    (response: AxiosResponse) => {
      if (response.data?.prompt === responsePromptType.success) {
        if (response.data?.msg) {
          message.success(response.data?.msg);
        }
      }
      return response;
    },
  ],
};
