FROM node:8-alpine

WORKDIR /usr/local/app/
COPY package*.json /usr/local/app/
RUN npm install
COPY src/ /usr/local/app/src

USER node

EXPOSE 3001

CMD ["npm", "start"]
