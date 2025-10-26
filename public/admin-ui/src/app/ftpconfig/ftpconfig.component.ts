import { Component, inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FtpConfigData } from '../interfaces/gallery-data-response.interface';
import { take } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ftpconfig',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
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
    key: new FormControl(''), // collected but never displayed or even stored
    pw: new FormControl('') // collected but never displayed and stored encrypted
  });

  found = false;

  constructor() {
    this.getConfigData();
  }

  onSubmit() {
    const config = this.form.value as unknown as FtpConfigData;
    this.apiService
      .setConfigData(config)
      .pipe(take(1))
      .subscribe(this.getConfigData.bind(this));
  }

  getConfigData() {
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

        this.form.controls['pw'].setValue('');
        this.form.controls['key'].setValue('');
      }
    )
  }
}
