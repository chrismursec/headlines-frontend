import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;


  constructor(private authService: AuthService ) { }

  onChangePassword() {
    if (this.changePasswordForm.value.newPassword !== this.changePasswordForm.value.confirmNewPassword) {
      return;
    }

    const formData = {
      oldPassword: this.changePasswordForm.value.oldPassword,
      newPassword: this.changePasswordForm.value.newPassword
    };

    this.authService.changePassword(formData).subscribe(
      (response) => {
      },
      (error) => {

      }
    );
    this.changePasswordForm.reset()
  }

  ngOnInit(): void {

    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl(null, {
        validators: [ Validators.compose([ Validators.required, Validators.minLength(6) ]) ]
      }),
      newPassword: new FormControl(null, {
        validators: [ Validators.compose([ Validators.required, Validators.minLength(6) ]) ]
      }),
      confirmNewPassword: new FormControl(null, {
        validators: [ Validators.compose([ Validators.required, Validators.minLength(6) ]) ]
      })
    })
  }

}
