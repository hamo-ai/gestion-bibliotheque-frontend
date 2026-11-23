import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout();
  }

  // Au démarrage : on teste le localStorage pour voir si l'utilisateur est déjà connecté,
  // sinon on le redirige vers /login
  ngOnInit(): void {
    const isloggedin = localStorage.getItem('isloggedIn');
    const loggedUser = localStorage.getItem('loggedUser');
    if (isloggedin !== 'true' || !loggedUser) {
      this.router.navigate(['/login']);
    } else {
      this.authService.setLoggedUserFromLocalStorage(loggedUser);
    }
  }
}
