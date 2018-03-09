# express_sqlite_boil

homemade boilerplate server for Express/SQLite3/Sequelize

# Description



# Technologies Used:

ExpressJS + SQLite3 + Sequelize


# Installation Instructions:

First, clone this repo to a directory on your local machine and run `npm i`:

```sh
git clone git@github.com:jmz527/express_sqlite_boil.git
cd express_sqlite_boil/
npm i
```

# Commands:

# Directory Tree:

```sh

```

# Thanks

http://docs.sequelizejs.com/manual/tutorial/migrations.html



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




sudo rm -rv config migrations models seeders db.development.sqlite node_modules package-lock.json
```
