import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the token from sessionStorage
    const token = sessionStorage.getItem('acess-token');
    console.log('Token retrieved:', token); 

    // Check if the token exists
    if (token) {
      // Clone the request and add the Authorization header
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Token added to the request headers for URL:', request.url);
    } else {
      console.log('No token found for URL:', request.url);
    }

    // Proceed with the request and log details
    return next.handle(request).pipe(
      tap(
        event => {
          console.log('Request sent to:', request.url);
          console.log('Request headers:', request.headers.keys());
        },
        error => {
          console.error('Request error for URL:', request.url);
          console.error('Error details:', error);
        }
      )
    );
  }
}
