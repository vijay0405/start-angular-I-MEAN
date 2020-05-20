
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"
import { LoginComponent } from "./auth/login/login.component"
import { SignUpComponent } from './auth/signUp/signUp.component';
import { AuthGuard } from './auth/auth.guard'


const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  // {path: 'create', component: comp1, canActivate: [AuthGuard]},
  // {path: 'edit/:comp', component: comp2, canActivate: [AuthGuard]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
