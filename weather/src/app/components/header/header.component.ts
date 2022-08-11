import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../../styles.css'] // Allow styles.css to override the background color of header component
})
export class HeaderComponent implements OnInit {
  // Allows me to open and close the side menu
  @Output() isMenuOpened = new EventEmitter();
  // Allows me to toggle between light & dark mode
  @Output() toggleMode = new EventEmitter();
  // Check whether to change to dark mode
  @Input() isDarkMode!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(): void{
    this.isMenuOpened.emit();
  }

  togglePageMode(): void{
    this.isDarkMode = !this.isDarkMode;
    this.toggleMode.emit();
  }
}
