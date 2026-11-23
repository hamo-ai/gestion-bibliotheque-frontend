import { Component, OnInit, signal } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { LivreService } from '../services/livre.service';
import { AuthService } from '../services/auth.service';
import { UpdateCategorie } from '../update-categorie/update-categorie';

@Component({
  selector: 'app-liste-categories',
  imports: [UpdateCategorie],
  templateUrl: './liste-categories.html'
})
export class ListeCategories implements OnInit {
  categories = signal<Categorie[]>([]);
  updatedCat = signal<Categorie>({ idCat: 0, nomCat: '' });
  ajout = signal<boolean>(true);

  constructor(private livreService: LivreService, public authService: AuthService) {}

  ngOnInit(): void {
    this.chargerCategories();
  }

  chargerCategories() {
    this.livreService.listeCategories().subscribe((cats) => {
      this.categories.set(cats._embedded.categories);
    });
  }

  // Appelée quand le composant fils émet l'événement (categorieUpdated)
  categorieUpdated(cat: Categorie) {
    console.log('Cat updated event', cat);
    this.livreService.ajouterCategorie(cat).subscribe(() => {
      this.chargerCategories();
      // on remet le formulaire en mode "ajout"
      this.updatedCat.set({ idCat: 0, nomCat: '' });
      this.ajout.set(true);
    });
  }

  // Clic sur "Editer" : on envoie une COPIE de la catégorie au fils
  updateCat(cat: Categorie) {
    this.updatedCat.set({ ...cat });
    this.ajout.set(false);
  }
}
