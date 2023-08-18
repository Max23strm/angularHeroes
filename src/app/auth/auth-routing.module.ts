import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';

const routes :Routes =[
  {
    path:'',
    component:LayoutPageComponent,
    children: [
      {
        path:'login',
        component:LoginPageComponent
      },
      {
        path:'new-account',
        component:SignInPageComponent
      },
      {
        path:'**',
        redirectTo:"login"
      },

    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
