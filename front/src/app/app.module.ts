import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArchiveBookingComponent } from './archive-booking/archive-booking.component';
import { ArchiveRidesComponent } from './archive-rides/archive-rides.component';
import { CommentComponent } from './comment/comment.component';
import { DayComponent } from './day/day.component';
import { HeadingComponent } from './heading/heading.component';
import { HomeDComponent } from './home-d/home-d.component';
import { HomePComponent } from './home-p/home-p.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PassengersComponent } from './passengers/passengers.component';
import { PublishComponent } from './publish/publish.component';
import { PublishedComponent } from './published/published.component';
import { SearchComponent } from './search/search.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TimeComponent } from './time/time.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    ArchiveBookingComponent,
    ArchiveRidesComponent,
    CommentComponent,
    DayComponent,
    HeadingComponent,
    HomeDComponent,
    HomePComponent,
    LandingPageComponent,
    LoginComponent,
    LogoutComponent,
    PassengersComponent,
    PublishComponent,
    PublishedComponent,
    SearchComponent,
    SignUpComponent,
    TimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
