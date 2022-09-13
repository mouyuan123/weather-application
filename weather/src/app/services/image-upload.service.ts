import { Injectable } from '@angular/core';
// Used to update the profile image of the user to the Firebase Storage
import {
  getDownloadURL,
  ref,
  uploadBytes, // Upload "Blob" / "File" image
  getStorage,
} from '@angular/fire/storage';
import {from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  // Refer to my root storage (project's firebase storage)
  private readonly rootStorage = getStorage();

  constructor() { }

  uploadImage(image: File, path: string): Observable<string>{
    // Refer to the child storage (e.g., In my case, I create each reference for each suer)
    const storageRef = ref(this.rootStorage, path);
    // uploadBytes() => Upload input files to Firebase Storage
    const uploadTask = from(uploadBytes(storageRef, image));
    // Allows the Firestore to store the photoURL for the useres
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }

  retrieveImage(capital: string): Promise<string>{
    // Create reference to the image corresponding to each clicked capital
    const storageRef = ref(this.rootStorage,`capitals/${capital}.jpg`);
    return getDownloadURL(storageRef);
  }
}
