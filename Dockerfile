FROM node:16-alpine As dependecies

LABEL maintainer="Elijah"

RUN mkdir -p /sunday-school-reg
RUN rm -r /sunday-school-reg
RUN mkdir -p /sunday-school-reg

RUN npm install nodemon -g

WORKDIR /sunday-school-reg
RUN rm -rf node_modules
COPY package.json /sunday-school-reg
ADD https://www.google.com /time.now
RUN npm install

COPY . /sunday-school-reg

EXPOSE 8989

