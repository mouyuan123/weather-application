import { Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import { PageModeService } from 'src/app/services/page-mode.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Subject, takeUntil } from 'rxjs';
// Check whether the user is active / idle
import { CheckIdleService } from 'src/app/services/check-idle.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css','../../../styles.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  // Check whether it is a mobile
  isMobile!: boolean;
  // To check whether to show the sidebar menu
  showMenu: boolean = false;
  // To check whether to display the contents in light mode / dark mode
  isDarkMode!: boolean;
  private readonly unsubscribe$: Subject<void> = new Subject();
  idleState!: string;
  idleStateMsg!: string;
  // Check whether the user is idle
  isIdle!: boolean;

  @HostListener("window:resize", ['$event'])
  onResize(event: any){
    if(window.innerWidth <= 425 || screen.width <= 425){
      this.isMobile = true;
    }
    else{
      this.isMobile = false;
    }
  }



  constructor
  (
    private pm: PageModeService, 
    public firebase: FirebaseService,
    private idle: CheckIdleService,
    private router: Router
    ) 
    {
      this.getUseState();
      this.idle.onIdleStart().pipe(takeUntil(this.unsubscribe$)).subscribe(() => { this.isIdle = true; this.idle.setIdleState(this.isIdle); console.log('here1')})
      this.idle.onIdleEnd().pipe(takeUntil(this.unsubscribe$)).subscribe(() => { this.isIdle = false; this.idle.setIdleState(this.isIdle); console.log('here2')})
      this.idle.onTimeoutWarning().pipe(takeUntil(this.unsubscribe$)).subscribe(countdown => this.idleStateMsg = `You'll be logged out in ${countdown} seconds.`)
      this.idle.onTimeout().pipe(takeUntil(this.unsubscribe$)).subscribe(() => 
      { this.isIdle = false; 
        this.idle.setIdleState(this.isIdle); 
        this.firebase.signOut();
        this.router.navigateByUrl("/login");
      })
    }

  ngOnInit(): void {
    if(window.innerWidth <= 425 || screen.width <= 425){
      this.isMobile = true;
    }
    else{
      this.isMobile = false;
    }
    this.getPageMode();
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

  getUseState(): void{
    this.idle.getIdleState()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(status => this.isIdle = status);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
