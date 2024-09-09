const { Sequelize } = require('sequelize');
const logger = require('morgan');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.db',
    logging: logger
});

module.exports = sequelize