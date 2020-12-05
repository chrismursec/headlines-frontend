import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

   constructor(private errorService: ErrorService)
    {         
    }

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		return next.handle(req).pipe(
			catchError((error: HttpErrorResponse) => {
        let errorMessage = error.error.error.message;
        this.errorService.addErrors([errorMessage]);
				return throwError(errorMessage);
			})
		);
	}
}