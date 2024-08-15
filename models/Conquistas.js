const db = require("../db/conn");
const { DataTypes } = require("sequelize");
const Jogo = require("../models/Jogo");
const Usuario = require("./Usuario");

const Conquista = db.define(
  "Conquista",
  {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
  {
    tableName: "Conquistas",
  }
);

Consquista.belongsTo(Jogo);
Jogo.hasMany(Consquista);

module.exports = Conquista;

