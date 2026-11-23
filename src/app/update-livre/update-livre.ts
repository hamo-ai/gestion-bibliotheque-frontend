import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livre } from '../model/livre.model';
import { Categorie } from '../model/categorie.model';
import { LivreService } from '../services/livre.service';

@Component({
  selector: 'app-update-livre',
  imports: [FormsModule],
  templateUrl: './update-livre.html'
})
export class UpdateLivre implements OnInit {
  currentLivre = signal<Livre>(new Livre());
  categories = signal<Categorie[]>([]);
  updatedCatId = signal<number>(0);

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private livreService: LivreService
  ) {}

  ngOnInit(): void {
    this.livreService.listeCategories().subscribe((cats) => {
      this.categories.set(cats._embedded.categories);
    });
    this.livreService
      .consulterLivre(this.activatedRoute.snapshot.params['id'])
      .subscribe((livre) => {
        this.currentLivre.set(livre);
        this.updatedCatId.set(livre.categorie.idCat);
      });
  }

  updateLivre() {
    const livre = this.currentLivre();
    livre.categorie = this.categories().find((c) => c.idCat === this.updatedCatId())!;
    this.livreService.updateLivre(livre).subscribe(() => {
      this.router.navigate(['livres']);
    });
  }
}
