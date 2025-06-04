import { environment } from '../../environments/environment';

import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { ApiService } from '../services/api.service';
import { FileMetaData } from '../interfaces/files-mesage.interface';


@Component({
  selector: 'app-incoming',
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './incoming.component.html',
  styleUrl: './incoming.component.scss'
})
export class IncomingComponent {

  apiService: ApiService = inject(ApiService);
  files: string[] = [];
  meta: FileMetaData | undefined;


  constructor() {
    this.apiService.getIncomingFiles().subscribe(
      (files: string[]) => {
        this.files = files;
      }
    );

    this.apiService.getIncomingFilesMeta().subscribe(
      (metaData: FileMetaData) => {
        this.meta = metaData;
      }
    );
    console.log(environment.apiBaseUrl);
  }

}
