import { listFilter, sortOption } from '.';

export type role = {
  id: number;
  name: string;
  desc: string;
  resources: resource[];
};
export type resource = {
  id: number;
  name: string;
  alias: string;
  type: number;
  parentId?: number;
  children?: resource[];
};
export interface roleListFilter extends listFilter {
  name?: string;
  sort?: sortOption;
};
