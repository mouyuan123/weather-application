import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css','../../../styles.css']
})
export class SidebarComponent implements OnInit {
  // To check whether to show the sidebar menu
  showMenu: boolean = true;
  // To check whether t display the contents in light mode / dark mode
  darkModeActive: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  // Toggle the display of sidebar menu
  toggleMenu(): void{
    this.showMenu = !this.showMenu;
  }

  // Toggle between light mode and dark mode
  modeToggleSwitch(): void{
    this.darkModeActive = !this.darkModeActive;
  }
}
