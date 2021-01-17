import { Component, isDevMode, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../store/reducers/index';
import * as FavoriteActions from '../../store/actions/favorite.actions';
import { utils } from 'src/app/services/utils.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})

export class FavoriteComponent implements OnInit {

  favorite$: Observable<any>;

  constructor(private store: Store<State>) {
    this.favorite$ = this.store.select('favorite');
  }

  ngOnInit() {
    this.store.dispatch(new FavoriteActions.LoadAllCurrentWeather());
  }

  path = isDevMode() ?
    `../../../../assets/imgs/` :
    `https://shayelbaz1.github.io/weatherApp/assets/imgs/`;

  removeFromFavorites(key) {
    this.store.dispatch(new FavoriteActions.RemoveFavCity(key));
  }

  getIconSrc(number) {
    return utils.getWeatherIconLink(number);
  }
}

