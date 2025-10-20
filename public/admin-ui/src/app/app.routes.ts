import { Routes } from '@angular/router';

import { IncomingComponent } from './incoming/incoming.component';
import { UploaderComponent } from './uploader/uploader.component';
import { ConfigComponent } from './config/config.component';
import { FtpconfigComponent } from './ftpconfig/ftpconfig.component';

export const routes: Routes = [
  { path: 'incoming', component: IncomingComponent },
  { path: 'uploader', component: UploaderComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'ftpconfig', component: FtpconfigComponent },
  { path: '', redirectTo: '/incoming', pathMatch: 'full' },
];

