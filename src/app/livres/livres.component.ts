import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-livres',
  imports: [NgFor],
  templateUrl: './livres.component.html'
})
export class LivresComponent implements OnInit {
  livres: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8080/api/livres')
      .subscribe(data => this.livres = data);
  }
}