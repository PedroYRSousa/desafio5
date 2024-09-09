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

    res.sendStatus(500)
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const livro = await LivrosController.get(id)
        if (livro == null) return res.status(404).send(null)

        return res.send(livro)
    } catch (err) {
        console.log(err)
    }

    res.sendStatus(500)
})

router.post('/', async (req, res) => {
    try {
        if (!validaLivro(req.body))
            return res.status(400).send(null)

        const { id } = req.body
        const livroConflict = await LivrosController.get(id)
        if (livroConflict != null) return res.status(409).send(null)

        return res.status(201).send(await LivrosController.create(req.body))
    } catch (err) {
        console.log(err)
    }

    res.sendStatus(500)
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const livro = await LivrosController.get(id)
        if (livro == null) return res.status(404).send(null)

        if (!validaLivro(req.body))
            return res.status(400).send(null)

        if (id != req.body.id) {
            const livroConflict = await LivrosController.get(req.body.id)
            if (livroConflict != null) return res.status(409).send(null)
        }

        const result = await LivrosController.update(id, req.body)
        if (result >= 1) return res.send(livro)
        else res.sendStatus(400)
    } catch (err) {
        console.log(err)
    }

    res.sendStatus(500)
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const livro = await LivrosController.get(id)
        if (livro == null) return res.status(404).send(null)

        const result = await LivrosController.delete(id)
        if (result >= 1) return res.send()
        else res.sendStatus(400)
    } catch (err) {
        console.log(err)
    }

    res.sendStatus(500)
})

module.exports = router