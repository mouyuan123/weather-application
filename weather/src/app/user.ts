export interface User{
    // Each user signed up to Firebase has his/her own unique uid
    uid: string;
    username: string;
    email: string;
    // Profile url
    imageUrl: string;
    // Capitals chosen for weather output
    capitalList: string[];
}