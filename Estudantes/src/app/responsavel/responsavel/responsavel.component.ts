import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Responsavel, Estudante } from 'src/app/Shared/resposavel.interfaces';
import { ResponsavelService } from 'src/app/services/responsaveis/responsavel.service';
import { AlunoService } from 'src/app/services/alunos/aluno.service';
import { Aluno } from 'src/app/Shared/aluno.interfaces';

@Component({
  selector: 'app-responsavel',
  templateUrl: './responsavel.component.html',
  styleUrls: ['./responsavel.component.css'],
})
export class ResponsavelComponent implements OnInit {
  private ngGetResponsavelUnsubscribe = new Subject();
  private ngGetAlunoUnsubscribe = new Subject();

  responsavelForm: FormGroup;

  estudantes: Estudante = {
    id: '',
    nome: '',
    turma: '',
  };

  responsavel: Responsavel = {
    id: '',
    nome: '',
    sobreNome: '',
    email: '',
    senha: '',
    estudantes: this.estudantes,
  };
  getaluno: Aluno = {
    id: '',
    nome: '',
    nomeResponsavel: '',
    dataNascimento: '',
    turma: '',
    sexo: '',
    email: '',
    atividades: [],
  };

  // alunoId: '';

  alunos: Aluno[] = [];

  constructor(
    private router: Router,
    private responsavelService: ResponsavelService,
    private toastr: ToastrService,
    private aluno: AlunoService
  ) {}

  ngOnInit(): void {
    this.responsavelForm = new FormGroup({
      nome: new FormControl(null),
      sobrenome: new FormControl(null),
      email: new FormControl(null),
      senha: new FormControl(null),
      confirmarSenha: new FormControl(null),
      estudante: new FormControl(null),
    });
    this.getAlunos();
  }

  save() {
    // const getSenha = this.professorForm.get('senha').value;
    // const getConfirmar = this.professorForm.get('confirmarSenha').value;

    // if (
    //   getSenha !== getConfirmar ||
    //   getSenha === null ||
    //   getConfirmar === null
    // ) {
    //   this.toastr.error(
    //     'As senhas digitadas não coincidem, ou estão inválidas, verifique!',
    //     'Professor'
    //   );
    //   return;
    // }

    this.responsavel = Object.assign(
      {},
      {
        id: '',
        nome: this.responsavelForm.get('nome').value,
        sobreNome: this.responsavelForm.get('sobrenome').value,
        email: this.responsavelForm.get('email').value,
        senha: this.responsavelForm.get('senha').value,
        estudantes: this.responsavelForm.get('estudante').value,
      }
    );

    this.getAluno(this.responsavel.estudantes);
    // let valNome, valsobreNome, valEmail;
    // valNome = this.regex.test(this.professor.nome);
    // valsobreNome = this.regex.test(this.professor.sobreNome);
    // valEmail = this.regex.test(this.professor.email);

    // if (
    //   valNome === true ||
    //   this.professor.nome === null ||
    //   valsobreNome === true ||
    //   this.professor.sobreNome == null ||
    //   valEmail === true ||
    //   this.professor.email === null
    // ) {
    //   this.toastr.error('Campos inválidos ou vazios, verifique!', 'Professor');
    //   return;
    // }
  }

  getAluno(id: any) {
    this.aluno.getAluno(id).subscribe(
      (response) => {
        const data = response;
        this.getaluno = JSON.parse(JSON.stringify(data));
        const aluno = {
          id: this.getaluno.id,
          nome: this.getaluno.nome,
          turma: this.getaluno.turma,
        };

        this.responsavel.estudantes = aluno;

        this.responsavelService
          .save(this.responsavel)
          .pipe(takeUntil(this.ngGetResponsavelUnsubscribe))
          .subscribe(
            (_) => {
              console.log(_);
            },
            (err) => {}
          );

        this.router.navigateByUrl('/login').then((e) => {
          if (e) {
            this.toastr.success('Responsavel cadastrado com sucesso! :)');
          } else {
            console.log('Navigation has failed!');
          }
        });
      },
      (err) => {}
    );
  }

  getAlunos() {
    this.aluno
      .getAlunos()
      .pipe(takeUntil(this.ngGetAlunoUnsubscribe))
      .subscribe(
        (response) => {
          const data = response;
          this.alunos = JSON.parse(JSON.stringify(data));
        },
        (err) => {}
      );
  }
}
