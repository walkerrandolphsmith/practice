FROM node:10-alpine
WORKDIR /usr/src/api
COPY ./package-lock.json ./package.json ./
RUN npm install --no-progress --no-optional --silent
COPY ./src ./src
CMD ["npm", "start"]