import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerIntercept implements HttpInterceptor {
    constructor(private _snackBar: MatSnackBar, private _router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(retry(1), catchError((error: HttpErrorResponse) => {
                let errorMessage = 'Error: |';
                if (error?.error instanceof ErrorEvent) {
                    // client-side error
                    errorMessage = `${errorMessage} Message: ${error?.error?.message}`;
                } else {
                    // server-side error
                    switch (error?.status) {
                        case 503:
                            errorMessage = `${errorMessage} Status: ${error?.status} | Message: Bungie's servers are down for maintenance. Try again at another time.`;
                            break;
                        case 401:
                            this._router.navigate(['home']);
                        default:
                            errorMessage = `${errorMessage} Status: ${error?.status} | Message: ${error?.message}`;
                            break;
                    }
                }
                this._snackBar.open(errorMessage, 'Dismiss');
                return throwError(errorMessage);
            }));
    }
}
