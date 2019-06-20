FROM node:12.4.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
COPY src /app/src
COPY public /app/public

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]