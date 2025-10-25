import { Component, inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FtpConfigData } from '../interfaces/gallery-data-response.interface';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ftpconfig',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './ftpconfig.component.html',
  styleUrl: './ftpconfig.component.scss'
})
export class FtpconfigComponent {
  apiService: ApiService = inject(ApiService);

  config: FtpConfigData | {} | undefined;

  form = new FormGroup({
    title: new FormControl(''),
    host: new FormControl(''),
    remoteDirectory: new FormControl(''),
    websiteUrl: new FormControl(''),
    websiteDirectory: new FormControl(''),
    transferProtocal: new FormControl(''),
    key: new FormControl('')
  });

  found = false;

  constructor() {
    this.apiService.getConfigData().pipe(take(1)).subscribe(
      (data: FtpConfigData | {}) => {
        this.config = data;

        const record = data as FtpConfigData;

        if (record?.title) {
          this.found = true;
          this.form.controls['title'].setValue(record.title);
        }

        if (record?.host) {
          this.form.controls['host'].setValue(record.host);
        }
        
        if (record?.remoteDirectory) {
          this.form.controls['remoteDirectory'].setValue(record.remoteDirectory);
        }

        if (record?.websiteUrl) {
          this.form.controls['websiteUrl'].setValue(record.websiteUrl);
        }

        if (record?.websiteDirectory) {
          this.form.controls['websiteDirectory'].setValue(record.websiteDirectory);
        }

        if (record?.transferProtocal) {
          this.form.controls['transferProtocal'].setValue(record.transferProtocal);
        }
      }
    )
  }

  onSubmit() {
    alert(123);
  }
}
