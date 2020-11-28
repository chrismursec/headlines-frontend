import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.scss' ],
})
export class HeaderComponent implements OnInit, OnDestroy {
	showMobileMenu: boolean = false;
	showMobileSubMenu: boolean = false;

	userIsAuthenticated: boolean = false;
  private authListenerSubs: Subscription;

	constructor(private authService: AuthService) {}


	onLogout(): void {
		this.authService.logout();
	}

	toggleMobileMenu(): void {
		this.showMobileMenu = !this.showMobileMenu;
	}

	onSubMenu(): void {
		if (this.showMobileMenu) {
			this.showMobileSubMenu = !this.showMobileSubMenu;
		}
	}

	ngOnInit(): void {
		this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.userIsAuthenticated = isAuthenticated;
    });
	}

	ngOnDestroy(): void {
		this.authListenerSubs.unsubscribe();
	}
}
