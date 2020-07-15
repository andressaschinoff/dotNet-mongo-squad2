export interface Responsavel {
  id: string;
  nome: string;
  sobreNome: string;
  email: string;
  senha: string;
  estudantes: Estudante;
}

export interface Estudante {
  id: string;
  nome: string;
  turma: string;
}
