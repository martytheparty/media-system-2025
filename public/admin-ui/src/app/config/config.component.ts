import { Component, inject, OnDestroy } from '@angular/core';

import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { ApiService } from '../services/api.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-config',
  imports: [
    ReactiveFormsModule
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

  constructor() {
    this.initializedSub = this.apiService.isInitialized().subscribe(
      (response: boolean) => {
        this.initialized = response;
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
