const cors = require('cors')
const logger = require('morgan')
const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
const port = 3000

// Configurações do express
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Banco de dados
const { Livro } = require('./entity/livro')
Livro.sync();

// Rotas
const livros = require('./routes/livros')

app.use('/livros', livros)

// Inicializa
app.listen(port, () => { })