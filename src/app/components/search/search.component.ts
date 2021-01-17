import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { City } from '../../modals/interface.module';
import { Store } from '@ngrx/store';
import { State } from '../../store/reducers/index';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import * as SearchActions from '../../store/actions/search.actions';
import { take } from 'rxjs/internal/operators/take';
import { utils } from 'src/app/services/utils.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})

export class SearchComponent implements OnInit {
  myControl = new FormControl();
  cities$: Observable<City[]>;
  isInputLonger: boolean;

  @Output() setFeaturedCity = new EventEmitter<City>();

  constructor(
    private store: Store<State>,
    private toastr: ToastrService,
  ) {
    this.cities$ = store.select('search');
  }

  ngOnInit() { }

  filterBackspace(ev) {
    if (ev.key === 'Backspace') {
      let input = this.myControl.value;
      input = input.length > 1
        ? input.substring(0, 1)
        : '';
      this.isInputLonger = false;
      this.onRequestFromService(input.trim());
    }
  }
  displayFn(city?: City): string | undefined {
    return city ? city.localizedName : undefined;
  }

  private onRequestFromService(query: string) {
    this.store.dispatch(new SearchActions.SearchCity(query));
  }

  private onFilterList(query: string) {
    this.store.dispatch(new SearchActions.FilterList(query));
  }

  onSelectingOption(event: MatAutocompleteSelectedEvent) {
    const city = {
      key: event.option.value.key,
      localizedName: event.option.value.localizedName
    }
    this.setFeaturedCity.emit(city);
    utils.storeToSessionStorage('city', city)
  }

  onInput(ev) {
    if (ev.key !== 'Enter' && ev.charCode !== 32) {
      const key = ev.key.toLowerCase();
      let input = this.myControl.value === null
        ? key
        : this.myControl.value.toLowerCase() + key;
      this.isInputLonger = true;
      input = input.trim();
      if (!this.engTypeCheck(ev)) {
        this.showMessage('non_english');
      } else {
        if (typeof input === 'string') {
          if (input && input.length === 1) {
            this.onRequestFromService(input);
          } else {
            this.onFilterList(input);
            this.checkMatch(input);
          }
        }
      }
    }
  }

  private showMessage(type) {
    switch (type) {
      case 'non_english':
        this.toastr.error(
          'You may search in English letters only',
          'Search Error',
          {
            positionClass: 'toast-top-left'
          });
        break;
      case 'not_found':
        this.toastr.info(
          'City not found',
          'Search Message',
          { positionClass: 'toast-top-right', timeOut: 2500 }
        );
        break;
      default:
        this.toastr.info(
          'Something went wrong',
          'Try Again'
        );
    }
  }

  private engTypeCheck(ev): boolean {
    const charCode: number = ev.charCode;
    return ((charCode < 65) || (charCode > 90 && charCode < 97) || (charCode > 122)) && charCode !== 32
      ? false
      : true;
  }

  private checkMatch(input) {
    this.store.select('search').pipe(take(1)).subscribe(
      cities => {
        const cityArrLength = cities.filter(city => city.localizedName.toLowerCase().indexOf(input.toLowerCase()) === 0).length;
        if (cityArrLength === 0 && this.isInputLonger) { this.showMessage('not_found'); }
      }
    );
  }
}
