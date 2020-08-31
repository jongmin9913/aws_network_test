
FROM node:12.15-alpine

RUN apk add tzdata
RUN apk add curl
RUN apk add bind-tools
RUN ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
RUN echo 'Asia/Seoul' | tee /etc/timezone

ARG NPM_AUTH_TOKEN

RUN date
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN yarn
RUN npx lerna bootstrap
RUN npx lerna run build
WORKDIR /usr/src/app/packages/server

