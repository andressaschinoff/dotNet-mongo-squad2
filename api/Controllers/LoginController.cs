﻿using System;
using api.Data;
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
  public class LoginController : ControllerBase
  {
    Data.MongoDB _mongoDB;
    IMongoCollection<Professor> _professoresCollection;
    IMongoCollection<Responsavel> _responsavelCollection;

    public LoginController(Data.MongoDB mongoDB)
    {
      _mongoDB = mongoDB;
      _professoresCollection = _mongoDB.DB.GetCollection<Professor>(typeof(Professor).Name.ToLower());
      _responsavelCollection = _mongoDB.DB.GetCollection<Responsavel>(typeof(Responsavel).Name.ToLower());
    }

    [HttpPost]
    public ActionResult Autenticar([FromBody] Login login)
    {
      var professor = _professoresCollection.Find(Builders<Professor>.Filter
      .Where(_ => _.Email == login.email && _.Senha == login.senha)).FirstOrDefault();

      var responsavel = _responsavelCollection.Find(Builders<Responsavel>.Filter
      .Where(_ => _.Email == login.email && _.Senha == login.senha)).FirstOrDefault();

      if (professor != null)
      {
        return Ok(professor);
      }
      else if (responsavel != null)
      {
        return Ok(responsavel);
      }

      return StatusCode(401);
    }
  }
}
