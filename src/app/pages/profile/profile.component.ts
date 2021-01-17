import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from 'src/app/modals/user.interface';
import { State } from 'src/app/store/reducers/index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user$: Observable<User>;

  constructor(private store: Store<State>) {
    this.user$ = store.select('user')
  }

  ngOnInit(): void { }

}
