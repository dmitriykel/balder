FROM node:10-stretch-slim

RUN apt-get update && apt-get -y install nginx

WORKDIR /app

COPY . /app
COPY nginx.conf /etc/nginx/conf.d/default.conf

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install
RUN npm run build

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]