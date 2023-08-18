import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';



@NgModule({
  declarations: [
    LayoutPageComponent,
    LoginPageComponent,
    SignInPageComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
