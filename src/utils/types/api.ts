export interface Request {
  code?: string;
  page?: string | number;
}

export type Response<T = any> = {
  data: T;
  messages: string[];
  meta: {
    code: string;
    status: string;
  };
};

export interface ResponsePagination<T = any> extends Response<T> {
  pagination: IPagination;
}

export interface IPagination {
  limit: number;
  page: number;
  total_pages: number;
  total_records: number;
}
