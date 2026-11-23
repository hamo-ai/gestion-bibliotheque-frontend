import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categorie } from '../model/categorie.model';

@Component({
  selector: 'app-update-categorie',
  imports: [FormsModule],
  templateUrl: './update-categorie.html'
})
export class UpdateCategorie implements OnInit {
  // @Input : le PÈRE (liste-categories) envoie la catégorie et le mode (ajout / modification)
  @Input() categorie!: Categorie;
  @Input() ajout!: boolean;

  // @Output : le FILS envoie un événement au PÈRE quand on clique sur le bouton
  @Output() categorieUpdated = new EventEmitter<Categorie>();

  ngOnInit(): void {
    console.log('ngOnInit du composant UpdateCategorie', this.categorie);
  }

  saveCategorie() {
    this.categorieUpdated.emit(this.categorie);
  }
}
