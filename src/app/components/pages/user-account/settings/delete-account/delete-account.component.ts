import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {

  userId: string;
  username: string;
  confirmUsername: string;

  constructor(private authService: AuthService) { }

  onDeleteAccount() {
    this.authService.deleteUser(this.userId);
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.username = this.authService.getUsername();
  }

}
