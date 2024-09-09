const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Livro = sequelize.define(
    'Livro',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        titulo: DataTypes.TEXT,
        num_paginas: DataTypes.INTEGER,
        isbn: DataTypes.TEXT,
        editora: DataTypes.TEXT
    }
);

function validaLivro(livro) {
    if (livro.id == undefined || livro.id == '' || typeof livro.id !== 'number') return false;
    if (livro.titulo == undefined || livro.titulo == '' || typeof livro.titulo !== 'string') return false;
    if (livro.num_paginas == undefined || livro.num_paginas == '' || typeof livro.num_paginas !== 'number') return false;
    if (livro.isbn == undefined || livro.isbn == '' || typeof livro.isbn !== 'string') return false;
    if (livro.editora == undefined || livro.editora == '' || typeof livro.editora !== 'string') return false;

    return true;
}

module.exports = { Livro, validaLivro }