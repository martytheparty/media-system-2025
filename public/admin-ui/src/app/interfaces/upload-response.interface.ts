export interface HostResult {
  success: boolean;
  message: string;
}

export interface HostProtocalResult {
  ftp: boolean;
  sftp: boolean;
}

export interface FtpLoginResult {
  message: string;
  protocal: 'ftp';
  success: boolean;
}

export interface UploadResult {
  message: string;
  protocal: 'ftp' | 'sftp';
  success: boolean;
}

export type ResultType = 'unknown' | 'ok' | 'fail';