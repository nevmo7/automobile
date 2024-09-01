import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ItemsInterface } from '../types/items.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  firestore = inject(Firestore)
  itemsCollection = collection(this.firestore, "vehicles")

  //actual function to get items from firestore
  getItems(): Observable<ItemsInterface[]> {
    return collectionData(this.itemsCollection, {
       idField: 'id' //ignores the id field
    }) as Observable<ItemsInterface[]>;
  }
  constructor() { }
}
