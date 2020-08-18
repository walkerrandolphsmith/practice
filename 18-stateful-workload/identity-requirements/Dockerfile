FROM node:10-alpine

WORKDIR /usr/src/task

COPY ./package.json ./package.json
RUN npm install --ignore-optional --no-progress --silent
COPY ./index.js ./index.js

CMD ["node", "./index.js"]