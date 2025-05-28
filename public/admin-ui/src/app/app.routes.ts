import { Routes } from '@angular/router';

import { IncomingComponent } from './incoming/incoming.component';
import { UploaderComponent } from './uploader/uploader.component';

export const routes: Routes = [
  { path: 'incoming', component: IncomingComponent },
  { path: 'uploader', component: UploaderComponent },
  { path: '', redirectTo: '/incoming', pathMatch: 'full' },
];

