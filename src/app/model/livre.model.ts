import { Categorie } from './categorie.model';

export class Livre {
  idLivre!: number;
  titre!: string;
  auteur!: string;
  anneePublication!: number;
  categorie!: Categorie;
}
