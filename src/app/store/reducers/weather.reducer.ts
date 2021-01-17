import * as WeatherActions from '../actions/weather.actions';
import { CityData } from '../../modals/interface.module';

export type Action = WeatherActions.All;

const defaultState: CityData = {
  key: '215854',
  localizedName: 'Tel-Aviv',
  weatherText: 'Sunny',
  weatherIcon: 3,
  celsDegree: 25,
  fahrDegree: 202,
};


const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};

export function reducer(state: CityData = defaultState, action: Action): CityData {
  switch (action.type) {
    case WeatherActions.LOAD_CURRENT_WEATHER_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
