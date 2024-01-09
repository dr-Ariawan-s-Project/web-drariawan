export interface Request {
  code?: string;
  page?: string | number;
}

export type Response<T = any> = {
  data: T;
  message: string[];
  meta: {
    code: string;
    status: string;
  };
};

export interface Meta {
  currentPage: number;
  totalPages: number;
}
