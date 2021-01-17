import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { Location } from "@angular/common";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  currRoute: string;

  constructor(location: Location, private userService: UserServiceService, private router: Router) {

    router.events.subscribe(val => {
      if (location.path() != "") {
        this.currRoute = location.path();
      } else {
        this.currRoute = "home";
      }
    });

  }

  ngOnInit() {
    this.isLoggedIn$ = this.userService.loggedIn;
  }

  isActive(link) {
    return this.currRoute === link
  }

  classes(link) {
    return {
      active: this.isActive(link)
    }
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
