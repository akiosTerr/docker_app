FROM node:12

# Create app directory
WORKDIR /home/akiosdev/app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 2020

CMD [ "node", "app.js" ]

