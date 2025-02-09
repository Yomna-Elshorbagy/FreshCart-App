import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

export const routes: Routes = [
    {path:"", redirectTo:"home", pathMatch:"full"},
    {path: "", component:AuthLayoutComponent, children:[
        {path: "login", component: LoginComponent},
        {path: "register", component: RegisterComponent}
    ]},
    {path: "", component:BlankLayoutComponent, children:[
        {path:"home", component: HomeComponent, title: "Home page"},
        {path:"products", component: HomeComponent, title: "products page"},
        {path:"brands", component: HomeComponent, title: "Brands page"},
        {path:"categories", component: HomeComponent, title: "Categories page"},
        {path:"cart", component: HomeComponent, title: "Cart page"},
        {path:"checkout", component: HomeComponent, title: "checkout page"},
        {path: "**", component:NotfoundComponent}
    ]},
];
