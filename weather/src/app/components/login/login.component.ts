import { Component, OnInit } from '@angular/core';
import { PageModeService } from 'src/app/services/page-mode.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../styles.css']
})
export class LoginComponent implements OnInit {
  isDarkMode!: boolean;
  loginForm!: FormGroup;

  constructor(private pms: PageModeService, private fb: FormBuilder, private firebase: FirebaseService, private router: Router) { }

  // Getter methods to retrieve values of form control in form group (loginForm)
  get userEmail(): FormControl{
    return this.loginForm.get('userEmail') as FormControl;
  }

  get password(): FormControl{
    return this.loginForm.get('password') as FormControl;
  }

  ngOnInit(): void {
    this.pms.getPageMode().subscribe(mode => this.isDarkMode = mode);
    this.loginForm = this.fb.group
    (
      {
        userEmail: ['',[Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      }
    )
  }

  // Login the user to the home page if both the email and password is correct
  onSubmit(): void{
    this.firebase.signInUser(this.userEmail.value, this.password.value)
    .then(() => {console.log('You have signed in successfully'); this.router.navigateByUrl('/home')})
    .catch((error) => 
      {
       if(error.code == 'auth/wrong-password'){console.log('Invalid password. Please try again.')}
       else if (error.code == 'auth/user-not-found'){console.log('User not found. Please try another email')}
       else{console.log("There was a problem while trying to signing in a user: "+error.details)}
      });
  }
}
