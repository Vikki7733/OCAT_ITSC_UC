const fs = require(`fs`);

const CONFIG_FILE_PATH = `${__dirname}/../../../config.json`;
let config = {};
let server = {};

if (fs.existsSync(CONFIG_FILE_PATH)) {
  config = JSON.parse(fs.readFileSync(CONFIG_FILE_PATH, `utf8`));

  server = config.server;
}

module.exports = {
  server: {
    port: server.port || 3000,
    'ims-application': server[`ims-application`] || ``,
  },
  database: {
    host: process.env.DATABASE_HOST || config.database.host,
    port: process.env.DATABASE_PORT || config.database.port,
    username: process.env.DATABASE_USERNAME || config.database.username,
    password: process.env.DATABASE_PASSWORD || config.database.password,
    name: process.env.DATABASE_NAME || config.database.name,
    dialect: process.env.DATABASE_DIALECT || config.database.dialect,
    minconnections: process.env.DATABASE_MINCONNECTIONS || config.database.minconnections
  }
};