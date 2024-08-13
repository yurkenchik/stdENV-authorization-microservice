FROM node:20

WORKDIR usr/src/app

COPY package.json ./
COPY package.json ./

RUN yarn install

COPY . .
