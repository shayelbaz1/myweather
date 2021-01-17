import { Observable } from 'rxjs';

export interface StringDispatch {
  type: string;
  payload: string;
}

export interface CityDispatch {
  type: string;
  payload: City;
}

export interface APICity {
  LocalizedName: string;
  Key: string;
}

export interface City {
  localizedName: string;
  key: string;
  isFavorite?: boolean;
}

export interface FavCity {
  localizedName: string;
  key: string;
  isFavorite?: boolean;
  currentWeather: Observable<CityData>;
}

export interface APITemperatureDetails {
  Value: number;
  Unit: string;
}

export interface CurrentWeather {
  weatherText: string;
  weatherIcon: number;
  temperature: {
    [key: string]: APITemperatureDetails;
  };
}

export interface APICurrentWeather {
  WeatherText: string;
  WeatherIcon: number;
  Temperature: {
    [Key: string]: APITemperatureDetails;
  };
}

export interface CityData {
  weatherIcon?: number;
  localizedName: string;
  key: string;
  weatherText: string;
  celsDegree: number;
  fahrDegree: number;
}

export interface APIWeekWeather {
  Headline: {
    Text: string
  };
  DailyForecasts: APIDay[];
}

export interface WeekWeather {
  text: string;
  dailyForecasts: DayWeather[];
}

export interface DayWeather {
  dayName: string;
  maxTemp: number;
  date: string;
  icon: number;
}

export interface APIDay {
  DayName: string;
  Temperature: {
    Maximum: {
      Value: number
    }
  };
  Date: string;
  Day: {
    Icon: number
  }
}
