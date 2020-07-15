using System;
// using api.Data;
using Api.Data.Collections;
using Api.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Api.Controllers
{
  [EnableCors("AllowAllOrigins")]
  [ApiController]
  [Route("[controller]")]
  public class ResponsavelController : ControllerBase
  {
    Data.MongoDB _mongoDB;
    IMongoCollection<Responsavel> _responsavelCollection;

    public ResponsavelController(Data.MongoDB mongoDB)
    {
      _mongoDB = mongoDB;
      _responsavelCollection = _mongoDB.DB.GetCollection<Responsavel>(typeof(Responsavel).Name.ToLower());
    }

    [HttpGet]
    public ActionResult ObterResponsavel()
    {
      var responsavel = _responsavelCollection.Find(Builders<Responsavel>.Filter.Empty).ToList();

      return Ok(responsavel);
    }


    [HttpPost]
    public ActionResult SalvarResponsavel([FromBody] ResponsavelDto dto)
    {
      var responsavel = new Responsavel(
          dto.Nome,
          dto.SobreNome,
          dto.Email,
          dto.Senha,
          dto.Id,
          dto.Estudantes
          );

      _responsavelCollection.InsertOne(responsavel);

      return StatusCode(201, "Responsável adicionado com sucesso");
    }



    [HttpGet("{id}")]
    public ActionResult ObterResponsavel(string id)
    {
      var Responsavel = _responsavelCollection.Find(Builders<Responsavel>.Filter
      .Where(_ => _.Id == id)).FirstOrDefault();

      return Ok(Responsavel);
    }

    [HttpPut]
    public ActionResult AtualizarResponsavel([FromBody] ResponsavelDto dto)
    {
      _responsavelCollection.UpdateOne(Builders<Responsavel>.Filter
      .Where(_ => _.Id == dto.Id),
       Builders<Responsavel>.Update.Set("nome", dto.Nome)
                                 .Set("SobreNome", dto.SobreNome)
                                 .Set("email", dto.Email)
                                 .Set("Senha", dto.Senha)
                                 .Set("estudantes", dto.Estudantes));
      return Ok("Cadastro atualizado com sucesso");
    }

    [HttpDelete("{id}")]
    public ActionResult DeletarResponsave(string id)
    {
      _responsavelCollection.DeleteOne(Builders<Responsavel>.Filter
      .Where(_ => _.Id == id));

      return Ok("Cadastro deletado com sucesso");
    }


  }
}
