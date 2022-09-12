import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageModeService } from 'src/app/services/page-mode.service';
import { Subject, takeUntil, switchMap} from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css','../../../styles.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  isDarkMode!: boolean;
  edit: boolean = false;
  private readonly unsubscribe$: Subject<void> = new Subject();
  // Get the current user information
  uid: string = '';
  email: string = '';
  username: string = '';
  imageUrl: string = '';
  //
  isLoading!: boolean;

  constructor(private pm: PageModeService, public firebase: FirebaseService, private imageUpload: ImageUploadService) { }

  ngOnInit(): void {
    this.getPageMode();
    this.isLoading = true;
    this.firebase.getUserCapitalList().pipe(takeUntil(this.unsubscribe$)).subscribe(user =>
      {
        this.uid = user.uid;
        this.email = user.email;
        this.username = user.username;
        this.imageUrl = user.imageUrl;
        this.isLoading = false;
      })
  }

  // Toggle between the "Edit" & "Save" button
  enableEdit(): void{
    this.edit = !this.edit;
  }

  getPageMode(): void{
    this.pm.getPageMode()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(pageMode => this.isDarkMode = pageMode);
  }

  updateUsername(): void{
    this.isLoading = true;
    this.firebase.updateUserData(0, this.username).then(() => 
    {
      this.enableEdit()
      this.isLoading = false; 
    });
  }

  uploadImageFile(event: any): void{
    this.isLoading = true;
    this.imageUpload.uploadImage(event.target.files[0], `images/profile/${this.uid}`)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((result) => 
    {
      this.firebase.updateUserData(1, result).then(() =>
      {
        this.imageUrl = result;
        this.isLoading = false
      });
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
