import { Component, OnInit } from '@angular/core';
import { PageModeService } from 'src/app/services/page-mode.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css','../../../styles.css']
})
export class PasswordResetComponent implements OnInit {
  isDarkMode!: boolean;
  email = "";


  constructor(private pms: PageModeService, private firebase: FirebaseService) { }

  ngOnInit(): void {
    this.getPageMode();
  }

  getPageMode(){
    this.pms.getPageMode().subscribe(mode => this.isDarkMode = mode);
  }

  onSubmit(resetForm: NgForm){
    const email = resetForm.value.email;
    this.firebase.resetPassword(email);
    resetForm.reset();
  }

}
