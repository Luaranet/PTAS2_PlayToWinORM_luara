require("dotenv").config();
const conn = require("./db/conn");
const express = require("express");
const exphbs = require("express-handlebars");

const Usuario = require("./models/Usuario");
const Jogo = require("./models/Jogo")

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");


app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(express.json());

app.get("/", (req, res) => {
  res.render("home")
})

//usuarios
app.get("/usuarios", async (req, res) => {
  const usuarios = await Usuario.findAll({
    raw: true
  });
  res.render("usuarios", { usuarios });
});


app.get("/usuarios/novo", (req, res) => {
  res.render("formUsuario")
})

app.post("/usuarios/novo", async (req, res) => {
  const dadosUsuario = {
    nickname: req.body.nickname,
    nome: req.body.nome,
  };

  const usuario = await Usuario.create(dadosUsuario);
  res.send("Usuário inserido: " + usuario.id)
});

app.get("/usuarios/:id/update", async (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = await Usuario.findByPk(id, { raw: true });
  res.render("formUsuario", { usuario })
})

app.post("/usuarios/:id/update", async (req, res) => {
  const id = parseInt(req.params.id);
  const dadosUsuario = {
    nickname: req.body.nickname,
    nome: req.body.nome,
  };
  const retorno = await Usuario.update(dadosUsuario, {
    where: { id: id },
  });

  if (retorno > 0) {
    res.redirect("/usuarios");
  }
  else {
    res.send("foi de vasco");
  }
})

//delete
app.post("/usuarios/:id/delete", async (req, res) => {
  const id = parseInt(req.params.id);
  const retorno = await Usuario.destroy({ where: { id: id } });

  if (retorno > 0) {
    res.redirect("/usuarios");
  } else {
    res.send("Erro ao excluir usuário");
  }
});


//jogo
app.get("/jogos", async (req, res) => {
  const jogos = await Jogo.findAll({
    raw: true
  });
  res.render("jogos", { jogos });
});

app.get("/jogos/novo", (req, res) => {
  res.render("formJogo")
})


app.get("/jogos/:id/update", async (req, res) => {
  const id = parseInt(req.params.id);
  const jogo = await Jogo.findByPk(id, { raw: true });

  res.render("formJogo", { jogo });
});

app.post("/jogos/:id/update", async (req, res) => {
  const id = parseInt(req.params.id);
  const dadosJogo = {
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    preco: req.body.preco,
  };
  const retorno = await Jogo.update(dadosJogo, {
    where: { id: id },
  });

  if (retorno > 0) {
    res.redirect("/jogos");
  }
  else {
    res.send("foi de vasco");
  }
})

//delete
app.post("/jogos/:id/delete", async (req, res) => {
  const id = parseInt(req.params.id);
  const retorno = await Jogo.destroy({ where: { id: id } });

  if (retorno > 0) {
    res.redirect("/jogos");
  } else {
    res.send("Erro ao excluir jogo");
  }
});

app.post("/jogos/novo", async (req, res) => {
  const dadosJogo = {
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    preco: req.body.preco,
  };

  const jogo = await Jogo.create(dadosJogo);
  res.send("Jogo inserido: " + jogo.id)
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