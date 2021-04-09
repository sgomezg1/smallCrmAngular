import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req.clone({
      setHeaders: {
        'Authorization': `Basic ${btoa('admin:admin')}`,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(request);
    /* return next.handle(request).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          switch ((err as HttpErrorResponse).status) {
            case 401:
              this.router.navigateByUrl('/401');
            case 500:
              this.router.navigateByUrl('/500');
            default:
              return throwError(err);
          }
        } else {
          return throwError(err);
        }
      })
    ); */
  }
}