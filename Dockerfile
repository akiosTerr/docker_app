FROM node:12

# Create app directory
WORKDIR $HOME/akiosdev/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 2020
CMD [ "yarn", "start" ]

