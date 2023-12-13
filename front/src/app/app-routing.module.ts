import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomePComponent } from './home-p/home-p.component';
import { LoginComponent } from './login/login.component';

import { SearchComponent } from './search/search.component';
import { PublishComponent } from './publish/publish.component';
import { HomeDComponent } from './home-d/home-d.component';
import { ArchiveBookingComponent } from './archive-booking/archive-booking.component';
import { HeadingComponent } from './heading/heading.component';
import { DayComponent } from './day/day.component';
import { TimeComponent } from './time/time.component';
import { PassengersComponent } from './passengers/passengers.component';
import { CommentComponent } from './comment/comment.component';
import { PublishedComponent } from './published/published.component';
import { ArchiveRidesComponent } from './archive-rides/archive-rides.component';
import { LogoutComponent } from './logout/logout.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ResultsComponent } from './results/results.component';


const routes: Routes = [
  
  {path: 'homePassenger' , component: HomePComponent},
  {path: 'login', component: LoginComponent},
  {path: 'search', component: SearchComponent},
  {path: 'publish', component: PublishComponent},
  {path: 'homeDriver' , component: HomeDComponent},
  {path:'archiveBooking', component:ArchiveBookingComponent},
  {path: 'heading', component: HeadingComponent},
  {path: 'day', component: DayComponent},
  {path: 'time', component: TimeComponent},
  {path: 'passengers' , component: PassengersComponent},
  {path: 'comment' , component: CommentComponent},
  {path: 'published' , component: PublishedComponent},
  {path: 'archiveRides', component: ArchiveRidesComponent},
  {path: 'logout', component: LogoutComponent},
  {path: '', component: SignUpComponent},
  {path: 'results', component: ResultsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
