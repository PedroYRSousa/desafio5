const express = require('express')

const { validaLivro } = require('../entity/livro')

// Controllers
const LivrosController = require('../controllers/livros')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        return res.send(await LivrosController.list())
    } catch (err) {
        console.log(err)
    }

    return res.sendStatus(500)
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const livro = await LivrosController.get(id)
        if (livro == null) return res.sendStatus(404)

        return res.send(livro)
    } catch (err) {
        console.log(err)
    }

    return res.sendStatus(500)
})

router.post('/', async (req, res) => {
    try {
        if (!validaLivro(req.body))
            return res.status(400).send('Informações do livro invalidas')

        const { id } = req.body
        const livroConflict = await LivrosController.get(id)
        if (livroConflict != null) return res.status(409).send('Livro ja existe')

        const result = await LivrosController.create(req.body);
        if (result !== null) return res.status(201).send('Livro criado com sucesso')
        else return res.status(400).send('O livro não pode ser criado')
    } catch (err) {
        console.log(err)
    }

    res.sendStatus(500)
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const livro = await LivrosController.get(id)
        if (livro == null) return res.status(404).send('Livro não encontrado')

        if (!validaLivro(req.body))
            return res.status(400).send('Informações do livro invalidas')

        if (id != req.body.id) {
            const livroConflict = await LivrosController.get(req.body.id)
            if (livroConflict != null) return res.status(409).send('Livro ja existe')
        }

        const result = await LivrosController.update(id, req.body)
        if (result >= 1) return res.send({ 'mensagem': 'Livro atualizado com sucesso' })
        else res.status(400).send('O livro não pode ser atualizado')
    } catch (err) {
        console.log(err)
    }

    res.sendStatus(500)
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const livro = await LivrosController.get(id)
        if (livro == null) return res.status(404).send({ 'mensagem': 'Livro não encontrado' })

        const result = await LivrosController.delete(id)
        if (result >= 1) return res.send({ 'mensagem': 'Livro deletado com sucesso' })
        else res.status(400).send({ 'mensagem': 'O livro não pode ser deletado' })
    } catch (err) {
        console.log(err)
    }

    res.sendStatus(500)
})

module.exports = router