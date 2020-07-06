FROM node:12.2.0-alpine
MAINTAINER Sonia

RUN mkdir /frontend
WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . ./