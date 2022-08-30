/**
 * This service composes of all the methods / logics that required Firebase integration
 */
import { Injectable } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
// 1. To sign up a new user
// 2. To sign in an existing user
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { arrayRemove, arrayUnion } from 'firebase/firestore';
import { Observable } from 'rxjs';

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

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {
    this.getCurrentUserStatus();
  }

  // Track current user status (logged in / log out)
  getCurrentUserStatus(){
    // onAuthStateChanged() => Act as an observer to keep track of the current signed in user
    this.auth.onAuthStateChanged(currentUser =>
      {
        if(currentUser){
          console.log("hello");
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
      console.log("You have registered successfully!"); 
      // Store the newly signed-up user needed information to the Firestore database
      this.setUserData(newUser.user); 
      this.router.navigateByUrl('/login');
    } catch (error: any) {
      if (error.code == 'auth/email-already-in-use') { console.log('Email already exists, please try again!'); }
      else { console.log("There was a problem while trying to sign up a new user: " + error.details); }
    };
  }

  // Sign in existing user
  signInUser(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // Sign out the current user and remove him/her from local storage when the "Sign Out" icon is clicked
  signOut(){
    this.auth.signOut().then(() => localStorage.removeItem('user')).catch(error => window.alert(error));
  }

  // Create an empty table "users" (if does not exist) and store the information of user with different uid
  // AngularFirestore + AngularFirestoreDocument
  // Angular Firestore allows access to the database and AngularFirestoreDocument is stored within Firestore database
  setUserData(user: any){
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
      console.log('Add a capital successfully')
      // Change the text on the submit button in add-weather.html to "Added"
      return true;
    } catch (error) {
      console.log(error);
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
    console.log('Remove a capital successfully');
    return true;
  } catch (error) {
    window.alert(error);
    return false;
  }
}

// Retrieve complete fields of a document (user) from the collections (users)
getUserCapitalList(): Observable<any>{
  // Retrieve the user id using local storage rather than 'currentUser'
  // This method will be used at other component and asynchrounous fetched may cause errors (component is loaded when the currentUser fetching is incomplete)
  const userid = JSON.parse(localStorage.getItem('user')!)['uid'];
  return this.firestore.doc(`users/${userid}`).valueChanges();
}
}
