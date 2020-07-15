using api.Data.Collections;
using Api.Models;
using System;
using System.Collections.Generic;

namespace Api.Data.Collections
{
  public class Responsavel
  {
    public Responsavel(
          string nome,
          string sobreNome,
          string email,
          string senha,
          string id,
          Estudante_Dto estudantes
          )
    {
      this.Id = id;
      this.Nome = nome;
      this.SobreNome = sobreNome;
      this.Email = email;
      this.Senha = senha;
      this.Estudantes = estudantes;
    }

    public string Id { get; set; }
    public string Nome { get; set; }
    public string SobreNome { get; set; }
    public string Email { get; set; }
    public string Senha { get; set; }
    public Estudante_Dto Estudantes { get; set; }
  }

}