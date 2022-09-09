import { Component, OnInit, OnDestroy} from '@angular/core';
import { PageModeService } from 'src/app/services/page-mode.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css','../../../styles.css']
})
export class SidebarComponent implements OnInit, OnDestroy{
  // To check whether to show the sidebar menu
  showMenu: boolean = false;
  // To check whether to display the contents in light mode / dark mode
  isDarkMode!: boolean;
  private readonly unsubscribe$: Subject<void> = new Subject();
  // Retrieve some user information from Firestore
  username!: string;
  imageUrl!: string;
  
  constructor(private pm: PageModeService, public firebase: FirebaseService) { 
  }

  ngOnInit(): void {
    this.getPageMode();
    this.firebase.getUserCapitalList().pipe(takeUntil(this.unsubscribe$)).subscribe(user =>
      {
        this.username = user.username;
        this.imageUrl = user.imageUrl;
      })
  }

  // Toggle the display of sidebar menu
  toggleMenu(): void{
    this.showMenu = !this.showMenu;
  }

  /**
   * As a projection to get the page mode from the "PageModeService"
   * Projection: Get the data from a producer to process the data / carry out other business logic
   *             while retaining the original data source
   */
  getPageMode(): void{
    this.pm.getPageMode()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(pageMode => this.isDarkMode = pageMode);
  }

  terminateSubscription(): void{
    this.unsubscribe$.next();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }
}
