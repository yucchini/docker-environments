FROM node:12.10.0-alpine

ENV ROOT=/myapp
ENV LANG=C.UTF-8
ENV TZ=Asia/Tokyo

WORKDIR ${ROOT}

RUN apk add --no-cache tzdata zsh sudo \
  && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
  && echo $TZ > /etc/timezone

# speed up npm install a little on docker
RUN npm config set registry http://registry.npmjs.org/

COPY package.json ${ROOT}/
RUN npm install

COPY ./webpack ${ROOT}/webpack

COPY . ${ROOT}/

EXPOSE 8891

CMD ["npm", "watch"]
