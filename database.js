const pgp = require('pg-promise')()

const connection = 'postgres://postgres@localhost:5432/mr_coffee'

const db = pgp('connection')

module.exports = db