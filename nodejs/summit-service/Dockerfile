FROM node:8-alpine

RUN addgroup -S nupp && adduser -S -g nupp nupp

ENV HOME=/home/nupp

COPY package.json package-lock.json $HOME/app/

COPY src/ $HOME/app/src

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64 /usr/local/bin/dumb-init

WORKDIR $HOME/app

RUN chown -R nupp:nupp $HOME/* /usr/local/ && \
    chmod +x /usr/local/bin/dumb-init && \
    npm install --silent --progress=false --production && \
    chown -R nupp:nupp $HOME/*

USER nupp

EXPOSE 3000

CMD ["dumb-init", "npm", "start"]
