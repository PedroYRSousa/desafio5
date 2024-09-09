const { Livro } = require('../entity/livro')

class LivrosController {
    static async list() {
        return await Livro.findAll();
    }
    static async get(id) {
        return await Livro.findOne({ where: { id } });
    }
    static async create(livro) {
        return await Livro.create(livro);
    }
    static async update(id, livro) {
        return await Livro.update(livro, { where: { id } });
    }
    static async delete(id) {
        return await Livro.destroy({ where: { id } });
    }
}

module.exports = LivrosController