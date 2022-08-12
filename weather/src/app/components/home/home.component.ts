import { Component, OnInit } from '@angular/core';
import { PageModeService } from 'src/app/services/page-mode.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../../../styles.css']
})
export class HomeComponent implements OnInit{
  isDarkMode!: boolean;

  constructor(private pm: PageModeService) { }

  ngOnInit(): void {
   this.getPageMode();
  }

  /**
   * As a projection to get the page mode from the "PageModeService"
   * Projection: Get the data from a producer to process the data / carry out other business logic
   *             while retaining the original data source
   */
  getPageMode(): void{
    this.pm.getPageMode().subscribe(pageMode => this.isDarkMode = pageMode);
  }
}
