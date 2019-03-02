# api_boilerplate

homemade boilerplate server for Express/Webpack/PostgreSQL/Sequelize

# Description

This is a little express server and configuration files for sequelize and an postgreSQL database.

Also includes a seed file with 101 users


# Technologies Used:

ExpressJS + Webpack + PostgreSQL + Sequelize


# Installation Instructions:

First, clone this repo to a directory on your local machine and run `yarn i`:

```sh
git clone git@github.com:jmz527/api_boilerplate.git
cd api_boilerplate/
yarn
```

# Commands:


```sh
yarn start - starts up the development environment
yarn build - builds the build dir from the src
yarn serve - serves up the server within the build dir
yarn test - runs Mocha/Chai tests within the test dir
```

# Sequelize-CLI Steps

Must install `sequelize-cli` globally before these commands will work.

```sh
npm install -g sequelize-cli

postgres -D /usr/local/var/postgres

createdb api-boilerplate-dev

```

```sh
sequelize init

sequelize model:create --name Todo --attributes title:string

sequelize model:create --name TodoItem --attributes content:string,complete:boolean

sequelize model:generate --name User --attributes email:string,first_name:string,last_name:string,username:string,password:string

sequelize db:migrate

sequelize db:migrate:undo

sequelize seed:generate --name demo-user

sequelize db:seed:all

sequelize db:seed:undo

sequelize db:seed:undo:all



sudo rm -rv build
sudo rm -rv node_modules
sudo rm -rv server/config server/migrations server/models server/seeders


mocha --require babel-core/register --require babel-polyfill --grep "/api/todos" --exit


http-server ./bin/www -p 8000 -a 127.0.0.1 --ext js
```


# Thanks

https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize

http://docs.sequelizejs.com/manual/tutorial/migrations.html

https://github.com/babel/example-node-server
