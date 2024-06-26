export interface listFilter {
  index: number; //当前页码
  size: number; //每页条数
}

export type listData<T> = {
  total: number; //总条数
  list: T[]; //数据
};
export enum responsePromptType {
  err = 1, //错误
  warn = 2, //警告
  info = 3, //信息
  success = 4, //成功
  silent = 5,
}

export type baseResponse<T> = {
  prompt?: responsePromptType; //提示类型，对应message.error等
  msg: string; //状态信息，成功时为成功的提示信息，错误时为错误信息
  data: T; //数据
  code: number;
};
