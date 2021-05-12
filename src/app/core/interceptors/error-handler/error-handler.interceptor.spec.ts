import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorHandlerIntercept } from './error-handler.interceptor';
import { CharactersService } from 'src/app/core/services';

class Handler extends HttpHandler {
    constructor() {
        super();
    }

    handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        return new Observable();
    }
}

class MockMatSnackBar {
    open(mess, action): void {

    }
}

describe('ErrorHandlerIntercept', () => {
    let service: CharactersService;
    let httpMock: HttpTestingController;
    let intercept: ErrorHandlerIntercept;

    beforeEach(() => {
        intercept = new ErrorHandlerIntercept(jasmine.createSpyObj(MatSnackBar, ['open']), jasmine.createSpyObj(Router));
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {provide: MatSnackBar, useClass: MockMatSnackBar},
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ErrorHandlerIntercept,
                    multi: true
                }
            ]
        });

        service = TestBed.inject(CharactersService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should intercept', () => {
        service.getCharacters('id123', '1').subscribe(response => {
            expect(response).toBeTruthy();
        });
    });

});
