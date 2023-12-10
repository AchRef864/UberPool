import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomePComponent } from './home-p/home-p.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SearchComponent } from './search/search.component';
import { PublishComponent } from './publish/publish.component';
import { HomeDComponent } from './home-d/home-d.component';
import { ArchiveBookingComponent } from './archive-booking/archive-booking.component';

const routes: Routes = [
  {path: '' , component: LandingPageComponent},
  {path: 'homePassenger' , component: HomePComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'search', component: SearchComponent},
  {path: 'publish', component: PublishComponent},
  {path: 'homeDriver' , component: HomeDComponent},
  {path:'archiveBooking', component:ArchiveBookingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
