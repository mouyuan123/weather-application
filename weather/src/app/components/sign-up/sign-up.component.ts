import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private firebase: FirebaseService, private router: Router) { }

  // Getter methods to get the value of each form control in the form
  get userEmail(): FormControl{
    return this.signUpForm.get('userEmail') as FormControl;
  }

  get password(): FormControl{
    return this.signUpForm.get('password') as FormControl;
  }

  ngOnInit(): void {
    // Create a form using reactive form modules
    this.signUpForm = this.fb.group
    (
      {
        userEmail: ['',[Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      }
    )
  }

  // Create a new user on form submission ( If the email exists, the new user will not be registered again )
  onSubmit(): void{
    this.firebase.signUpNewUser(this.userEmail.value, this.password.value)
    .then(() => {console.log("You have registered successfully!"); this.router.navigateByUrl('/login'); this.signUpForm.reset()})
    .catch((error) => 
        {if(error.code == 'auth/email-already-in-use'){console.log('Email already exists, please try again!')}
         else{console.log("There was a problem while trying to sign up a new user: "+error.details)}});
  }
}
