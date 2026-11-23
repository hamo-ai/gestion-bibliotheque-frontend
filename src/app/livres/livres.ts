import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Livre } from '../model/livre.model';
import { LivreService } from '../services/livre.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-livres',
  imports: [RouterLink],
  templateUrl: './livres.html'
})
export class Livres implements OnInit {
  livres = signal<Livre[]>([]);

  constructor(private livreService: LivreService, public authService: AuthService) {}

  ngOnInit(): void {
    this.chargerLivres();
  }

  chargerLivres() {
    this.livreService.listeLivres().subscribe((livres) => this.livres.set(livres));
  }

  supprimerLivre(l: Livre) {
    if (confirm('Etes-vous sûr de supprimer ce livre ?')) {
      this.livreService.supprimerLivre(l.idLivre).subscribe(() => this.chargerLivres());
    }
  }
}
