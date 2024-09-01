import { Injectable } from '@angular/core';
import { ItemsInterface } from '../types/items.interface';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  searchName(vehiclesList: Array<ItemsInterface>, name: string) {
    console.log(vehiclesList.filter((vehicle) => vehicle.name.includes(name)));
  }

  constructor() { }
}
