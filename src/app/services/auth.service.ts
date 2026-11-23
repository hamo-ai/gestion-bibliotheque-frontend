import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Utilisateurs "en dur" (comme dans l'atelier)
  users: User[] = [
    { username: 'admin', password: '123', roles: ['ADMIN'] },
    { username: 'user', password: '123', roles: ['USER'] }
  ];

  // Signals : l'écran se met à jour tout seul quand ces valeurs changent
  loggedUser = signal<string | undefined>(undefined);
  isloggedIn = signal<boolean>(false);
  roles = signal<string[]>([]);

  constructor(private router: Router) {
    // On restaure la session AVANT que le guard s'exécute (sinon un refresh de la page
    // bloquerait l'admin sur /add-livre)
    const login = localStorage.getItem('loggedUser');
    if (localStorage.getItem('isloggedIn') === 'true' && login) {
      this.setLoggedUserFromLocalStorage(login);
    }
  }

  SignIn(user: User): boolean {
    const curUser = this.users.find(
      (u) => u.username === user.username && u.password === user.password
    );
    if (!curUser) {
      return false;
    }
    this.loggedUser.set(curUser.username);
    this.isloggedIn.set(true);
    this.roles.set(curUser.roles);
    localStorage.setItem('loggedUser', curUser.username);
    localStorage.setItem('isloggedIn', 'true');
    return true;
  }

  logout() {
    this.isloggedIn.set(false);
    this.loggedUser.set(undefined);
    this.roles.set([]);
    localStorage.removeItem('loggedUser');
    localStorage.setItem('isloggedIn', 'false');
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    return this.roles().includes('ADMIN');
  }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser.set(login);
    this.isloggedIn.set(true);
    this.getUserRoles(login);
  }

  getUserRoles(username: string) {
    const curUser = this.users.find((u) => u.username === username);
    this.roles.set(curUser ? curUser.roles : []);
  }
}
