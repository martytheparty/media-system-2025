import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { RouterOutlet, Router, RouterModule } from '@angular/router';


import { MatToolbarModule } from '@angular/material/toolbar';

import { MatButtonModule } from '@angular/material/button';
import { ApiService } from './services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  apiService: ApiService = inject(ApiService);
  sub: Subscription;
  router: Router = inject(Router);


  constructor() {
    console.log("Constructor");
    this.sub = this.apiService.isInitialized().subscribe(
      (initialized: boolean) => {
        if (!initialized) {
          this.router.navigate(['/config']);
        }
      }
    );
  }


  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }
  title = 'admin-ui';
}
