import { Injectable } from '@angular/core';
// To sign up a new user
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private auth: AngularFireAuth) { }

  // Sign up a new user to Firebase
  signUpNewUser(email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
}
