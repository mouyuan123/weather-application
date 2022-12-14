import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PageModeService } from 'src/app/services/page-mode.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../../styles.css'] // Allow styles.css to override the background color of header component
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Allows me to open and close the side menu
  @Output() isMenuOpened = new EventEmitter();
  // Check whether to change to dark mode
  isDarkMode!: boolean;
  //
  private readonly unsubscribe$: Subject<void> = new Subject();

  constructor(private pm: PageModeService) { }

  ngOnInit(): void {
    const mode = JSON.parse(localStorage.getItem('dark')!);
    // If the page mode appears in local storage, it implicits that the user toggle the page mode button before
    if(mode){
      this.isDarkMode = mode;
      this.pm.setPageModeAfterReload(mode);
    }
  }

  toggleMenu(): void{
    this.isMenuOpened.emit();
  }

  // Allows the BehaviorSubject<boolean> to emit whether "true" / "false" as latest value 
  // whenever the toggle button is clicked
  togglePageMode(): void{
    this.pm.setPageMode();
    this.pm.getPageMode()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(pageMode => 
      {
        this.isDarkMode = pageMode;
        localStorage.setItem('dark',JSON.stringify(this.isDarkMode));
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
