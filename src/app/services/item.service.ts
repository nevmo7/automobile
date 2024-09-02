import { inject, Injectable } from '@angular/core';
import { collection, query, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ItemsInterface } from '../types/items.interface';
import { where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  firestore = inject(Firestore)
  itemsCollection = collection(this.firestore, "vehicles")

  //actual function to get items from firestore
  getItems(): Observable<ItemsInterface[]> {
    return collectionData(query(this.itemsCollection)) as Observable<ItemsInterface[]>;
  }

  //search items by name
  getItemByName(name: string): Observable<ItemsInterface[]> {
    console.log(name)
    return collectionData(query(this.itemsCollection, where("name", "==", name))) as Observable<ItemsInterface[]>;
  }

  //get items by filter with numbers
  getItemByFilter(filterName: string, filterBy: string, value: number): Observable<ItemsInterface[]> {
    console.log("filter name" + filterName)
    console.log("filter by" + filterBy)
    console.log("filter value" + value)
    
    if (filterBy.match("<")) {
      //filter by less than
      return collectionData(query(this.itemsCollection, where(filterName, "<", value))) as Observable<ItemsInterface[]>;
    } else if (filterBy.match("=")) {
      //filter by equal to
      return collectionData(query(this.itemsCollection, where(filterName, "==", value))) as Observable<ItemsInterface[]>;
    } else {
      //filter by more than
      return collectionData(query(this.itemsCollection, where(filterName, ">", value))) as Observable<ItemsInterface[]>;
    }
  }

  //filter items by origin
  getItemByOrigin(originName: string): Observable<ItemsInterface[]>{
    return collectionData(query(this.itemsCollection, where("origin", "==", originName)))
  }
}
