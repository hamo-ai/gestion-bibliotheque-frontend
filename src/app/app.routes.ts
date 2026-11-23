import { Routes } from '@angular/router';
import { Livres } from './livres/livres';
import { AddLivre } from './add-livre/add-livre';
import { UpdateLivre } from './update-livre/update-livre';
import { ListeCategories } from './liste-categories/liste-categories';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { livreGuard } from './services/livre-guard';

export const routes: Routes = [
  { path: 'livres', component: Livres },
  // Seul l'ADMIN peut ajouter / modifier un livre : protégé par le guard
  { path: 'add-livre', component: AddLivre, canActivate: [livreGuard] },
  { path: 'update-livre/:id', component: UpdateLivre, canActivate: [livreGuard] },
  { path: 'liste-categories', component: ListeCategories },
  { path: 'login', component: Login },
  { path: 'app-forbidden', component: Forbidden },
  { path: '', redirectTo: 'livres', pathMatch: 'full' }
];
