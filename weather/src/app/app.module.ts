// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
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

// Environment
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //  Make sure I add these 2 lines for firebase configuration
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule, // for database
    ReactiveFormsModule
  ],
  providers: [PageModeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
