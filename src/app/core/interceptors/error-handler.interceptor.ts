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

import { ErrorMessageService } from '../services/error-message.service';

@Injectable()
export class ErrorHandlerIntercept implements HttpInterceptor {
    constructor(private _errorMessageService: ErrorMessageService) {}

    intercept( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
        .pipe(retry(2), catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if (error?.error instanceof ErrorEvent) {
                // client-side error
                errorMessage = `Message: ${error?.error?.message}`;
            } else {
                // server-side error
                errorMessage = `Status: ${error?.status} | Message: ${error?.message}`;
            }
            console.error(errorMessage);
            this._errorMessageService.openSnackBar(errorMessage);
            return throwError(errorMessage);
        }));
    }
}
