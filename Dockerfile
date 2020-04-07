FROM nginx

COPY ./frontend/build /var/www/html

COPY ./nginx/nginx.conf /etc/nginx