import { IProduct } from "./product";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
}

export interface IGenericResponse<T> {
  data: T;
  meta: IMeta;
}

export type IProductsResponse = IGenericResponse<IProduct[]>;
