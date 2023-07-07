import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { StoreComponent } from './components/store/store.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesService } from './services/flashmessages.service'
import { authGuard } from './guards/auth.guard';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { OrderComponent } from './components/order/order.component';


const appRoutes: Routes =  [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate: [authGuard]},
  {path:'profile', component: ProfileComponent, canActivate: [authGuard]},
  {path:'order', component: OrderComponent, canActivate: [authGuard]},
  {path:'store', component: StoreComponent},
  {path:'shoppingcart', component: ShoppingcartComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    DashboardComponent,
    StoreComponent,
    ShoppingcartComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ValidateService,
    AuthService,
    HttpClient,
    FlashMessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
