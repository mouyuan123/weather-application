/**
 * This service composes of all the methods / logics that required Firebase integration
 */
import { Injectable } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
// 1. To sign up a new user
// 2. To sign in an existing user
import { AngularFireAuth } from '@angular/fire/compat/auth';
// Interact with the Angular Firestore to store the user's information
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
// Add / Remove the element from the array property of a document (E.g., user)
import { arrayRemove, arrayUnion } from 'firebase/firestore';
import { Subject } from 'rxjs';
import { ErrorSuccessMessageService } from './error-success-message.service';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  currentUser!: any;

  // To check whether the current user is logged in
  get isLoggedIn(): boolean{
    const value = JSON.parse(localStorage.getItem('user')!);
    return value !== null;
  }

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore, private router: Router, private msg: ErrorSuccessMessageService) {
    this.getCurrentUserStatus();
  }

  // Track current user status (logged in / log out)
  getCurrentUserStatus(){
    // onAuthStateChanged() => Act as an observer to keep track of the current signed in user
    this.auth.onAuthStateChanged(currentUser =>
      {
        if(currentUser){
          this.currentUser = currentUser;
          // If the current user exists, store his/her information within the local storage (to be retrieved)
          localStorage.setItem('user',JSON.stringify(this.currentUser));
        }
        else{
          // If the user signed out / does not exist, set it as "null"
          this.currentUser = null;
          localStorage.setItem('user','null');
        }
      }
    )
  }

  // Sign up a new user to Firebase
  async signUpNewUser(email: string, password: string){
    try {
      const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
      this.msg.showSuccess("You have registered successfully!"); 
      // Store the newly signed-up user needed information to the Firestore database
      this.setNewUserData(newUser.user); 
      this.router.navigateByUrl('/login');
    } catch (error: any) {
      if (error.code == 'auth/email-already-in-use') { this.msg.showFailure('Email already exists, please try again!'); }
      else { this.msg.showFailure("There was a problem while trying to sign up a new user: " + error.details); }
    };
  }

  // Sign in existing user
  async signInUser(email: string, password: string): Promise<any>{
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      this.msg.showSuccess('You have signed in successfully'); this.router.navigateByUrl('/home');
    } catch (error: any) {
      if (error.code == 'auth/wrong-password') { this.msg.showFailure('Invalid password. Please try again.'); }
      else if (error.code == 'auth/user-not-found') { this.msg.showFailure('User not found. Please try another email'); }
      else { this.msg.showFailure("There was a problem while trying to signing in a user: " + error.details); }
    };
  }

  // Sign out the current user and remove him/her from local storage when the "Sign Out" icon is clicked
  async signOut(): Promise<any>{
    try {
      await this.auth.signOut();
      return localStorage.removeItem('user');
    } catch (error: any) {
      return this.msg.showFailure(error.message);
    }
  }

  // Create an empty table "users" (if does not exist) and store the information of user with different uid
  // AngularFirestore + AngularFirestoreDocument
  // Angular Firestore allows access to the database and AngularFirestoreDocument is stored within Firestore database
  setNewUserData(user: any){
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      username: user.displayName,
      email: user.email,
      imageUrl: user.photoURL,
      capitalList: []
    }
    // {merge: true} => Update the document for specific user
    return userRef.set(userData, {merge: true})
  }

  // When the user add the capital, it will be added to the "capitalList []" of the user in Firestore
  // The single result (true / false) will be used immediately
  async addUserCapitalWeather(capital: string): Promise<boolean>{
    // Navigate to the specific user in the "users' collection"
    try {
      await this.firestore.doc(`users/${this.currentUser.uid}`).update({
        // arrayUnion() => update the array field of an user;
        capitalList: arrayUnion(capital)
      });
      this.msg.showSuccess('Add a capital successfully')
      // Change the text on the submit button in add-weather.html to "Added"
      return true;
    } catch (error: any) {
      this.msg.showFailure(error.message);
      return false;
    }
  }

// When the user add the capital, it will be added to the "capitalList []" of the user in Firestore
  async removeUserCapitalWeather(capital: string): Promise<boolean>{
  try {
    await this.firestore.doc(`users/${this.currentUser.uid}`).update({
      // arrayRemove() => remove specific value from the array field of the user
      capitalList: arrayRemove(capital)
    });
    this.msg.showSuccess('Remove a capital successfully');
    return true;
  } catch (error: any) {
    this.msg.showFailure(error.message);
    return false;
  }
}

// Retrieve complete fields of a document (user) from the collections (users)
getUserCapitalList(): Subject<any>{
  // Retrieve the user id using local storage rather than 'currentUser'
  // This method will be used at other component and asynchrounous fetched may cause errors (component is loaded when the currentUser fetching is incomplete)
  const userid = JSON.parse(localStorage.getItem('user')!)['uid'];
  // Return a subject so that all subscribers share the common data instead of creating their own channel (observables)
  return this.firestore.doc(`users/${userid}`).valueChanges() as Subject<any>;
}
}
