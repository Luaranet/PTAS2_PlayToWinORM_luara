require ("dotenv").config();
const conn = require("./db/conn");
const express = require("express");
const exphbs = require("express-handlebars");

const Usuario =  require("./models/Usuario");

  const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");


  app.use(
    express.urlencoded({
      extended: true,
    })
  )

  app.use(express.json());

  app.get("/usuarios/novo", (req,res) => {
    res.render("formUsuario")
  })

  app.get("/usuarios", async (req, res) => {
    const usuarios = await Usuario.findAll({
      raw:true });
      res.render("usuarios",{usuario});
  });

  app.post("/usuarios/novo" , async(req,res) => {
    const nickname = req.body.nickname;
    const nome = req.body.nome;

    const dadosUsuario = {
      nickname,
      nome,
    };

    const usuario = await Usuario.create(dadosUsuario);
    res.send("Usuário inserido: " + usuario.id)
  });

  app.get("/usuarios/:id/update", async (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = await Usuario.findByPk(id, {raw: true});

    res.render("formUsuario", { usuario });
    // const usuario = Usuario.findOne({
    // where:{ id:id },
    // raw: true,
    // });
  });

  app.listen(8000, () => {
    console.log("o servidor está rodando na porta 8000")
  });

conn
  .sync()
  .then(() => {
    console.log("Conectado com sucesso :)");
  })
  .catch((err) => {
    console.log("Erro ao conectar: " + err);
  });