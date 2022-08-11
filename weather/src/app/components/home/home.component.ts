import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../../../styles.css']
})
export class HomeComponent implements OnInit {
  @Input() isDarkModeActive!:boolean;

  constructor() { }

  ngOnInit(): void {
  }
}
