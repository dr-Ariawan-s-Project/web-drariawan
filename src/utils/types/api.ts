export interface Request {
  code?: string;
}

export type Response<T = any> = {
  data: T;
  message: string[];
  meta: {
    code: string;
    status: string;
  };
};
