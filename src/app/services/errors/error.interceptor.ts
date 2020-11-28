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
      // console.log("error", error.error.error.message);
        let errorMessage = error.error.error.message;
        // window.alert(errorMessage)
        // console.log(errorMessage);
        this.errorService.addErrors([errorMessage]);
				return throwError(errorMessage);
			})
		);
	}
}