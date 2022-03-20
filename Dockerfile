FROM node:lts
RUN apt-get update
RUN apt-get -qy update && apt-get -qy install openssl