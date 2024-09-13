import { inject, Injectable } from '@angular/core';
// import db from '@angular/fire/firestore';
import { collection, query, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ItemsInterface } from '../types/items.interface';
import { where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  firestore = inject(Firestore)
  itemsCollection = collection(this.firestore, "vehicles");

  //actual function to get items from firestore
  getItems(): Observable<ItemsInterface[]> {

    return collectionData(query(this.itemsCollection)) as Observable<ItemsInterface[]>;
  }

  //search items by name
  getItemByName(name: string): Observable<ItemsInterface[]> {
    console.log(name)
    return collectionData(query(this.itemsCollection, where("name", ">=", name), where("name", "<=", name + "\uf8ff"))) as Observable<ItemsInterface[]>;
  }

  //get items by filter with numbers
  getItemByFilter(searchTerm: string, filterName: string, filterBy: string, value: number): Observable<ItemsInterface[]> {
    
    if (filterBy.match("<")) {
      //filter by less than
      return collectionData(query(this.itemsCollection, where(filterName, "<", value), where("name", ">=", searchTerm), where("name", "<=", searchTerm + "\uf8ff"))) as Observable<ItemsInterface[]>;
    } else if (filterBy.match("=")) {
      //filter by equal to
      return collectionData(query(this.itemsCollection, where(filterName, "==", value), where("name", ">=", searchTerm), where("name", "<=", searchTerm + "\uf8ff"))) as Observable<ItemsInterface[]>;
    } else {
      //filter by more than
      return collectionData(query(this.itemsCollection, where(filterName, ">", value), where("name", ">=", searchTerm), where("name", "<=", searchTerm + "\uf8ff"))) as Observable<ItemsInterface[]>;
    }
  }

  //filter items by origin
  getItemByOrigin(originName: string): Observable<ItemsInterface[]>{
    return collectionData(query(this.itemsCollection, where("origin", "==", originName)))
  }
}
