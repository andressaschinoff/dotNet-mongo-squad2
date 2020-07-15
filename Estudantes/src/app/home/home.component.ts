import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Professor } from '../Shared/professor.interfaces';
import { Router } from '@angular/router';
import { Responsavel, Estudante } from '../Shared/resposavel.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css',
    '../../plugins/fontawesome-free/css/all.min.css',
    '../../dist/css/adminlte.min.css',
  ],
})
export class HomeComponent implements OnInit, AfterViewInit {
  getProf: string = window.localStorage.getItem('prof');

  professor: Professor = JSON.parse(this.getProf);

  getRes: string = window.localStorage.getItem('res');

  responsavel: Responsavel = JSON.parse(this.getRes);

  estudante: Estudante = this.responsavel.estudantes;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (this.professor == undefined && this.responsavel == undefined) {
      this.router.navigateByUrl('/login');
    }
  }

  Logout() {
    window.localStorage.getItem('prof');

    window.localStorage.removeItem('prof');
    window.localStorage.getItem('res');

    window.localStorage.removeItem('res');

    this.router.navigateByUrl('/login');
  }
}
