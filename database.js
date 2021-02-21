const pgp = require('pg-promise')()

const connection = 'postgresql://postgres:12345@localhost:5432/mr_coffee'

const db = pgp(connection)

module.exports = db