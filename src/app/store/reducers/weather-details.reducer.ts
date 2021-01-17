import * as WeatherActions from '../actions/weather.actions';
import { WeekWeather } from '../../modals/interface.module';

export type Action = WeatherActions.All;

const getDay = (dateStr) => {
  return dateStr.slice(0, dateStr.indexOf(' '));
};
const dayInMS = 86400000;
// let dayCount = 1;
const dateNow = Date.now();
const days = (dayCount: number): number => (dateNow + dayInMS * dayCount);
const getDate = (date) => (new Date(date).toDateString());

const defaultState: WeekWeather = {
  text: 'Pleasant this weekend',
  dailyForecasts: [
    {
      maxTemp: 30.5,
      date: getDate(days(0)),
      dayName: getDay(getDate(days(0))),
      icon: 3
    },
    {
      maxTemp: 30.7,
      date: getDate(days(1)),
      dayName: getDay(getDate(days(1))),
      icon: 3
    },
    {
      maxTemp: 30.8,
      date: getDate(days(2)),
      dayName: getDay(getDate(days(2))),
      icon: 3
    },
    {
      maxTemp: 30.4,
      date: getDate(days(3)),
      dayName: getDay(getDate(days(3))),
      icon: 3
    },
    {
      maxTemp: 30.7,
      date: getDate(days(4)),
      dayName: getDay(getDate(days(4))),
      icon: 3
    }
  ]
};


const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};

export function reducer(state: WeekWeather = defaultState, action: Action): WeekWeather {
  switch (action.type) {
    case WeatherActions.LOAD_WEEK_WEATHER_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
