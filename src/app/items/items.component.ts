import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: any[] = [];
  newItemName: string = '';

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.itemsService.getAllItems().subscribe({
      next: (data) => this.items = data,
      error: (err) => console.error('Erreur GET /items :', err)
    });
  }

  createItem() {
    const itemToCreate = { name: this.newItemName };
    this.itemsService.createItem(itemToCreate).subscribe({
      next: (res) => {
        console.log('Item créé avec succès : ', res);
        this.newItemName = '';
        this.loadItems();
      },
      error: (err) => console.error('Erreur POST /items :', err)
    });
  }

  deleteItem(id: number) {
    this.itemsService.deleteItem(id).subscribe({
      next: (res) => {
        console.log('Item supprimé avec succès : ', res);
        this.loadItems();
      },
      error: (err) => console.error('Erreur DELETE /items :', err)
    });
  }
}
