FROM node:alpine
RUN apk update && \
    apk upgrade && \
    apk add sqlite yarn && \
    rm -rf /var/cache/apk/*
WORKDIR /app
COPY package.json yarn.lock ./app/
RUN yarn install
COPY . /app
CMD ["yarn", "serve"]
EXPOSE 3030
