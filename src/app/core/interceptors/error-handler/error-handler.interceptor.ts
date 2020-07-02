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

@Injectable()
export class ErrorHandlerIntercept implements HttpInterceptor {
    constructor(private _snackBar: MatSnackBar) {}

    intercept( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
        .pipe(retry(1), catchError((error: HttpErrorResponse) => {
            let errorMessage = 'Error: |';
            if (error?.error instanceof ErrorEvent) {
                // client-side error
                errorMessage = `${errorMessage} Message: ${error?.error?.message}`;
            } else if (error?.status == 401) {
                // TODO: after handling http 401 on the server side, 
                // add a redirect from the server to the home page.
                // revisit this error to see if it is necessary to have.

                // bad tokens, need the user to log in.
                // cookies will be deleted from the server.

                // send the user 
                // location.href = '/home';
                
            } else {
                // server-side error
                errorMessage = `${errorMessage} Status: ${error?.status} | Message: ${error?.message}`;
            }
            console.error(errorMessage);
            this._snackBar.open(errorMessage, 'Dismiss');
            return throwError(errorMessage);
        }));
    }
}
