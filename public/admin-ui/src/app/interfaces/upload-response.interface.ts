export interface HostResult {
  success: boolean;
  message: string;
}

export interface HostProtocalResult {
  ftp: boolean;
  sftp: boolean;
}

export type ResultType = 'unknown' | 'ok' | 'fail';