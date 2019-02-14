FROM node:alpine
RUN apk update && \
    apk upgrade && \
    apk add sqlite && \
    rm -rf /var/cache/apk/*
WORKDIR /app
COPY package.json yarn.lock ./app/
RUN yarn install
RUN node_modules/.bin/sequelize init
RUN node_modules/.bin/sequelize db:migrate
RUN node_modules/.bin/sequelize db:seed:all
COPY . /app
CMD ["yarn", "serve"]
EXPOSE 3030
