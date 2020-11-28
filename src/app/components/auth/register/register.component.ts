import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorService } from '../../../services/errors/error.service';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/auth/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  
  private ngUnsubscribe = new Subject();
  public registerForm: FormGroup;
  private authStatusSub: Subscription;
  passwordConfirmed: boolean = true;
  acceptedTerms: boolean = true;
  errors: string[] = [];
  isLoading: boolean = false;


  constructor(private authService: AuthService, private errorService: ErrorService) { 
    this.errorService.initializeErrors().subscribe(errors => {
      this.errors = errors;
    });
  }

  onRegistration() {
    this.isLoading = true;
    if (this.registerForm.value.password != this.registerForm.value.confirmPassword) {
      this.passwordConfirmed = false;
    }

    else if (!this.registerForm.value.termsOfService) {
      this.acceptedTerms = false;
    }

    else {
        const createdUser: User = { 
          username: this.registerForm.value.username,
          password: this.registerForm.value.password
        };

        this.authService.createUser( createdUser.username,  createdUser.password);
      }

  }


  clearErrors() {
    this.errors = [];
  }

  resetForm() {
    this.registerForm.reset();
  }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      username: new FormControl(null, {validators: [Validators.required, Validators.minLength(5)]}),
       password: new FormControl(null, {
        validators: [ Validators.compose([ Validators.required, Validators.minLength(6) ]) ]
      }),
      confirmPassword: new FormControl(null, {
        validators: [ Validators.compose([ Validators.required, Validators.minLength(6) ]) ]
      }),
      termsOfService: new FormControl(false, {validators: [ Validators.requiredTrue]})
    });

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe((authStatus) => {
      this.isLoading = false;
      this.registerForm.reset();
    })
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
