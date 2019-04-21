const dbSettings = {
  db: process.env.DB || 'test',
  user: process.env.DB_USER || 'summit',
  pass: process.env.DB_PASS || 'summit',
  servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(' ') : [
    '127.0.0.1:27017'
  ]
}

const serverSettings = {
  port: process.env.PORT || 3000
}

module.exports = Object.assign({}, { dbSettings, serverSettings })
