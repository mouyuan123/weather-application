// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
// Pop up the message when the user "idle" state is almost timeout
import { DialogModule } from 'primeng/dialog';
// import { ServiceWorkerModule } from '@angular/service-worker';


// Firebase Integration for sign up, login and storing capital chosen by myself
import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

// Services
import { PageModeService } from './services/page-mode.service';
import { ErrorSuccessMessageService } from './services/error-success-message.service';
import { WeatherService } from './services/weather.service';
import { FirebaseService } from './services/firebase.service';
import { ConfirmationService } from 'primeng/api';
import { CheckIdleService } from './services/check-idle.service';

// Environment
import { environment } from 'src/environments/environment';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { WeatherCardComponent } from './ui/weather-card/weather-card.component';


@NgModule({
  declarations: 
  [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    PasswordResetComponent,
    ProfileComponent,
    EditProfileComponent,
    WeatherCardComponent,
  ],
  imports: 
  [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //  Make sure I add these 2 lines for firebase configuration
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule, // for database
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    NgIdleKeepaliveModule.forRoot(),
    DialogModule
  ],
  providers: 
  [
    PageModeService, 
    ErrorSuccessMessageService, 
    WeatherService,
    FirebaseService, 
    ConfirmationService,
    CheckIdleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
