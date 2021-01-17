import { Component, OnInit } from '@angular/core';
import { City, CityData } from '../../modals/interface.module';
import * as fromStore from '../../store/reducers';
import * as HomeActions from '../../store/actions/home.actions';
import * as FavoritePageActions from '../../store/actions/favorite.actions';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { utils } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-to-favorite',
  templateUrl: './add-to-favorite.component.html',
  styleUrls: ['./add-to-favorite.component.scss']
})
export class AddToFavoriteComponent implements OnInit {
  featuredCity$: Observable<City> | null;
  featuredCityWeather$: Observable<CityData>;
  constructor(
    private store: Store<fromStore.State>) {
    this.featuredCity$ = this.store.select('home');
    this.featuredCityWeather$ = this.store.select('weather');

  }
  ngOnInit() {
  }

  addToFav(city: CityData) {
    this.store.dispatch(new HomeActions.AddFeaturedCityToFav());
    this.store.dispatch(new FavoritePageActions.AddFavCity(city));

    let favorites = utils.loadFromStorage('favorites')
    if (!!favorites) {
      favorites.favoriteKeyMap.push(city)
      utils.storeToStorage('favorites', favorites)
    }

  }

  removeFromFav(key) {
    this.store.dispatch(new HomeActions.RemoveFeaturedCityFromFav());
    this.store.dispatch(new FavoritePageActions.RemoveFavCity(key));
  }
}
