import { HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  
  const router = inject(Router);
  
  return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        // Token is expired or unauthorized.
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};
