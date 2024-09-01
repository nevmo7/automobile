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
}
