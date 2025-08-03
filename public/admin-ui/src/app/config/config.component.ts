import { Component, inject, OnDestroy } from '@angular/core';

import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


import { ApiService } from '../services/api.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-config',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class ConfigComponent implements OnDestroy {
  apiService: ApiService = inject(ApiService);

  initialized = false;

  initializedSub: Subscription;

  form = new FormGroup({
    name: new FormControl('')
  });

  title = "Initialize Gallery";

  constructor() {
    this.initializedSub = this.apiService.isInitialized().subscribe(
      (response: boolean) => {
        this.initialized = response;
        this.title = "Update Gallery Title";
      }
    );
  }

  ngOnDestroy(): void {
    this.initializedSub.unsubscribe();
  }

  onSubmit() {
    console.log('Submitted value:', this.form.value);
  }
}
