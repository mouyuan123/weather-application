import { Component } from '@angular/core';
// import { Subscription } from 'rxjs';
// import { Router } from '@angular/router';
// import { NavigationStart } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'weather';

//   subscription: Subscription;
// pageReloading: boolean = false;

// constructor(private router: Router){
//     this.subscription = router.events.subscribe((event) => {
//         if (event instanceof NavigationStart) {
//           this.pageReloading = !router.navigated;
//           console.log(this.pageReloading)
//         }
//     });
// }
}
