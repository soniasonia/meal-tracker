FROM node:12
MAINTAINER Sonia

RUN mkdir /frontend
WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . ./