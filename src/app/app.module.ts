import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HeroComponent } from './components/layout/hero/hero.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ToastComponent } from './components/common/toast/toast.component';
import { ProgressBarComponent } from './components/common/progress-bar/progress-bar.component';

import { ErrorService } from './services/errors/error.service';
import { ErrorInterceptor } from './services/errors/error.interceptor';
import { UserAccountComponent } from './components/pages/user-account/user-account.component';
import { SearchComponent } from './components/pages/search/search.component';
import { ArticleCardComponent } from './components/common/article-card/article-card.component';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { AuthGuard } from './services/auth/auth.guard';
import { SettingsComponent } from './components/pages/user-account/settings/settings.component';
import { ChangePasswordComponent } from './components/pages/user-account/settings/change-password/change-password.component';
import { DeleteAccountComponent } from './components/pages/user-account/settings/delete-account/delete-account.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    HeroComponent,
    RegisterComponent,
    FooterComponent,
    ToastComponent,
    ProgressBarComponent,
    UserAccountComponent,
    SearchComponent,
    ArticleCardComponent,
    SettingsComponent,
    ChangePasswordComponent,
    DeleteAccountComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    AuthGuard,
    ErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
