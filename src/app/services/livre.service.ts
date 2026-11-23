import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livre } from '../model/livre.model';
import { Categorie } from '../model/categorie.model';
import { CategorieWrapper } from '../model/categorie-wrapper.model';
import { API_LIVRES, API_CATEGORIES } from '../api.config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class LivreService {
  constructor(private http: HttpClient) {}

  // ----- Livres -----
  listeLivres(): Observable<Livre[]> {
    return this.http.get<Livre[]>(API_LIVRES);
  }
  consulterLivre(id: number): Observable<Livre> {
    return this.http.get<Livre>(`${API_LIVRES}/${id}`);
  }
  ajouterLivre(livre: Livre): Observable<Livre> {
    return this.http.post<Livre>(API_LIVRES, livre, httpOptions);
  }
  updateLivre(livre: Livre): Observable<Livre> {
    return this.http.put<Livre>(API_LIVRES, livre, httpOptions);
  }
  supprimerLivre(id: number) {
    return this.http.delete(`${API_LIVRES}/${id}`, httpOptions);
  }

  // ----- Catégories (Spring Data REST) -----
  listeCategories(): Observable<CategorieWrapper> {
    return this.http.get<CategorieWrapper>(API_CATEGORIES);
  }
  ajouterCategorie(cat: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(API_CATEGORIES, cat, httpOptions);
  }
}
