export interface GalleryEvent {
  title: string;
  files: string[];
  clean?: boolean;
  uploaded?: boolean;
}

export interface GalleryData {
  title: string;
  events: GalleryEvent[];
}

export interface FtpConfigData {
  title: string;
  host: string;
  remoteDirectory: string;
  websiteUrl: string;
  websiteDirectory: string;
  transferProtocal: "sftp" | "ftp";
  pw: string;
}
