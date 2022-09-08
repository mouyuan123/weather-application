import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageModeService } from 'src/app/services/page-mode.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NgForm } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css','../../../styles.css']
})
export class PasswordResetComponent implements OnInit, OnDestroy {
  isDarkMode!: boolean;
  email = "";
  private readonly unsubscribe$: Subject<void> = new Subject();


  constructor(private pms: PageModeService, private firebase: FirebaseService) { }

  ngOnInit(): void {
    this.getPageMode();
  }

  getPageMode(){
    this.pms.getPageMode()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(mode => this.isDarkMode = mode);
  }

  onSubmit(resetForm: NgForm){
    const email = resetForm.value.email;
    this.firebase.resetPassword(email);
    resetForm.reset();
  }

  ngOnDestroy(): void{
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
