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