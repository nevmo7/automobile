import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemService } from './services/item.service';
import { ItemsInterface } from './types/items.interface';
import { CommonModule } from '@angular/common';
import { AppService } from './app.service';

import { FormGroup, FormControl } from "@angular/forms";
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  constructor(private appService:AppService) {  }
  
  title = 'automobile';
  vehicles: Array<ItemsInterface> = [];

  itemsFirebaseService = inject(ItemService)

  searchTerm: string = ""; 
  filterName: string = "";
  filterBy: string = "";
  filterValue: string = "";
  sortBy: string = "";
  sortOrder: string = "";

  searchForm = new FormGroup({
    searchTerm: new FormControl(),
  });

  ngOnInit(): void {

    this.searchTerm = localStorage.getItem("searchName")!;
    this.filterName = localStorage.getItem("filtername")!;
    this.filterBy = localStorage.getItem("filterby")!;
    this.filterValue = localStorage.getItem("filtervalue")!;
    this.sortBy = localStorage.getItem("sortBy")!;
    this.sortOrder = localStorage.getItem("sortOrder")!;
    
    //if there are filter properties in local storage, get filtered items
    if (this.searchTerm != null && this.filterName != null && this.filterBy != null && this.filterValue != null) {
      console.log("filters found!! " + this.searchTerm + this.filterName + this.filterBy + this.filterValue + this.sortBy + this.sortOrder)
      //getting filtered items with filter properties in local storage
      this.itemsFirebaseService.getItemByFilter(this.searchTerm, this.filterName, this.filterBy, parseInt(this.filterValue))
      .subscribe(items => {
        this.vehicles = items;
        if (this.sortBy != null && this.sortOrder != null) {
          this.sort(this.sortBy, this.sortOrder)
          console.log(items)
        }
      })
    }else if(this.searchTerm != null){
      this.itemsFirebaseService.getItemByName(this.searchTerm).subscribe(items => {
        this.vehicles = items;
        if (this.sortBy != null && this.sortOrder != null) {
          this.sort(this.sortBy, this.sortOrder)
          console.log(items)
        }
      })
    } else{
      // getting all items from firestore
      this.itemsFirebaseService.getItems().subscribe(items => {
        this.vehicles = items;
      })
    }
  }

  //search function to call the search service in firestore
  search(value: string): void {
    this.searchTerm = value
    this.itemsFirebaseService.getItemByName(value).subscribe(items => {
      this.vehicles = items
      localStorage.setItem("searchName", value);
    });
  }

  //filter by a column name and a numerical value 
  filter(filterName: string, filterBy: string, filterValue: string): void {
    //store filter properties into local storage
    if (filterName != null && filterBy != null && filterValue != null) {
      localStorage.setItem("filtername", filterName);
      localStorage.setItem("filterby", filterBy);
      localStorage.setItem("filtervalue", filterValue);
    }else{
      alert("please give a value to filter")
    }
    
    this.itemsFirebaseService.getItemByFilter(this.searchTerm, filterName, filterBy, parseInt(filterValue)).subscribe(items => {
      
      console.log("getting filtered data");
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
    //store sort properties into local storage
    
    localStorage.setItem("sortBy", sortBy);
    localStorage.setItem("sortOrder", sortOrder);
    if (sortOrder.match("ascending")) {
      console.log("sorting in ascending order")
      this.sortAscending(sortBy);
    } else if (sortOrder.match("descending")){
      console.log("sorting in descending order")
      this.sortDescending(sortBy);
    }
  }

  //sorts array in ascending order
  //using typescripts default sorting angorithm
  sortAscending(sortBy: string): void{
    if (this.vehicles !== null) {
      if (sortBy.match("name")){ //sort by name
        this.vehicles.sort((a,b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return -1;
        });
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
        this.vehicles
        .sort((a,b) => {
          if (isNaN(a.horsepower)) {
            return 1;
          }else if (isNaN(b.horsepower)) {
            return -1;
          }else if (a.horsepower < b.horsepower) {
            return -1;
          }else if (a.horsepower > b.horsepower){
            return 1;
          }else{
            return 0;
          }
        })
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
        this.vehicles
        .sort((a,b) => {
          if (isNaN(a.horsepower)) {
            return 1;
          }else if (isNaN(b.horsepower)) {
            return -1;
          }else if (a.horsepower > b.horsepower) {
            return -1;
          }else if (a.horsepower < b.horsepower){
            return 1;
          }else{
            return 0;
          }
        })
      } else if (sortBy.match("weight")){ //sort by weight
        this.vehicles.sort((a,b) => a.weight > b.weight ? -1 : 1)
      } 
    }
  }

  //function to export table to csv
  downloadFile(): void {
    this.appService.downloadFile(this.vehicles, 'vehicles_data');
  }
}

