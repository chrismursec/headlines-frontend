import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ErrorService } from '../../../services/errors/error.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  private authStatusSub: Subscription;
  errors: string[] = [];
  isLoading: boolean = false;

  
  constructor(private authService: AuthService, private errorService: ErrorService) { 
    this.errorService.initializeErrors().subscribe(errors => {
      this.errors = errors;
    });
  }

  onLogin() {
    const loginCredentials = {username: this.loginForm.value.username, password: this.loginForm.value.password};
    this.isLoading = true;
    this.authService.login(loginCredentials);
  }

  clearErrors() {
    this.errors = [];
  }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      username: new FormControl(null, {validators: [Validators.required, Validators.minLength(5)]}),
       password: new FormControl(null, {
        validators: [ Validators.compose([ Validators.required, Validators.minLength(6) ]) ]
      })
    });

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe((authStatus) => {
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }


}
