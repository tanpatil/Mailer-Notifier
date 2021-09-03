FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm install -g pm2

COPY . .

EXPOSE 3000

CMD ["pm2-runtime", "index.js"]