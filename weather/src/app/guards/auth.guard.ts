/**
 * When a user is unauthorized (not found in Firebase / not logged in), he/she should be prevented from accessing the inner page (E.g. home page) of this website.
 */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router, private firebaseAuth: FirebaseService){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.firebaseAuth.isLoggedIn !== true){
        // If the user is unauthorized, he/she will be directed to the login page whenever he/she wants to access the inner page of the website
        this.router.navigate(['login']);
      }
    return true;
  }
  
}
