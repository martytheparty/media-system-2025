import { Component, inject, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';

import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


import { ApiService } from '../services/api.service';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

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
  router = inject(Router);

  initialized = false;

  initializedSub: Subscription;

  form = new FormGroup({
    name: new FormControl('')
  });

  title = "Initialize Gallery";

  constructor() {
    this.initializedSub = this.apiService.isInitialized()
    .subscribe(
      (response: boolean) => {
        this.initialized = response;
        this.title = "Update Gallery Title";
        // this.router.navigate(['/config']);
        this.setFormName();
      }
    );
  }

  ngOnDestroy(): void {
    this.initializedSub.unsubscribe();
  }

  setFormName(): void {
    this.apiService.getGalleryName()
    .pipe(take(1))
    .subscribe(
      (name: string) => {
        this.form.patchValue({name});
      }
    )
  }

  onSubmit() {
    const title: string = this.form.value.name as string;

    if (this.initialized) {
      this.apiService
      .setGalleryName(title)
      .pipe(take(1))
      .subscribe(
          (initialized: boolean) => {
            this.initialized = initialized;
          } 
      );
    } else {
      this.apiService
          .initialize(title)
          .pipe(take(1))
          .subscribe(
            (initialized: boolean) => {
              this.initialized = initialized;
            }
          );
    }
  }
}
