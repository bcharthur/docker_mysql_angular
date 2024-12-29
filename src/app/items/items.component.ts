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

  // Création
  newItemName: string = '';

  // Édition (modal)
  editItem: any = { id: null, name: '' };

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.itemsService.getAllItems().subscribe({
      next: (data) => (this.items = data),
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

  // Prépare l’édition et ouvre le modal
  startEdit(item: any) {
    // Copie l’item (pour ne pas modifier directement l’objet dans items)
    this.editItem = { ...item };
  }

  // Valide l’édition
  saveEdit() {
    const { id, name } = this.editItem;
    this.itemsService.updateItem(id, { name }).subscribe({
      next: (res) => {
        console.log('Item modifié :', res);
        this.loadItems();
      },
      error: (err) => console.error('Erreur PUT /items :', err)
    });
  }

  // (Optionnel) Annuler
  cancelEdit() {
    this.editItem = { id: null, name: '' };
  }
}
