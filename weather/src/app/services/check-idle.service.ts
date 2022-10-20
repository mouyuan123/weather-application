import { Injectable } from '@angular/core';
// Check Whether the current user is active / idle
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
// Direct the user to the login page if remains idle & being logged out
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { DocumentInterruptSource,  StorageInterruptSource } from '@ng-idle/core';

@Injectable({
  providedIn: 'root'
})
export class CheckIdleService {

  // To check whether the user is in idle state
  idleState: boolean = false;
  isIdle: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.idleState);

  constructor
  (
    private idle: Idle,
    private router: Router
  ) { }

  // Toggle the state when login / logout
  setIdleState(state: boolean): void{
    this.isIdle.next(state);
  }

  // Pass the state to other component
  getIdleState(): Observable<boolean>{
    return this.isIdle as Observable<boolean>;
  }

  // The user is considered "idle" if he/she do nothing in 30 minutes
  setIdle(): void{
    this.idle.setIdle(1800);
  }
  
  // The user will be logged out if he/she remains idle for 10 seconds
  setTimeout(): void{
    this.idle.setTimeout(10);
  }

  // The "idle" state is reset if the user become "active" again
  setInterrupts(): void{
    this.idle.setInterrupts(this.createCustomInterruptSources(null));
  }

  onIdleStart(): Observable<any>{
    // Action taken when the user state = idle
  return this.idle.onIdleStart as Observable<any>;
  }

  // Action taken when the user state = idle -> active
  onIdleEnd(): Observable<any>{
    return this.idle.onIdleEnd as Observable<any>;
  }

  // Action taken when the user is time out in "idle" state
  onTimeout() :Observable<any>{
    return this.idle.onTimeout as Observable<any>;
  }

  // Invoked during the idle timeout warning
  onTimeoutWarning(): Observable<any>{
    return this.idle.onTimeoutWarning as Observable<any>;
  }

  // Omit the 'mousemove' from default interruptions source
  createCustomInterruptSources(options: any) {
    return [new DocumentInterruptSource('keydown DOMMouseScroll mousewheel mousedown touchstart touchmove scroll', options), new StorageInterruptSource(options)];
  }

  // Start to track whether the user is idle / active
  reset() {
    this.idle.watch();
  }

  // Stop this service when logged out
  stop(){
    this.idle.stop();
  }
}
  
