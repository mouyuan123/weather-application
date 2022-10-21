import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageModeService } from 'src/app/services/page-mode.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../styles.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isDarkMode!: boolean;
  loginForm!: FormGroup;
  //
  private readonly unsubscribe$: Subject<void> = new Subject();
  isLoading: boolean = false;

  constructor(private pms: PageModeService, private fb: FormBuilder, private firebase: FirebaseService, private router: Router) { }

  // Getter methods to retrieve values of form control in form group (loginForm)
  get userEmail(): FormControl{
    return this.loginForm.get('userEmail') as FormControl;
  }

  get password(): FormControl{
    return this.loginForm.get('password') as FormControl;
  }

  ngOnInit(): void {
    this.pms.getPageMode()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(mode => this.isDarkMode = mode);
    this.loginForm = this.fb.group
    (
      {
        userEmail: ['',[Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      }
    )
  }

  // Login the user to the home page if both the email and password is correct
   async onSubmit(): Promise<void>{
    this.isLoading = true;
    await this.firebase.signInUser(this.userEmail.value, this.password.value);
    this.isLoading = false;
  }

  ngOnDestroy(): void{
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
