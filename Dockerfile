FROM node:alpine

WORKDIR $HOME/akiosdev/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000
CMD [ "npm", "start" ]

