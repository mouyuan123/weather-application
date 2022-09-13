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

  constructor() { }

  uploadImage(image: File, path: string): Observable<string>{
    // Refer to my root storage (project's firebase storage)
    const projectStorage = getStorage();
    // Refer to the child storage (e.g., In my case, I create each reference for each suer)
    const storageRef = ref(projectStorage, path);
    // uploadBytes() => Upload input files to Firebase Storage
    const uploadTask = from(uploadBytes(storageRef, image));
    // Allows the Firestore to store the photoURL for the useres
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }
}
