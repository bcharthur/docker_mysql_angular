import { Component, OnInit } from '@angular/core';
import {ItemsService} from './services/items.service';
import {ItemsComponent} from './items/items.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    ItemsComponent
  ],
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  title = 'frontend-angular-docker-mysql';
  items: any[] = [];

  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.itemsService.getAllItems().subscribe({
      next: data => this.items = data,
      error: err => console.error(err)
    });
  }
}
