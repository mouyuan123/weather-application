import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { PageModeService } from 'src/app/services/page-mode.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../../../styles.css'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  isDarkMode!: boolean;
  signUpForm!: FormGroup;
  private readonly unsubscribe$: Subject<void> = new Subject();
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private firebase: FirebaseService, private router: Router, private pms: PageModeService) { }

  // Getter methods to get the value of each form control in the form
  get userEmail(): FormControl{
    return this.signUpForm.get('userEmail') as FormControl;
  }

  get password(): FormControl{
    return this.signUpForm.get('password') as FormControl;
  }

  ngOnInit(): void {
    this.pms.getPageMode()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(mode => this.isDarkMode = mode);
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
  async onSubmit(): Promise<void>{
    this.isLoading = true;
    await this.firebase.signUpNewUser(this.userEmail.value, this.password.value);
    this.signUpForm.reset();
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
