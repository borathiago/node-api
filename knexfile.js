const path = require('path');
const connection = require('./src/database/knex');
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname,'src','database','database.db')
    },
    pool: {
      afterCreate: (conn,callback) => conn.run('pragma foreign_keys = on', callback)
    },
    migrations: {
      directory: path.resolve(__dirname,'src','database','knex','migrations')
    },
    useNullAsDefault: true
  }
};
