FROM node:10-alpine
WORKDIR /usr/src/my-service
COPY package-lock.json package.json ./
COPY src ./src
RUN npm install --no-progress --ignore-optional --silent
EXPOSE 3000
CMD ["npm", "run", "start"]