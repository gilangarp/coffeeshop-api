interface IPaginationMeta {
  totalData?: number;
  totalPage?: number;
  page: number;
  prevLink: string | null;
  nextLink: string | null;
}

interface IErrorResponse {
  message: string;
  details?: string;
}

export interface IBasicResponse {
  message?: string;
  data?: unknown;
  error?: IErrorResponse;
  meta?: IPaginationMeta;
}
