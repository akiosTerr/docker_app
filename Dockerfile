FROM node:alpine

WORKDIR $HOME/akiosdev/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 2020
CMD [ "node", "app.js" ]

