export type loginPack = {
  username: string;
  password: string;
};

export enum resourceType {
  menu = 1,
  button = 2,
  root = 3,
}

export type userRole = {
  id: number;
  name: string;
  resources: userResource[];
};

export type userResource = {
  alias: string;
  id: number;
  name: string;
  type: resourceType;
  children?: userResource;
  parentId?: number;
};

export interface userInfo {
  id: number;
  username: string;
  role: userRole;
}

export type userToken = {
  token: string;
  user: userInfo;
};