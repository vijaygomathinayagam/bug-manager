FROM nginx

COPY ./frontend/build /var/www/html

COPY ./nginx/bugmanager.conf /etc/nginx