FROM node:alpine

WORKDIR $HOME/akiosdev/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80
CMD [ "npm", "start" ]

