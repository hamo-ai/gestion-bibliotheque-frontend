import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Livre } from '../model/livre.model';
import { Categorie } from '../model/categorie.model';
import { LivreService } from '../services/livre.service';

@Component({
  selector: 'app-add-livre',
  imports: [FormsModule],
  templateUrl: './add-livre.html'
})
export class AddLivre implements OnInit {
  newLivre = new Livre();
  categories = signal<Categorie[]>([]);
  newIdCat!: number;

  constructor(private livreService: LivreService, private router: Router) {}

  ngOnInit(): void {
    // Atelier 09 : les catégories sont dans cats._embedded.categories
    this.livreService.listeCategories().subscribe((cats) => {
      this.categories.set(cats._embedded.categories);
    });
  }

  addLivre() {
    this.newLivre.categorie = this.categories().find((c) => c.idCat === this.newIdCat)!;
    this.livreService.ajouterLivre(this.newLivre).subscribe(() => {
      this.router.navigate(['livres']);
    });
  }
}
