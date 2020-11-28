import { Injectable} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private errors = new Subject <string[] > ();

  private ngUnsubscribe = new Subject();

  constructor() {}


  initializeErrors(): Observable<string[]>{
    return this.getErrors()
      .pipe(takeUntil(this.ngUnsubscribe))
    // .subscribe(errors => {
    //   this.errors = errors;
    // })
  }


  public addErrors = (errors: string[]): void =>
    this.errors.next(errors);

  public getErrors = () =>
    this.errors.asObservable();


}
