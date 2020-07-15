import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Professor, Login } from '../Shared/professor.interfaces';
import { ProfessorService } from '../services/professor/professor.service';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: Login = {
    email: '',
    senha: '',
  };

  loginForm: FormGroup;
  constructor(
    private router: Router,
    private professorService: ProfessorService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const user = window.localStorage.getItem('prof');
    const res = window.localStorage.getItem('res');
    this.loginForm = new FormGroup({
      email: new FormControl(null),
      senha: new FormControl(null),
    });

    if (user !== null || res !== null) {
      this.router.navigateByUrl('/Home');
    }
  }

  fazerLogin() {
    this.login = Object.assign(
      {},
      {
        email: this.loginForm.get('email').value,
        senha: this.loginForm.get('senha').value,
      }
    );

    this.professorService.fazerLogin(this.login).subscribe(
      (response) => {
        const data = JSON.parse(JSON.stringify(response));

        if (data !== null) {
          if (data.estudantes !== null) {
            this.toastr.success('Responsavel logado com sucesso!');
            window.localStorage.setItem('res', JSON.stringify(data));
            this.router.navigateByUrl('/Home');
            console.log(data);
          } else {
            this.toastr.success('Professor logado com sucesso!');
            window.localStorage.setItem('prof', JSON.stringify(data));
            this.router.navigateByUrl('/Home');
            console.log(data);
          }
        } else {
          this.toastr.error('E-mail ou senha incorreto!', 'Professor');
          this.router.navigateByUrl('/login');
        }
      },
      (err) => {}
    );
  }
}
