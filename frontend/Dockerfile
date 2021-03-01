FROM node:12 as compile
WORKDIR /usr/src
COPY ./js /usr/src
RUN npm i && npm run build

FROM nginx:latest
WORKDIR /usr/src
COPY --from=compile /usr/src/build /usr/share/nginx/html
COPY ./js/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
