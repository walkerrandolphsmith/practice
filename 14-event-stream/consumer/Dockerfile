FROM node:10-alpine
WORKDIR /usr/src/my-service
COPY package-lock.json package.json ./
RUN npm install --no-progress --ignore-optional --silent
COPY src ./src
CMD ["npm", "run", "start"]