import { Routes } from '@angular/router';

import { IncomingComponent } from './incoming/incoming.component';
import { UploaderComponent } from './uploader/uploader.component';
import { ConfigComponent } from './config/config.component';
import { configGuard } from './guards/config.guard';

export const routes: Routes = [
  { path: 'incoming', component: IncomingComponent, canActivate: [configGuard] },
  { path: 'uploader', component: UploaderComponent, canActivate: [configGuard]  },
  { path: 'config', component: ConfigComponent },
  { path: '', redirectTo: '/incoming', pathMatch: 'full' },
];

