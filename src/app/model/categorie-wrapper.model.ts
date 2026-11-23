import { Categorie } from './categorie.model';

// Spring Data REST renvoie { _embedded: { categories: [...] } }, pas un tableau direct
export class CategorieWrapper {
  _embedded!: { categories: Categorie[] };
}
