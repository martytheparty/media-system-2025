import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; // adjust path if needed
import { Observable } from 'rxjs';
import { FileResponse } from '../interfaces/file-response.interface';
import { FileMetaData } from '../interfaces/files-mesage.interface';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getIncomingFiles(): Observable<string[]> {
    return this.http.get<FileResponse>(`${this.baseUrl}/files`)
    .pipe(map(response => response.files));
  }

  getIncomingFilesMeta(): Observable<FileMetaData> {
    return this.http.get<FileMetaData>(`${this.baseUrl}/files/meta`)
  }

  importFiles(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/gallery/importMedia`)
  }

  isInitialized(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/gallery/isInitialized`)
  }

  initialize(galleryName: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/gallery/initialize`,{name: galleryName});
  }

  setGalleryName(galleryName: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/gallery/setTitle`,{name: galleryName});
  }

  getGalleryName(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/gallery/getTitle`);
  }
}
