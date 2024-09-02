import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemService } from './services/item.service';
import { ItemsInterface } from './types/items.interface';
import { CommonModule } from '@angular/common';

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
  
  title = 'automobile';
  vehicles: Array<ItemsInterface> = [];

  itemsFirebaseService = inject(ItemService)

  searchForm = new FormGroup({
    searchTerm: new FormControl(),
  });

  ngOnInit(): void {

    const localfilterName = localStorage.getItem("filtername");
    const localfilterBy = localStorage.getItem("filterby");
    const localfilterValue = localStorage.getItem("filtervalue");
    
    //if there are filter properties in local storage, get filtered items
    if (localfilterName != null && localfilterBy != null && localfilterValue != null) {
      //getting filtered items with filter propertirs in local storage
      this.filter(localfilterName, localfilterBy, localfilterValue)
    }else{
      // getting all items from firestore
      this.itemsFirebaseService.getItems().subscribe(items => {
        this.vehicles = items;
      })
    }
    
  }

  //search function to call the search service in firestore
  search(value: string): void {
    this.itemsFirebaseService.getItemByName(value).subscribe(items => {
      this.vehicles = items
    });
  }

  //filter by a column name and a numerical value 
  filter(filterName: string, filterBy: string, filterValue: string): void {
    //store filter properties into local storage
    if (filterName != null && filterBy != null && filterValue != null) {
      localStorage.setItem("filtername", filterName);
      localStorage.setItem("filterby", filterBy);
      localStorage.setItem("filtervalue", filterValue);
    }

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
    //store sort properties into local storage

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

  //function to export table to csv
  downloadFile(): void {
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false, 
      showTitle: false,
      title: 'Your title',
      useBom: false,
      noDownload: false,
      headers: ["Name", "Acceleration", "Cylinders", "Displacement", "Year", "MGP", "Origin", "Horsepower", "Weight"]
    }
    console.log(JSON.stringify(this.vehicles));
    new ngxCsv(JSON.stringify(this.vehicles), 'My Report', options);


  }
}

