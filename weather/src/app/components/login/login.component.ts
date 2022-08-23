import { Component, OnInit } from '@angular/core';
import { PageModeService } from 'src/app/services/page-mode.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../styles.css']
})
export class LoginComponent implements OnInit {
  isDarkMode!: boolean;

  constructor(private pms: PageModeService) { }

  ngOnInit(): void {
    this.pms.getPageMode().subscribe(mode => this.isDarkMode = mode);
  }

}
