import { City } from './interface.module';

export interface User {
  _id?: string,
  name: string,
  imgURL: string,
  favCities: City[]
}