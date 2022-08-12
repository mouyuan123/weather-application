/**
 * Use BehaviorSubject<boolean> to set the light / dark mode of the website
 * BehaviorSubject allows data sharing across different components  (multicast)
 *    1. It must have initial (default) value to emit
 *    2. It will always send the last / latest emitted value to observer that subscribe to it
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageModeService {
  // Determine light / dark mode of the page
  curMode: boolean = false;
  // Whenever the user enters this page, light mode is set by default
  isDarkMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.curMode);

  constructor() { 
  }

  // Toggle the page mode when the "Toggle" button is clicked
  setPageMode(): void{
    this.curMode = !this.curMode;
    this.isDarkMode.next(this.curMode);
  }

  // Share the page mode across the components
  getPageMode(): Observable<boolean>{
    /**
     * Return it as Observable<boolean> to avoid other component from embedding new value using .next()
     * This is to ensure only this service is capable of toggling the mode of the page
     */
    return this.isDarkMode as Observable<boolean>;
  }
}
