import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemService } from './services/item.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  
  title = 'automobile';
  vehicles = [];

  itemsFirebaseService = inject(ItemService)

  ngOnInit(): void {

    //getting items from firestore
    this.itemsFirebaseService.getItems().subscribe(items => {
      console.log(items);
    })
  }

}
