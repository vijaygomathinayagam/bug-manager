FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm cache verify

RUN npm ci

COPY . .

CMD [ "npm", "start" ]