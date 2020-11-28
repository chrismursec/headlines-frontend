import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/auth/user.model'
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginCredentials } from '../../models/auth/loginCredentials.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private authStatusListener = new Subject<boolean>();
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private isAuthenticated: boolean = false;
  private hostUrl: string = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) { }


  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }
  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }


  createUser(username: string, password: string) {
    const user: User = {username, password };
      return this.http.post(`${this.hostUrl}/signup`, user).subscribe(
        (response) => {
          this.router.navigate([ '/login' ]);
        },
        (error) => {
          this.authStatusListener.next(false);
        }
      );
  }


  login(credentials: LoginCredentials) {
    this.http.post<{token: string; expiresIn: number; userId: string; name: string;}>(`${this.hostUrl}/login`, credentials)
      .subscribe(response => {
        const token = response.token;
        this.token = token;

        if (token){
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.userId);
          this.router.navigate(['/']);
        }
      }, 
        (error) => {this.authStatusListener.next(false);}
      )
  }

   logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate([ '/login' ]);
  }

   autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.userId = authInfo.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }


  setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {this.logout()}, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');

    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
  }


}
