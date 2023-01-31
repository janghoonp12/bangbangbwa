FROM nginx:latest
VOLUME /var/react
RUN rm -rf /etc/nginx/conf.d/default.conf
ADD ./nginx/default.conf /etc/nginx/conf.d/default.conf
ADD ./build /usr/share/nginx/html