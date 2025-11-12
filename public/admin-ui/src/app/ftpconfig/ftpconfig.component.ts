import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FtpConfigData } from '../interfaces/gallery-data-response.interface';
import { take } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule,  MatDialog, MatDialogRef  } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HostProtocalResult, HostResult, ResultType } from '../interfaces/upload-response.interface';

@Component({
  selector: 'app-ftpconfig',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIcon,
    CommonModule
  ],
  templateUrl: './ftpconfig.component.html',
  styleUrl: './ftpconfig.component.scss'
})
export class FtpconfigComponent {
  @ViewChild('ftpConfigTemplate') ftpConfigTemplate!: TemplateRef<void>;
  dialogRef!: MatDialogRef<any>;

  apiService: ApiService = inject(ApiService);

  config: FtpConfigData | {} | undefined;

  form = new FormGroup({
    title: new FormControl(''),
    host: new FormControl(''),
    remoteDirectory: new FormControl(''),
    websiteUrl: new FormControl(''),
    websiteDirectory: new FormControl(''),
    transferProtocal: new FormControl(''),
    userName: new FormControl(''),
    key: new FormControl(''), // collected but never displayed or even stored
    pw: new FormControl('') // collected but never displayed and stored encrypted
  });

  found = false;

  hostStatus: ResultType = 'unknown';
  ftpStatus: ResultType = 'unknown';
  sftpStatus: ResultType = 'unknown';

  constructor(private dialog: MatDialog) {
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

        if (record?.userName) {
          this.form.controls['userName'].setValue(record.userName);
        }

        this.form.controls['pw'].setValue('');
        this.form.controls['key'].setValue('');
      }
    )
  }

  openDialog() {
    this.dialogRef = this.dialog.open(this.ftpConfigTemplate);
  }

  closeDialog() {
    this.hostStatus = 'unknown';
    this.ftpStatus = 'unknown';
    this.sftpStatus = 'unknown';
    this.dialogRef.close();
  }

  testHost() {
    const host = this.form.controls['host'].value;

    if (host)
    {
      this.apiService.getCheckHost(host).pipe(take(1)).subscribe(
        (result: HostResult) => {
          if (result.success) {
            this.hostStatus = "ok";
          } else {
            this.hostStatus = "fail";
          }

        }
      );
    }
  }

  testHostProtocals() {
    const host = this.form.controls['host'].value;

    if (host)
    {
      this.apiService.getCheckHostProtocols(host).pipe(take(1)).subscribe(
        (result: HostProtocalResult) => {
          if (result.ftp) {
            this.ftpStatus = "ok";
          } else {
            this.ftpStatus = "fail";
          }

          if (result.sftp) {
            this.sftpStatus = "ok";
          } else {
            this.sftpStatus = "fail";
          }

        }
      );
    }
  }
}
