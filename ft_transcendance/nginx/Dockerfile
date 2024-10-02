FROM	nginx:1.25
WORKDIR	/bk_nginx

RUN apt-get update
RUN mkdir -p /etc/nginx/ssl && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/localhost.key -out /etc/nginx/ssl/localhost.crt -subj "/C=AT/ST=W/L=W/O=42/OU=42k/CN=trans/UID=trans"

RUN	rm -rf /etc/nginx/conf.d/default.conf
COPY	nginx.conf /etc/nginx/conf.d/