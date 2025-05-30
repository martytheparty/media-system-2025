import { environment } from '../../environments/environment';

import { Component, inject } from '@angular/core';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-incoming',
  imports: [],
  templateUrl: './incoming.component.html',
  styleUrl: './incoming.component.scss'
})
export class IncomingComponent {

  apiService: ApiService = inject(ApiService);
  files: string[] = [];


  constructor() {
    this.apiService.getIncomingFiles().subscribe(
      (files: string[]) => {
        this.files = files;
      }
    );
    console.log(environment.apiBaseUrl);
  }

}
