import { Component, inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { take } from 'rxjs';
import { GalleryData } from '../interfaces/gallery-data-response.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-uploader',
  imports: [CommonModule],
  templateUrl: './uploader.component.html',
  styleUrl: './uploader.component.scss'
})
export class UploaderComponent {

    apiService: ApiService = inject(ApiService);

    galleryData: GalleryData | undefined;

    constructor() {
      this.apiService.getGalleryData().pipe(take(1)).subscribe(
        (data: GalleryData) => {
          this.galleryData = data;
        } 
      );
    }

}
