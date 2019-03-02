module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./db.development.sqlite"
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:"
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
  }
};

{
  "development": {
    "username": "jmz527",
    "password": null,
    "database": "api-boilerplate-dev",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres",
    "operatorsAliases": "Sequelize.Op"
  },
  "test": {
    "use_env_variable": "DATABASE_URL"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "api-boilerplate-prod",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  }
}
