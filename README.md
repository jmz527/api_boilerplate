# express_sequelize_server

homemade boilerplate server for Express/SQLite3/Sequelize

# Description

This is a little express server and configuration files for sequelize and an sqlite3 database.

Also includes a seed file with 101 users


# Technologies Used:

ExpressJS + SQLite3 + Sequelize


# Installation Instructions:

First, clone this repo to a directory on your local machine and run `npm i`:

```sh
git clone git@github.com:jmz527/express_sequelize_server.git
cd express_sequelize_server/
yarn
```

# Commands:


```sh
yarn start - starts up the development environment
yarn build - builds the dist dir from the src
yarn serve - serves up the server within the dist dir
yarn test - runs Mocha/Chai tests within the test dir
```

# Sequelize-CLI Steps

```sh
node_modules/.bin/sequelize init

node_modules/.bin/sequelize model:generate --name User --attributes email:string,first_name:string,last_name:string,username:string,password:string

node_modules/.bin/sequelize db:migrate

node_modules/.bin/sequelize db:migrate:undo

node_modules/.bin/sequelize seed:generate --name demo-user

node_modules/.bin/sequelize db:seed:all

node_modules/.bin/sequelize db:seed:undo

node_modules/.bin/sequelize db:seed:undo:all



sudo rm -rv dist
sudo rm -rv config migrations models seeders db.development.sqlite node_modules
```


# Thanks

http://docs.sequelizejs.com/manual/tutorial/migrations.html

https://github.com/babel/example-node-server
