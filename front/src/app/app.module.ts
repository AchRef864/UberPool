import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArchiveBookingComponent } from './archive-booking/archive-booking.component';
import { HomeDComponent } from './home-d/home-d.component';
import { HomePComponent } from './home-p/home-p.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { PublishComponent } from './publish/publish.component';
import { SearchComponent } from './search/search.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ArchiveBookingComponent,
    HomeDComponent,
    HomePComponent,
    LandingPageComponent,
    LoginComponent,
    PublishComponent,
    SearchComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
