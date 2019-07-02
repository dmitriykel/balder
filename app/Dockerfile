FROM node:12-stretch-slim as builder

WORKDIR /app

COPY . /app

RUN npm install

ENV PATH /app/node_modules/.bin:$PATH
RUN npm run build


FROM nginx:alpine

WORKDIR /app

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /app/build