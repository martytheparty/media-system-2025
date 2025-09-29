import { Component, inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { take } from 'rxjs';
import { GalleryData, GalleryEvent } from '../interfaces/gallery-data-response.interface';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-uploader',
  imports: [
    CommonModule,
    MatTableModule
  ],
  templateUrl: './uploader.component.html',
  styleUrl: './uploader.component.scss'
})
export class UploaderComponent {

    apiService: ApiService = inject(ApiService);

    galleryData: GalleryData | undefined;
    events: GalleryEvent[] = [];
    columnsToDisplay = ['title', 'clean', 'uploaded'];

    constructor() {
      this.apiService.getGalleryData().pipe(take(1)).subscribe(
        (data: GalleryData) => {
          this.galleryData = data;
          if (data.events) {
            this.events = data.events;
         }
        } 
      );
    }

}
