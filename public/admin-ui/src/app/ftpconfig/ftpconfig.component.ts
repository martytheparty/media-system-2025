import { Component, inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FtpConfigData } from '../interfaces/gallery-data-response.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ftpconfig',
  imports: [CommonModule],
  templateUrl: './ftpconfig.component.html',
  styleUrl: './ftpconfig.component.scss'
})
export class FtpconfigComponent {
  apiService: ApiService = inject(ApiService);

  config: FtpConfigData | undefined;

  constructor() {
    this.apiService.getConfigData().subscribe(
      (data) => {
        this.config = data;
      }
    )
  }
}
