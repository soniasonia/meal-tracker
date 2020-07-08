FROM node:12.2.0-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN ls
RUN npm install
RUN ls
COPY . ./
RUN ls
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]