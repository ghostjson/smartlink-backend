FROM node:16

COPY . /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./usr/src/app/

RUN npm install

RUN npm run build

RUN npm install pm2 --location=global

CMD ["pm2", "dist/main.js"]