import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatButtonModule } from '@angular/material/button';





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
export class AppComponent {
  title = 'admin-ui';
}
