import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { ApiService } from '../services/api.service';
import { catchError, map, of } from 'rxjs';

export const configGuard: CanActivateFn = (route, state) => {

  const apiService: ApiService = inject(ApiService);
  const router = inject(Router);

   return apiService.isInitialized().pipe(
    map((configured) => {
      return configured ? true : router.createUrlTree(['/config']);
    }),
    catchError(() => of(router.createUrlTree(['/config'])))
  );

};
