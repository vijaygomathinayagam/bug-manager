# react build
FROM node as build

WORKDIR /app

COPY ./frontend/package*.json ./

RUN npm cache verify

RUN npm ci

COPY ./frontend/. .

RUN npm run build

#nginx
FROM nginx

COPY --from=build /app/build /var/www/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf