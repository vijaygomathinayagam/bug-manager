FROM nginx

COPY ./frontend/build /var/www/html

COPY ./nginx/conf /etc/bugmanager.conf