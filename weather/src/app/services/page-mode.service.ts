/**
 * Use BehaviorSubject<boolean> to set the light / dark mode of the website
 * BehaviorSubject allows data sharing across different components
 * 
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageModeService {
  curMode: boolean = false;
  // Whenever the user enters this page, light mode is set by default
  isDarkMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.curMode);
  broadcastMode = this.isDarkMode.asObservable();

  constructor() { 
  }

  // Toggle the page mode when the "Toggle" button is clicked
  setPageMode(): void{
    this.curMode = !this.curMode;
    this.isDarkMode.next(this.curMode);
  }

  // // Share the page mode across the components
  // getPageMode(): Observable<boolean>{
  //   return this.broadcastMode;
  // }

  // Share the page mode across the components
  getPageMode(): BehaviorSubject<boolean>{
    return this.isDarkMode;
  }
}
