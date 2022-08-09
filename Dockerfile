FROM node:16

COPY . /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./usr/src/app/

RUN npm install

RUN npm run build

CMD ["node", "dist/main.js"]