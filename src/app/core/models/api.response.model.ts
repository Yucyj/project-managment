export enum StatusResult {
  Failed = 0,
  Success = 1,
  Exist = 2,
  NotExists = 3
}

export interface ApiError {
  message?: string;
  code?: string;
}

export interface ApiResponse<T> {
  succeeded: boolean;
  status: StatusResult;
  message?: string;
  data?: T | null;
  error?: ApiError | null;
}

export type ValidationErrors = Record<string, string[]>;