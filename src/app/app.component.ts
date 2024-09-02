import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemService } from './services/item.service';
import { ItemsInterface } from './types/items.interface';
import { CommonModule } from '@angular/common';

import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  
  title = 'automobile';
  vehicles: Array<ItemsInterface> = [];

  itemsFirebaseService = inject(ItemService)

  searchForm = new FormGroup({
    searchTerm: new FormControl(),
  });

  ngOnInit(): void {
    // getting items from firestore
    this.itemsFirebaseService.getItems().subscribe(items => {
      this.vehicles = items;
    })
  }

  //search function to call the search service in firestore
  search(value: string): void {
    this.itemsFirebaseService.getItemByName(value).subscribe(items => {
      this.vehicles = items
    });
  }

  //filter by a column name and a numerical value 
  filter(filterName: string, filterBy: string, filterValue: string): void {
    this.itemsFirebaseService.getItemByFilter(filterName, filterBy, parseInt(filterValue)).subscribe(items => {
      this.vehicles = items
    })
  }

  //filter by origin of vehicle
  origin(originName: string): void{
    this.itemsFirebaseService.getItemByOrigin(originName).subscribe(items => {
      this.vehicles = items
    })
  }

  //sort function
  sort(sortBy: string, sortOrder: string){
    if (sortOrder.match("ascending")) {
      this.sortAscending(sortBy);
    } else if (sortOrder.match("descending")){
      this.sortDescending(sortBy);
    }
  }

  //sorts array in ascending order
  //using typescripts default sorting angorithm
  sortAscending(sortBy: string): void{
    if (this.vehicles !== null) {
      if (sortBy.match("name")){ //sort by name
        this.vehicles.sort((a,b) => a.name < b.name ? -1 : 1)
      } else if (sortBy.match("acceleration")){ //sort by acceleration
        this.vehicles.sort((a,b) => a.acceleration < b.acceleration ? -1 : 1)
      } else if (sortBy.match("cylinders")){ //sort by cylinders
        this.vehicles.sort((a,b) => a.cylinders < b.cylinders ? -1 : 1)
      } else if (sortBy.match("displacement")){ //sort by displacement
        this.vehicles.sort((a,b) => a.displacement < b.displacement ? -1 : 1)
      } else if (sortBy.match("year")){ //sort by year
        this.vehicles.sort((a,b) => a.model_year < b.model_year ? -1 : 1)
      } else if (sortBy.match("mpg")){ //sort by mpg
        this.vehicles.sort((a,b) => a.mpg < b.mpg ? -1 : 1)
      } else if (sortBy.match("origin")){ //sort by origin
        this.vehicles.sort((a,b) => a.origin < b.origin ? -1 : 1)
      } else if (sortBy.match("horsepower")){ //sort by horsepower
        this.vehicles.sort((a,b) => a.horsepower < b.horsepower ? -1 : 1)
      } else if (sortBy.match("weight")){ //sort by weight
        this.vehicles.sort((a,b) => a.weight < b.weight ? -1 : 1)
      } 
    }
  }

  //sorts array in descending order
  //using typescripts default sorting angorithm
  sortDescending(sortBy: string): void{
    if (this.vehicles !== null) {
      if (sortBy.match("name")){ //sort by name
        this.vehicles.sort((a,b) => a.name > b.name ? -1 : 1)
      } else if (sortBy.match("acceleration")){ //sort by name
        this.vehicles.sort((a,b) => a.acceleration > b.acceleration ? -1 : 1)
      } else if (sortBy.match("cylinders")){ //sort by cylinders
        this.vehicles.sort((a,b) => a.cylinders > b.cylinders ? -1 : 1)
      } else if (sortBy.match("displacement")){ //sort by displacement
        this.vehicles.sort((a,b) => a.displacement > b.displacement ? -1 : 1)
      } else if (sortBy.match("year")){ //sort by year
        this.vehicles.sort((a,b) => a.model_year > b.model_year ? -1 : 1)
      } else if (sortBy.match("mpg")){ //sort by mpg
        this.vehicles.sort((a,b) => a.mpg > b.mpg ? -1 : 1)
      } else if (sortBy.match("origin")){ //sort by origin
        this.vehicles.sort((a,b) => a.origin > b.origin ? -1 : 1)
      } else if (sortBy.match("horsepower")){ //sort by horsepower
        this.vehicles.sort((a,b) => a.horsepower > b.horsepower ? -1 : 1)
      } else if (sortBy.match("weight")){ //sort by weight
        this.vehicles.sort((a,b) => a.weight > b.weight ? -1 : 1)
      } 
    }
  }

}

