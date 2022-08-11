import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { PageModeService } from 'src/app/services/page-mode.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../../../styles.css']
})
export class HomeComponent implements OnInit{
  @Input() isDarkModeActive!:boolean;
  isDarkMode!: boolean;


  constructor(private pm: PageModeService) { }

  ngOnInit(): void {
   this.getPageMode();
   console.log(this.isDarkMode);
  }


  getPageMode(): void{
    this.pm.getPageMode().subscribe(pageMode => {this.isDarkMode = pageMode; console.log(pageMode)});
  }
}
