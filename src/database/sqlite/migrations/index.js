const SQLiteConnection = require('../../sqlite');
const createUsers = require('./createusers')

async function runMigration() {
    const schemas = [
        createUsers
    ].join('')
    SQLiteConnection()
    .then(db=>db.exec(schemas))
    .catch(error=>console.error(error))
}

module.exports = runMigration