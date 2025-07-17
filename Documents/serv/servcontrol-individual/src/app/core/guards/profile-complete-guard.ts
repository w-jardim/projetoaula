import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth';
import { ProfileService } from '../../services/profile/profile';

export const profileCompleteGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const profileService = inject(ProfileService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    take(1),
    switchMap(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/auth/login']);
        return [false];
      }

      return profileService.isProfileComplete().pipe(
        map(isComplete => {
          if (isComplete) {
            return true;
          } else {
            router.navigate(['/profile/edit'], {
              queryParams: { required: 'true', returnUrl: state.url }
            });
            return false;
          }
        })
      );
    })
  );
};
